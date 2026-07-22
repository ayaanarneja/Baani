import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Mon', severity: 2 },
  { name: 'Tue', severity: 3 },
  { name: 'Wed', severity: 2.5 },
  { name: 'Thu', severity: 4 },
  { name: 'Fri', severity: 1 },
  { name: 'Sat', severity: 1.5 },
  { name: 'Sun', severity: 0.5 },
];

const HealthInsights = () => {
  return (
    <div className="w-full max-w-6xl mx-auto mb-20">
      <div className="flex flex-col md:flex-row items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Health Insights Dashboard</h2>
          <p className="text-slate-500">A visual summary of your recent consultations and symptom history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="glass p-6 rounded-3xl"
        >
          <p className="text-sm font-medium text-slate-500 mb-2">Consultation Duration</p>
          <h3 className="text-4xl font-bold text-slate-800">14<span className="text-lg text-slate-400">m</span> 32<span className="text-lg text-slate-400">s</span></h3>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="glass p-6 rounded-3xl"
        >
          <p className="text-sm font-medium text-slate-500 mb-2">Symptom Severity Trend</p>
          <h3 className="text-4xl font-bold text-green-500">-12% <span className="text-lg text-slate-400 font-normal">this week</span></h3>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="glass p-6 rounded-3xl"
        >
          <p className="text-sm font-medium text-slate-500 mb-2">AI Confidence</p>
          <h3 className="text-4xl font-bold text-blue-600">92%</h3>
        </motion.div>

        {/* Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="glass p-6 rounded-3xl md:col-span-3 h-[400px]"
        >
          <h3 className="text-lg font-bold text-slate-800 mb-6">Symptom Severity Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSeverity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="severity" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorSeverity)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthInsights;
