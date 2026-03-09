import React from 'react';
import { Coffee, Heart, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-ink text-brand-cream py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-brand-cream rounded-full flex items-center justify-center text-brand-ink">
              <Coffee size={20} />
            </div>
            <span className="text-3xl font-serif font-bold tracking-tight">Kenangan</span>
          </div>
          <p className="text-brand-cream/50 max-w-sm mb-8">
            Elevating your daily ritual through high-quality ingredients and personalized experiences. Local brewing, global standards. Now serving across India. Our mission is to brew memories that last a lifetime.
          </p>
        </div>
        
        <div>
          <h5 className="text-sm uppercase tracking-widest font-bold mb-6 opacity-50">Quick Links</h5>
          <ul className="space-y-4 text-brand-cream/70">
            <li><a href="/" className="hover:text-brand-cream transition-colors">Home</a></li>
            <li><a href="/buy" className="hover:text-brand-cream transition-colors">Buy Now</a></li>
            <li><a href="/about" className="hover:text-brand-cream transition-colors">About Story</a></li>
            <li><a href="/gift" className="hover:text-brand-cream transition-colors">Gift Coffee</a></li>
            <li><a href="/contact" className="hover:text-brand-cream transition-colors">Contact Us</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm uppercase tracking-widest font-bold mb-6 opacity-50">Contact</h5>
          <ul className="space-y-4 text-brand-cream/70">
            <li className="flex items-center gap-2"><Mail size={14} /> info@kenangan.in</li>
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-1 shrink-0" /> 
              <span>2nd Floor, City Car Ajmer Office, Ajmer, Rajasthan, India</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-brand-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-cream/30 uppercase tracking-widest">
        <p>© 2024 Kenangan Coffee & Tea. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};
