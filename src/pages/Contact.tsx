import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { SEO } from '../components/SEO';

export const Contact: React.FC = () => {
  const [formData, setFormData] = React.useState({ firstName: '', lastName: '', email: '', message: '' });
  const [isSent, setIsSent] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSent(true);
        setFormData({ firstName: '', lastName: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Contact error:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us | Kenangan Coffee & Tea Support" 
        description="Have questions about your order or want to learn more about Kenangan? Reach out to our Ajmer-based team via email or visit our office."
        keywords="Kenangan contact, coffee delivery support India, Kenangan Ajmer office, email Kenangan"
      />
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl mb-4">Get in <span className="serif-italic">Touch</span></h1>
          <p className="text-brand-ink/60 max-w-xl mx-auto">Have a question about our brews or want to host a Kenangan Talk? We'd love to hear from you.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-brand-olive/10 rounded-full flex items-center justify-center text-brand-olive shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Email Us</h4>
                <p className="text-brand-ink/60">info@kenangan.in</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-12 h-12 bg-brand-olive/10 rounded-full flex items-center justify-center text-brand-olive shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-xl font-bold mb-1">Visit Us</h4>
                <p className="text-brand-ink/60">2nd Floor, City Car Ajmer Office, <br />Ajmer, Rajasthan, India</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-10 rounded-[48px] space-y-6"
            onSubmit={handleSubmit}
          >
            {isSent ? (
              <div className="text-center py-12">
                <h3 className="text-2xl font-serif mb-4">Message Sent!</h3>
                <p className="text-brand-ink/60">We'll get back to you as soon as possible.</p>
                <button 
                  type="button"
                  onClick={() => setIsSent(false)}
                  className="mt-6 text-brand-olive font-bold underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-50">First Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-white border border-brand-olive/10 rounded-2xl px-6 py-3 focus:outline-none focus:border-brand-olive" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-bold opacity-50">Last Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-white border border-brand-olive/10 rounded-2xl px-6 py-3 focus:outline-none focus:border-brand-olive" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-brand-olive/10 rounded-2xl px-6 py-3 focus:outline-none focus:border-brand-olive" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-bold opacity-50">Message</label>
                  <textarea 
                    rows={4} 
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-brand-olive/10 rounded-2xl px-6 py-3 focus:outline-none focus:border-brand-olive" 
                  />
                </div>
                <button className="w-full bg-brand-olive text-brand-cream py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-brand-olive/90 transition-all">
                  <Send size={18} /> Send Message
                </button>
              </>
            )}
          </motion.form>
        </div>
      </section>
    </>
  );
};
