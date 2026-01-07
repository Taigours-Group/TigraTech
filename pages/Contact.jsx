import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Globe } from 'lucide-react';
import { PARENT_COMPANY } from '../constants.js';

export const Contact = () => {
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 1. Get form data
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get('fullName'),
      workEmail: formData.get('workEmail'),
      organization: formData.get('organization') || 'N/A',
      message: formData.get('message'),
    };

    // 2. Format the WhatsApp message
    const phoneNumber = "9779766115626"; // International format without '+'
    const whatsappMessage = `*New TigraTech Inquiry From Web*%0A%0A` +
      `*Name:* ${data.fullName}%0A` +
      `*Email:* ${data.workEmail}%0A` +
      `*Org:* ${data.organization}%0A` +
      `*Message:* ${data.message}`;

    // 3. Open WhatsApp link
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage.replace(/%0A/g, '\n'))}`;
    window.open(whatsappUrl, '_blank');

    // 4. Show success state
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <div className="bg-[#050505] min-h-screen">
      <section className="py-24 mb-8 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-center"
          >
            Get in <span className="text-blue-600">Touch</span>
          </motion.h1>
          <p className="text-center text-gray-400 text-lg mb-12 leading-relaxed">
              Inquiry for a custom solution? Part of the TGO family needing a portal? Connect with our project leads today.
            </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <div className="space-y-8">
              <div className="flex gap-6 items-center">
                <div className="p-4 bg-white/5 rounded-2xl">
                  <Mail className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Email</p>
                  <p className="text-white text-lg">tigratechs@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="p-4 bg-white/5 rounded-2xl">
                  <Phone className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Inquiries</p>
                  <p className="text-white text-lg">+977 9766115626</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="p-4 bg-white/5 rounded-2xl">
                  <MapPin className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Headquarters</p>
                  <p className="text-white text-lg">Dhanusha, Pidari, Janakpur, Nepal</p>
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <div className="p-4 bg-white/5 rounded-2xl">
                  <Globe className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Part of TGO</p>
                  <p className="text-white text-lg">{PARENT_COMPANY}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 mb-8 border border-white/5 p-10 md:p-16 rounded-[3rem] relative overflow-hidden">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                  <Send className="text-green-500 w-10 h-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4">Message Transmitted</h3>
                <p className="text-gray-400">Our systems have received your request. A technician will follow up within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-gray-400 text-sm mb-3">Full Name</label>
                    <input type="text" name="fullName" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-3">Work Email</label>
                    <input type="email" name="workEmail" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all" required />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-3">Organization</label>
                  <input type="text" name="organization" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-3">Your Message</label>
                  {/* Added name="message" attribute here */}
                  <textarea name="message" rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-blue-500 outline-none transition-all resize-none" required></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-green-700 py-5 rounded-2xl font-bold text-white text-lg transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3" >
                  Initiate Connection <Send size={20} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};