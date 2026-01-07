import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';
import { dbService } from '../services/dbService.js';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await dbService.getBlogs();
        setBlogs(data || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (isLoading) {
    return <div className="bg-[#050505] min-h-screen py-24 text-white text-center">Loading...</div>;
  }

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
            Insights <span className="text-blue-600">& Updates</span> 
          </motion.h1>
          <p className="text-center text-gray-400 text-lg">Engineering thoughts and TGO technical announcements for 2026.</p>
        </div>
      </section>

      <section className="py-24 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {blogs.map((blog, idx) => {
              const isExpanded = expandedId === blog.id;

              return (
                <motion.article 
                  key={blog.id}
                  layout
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className={`group bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] transition-all duration-300 
                    ${isExpanded ? 'ring-1 ring-blue-500/30 shadow-2xl shadow-blue-500/5' : 'hover:border-white/20'}`}
                >
                  <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-8 border border-white/5">
                    <img 
                      src={blog.imageUrl} 
                      className={`w-full h-full object-cover transition-transform duration-700 
                        ${isExpanded ? 'grayscale-0' : 'grayscale group-hover:grayscale-0 group-hover:scale-105'}`} 
                      alt={blog.title}
                    />
                  </div>

                  <div className="flex gap-6 items-center mb-4 text-sm text-gray-500">
                    <span className="flex items-center gap-2"><Calendar size={14} /> {blog.date}</span>
                    <span className="flex items-center gap-2"><User size={14} /> {blog.author}</span>
                  </div>

                  <h2 className="text-3xl font-bold mb-4 text-white group-hover:text-blue-500 transition-colors leading-snug">
                    {blog.title}
                  </h2>

                  <div className="text-gray-400 leading-relaxed mb-6 overflow-hidden">
                    <AnimatePresence mode="wait">
                      {isExpanded ? (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-gray-300 whitespace-pre-wrap"
                        >
                          {blog.content}
                        </motion.div>
                      ) : (
                        <motion.p 
                          key="excerpt"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="line-clamp-1"
                        >
                          {blog.excerpt}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <button 
                    onClick={() => toggleExpand(blog.id)}
                    className="flex items-center gap-2 text-blue-500 font-bold group/btn transition-all"
                  >
                    {isExpanded ? (
                      <span className="flex items-center gap-2"><ArrowLeft size={18} /> BACK</span>
                    ) : (
                      <span className="flex items-center gap-2">
                        READ CASE STUDY 
                        <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                      </span>
                    )}
                  </button>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
