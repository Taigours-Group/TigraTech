
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Info, CheckCircle } from 'lucide-react';
import { TUTORIAL_STEPS } from '../constants.js';

export const Tutorial = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const isCompleted = localStorage.getItem('tt_tutorial_completed');
    if (!isCompleted) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      // Optional: Scroll target into view
      const target = document.getElementById(TUTORIAL_STEPS[currentStep + 1].target);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('tt_tutorial_completed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const step = TUTORIAL_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center">
      {/* Dimmed Background Overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-auto"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-[#0a0a0a] border border-blue-500/30 w-[90%] max-w-md p-8 rounded-3xl shadow-2xl shadow-blue-500/20 pointer-events-auto"
      >
        <button 
          onClick={handleComplete}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Info className="text-blue-500 w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-500">
            System Onboarding ({currentStep + 1}/{TUTORIAL_STEPS.length})
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
        <p className="text-gray-400 mb-8 leading-relaxed">
          {step.content}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {TUTORIAL_STEPS.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-300 ${i === currentStep ? 'w-6 bg-blue-600' : 'w-2 bg-white/10'}`} 
              />
            ))}
          </div>
          
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            {currentStep === TUTORIAL_STEPS.length - 1 ? (
              <>Finish <CheckCircle size={18} /></>
            ) : (
              <>Next <ChevronRight size={18} /></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
