import React, { useState, useEffect } from 'react'; // Added hooks
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { dbService } from '../services/dbService.js';
import { ClientType } from '../types.js';

export const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [allProjects, setAllProjects] = useState([]); // Initialize as empty array
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await dbService.getProjects();
        setAllProjects(data || []);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter logic now works on the state array
  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.clientType === filter);

  if (isLoading) {
    return (
      <div className="bg-[#050505] min-h-screen flex items-center justify-center">
        <div className="text-blue-500 animate-pulse font-bold text-xl">Loading Projects...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <section className="py-24 mb-4 border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-5xl md:text-7xl font-bold mb-8 text-center"
                            >
                              Engineering <span className="text-blue-600">Excellence</span> 
                            </motion.h1>
          <p className="text-center text-gray-400 max-w-2xl mx-auto text-base md:text-lg px-2">
            A comprehensive list of systems, platforms, and tools built for the TGO ecosystem and beyond.
          </p>
        </div>
      </section>

        <div className="flex flex-wrap gap-2 md:gap-4 mb-10 md:mb-12 justify-center">
          {['All', ...Object.values(ClientType)].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold border transition-all active:scale-95 ${
                filter === type 
                ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid mb-24 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id || idx} // Fallback to idx if id is missing
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/5 border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all group flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    {project.clientType}
                  </span>
                </div>
              </div>
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-blue-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-6 text-sm line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack?.map(tech => (
                      <span key={tech} className="text-[9px] md:text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 border border-white/10 font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white text-black py-2.5 md:py-3 rounded-lg md:rounded-xl font-bold text-center text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors active:scale-95">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2.5 md:p-3 bg-white/5 border border-white/10 rounded-lg md:rounded-xl hover:bg-white/10 transition-colors active:scale-95">
                        <Github className="w-5 h-5 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
  );
};
