import React from 'react';
import { motion } from 'framer-motion';
import { User, Stethoscope, Languages } from 'lucide-react';

const ChatCard = ({ message }) => {
  const isAI = message.sender === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex gap-3 max-w-[85%] ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center shadow-md ${isAI ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' : 'bg-slate-800 text-white'}`}>
          {isAI ? <Stethoscope className="w-5 h-5" /> : <User className="w-5 h-5" />}
        </div>
        
        {/* Message Bubble */}
        <div className={`relative px-6 py-4 rounded-2xl shadow-sm ${
          isAI 
            ? 'glass rounded-tl-sm border-blue-100/50' 
            : 'bg-slate-900 text-white rounded-tr-sm'
        }`}>
          {isAI && (
            <div className="flex items-center gap-2 mb-2 text-xs text-blue-600 font-medium bg-blue-50 w-max px-2 py-1 rounded-md border border-blue-100">
              <Languages className="w-3 h-3" /> Translated to Patient's Language
            </div>
          )}
          
          <p className={`text-base leading-relaxed ${isAI ? 'text-slate-800' : 'text-slate-50'}`}>
            {message.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatCard;
