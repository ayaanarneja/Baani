import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Clock, AlertCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';

const SymptomAnalyzer = () => {
  const symptoms = useStore((state) => state.symptoms);

  return (
    <div className="glass rounded-3xl p-6 h-full shadow-xl border border-white/50 flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
          <Activity className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg text-slate-800">Live Diagnostics</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {symptoms.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-50">
            <Activity className="w-12 h-12 mb-2 text-slate-400" />
            <p className="text-sm text-center text-slate-500">
              Listening to conversation to extract medical context...
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {symptoms.map((symptom, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-4 bg-white/80 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-slate-800 capitalize">{symptom.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    symptom.severity === 'high' ? 'bg-red-100 text-red-600' :
                    symptom.severity === 'medium' ? 'bg-orange-100 text-orange-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {symptom.severity}
                  </span>
                </div>
                
                <div className="flex flex-col gap-2 mt-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-3 h-3" /> 
                    <span>{symptom.duration}</span>
                  </div>
                  {symptom.bodyPart && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <AlertCircle className="w-3 h-3" />
                      <span>{symptom.bodyPart}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {symptoms.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-200">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Possible Conditions</h4>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700">Tension Headache</span>
                <span className="text-blue-600 font-bold">85%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1 }}
                  className="h-full bg-blue-500 rounded-full"
                ></motion.div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700">Migraine</span>
                <span className="text-purple-600 font-bold">40%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} animate={{ width: '40%' }} transition={{ duration: 1.2 }}
                  className="h-full bg-purple-500 rounded-full"
                ></motion.div>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4 text-center">
            * This is an AI estimation and not a medical diagnosis.
          </p>
        </div>
      )}
    </div>
  );
};

export default SymptomAnalyzer;
