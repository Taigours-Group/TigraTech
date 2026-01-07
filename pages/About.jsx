
import React from 'react';
import { motion } from 'framer-motion';
import { Network, Target, Users, Landmark } from 'lucide-react';
import { BRAND_NAME, PARENT_COMPANY } from '../constants.js';

const Stats = [
  { label: 'Engineering Hours', value: '120k+' },
  { label: 'SaaS Platforms', value: '14+' },
  { label: 'Global Nodes', value: '250+' },
  { label: 'Uptime SLA', value: '99.99%' },
];

export const About = () => {
  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <section className="py-24 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-8 text-center"
          >
            Digital Architects for <br /> <span className="text-blue-600">The Taigours Dynasty.</span>
          </motion.h1>
          <p className="text-xl text-gray-400 text-center max-w-3xl mx-auto leading-relaxed">
            Founded as the central nervous system of TGO, TigraTech Pvt. Ltd has evolved into a powerhouse of digital innovation, managing billions of data points daily.
          </p>
        </div>
      </section>

      <section className="py-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block p-4 bg-blue-600/10 rounded-2xl mb-6">
                <Landmark className="text-blue-500 w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6">Hierarchy & Heritage</h2>
              <p className="text-gray-400 text-lg mb-8">
                {BRAND_NAME} operates as the primary tech subsidiary of {PARENT_COMPANY}. Our mandate is absolute: to ensure every child company under TGO possesses cutting-edge technical infrastructure that outpaces global competition.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-1.5 h-auto bg-blue-600 rounded-full"></div>
                  <div>
                    <h4 className="font-bold">Central Governance</h4>
                    <p className="text-sm text-gray-500">We manage all internal TGO domains, hosting, and cybersecurity.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="w-1.5 h-auto bg-indigo-600 rounded-full"></div>
                  <div>
                    <h4 className="font-bold">Subsidiary Support</h4>
                    <p className="text-sm text-gray-500">Custom software delivery for TGO Logistics, TGO Real Estate, and TGO FinTech.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative p-10 bg-white/5 rounded-[3rem] border border-white/5 overflow-hidden group">
              <Network className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-blue-500/5 group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative z-10 grid grid-cols-2 gap-5">
                {Stats.map((stat) => (
                  <div key={stat.label} className="p-8 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 text-center">
                    <div className="text-center text-4xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-center text-sm uppercase text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid md:grid-cols-3 gap-12">
              <div className="p-10 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/[0.07] transition-all">
                <Target className="text-blue-500 w-10 h-10 mb-8" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-gray-400 leading-relaxed">To build high-performance, secure digital tools that empower TGO to lead in the global market.</p>
              </div>
              <div className="p-10 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/[0.07] transition-all">
                <Users className="text-blue-500 w-10 h-10 mb-8" />
                <h3 className="text-2xl font-bold mb-4">Our People</h3>
                <p className="text-gray-400 leading-relaxed">A specialized elite squad of engineers, designers, and strategists working from global tech hubs.</p>
              </div>
              <div className="p-10 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/[0.07] transition-all">
                <Landmark className="text-blue-500 w-10 h-10 mb-8" />
                <h3 className="text-2xl font-bold mb-4">Our Values</h3>
                <p className="text-gray-400 leading-relaxed">Integrity, innovation, and an unwavering commitment to the TGO legacy of excellence.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};
