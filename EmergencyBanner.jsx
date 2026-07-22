import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, PhoneCall, MapPin } from 'lucide-react';
import { useStore } from '../../store/useStore';

const EmergencyBanner = () => {
  const isEmergency = useStore((state) => state.emergency);

  return (
    <AnimatePresence>
      {isEmergency && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-5xl mx-auto bg-red-600/90 backdrop-blur-xl border border-red-400 text-white rounded-3xl shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            {/* Heartbeat pulse effect */}
            <div className="absolute inset-0 animate-pulse bg-red-500/20 mix-blend-overlay pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-6 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-white/20 rounded-full animate-bounce">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Emergency Detected</h3>
                  <p className="text-red-100 font-medium">Your symptoms indicate a possible medical emergency.</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors shadow-lg">
                  <PhoneCall className="w-5 h-5" /> Call Emergency (911)
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-red-700/50 text-white font-medium rounded-xl border border-red-500 hover:bg-red-700 transition-colors">
                  <MapPin className="w-5 h-5" /> Find Nearest ER
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyBanner;
