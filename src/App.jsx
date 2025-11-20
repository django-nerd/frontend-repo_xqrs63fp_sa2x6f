import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'
import CheckoutModal from './components/CheckoutModal'

const API = import.meta.env.VITE_BACKEND_URL

function App() {
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState(false)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    // try to seed products silently on first load
    const seed = async () => {
      try { await fetch(`${API}/seed`, { method: 'POST' }) } catch {}
    }
    seed()
  }, [])

  const addToCart = (p) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === p._id)
      if (existing) return prev.map(i => i._id === p._id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...p, quantity: 1 }]
    })
  }
  const inc = (id) => setCart(prev => prev.map(i => i._id === id ? { ...i, quantity: i.quantity + 1 } : i))
  const dec = (id) => setCart(prev => prev.map(i => i._id === id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i))
  const removeItem = (id) => setCart(prev => prev.filter(i => i._id !== id))

  const handleCheckoutSuccess = (data) => {
    setOrder(data)
    setCart([])
    setOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="relative">
        <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="logo" className="w-8 h-8"/>
            <span className="text-white font-semibold">Jaggery Store</span>
          </div>
          <button onClick={() => setOpen(true)} className="px-4 py-2 rounded-lg bg-white/10 text-white border border-white/10">
            Cart ({cart.reduce((s,i)=>s+i.quantity,0)})
          </button>
        </header>

        <Hero />
        <ProductGrid onAdd={addToCart} />
        <Cart items={cart} onInc={inc} onDec={dec} onRemove={removeItem} onCheckout={() => setOpen(true)} />

        {order && (
          <div className="max-w-6xl mx-auto px-6 pb-12">
            <div className="bg-green-600/20 border border-green-500/30 text-green-200 rounded-xl p-4">
              Order placed successfully. Order ID: <span className="font-mono">{order.order_id}</span>
            </div>
          </div>
        )}

        <footer className="max-w-6xl mx-auto px-6 py-10 text-blue-200/70">
          © {new Date().getFullYear()} Jaggery Store • Pure & Healthy Sweetener
        </footer>
      </div>

      <CheckoutModal open={open} onClose={() => setOpen(false)} cart={cart} onSuccess={handleCheckoutSuccess} />
    </div>
  )
}

export default App
