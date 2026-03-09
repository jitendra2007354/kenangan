import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Trash2, Minus, Plus, Download, CreditCard, Check } from 'lucide-react';
import { CartItem } from '../types';
import { SEO } from '../components/SEO';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { cn } from '../lib/utils';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: string, customName: string | undefined, delta: number) => void;
  removeFromCart: (id: string, customName?: string) => void;
}

export const Cart: React.FC<CartProps> = ({ cart, updateQuantity, removeFromCart }) => {
  const billRef = useRef<HTMLDivElement>(null);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const [isGifting, setIsGifting] = useState(false);
  const [friendAddress, setFriendAddress] = useState({ name: '', address: '', city: '', pincode: '' });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartTotal > 1000 ? 0 : 50;
  const total = cartTotal + deliveryFee;

  const downloadBill = async () => {
    if (!billRef.current) return;
    const canvas = await html2canvas(billRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('kenangan-bill.pdf');
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          total: total
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save order');
      }

      setIsCheckedOut(true);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to process order. Please try again.');
    }
  };

  if (isCheckedOut) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-brand-olive rounded-full flex items-center justify-center text-brand-cream mb-8"
        >
          <Check size={48} />
        </motion.div>
        <h2 className="text-4xl font-serif mb-4">Ok thanks..</h2>
        <p className="text-brand-ink/60 max-w-md mx-auto">
          Your order has been received. We are brewing your memories and will deliver them shortly. Cash on Delivery is confirmed.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-8 text-brand-olive font-bold underline"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Your Cart" 
        description="Review your Kenangan order, personalize your brews, and checkout with Cash on Delivery."
        keywords="Kenangan cart, order coffee online, checkout Kenangan"
      />
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-7xl mb-12">Your <span className="serif-italic">Basket</span></h1>

        {cart.length === 0 ? (
          <div className="text-center py-24 opacity-40">
            <ShoppingBag size={80} className="mx-auto mb-6" />
            <p className="text-2xl font-serif">Your basket is empty</p>
            <a href="/" className="mt-8 inline-block bg-brand-olive text-brand-cream px-10 py-4 rounded-full font-bold">Start Shopping</a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-8">
              {cart.map((item, idx) => (
                <motion.div 
                  layout
                  key={`${item.id}-${item.customName}-${idx}`} 
                  className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-[32px] border border-brand-olive/5"
                >
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-2">
                      <h4 className="text-2xl font-serif">{item.name}</h4>
                      <span className="text-xl font-bold">₹{item.price * item.quantity}</span>
                    </div>
                    {item.customName && (
                      <div className="text-xs uppercase tracking-widest text-brand-olive font-bold mb-2 bg-brand-olive/5 inline-block px-3 py-1 rounded-full">
                        Custom Coffee Name: {item.customName}'s {item.category === 'coffee' ? 'Roast' : 'Brew'}
                      </div>
                    )}
                    <div className="space-y-1 mb-4">
                      {item.address && (
                        <p className="text-xs text-brand-ink/60">
                          <span className="font-bold uppercase tracking-tighter">Delivery to:</span> {item.address}
                        </p>
                      )}
                      {item.mobile && (
                        <p className="text-xs text-brand-ink/60">
                          <span className="font-bold uppercase tracking-tighter">Mobile:</span> {item.mobile}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4 bg-brand-cream rounded-full px-4 py-2">
                        <button onClick={() => updateQuantity(item.id, item.customName, -1)} className="hover:text-brand-olive"><Minus size={18} /></button>
                        <span className="text-lg font-bold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.customName, 1)} className="hover:text-brand-olive"><Plus size={18} /></button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.customName)}
                        className="text-red-500 hover:text-red-600 transition-colors p-2"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="bg-brand-olive/5 p-8 rounded-[40px] border border-brand-olive/10">
                <p className="text-sm text-brand-ink/60 leading-relaxed">
                  Every item in your basket is prepared with the specific delivery details you provided. We ensure that each memory reaches its destination in perfect condition.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Bill Summary for Download */}
              <div ref={billRef} className="bg-white p-10 rounded-[48px] border border-brand-olive/10 shadow-xl">
                <div className="text-center mb-8 pb-8 border-b border-brand-olive/10">
                  <h3 className="text-3xl font-serif font-bold">Kenangan Bill</h3>
                  <p className="text-xs uppercase tracking-widest opacity-40 mt-2">Order Summary</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {cart.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="opacity-70">{item.name} x {item.quantity}</span>
                      <span className="font-bold">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-brand-olive/10 flex justify-between">
                    <span className="opacity-70">Subtotal</span>
                    <span className="font-bold">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Delivery Fee</span>
                    <span className="font-bold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-brand-olive/20 flex justify-between items-end">
                  <span className="text-lg uppercase tracking-widest font-bold">Total</span>
                  <span className="text-4xl font-serif font-bold text-brand-olive">₹{total}</span>
                </div>

                <div className="mt-8 p-4 bg-brand-olive/5 rounded-2xl text-center">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-brand-olive">Payment Mode: Cash on Delivery Only</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={downloadBill}
                  className="w-full border border-brand-olive text-brand-olive py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-olive/5 transition-all"
                >
                  <Download size={18} /> Download Bill
                </button>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-brand-olive text-brand-cream py-5 rounded-full font-bold text-lg shadow-2xl shadow-brand-olive/20 hover:bg-brand-olive/90 transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} /> Checkout (COD)
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
