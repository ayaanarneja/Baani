import React from 'react';
import { Settings, Type, Moon, Globe } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const AccessibilityControls = () => {
  const { accessibilityMode, toggleAccessibility } = useStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-4 min-w-[250px]"
          >
            <h4 className="font-semibold text-slate-800 mb-4 px-2">Accessibility Options</h4>
            <div className="space-y-2">
              <button 
                onClick={toggleAccessibility}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${accessibilityMode ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'}`}
              >
                <div className="flex items-center gap-3">
                  <Type className="w-5 h-5" />
                  <span className="font-medium text-sm">Large Text Mode</span>
                </div>
                <div className={`w-8 h-4 rounded-full relative transition-colors ${accessibilityMode ? 'bg-blue-500' : 'bg-slate-300'}`}>
                  <motion.div 
                    animate={{ x: accessibilityMode ? 16 : 2 }}
                    className="absolute top-0.5 bottom-0.5 left-0 w-3 h-3 bg-white rounded-full"
                  />
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        <Settings className={`w-6 h-6 transition-transform duration-500 ${isOpen ? 'rotate-90' : ''}`} />
      </button>
    </div>
  );
};

export default AccessibilityControls;
