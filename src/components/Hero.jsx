import React from 'react'

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1629380321590-3b3f75d66dec?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwcG90dGVyeSUyMGhhbmRtYWRlfGVufDB8MHx8fDE3NjM2MjQzMTR8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"/>
      <div className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Pure Jaggery Powder
          </h1>
          <p className="mt-4 text-blue-100/90 text-lg">
            Natural, unrefined sweetness for your daily cup and healthy bakes. No chemicals. Farm-direct.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#shop" className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold transition">Shop Now</a>
            <a href="#about" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition border border-white/20">Why Jaggery?</a>
          </div>
        </div>
        <div className="md:justify-self-end">
          <img src="https://images.unsplash.com/photo-1622404521418-03fa54b2f5f5?q=80&w=800&auto=format&fit=crop" alt="Jaggery" className="w-full max-w-md rounded-2xl shadow-2xl border border-white/10"/>
        </div>
      </div>
    </section>
  )
}

export default Hero