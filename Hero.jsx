import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Globe2, ShieldPlus } from 'lucide-react';
import Brain3D from './Brain3D';

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
      <div className="absolute inset-0 z-0">
        <Brain3D />
      </div>
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2 flex flex-col items-start space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-200/50"
          >
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-sm font-medium text-slate-700">BAANI AI 2.0 Live</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            Language Shouldn't <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Decide Healthcare.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg md:text-xl text-slate-600 max-w-lg"
          >
            An AI-powered multilingual healthcare assistant that allows patients to communicate naturally with doctors regardless of language.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={() => document.getElementById('consultation').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-medium flex items-center gap-2 hover:bg-slate-800 hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Start Consultation <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-white/80 backdrop-blur-md text-slate-800 rounded-2xl font-medium border border-slate-200 hover:bg-white hover:scale-105 transition-all shadow-sm flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-blue-500" /> Watch Demo
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex gap-8 pt-8 border-t border-slate-200/50 mt-8"
          >
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-slate-900">40+</span>
              <span className="text-sm text-slate-500">Languages</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-slate-900">&lt;1s</span>
              <span className="text-sm text-slate-500">Response Time</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-slate-900">99%</span>
              <span className="text-sm text-slate-500">Accuracy</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
