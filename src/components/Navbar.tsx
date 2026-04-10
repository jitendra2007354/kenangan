import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Buy', path: '/buy' },
    { name: 'About', path: '/about' },
    { name: 'Gift Coffee', path: '/gift' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-brand-olive/10 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 bg-brand-olive rounded-full flex items-center justify-center text-brand-cream">
          <Coffee size={20} />
        </div>
        <span className="text-2xl font-serif font-bold tracking-tight">Kenangan</span>
      </Link>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
        {navLinks.map((link) => (
          <Link 
            key={link.path} 
            to={link.path} 
            className={cn(
              "hover:text-brand-olive transition-colors",
              location.pathname === link.path ? "text-brand-olive font-bold" : "text-brand-ink/70"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link 
          to="/cart"
          className="relative p-2 hover:bg-brand-olive/5 rounded-full transition-colors"
        >
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-brand-olive text-brand-cream text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </Link>
        
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-brand-cream border-b border-brand-olive/10 p-6 flex flex-col gap-4 md:hidden animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              onClick={() => setIsOpen(false)}
              className="text-lg font-serif"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
