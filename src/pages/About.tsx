import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

export const About: React.FC = () => {
  return (
    <>
      <SEO 
        title="Our Story | Kenangan - Brewing Memories in Ajmer" 
        description="Learn about Kenangan, India's premier coffee and tea roastery.We are dedicated to human connection through the art of the perfect brew."
        keywords="Kenangan history, about Kenangan coffee, India coffee mission, artisanal tea story, Kenangan team"
      />
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl mb-8 leading-tight"
          >
            Our Story: <br /><span className="serif-italic">Kenangan</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl text-brand-ink/70 leading-relaxed"
          >
            Founded in the historic cities of India, Kenangan was born from a simple desire: to bridge the gap between artisanal quality and home convenience.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-serif mb-8">From india to Your Heart</h2>
            <p className="text-lg text-brand-ink/70 mb-6 leading-relaxed">
              "Kenangan" means "Memories." We believe that every cup of coffee or tea is an opportunity to create a moment that lasts. Whether it's the quiet contemplation of a morning brew or the shared laughter over a midday latte, we are here to make it special.
            </p>
            <p className="text-lg text-brand-ink/70 mb-10 leading-relaxed">
              Our unique concept allows you to name the coffee after your loved ones, creating a truly personal memory. This isn't just about a label; it's about the intention behind the gift.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-brand-olive/5 p-6 rounded-3xl">
                <h3 className="text-4xl font-serif text-brand-olive mb-2">100%</h3>
                <p className="text-xs uppercase tracking-widest font-bold opacity-50">Ethically Sourced</p>
              </div>
              <div className="bg-brand-olive/5 p-6 rounded-3xl">
                <h3 className="text-4xl font-serif text-brand-olive mb-2">24h</h3>
                <p className="text-xs uppercase tracking-widest font-bold opacity-50">Fresh Roast Promise</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80" 
              alt="Kenangan Roastery in Ajmer"
              className="rounded-[64px] shadow-2xl"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-8 -left-8 bg-brand-olive text-brand-cream p-8 rounded-3xl max-w-xs hidden md:block shadow-2xl">
              <p className="font-serif italic text-xl">"Quality is not an act, it is a habit."</p>
            </div>
          </motion.div>
        </div>

        <div className="bg-brand-olive text-brand-cream rounded-[64px] p-12 md:p-24 text-center">
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Our Mission</h2>
          <p className="text-xl md:text-2xl text-brand-cream/80 max-w-3xl mx-auto leading-relaxed mb-12">
            Our mission is to become India's most beloved artisanal coffee and tea brand, known not just for our exceptional taste, but for our commitment to human connection. We aim to reach every corner of the country, delivering a piece of india's warmth and the universal comfort of a well-brewed cup.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            
            <div className="text-center">
              <p className="text-4xl font-serif mb-2">60+</p>
              <p className="text-xs uppercase tracking-widest font-bold opacity-50">Product Varieties</p>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};
