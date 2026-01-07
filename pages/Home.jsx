
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap, Cpu, ExternalLink } from 'lucide-react';
import { dbService } from '../services/dbService.js';
import { PARENT_COMPANY } from '../constants.js';

const Hero = () => (
  <section id="hero" className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-32 min-h-[85vh] md:min-h-[90vh] flex items-center bg-transparent">
    <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2">
      <div className="absolute inset-0 opacity-40 md:opacity-50">
        
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-semibold mb-6 md:mb-8 uppercase tracking-wider backdrop-blur-sm">
        Official Tech Arm of {PARENT_COMPANY}
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 md:mb-8 tracking-tight leading-[1.1]">
        Building the Digital <br className="hidden md:block" /> Backbone <span className="text-blue-500">of Global Enterprises.</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed">
        TigraTech engineers high-performance software, automation, and digital ecosystems for the TGO conglomerate and its global partners.
      </motion.p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/projects" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
          View Showcase <ArrowRight className="w-5 h-5" />
        </Link>
        <Link to="/contact" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-md active:scale-95 text-center">
          Contact Us
        </Link>
      </div>
    </div>
  </section>
);

const TGOSection = () => (
  <section id="tgo-section" className="py-16 md:py-24 bg-white/[0.02] border-y border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center md:text-left">Strategic Subsidiary of TGO</h2>
          <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed text-center md:text-left">
            As the specialized technology wing of Taigours Group of Organization (TGO), we manage the entire digital lifecycle for all child companies under the TGO umbrella.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="p-5 md:p-6 bg-white/5 border border-white/5 rounded-2xl">
              <ShieldCheck className="text-blue-500 w-8 h-8 mb-4 mx-auto sm:mx-0" />
              <h4 className="font-semibold mb-2 text-white">Total Control</h4>
              <p className="text-sm text-gray-500">Security-first infrastructure for all TGO assets.</p>
            </div>
            <div className="p-5 md:p-6 bg-white/5 border border-white/5 rounded-2xl">
              <Zap className="text-blue-500 w-8 h-8 mb-4 mx-auto sm:mx-0" />
              <h4 className="font-semibold mb-2 text-white">High Efficiency</h4>
              <p className="text-sm text-gray-500">Automated systems optimizing corporate output.</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <img src="https://picsum.photos/seed/office/800/600" alt="TigraTech Hub" className="rounded-2xl md:rounded-3xl shadow-2xl grayscale w-full" />
        </div>
      </div>
    </div>
  </section>
);

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    dbService.getProjects().then(data => {
      setProjects(data.filter(p => p.featured).slice(0, 3));
    });
  }, []);
  
  return (
    <section id="featured-projects" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4 text-white">Selected Systems</h2>
            <p className="text-gray-400 text-sm md:text-base">Pioneering projects delivered for the group.</p>
          </div>
          <Link to="/projects" className="text-blue-500 flex items-center gap-2 hover:underline text-sm md:text-base font-medium">
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl aspect-[4/3] mb-4 md:mb-6">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/10">
                  {project.clientType}
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-2 text-white group-hover:text-blue-500 transition-colors">{project.title}</h3>
              <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Home = () => {
  return (
    <div className="bg-[#050505] text-white">
      <Hero />
      <TGOSection />
      <FeaturedProjects />
    </div>
  );
};
