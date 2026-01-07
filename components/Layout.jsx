
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_NAME } from '../constants.js';
import { Tutorial } from './Tutorial.jsx';
import Logo from './logo.png';
//
import { style } from 'framer-motion/client';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-[#050505]/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className={`p-1.5 md:p-2 rounded-lg  transition-transform`} style={{ backgroundColor: '#1b213bff' }}>
              <img src={Logo} alt="" className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="text-lg md:text-xl font-bold tracking-tight text-white">{BRAND_NAME}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-blue-500' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              id="admin-btn"
              to="/admin" 
              className="text-sm bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10 transition-colors"
            >
              Admin
            </Link>
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-400 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-2xl font-semibold transition-colors ${
                    location.pathname === link.path ? 'text-blue-500' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <Link 
                to="/admin" 
                onClick={() => setIsOpen(false)} 
                className="text-xl font-medium text-blue-500 flex items-center gap-2"
              >
                Admin Control <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-[#050505] border-t border-white/5 pt-16 md:pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="p-1.5 rounded-md" style={{ backgroundColor: '#1b213bff' }}>
              <img src={Logo} alt="" className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <span className="text-xl font-bold text-white">{BRAND_NAME}</span>
          </Link>
          <p className="text-gray-400 max-w-sm text-sm md:text-base">
            Providing high-performance digital infrastructure for the Taigours Group of Organization (TGO) and its subsidiaries worldwide.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">Explore</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link to="/projects" className="hover:text-blue-500 transition-colors">Projects</Link></li>
            <li><Link to="/services" className="hover:text-blue-500 transition-colors">Services</Link></li>
            <li><Link to="/blogs" className="hover:text-blue-500 transition-colors">Insights</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-6">Corporate</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><a href="https://taigours-group.github.io/Taigours-Group/" target="_blank" className="hover:text-blue-500 transition-colors">TGO Group</a></li>
            <li><Link to="/about" className="hover:text-blue-500 transition-colors">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500 transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-gray-500 text-xs md:text-sm text-center gap-4">
        <p>&copy; 2024 TigraTech Pvt. Ltd. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/privacy-policy.html" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/terms-of-service.html" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-600/30">
      <Tutorial />
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};
