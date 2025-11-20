import React from 'react'

const Cart = ({ items, onInc, onDec, onRemove, onCheckout }) => {
  const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0)
  const shipping = subtotal >= 10 ? 0 : 1
  const total = subtotal + shipping
  return (
    <aside className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-xl font-bold text-white mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <p className="text-blue-200/80">Your cart is empty.</p>
      ) : (
        <div className="bg-slate-800/60 border border-white/10 rounded-2xl p-5">
          {items.map(it => (
            <div key={it._id} className="flex items-center gap-4 py-3 border-b border-white/10 last:border-0">
              <img src={it.image} alt={it.title} className="w-16 h-16 object-cover rounded-lg border border-white/10" />
              <div className="flex-1">
                <h4 className="text-white font-medium">{it.title}</h4>
                <p className="text-blue-200/80 text-sm">${it.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => onDec(it._id)} className="w-8 h-8 rounded bg-white/10 text-white">-</button>
                <span className="text-white w-6 text-center">{it.quantity}</span>
                <button onClick={() => onInc(it._id)} className="w-8 h-8 rounded bg-white/10 text-white">+</button>
              </div>
              <button onClick={() => onRemove(it._id)} className="ml-4 text-red-300 hover:text-red-200">Remove</button>
            </div>
          ))}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-blue-200/90">
              <p>Subtotal: <span className="text-white font-semibold">${subtotal.toFixed(2)}</span></p>
              <p>Shipping: <span className="text-white font-semibold">${shipping.toFixed(2)}</span></p>
              <p>Total: <span className="text-white font-bold">${total.toFixed(2)}</span></p>
            </div>
            <button onClick={onCheckout} className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold">Checkout</button>
          </div>
        </div>
      )}
    </aside>
  )
}

export default Cart