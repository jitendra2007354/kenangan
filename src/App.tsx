import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { PRODUCTS, Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { GiftCoffee } from './pages/GiftCoffee';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Buy } from './pages/Buy';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, customName?: string, customDate?: string, address?: string, mobile?: string) => {
    setCart(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        item.customName === customName && 
        item.address === address && 
        item.mobile === mobile
      );
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.customName === customName && item.address === address && item.mobile === mobile) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, customName, customDate, address, mobile }];
    });
  };

  const removeFromCart = (id: string, customName?: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.customName === customName)));
  };

  const updateQuantity = (id: string, customName: string | undefined, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.customName === customName) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar cartCount={cartCount} />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home addToCart={addToCart} />} />
              <Route path="/buy" element={<Buy addToCart={addToCart} />} />
              <Route path="/about" element={<About />} />
              <Route path="/gift" element={<GiftCoffee addToCart={addToCart} />} />
              <Route path="/contact" element={<Contact />} />
              <Route 
                path="/cart" 
                element={
                  <Cart 
                    cart={cart} 
                    updateQuantity={updateQuantity} 
                    removeFromCart={removeFromCart} 
                  />
                } 
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
