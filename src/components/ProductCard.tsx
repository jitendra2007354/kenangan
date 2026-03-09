import React, { useState } from 'react';
import { Coffee, Leaf, Plus } from 'lucide-react';
import { Product } from '../types';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, customName?: string, customDate?: string, address?: string, mobile?: string) => void;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, compact }) => {
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState(false);

  const handleAddToCart = () => {
    if (!address.trim() || !mobile.trim()) {
      setError(true);
      return;
    }
    setError(false);
    addToCart(product, undefined, undefined, address, mobile);
    // Reset fields after adding to cart
    setAddress('');
    setMobile('');
  };

  return (
    <motion.div 
      layout
      className={`group bg-white ${compact ? 'rounded-[32px]' : 'rounded-[48px]'} overflow-hidden border border-brand-olive/5 hover:shadow-2xl transition-all duration-500 flex flex-col h-full`}
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className={`absolute ${compact ? 'top-4 right-4 text-sm' : 'top-6 right-6 text-lg'} bg-white/90 backdrop-blur px-6 py-2 rounded-full font-bold shadow-lg`}>
          ₹{product.price}
        </div>
      </div>
      <div className={compact ? 'p-6 flex flex-col flex-grow' : 'p-10 flex flex-col flex-grow'}>
        <div className={`flex items-center gap-2 ${compact ? 'mb-2' : 'mb-4'}`}>
          {product.category === 'coffee' ? <Coffee size={compact ? 14 : 16} className="text-brand-olive" /> : <Leaf size={compact ? 14 : 16} className="text-brand-olive" />}
          <span className={`${compact ? 'text-[10px]' : 'text-xs'} uppercase tracking-widest font-bold text-brand-olive/60`}>{product.category}</span>
        </div>
        <h3 className={`${compact ? 'text-xl mb-2' : 'text-3xl mb-4'} font-serif`}>{product.name}</h3>
        <p className={`text-brand-ink/60 ${compact ? 'text-xs mb-6 h-8' : 'text-base mb-8'} line-clamp-2 leading-relaxed`}>{product.description}</p>
        
        <div className={`space-y-4 ${compact ? 'mb-6' : 'mb-8'} mt-auto`}>
          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-olive/60 mb-1 block">Address *</label>
            <input 
              type="text" 
              placeholder="Full address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className={`w-full bg-brand-olive/5 border ${error && !address ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-brand-olive transition-all`}
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest font-bold text-brand-olive/60 mb-1 block">Mobile *</label>
            <input 
              type="tel" 
              placeholder="10-digit mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className={`w-full bg-brand-olive/5 border ${error && !mobile ? 'border-red-500' : 'border-transparent'} rounded-xl px-4 py-2 text-xs focus:outline-none focus:border-brand-olive transition-all`}
            />
          </div>
        </div>

        <button 
          onClick={handleAddToCart}
          className={`w-full ${compact ? 'py-3 text-sm' : 'py-4 text-lg'} rounded-full border-2 border-brand-olive text-brand-olive font-bold hover:bg-brand-olive hover:text-brand-cream transition-all flex items-center justify-center gap-3`}
        >
          <Plus size={compact ? 16 : 20} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
};
