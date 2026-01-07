import React, { useState, useEffect } from 'react'; // Added hooks
import { motion } from 'framer-motion';
import { Monitor, Code2, Cpu, Settings, Database, Cloud, Shield, Terminal } from 'lucide-react';
import { dbService } from '../services/dbService.js';

const ICON_MAP = {
  Monitor, Code2, Cpu, Settings, Database, Cloud, Shield, Terminal
};

export const Services = () => {
  // 1. Initialize state with an empty array
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 2. Fetch data on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await dbService.getServices();
        setServices(data || []);
      } catch (error) {
        console.error("Error loading services:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  // 3. Optional: Show loading state to prevent layout shift
  if (isLoading) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
        <div className="text-blue-500 font-bold animate-pulse text-xl">Loading Capabilities...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <section className="py-24 border-b mb-8 border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold mb-8 text-center"
                          >
                            Our <span className="text-blue-600">Capabilities</span>
                          </motion.h1>
        
        <p className="text-center text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
          From full-stack development to complex technical orchestration, we provide the tools that drive industrial growth in 2026.
        </p>
      </div>
      </section>
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* 4. .map now works because services is a real array */}
          {services.map((service, idx) => {
            const Icon = ICON_MAP[service.icon] || Code2;
            return (
              <div key={service.id || idx} className="p-12 bg-white/5 border border-white/5 rounded-[2.5rem] hover:border-blue-500/20 transition-all flex gap-8 items-start group">
                <div className="p-5 bg-blue-600/10 rounded-2xl group-hover:bg-blue-600 transition-colors">
                  <Icon className="text-blue-500 w-8 h-8 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-lg mb-6">
                    {service.description}
                  </p>
                  <span className="text-xs font-bold uppercase tracking-widest text-blue-500 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    {service.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Technical Capabilities Grid */}
        <div className="mt-24 mb-24 pt-24 border-t border-white/5">
          <h2 className="text-3xl font-bold mb-16 text-center text-white">Tech Stack Specialization</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center">
            {['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'TensorFlow', 'TypeScript'].map(tech => (
              <div key={tech} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl text-gray-400 font-medium hover:text-white transition-colors hover:border-blue-500/30">
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
