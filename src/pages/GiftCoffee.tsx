import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Heart, Coffee } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PRODUCTS, Product } from '../types';

interface GiftCoffeeProps {
  addToCart: (product: Product, customName: string, customDate: string, address: string, mobile: string) => void;
}

export const GiftCoffee: React.FC<GiftCoffeeProps> = ({ addToCart }) => {
  const [customization, setCustomization] = useState({ name: '', date: new Date().toLocaleDateString(), address: '', mobile: '' });
  const [error, setError] = useState(false);

  const handleGiftAddToCart = (product: Product) => {
    if (!customization.name.trim() || !customization.address.trim() || !customization.mobile.trim()) {
      setError(true);
      return;
    }
    setError(false);
    addToCart(product, customization.name, customization.date, customization.address, customization.mobile);
    // Reset fields
    setCustomization(prev => ({ ...prev, name: '', address: '', mobile: '' }));
  };

  return (
    <>
      <SEO 
        title="Personalized Coffee Gifts | Name Your Brew" 
        description="Create a truly unique gift by naming a Kenangan coffee or tea blend after your friend. A personalized memory delivered from Ajmer."
        keywords="personalized coffee gift, custom coffee label, unique gifts India, Kenangan gift coffee, name your coffee"
      />
      <section className="py-24 bg-brand-olive text-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="pill-image w-full max-w-md mx-auto aspect-[3/4] border-4 border-brand-cream/20 p-4">
              <img 
                src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-full object-cover rounded-[9999px]"
                alt="Personalized Kenangan Gift"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 glass-card text-brand-ink p-6 rounded-2xl shadow-2xl max-w-[240px] rotate-3">
              <p className="font-serif italic text-lg mb-1">"For {customization.name || 'someone special'}"</p>
              <p className="text-[10px] uppercase tracking-widest opacity-60">{customization.date}</p>
            </div>
          </div>
          
          <div>
            <span className="uppercase tracking-[0.3em] text-xs font-bold mb-4 block opacity-70">Personalization</span>
            <h2 className="text-5xl md:text-6xl mb-8 leading-tight">Name the <br /><span className="serif-italic">Coffee</span> after them</h2>
            <p className="text-brand-cream/70 mb-10 text-lg">
              At Kenangan, we don't just put a name on a cup. We create a custom blend named after your friend. Imagine them receiving a bag of "The Rahul Roast" or "Anjali's Afternoon Tea." It's not just a gift; it's a memory crafted specifically for them.
            </p>
            
            <div className="space-y-6 mb-10">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2 opacity-60">Friend's Name (The Coffee Name) *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Rahul, Anjali..."
                  value={customization.name}
                  onChange={(e) => setCustomization(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full bg-transparent border-b ${error && !customization.name ? 'border-red-400' : 'border-brand-cream/30'} py-3 focus:outline-none focus:border-brand-cream transition-colors text-xl font-serif`}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2 opacity-60">Friend's Address *</label>
                <input 
                  type="text" 
                  placeholder="Enter delivery address"
                  value={customization.address}
                  onChange={(e) => setCustomization(prev => ({ ...prev, address: e.target.value }))}
                  className={`w-full bg-transparent border-b ${error && !customization.address ? 'border-red-400' : 'border-brand-cream/30'} py-3 focus:outline-none focus:border-brand-cream transition-colors text-xl font-serif`}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2 opacity-60">Friend's Mobile *</label>
                <input 
                  type="tel" 
                  placeholder="Enter mobile number"
                  value={customization.mobile}
                  onChange={(e) => setCustomization(prev => ({ ...prev, mobile: e.target.value }))}
                  className={`w-full bg-transparent border-b ${error && !customization.mobile ? 'border-red-400' : 'border-brand-cream/30'} py-3 focus:outline-none focus:border-brand-cream transition-colors text-xl font-serif`}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold mb-2 opacity-60">Special Occasion/Date</label>
                <input 
                  type="text" 
                  value={customization.date}
                  onChange={(e) => setCustomization(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-transparent border-b border-brand-cream/30 py-3 focus:outline-none focus:border-brand-cream transition-colors text-xl font-serif"
                />
              </div>
              {error && (!customization.name || !customization.address || !customization.mobile) && (
                <p className="text-red-400 text-sm font-bold">All fields marked with * are required!</p>
              )}
            </div>

            <div className="flex flex-wrap gap-4">
              {PRODUCTS.filter(p => p.category !== 'ingredient').slice(0, 3).map(p => (
                <button 
                  key={p.id}
                  onClick={() => handleGiftAddToCart(p)}
                  className="bg-brand-cream text-brand-olive px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <Gift size={16} /> Create "{customization.name || 'Friend'}'s {p.category === 'coffee' ? 'Coffee' : 'Tea'}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
