import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

const ProductGrid = ({ onAdd }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API}/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <div className="text-blue-200">Loading products...</div>

  return (
    <section id="shop" className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Choose your pack</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map(p => (
          <div key={p._id} className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
            <img src={p.image || 'https://images.unsplash.com/photo-1604908554027-9e3b2433b253?q=80&w=600&auto=format&fit=crop'} alt={p.title} className="w-full h-48 object-cover rounded-xl border border-white/10" />
            <h3 className="mt-4 text-white font-semibold text-lg">{p.title}</h3>
            <p className="text-blue-200/80 text-sm line-clamp-2">{p.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-amber-400 font-bold text-xl">${p.price.toFixed(2)}</span>
              <button onClick={() => onAdd(p)} className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">Add to cart</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductGrid