import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coffee, Leaf, Plus, Search } from 'lucide-react';
import { PRODUCTS, Product } from '../types';
import { SEO } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import { cn } from '../lib/utils';

interface BuyProps {
  addToCart: (product: Product) => void;
}

export const Buy: React.FC<BuyProps> = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'tea' | 'ingredient'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <SEO 
        title="Shop Premium Coffee & Tea | Kenangan Collection" 
        description="Browse our collection of 60+ premium coffee beans, rare teas, and artisanal ingredients. Fast delivery from Ajmer to all over India."
        keywords="buy coffee beans online India, order tea online, Kenangan products, coffee ingredients, artisanal tea shop"
      />
      
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl mb-6">Shop <span className="serif-italic">Kenangan</span></h1>
          <p className="text-brand-ink/60 max-w-2xl mx-auto">
            Explore our extensive collection of 60+ premium coffee and tea varieties. From rare single-origin beans to artisanal herbal infusions, find the perfect brew for your next memory.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-12 items-center justify-between">
          <div className="flex flex-wrap gap-2 justify-center">
            {['all', 'coffee', 'tea', 'ingredient'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all border capitalize",
                  activeCategory === cat 
                    ? "bg-brand-olive text-brand-cream border-brand-olive" 
                    : "border-brand-olive/20 text-brand-ink/60 hover:border-brand-olive/40"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-ink/30" size={20} />
            <input 
              type="text" 
              placeholder="Search for your favorite brew..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-brand-olive/10 rounded-full pl-12 pr-6 py-3 focus:outline-none focus:border-brand-olive transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
              compact
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 opacity-40">
            <Search size={64} className="mx-auto mb-4" />
            <p className="text-xl font-serif">No products found matching your search.</p>
          </div>
        )}
      </section>
    </>
  );
};
