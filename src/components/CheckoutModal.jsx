import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL

const CheckoutModal = ({ open, onClose, cart, onSuccess }) => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address_line: '', city: '', pincode: '', payment_method: 'cod'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const submit = async () => {
    setLoading(true); setError('')
    try {
      const payload = {
        ...form,
        cart: cart.map(c => ({ product_id: c._id, quantity: c.quantity }))
      }
      const res = await fetch(`${API}/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Checkout failed')
      onSuccess(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
      <div className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-xl font-semibold">Checkout</h3>
          <button onClick={onClose} className="text-blue-200/80">Close</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white" />
          <input name="pincode" value={form.pincode} onChange={handleChange} placeholder="PIN code" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white" />
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white" />
          <input name="address_line" value={form.address_line} onChange={handleChange} placeholder="Address" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white col-span-1 sm:col-span-2" />
        </div>

        <div className="mt-4 flex gap-4">
          <label className="text-white flex items-center gap-2">
            <input type="radio" name="payment_method" value="cod" checked={form.payment_method==='cod'} onChange={handleChange} /> Cash on Delivery
          </label>
          <label className="text-white flex items-center gap-2">
            <input type="radio" name="payment_method" value="card" checked={form.payment_method==='card'} onChange={handleChange} /> Card (mock)
          </label>
        </div>

        {error && <p className="mt-3 text-red-300">{error}</p>}

        <button disabled={loading} onClick={submit} className="mt-6 w-full px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold disabled:opacity-60">
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  )
}

export default CheckoutModal
