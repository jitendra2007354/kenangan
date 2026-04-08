import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coffee, Leaf, Plus, Star, ShieldCheck, Truck, Heart } from 'lucide-react';
import { PRODUCTS, Product } from '../types';
import { SEO } from '../components/SEO';
import { cn } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';
import { Link } from 'react-router-dom';

interface HomeProps {
  addToCart: (product: Product) => void;
}

export const Home: React.FC<HomeProps> = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'tea' | 'ingredient'>('all');

  const filteredProducts = activeCategory === 'all' 
    ? PRODUCTS.slice(0, 6) 
    : PRODUCTS.filter(p => p.category === activeCategory).slice(0, 6);

  return (
    <>
      <SEO 
        title="Kenangan | Best Coffee & Tea in Ajmer, Rajasthan" 
        description="Experience the finest artisanal coffee and tea at Kenangan. Based in Ajmer, we deliver premium brews and ingredients across India. Personalize your coffee with a loved one's name."
        keywords="Kenangan, premium coffee Ajmer, best tea Rajasthan, personalized coffee gifts, artisanal coffee India, coffee delivery Ajmer, tea shop Ajmer, Rajasthan coffee culture"
      />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover opacity-40"
            alt="Kenangan Coffee Shop Atmosphere in Ajmer"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-cream/0 via-brand-cream/50 to-brand-cream" />
        </div>

        <div className="relative z-10 text-center max-w-5xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-olive uppercase tracking-[0.4em] text-sm font-bold mb-6 block"
          >
            Kenangan • Premium Coffee & Tea • Ajmer, Rajasthan
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-serif mb-10 leading-tight"
          >
            Brewing <span className="serif-italic">Memories</span> <br /> 
            Across India
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-brand-ink/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Welcome to Kenangan (By city car ajmer), where every cup is a journey through time. Based in the heart of Ajmer, we deliver artisanal coffee, rare teas, and premium ingredients to your doorstep. Our unique concept allows you to name the coffee after your loved ones, creating a truly personal memory.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6"
          >
            <Link to="/buy" className="bg-brand-olive text-brand-cream px-12 py-5 rounded-full font-bold hover:bg-brand-olive/90 transition-all shadow-2xl shadow-brand-olive/20 text-lg">
              Shop All Products
            </Link>
            <Link to="/gift" className="border-2 border-brand-olive text-brand-olive px-12 py-5 rounded-full font-bold hover:bg-brand-olive/5 transition-all text-lg">
              Name a Coffee
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Detailed Concept Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl mb-8 leading-tight">The <span className="serif-italic">Kenangan</span> Philosophy</h2>
            <p className="text-brand-ink/60 text-lg mb-8 leading-relaxed">
              In Indonesian, "Kenangan" means memories. We chose this name because we believe that the best moments in life are often shared over a warm cup of coffee or tea. Whether it's a quiet morning reflection or a lively conversation with friends, our brews are designed to be the backdrop of your most cherished memories.
            </p>
            <p className="text-brand-ink/60 text-lg mb-10 leading-relaxed">
              Our commitment to quality starts at the source. We work directly with farmers in Chikmagalur, Darjeeling, and Assam to bring you the finest harvests. Every batch is roasted and blended in our Ajmer facility with meticulous care, ensuring that the memory you brew at home is nothing short of perfection.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-olive/10 rounded-full flex items-center justify-center text-brand-olive">
                  <Star size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-serif">2026</h4>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Founded in Ajmer</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-olive/10 rounded-full flex items-center justify-center text-brand-olive">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-serif">60+</h4>
                  <p className="text-[10px] uppercase tracking-widest font-bold opacity-40">Product Varieties</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[64px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-full object-cover"
                alt="Kenangan Coffee Brewing"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-12 -left-12 bg-brand-olive text-brand-cream p-10 rounded-[40px] shadow-2xl max-w-xs">
              <p className="text-2xl font-serif italic mb-4">"A memory in every sip, delivered from Ajmer to your home."</p>
              <p className="text-xs uppercase tracking-[0.2em] font-bold opacity-60">— The Kenangan Team</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GIF Section */}
      <section className="py-24 bg-brand-cream overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl aspect-video rounded-[64px] overflow-hidden shadow-2xl border-[12px] border-white"
          >
            <img 
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80" 
              alt="Kenangan Coffee Pouring Art" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <p className="mt-10 text-brand-olive font-serif italic text-3xl">The perfect pour, every single time.</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white border-y border-brand-olive/5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-brand-olive/5 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-olive">
              <Truck size={40} />
            </div>
            <h3 className="text-2xl font-serif mb-4">Pan-India Delivery</h3>
            <p className="text-brand-ink/60 leading-relaxed">From the narrow lanes of Ajmer to the bustling streets of Mumbai, we deliver our fresh brews anywhere in India.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-brand-olive/5 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-olive">
              <Heart size={40} />
            </div>
            <h3 className="text-2xl font-serif mb-4">Custom Coffee Names</h3>
            <p className="text-brand-ink/60 leading-relaxed">Our main concept: name the coffee after your friend. We create a custom label that makes every gift a lasting memory.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 bg-brand-olive/5 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-olive">
              <Leaf size={40} />
            </div>
            <h3 className="text-2xl font-serif mb-4">Pure Ingredients</h3>
            <p className="text-brand-ink/60 leading-relaxed">We also deliver raw ingredients like heirloom beans and organic honey so you can brew your own memories.</p>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section id="menu" className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-6xl mb-6">Our <span className="serif-italic">Signature</span> Selection</h2>
            <p className="text-brand-ink/60 max-w-xl text-lg">A glimpse into our curated collection of artisanal drinks and premium ingredients.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {['all', 'coffee', 'tea', 'ingredient'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-bold transition-all border-2 capitalize",
                  activeCategory === cat 
                    ? "bg-brand-olive text-brand-cream border-brand-olive" 
                    : "border-brand-olive/10 text-brand-ink/60 hover:border-brand-olive/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              addToCart={addToCart} 
            />
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <Link to="/buy" className="inline-block border-b-2 border-brand-olive text-brand-olive font-bold text-xl pb-2 hover:opacity-70 transition-opacity">
            View All 60+ Products
          </Link>
        </div>
      </section>
    </>
  );
};
