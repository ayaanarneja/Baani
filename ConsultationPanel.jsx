import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Send, Volume2, Globe } from 'lucide-react';
import { useStore } from '../../store/useStore';
import ChatCard from './ChatCard';
import SymptomAnalyzer from '../Diagnostics/SymptomAnalyzer';
import { processConsultation } from '../../services/aiService';

const ConsultationPanel = () => {
  const { messages, addMessage, isListening, setIsListening, isAIThinking, setIsAIThinking } = useStore();
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAIThinking]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    // Add User Message
    const userMsg = {
      id: Date.now(),
      sender: 'patient',
      text: inputText,
      language: 'en',
    };
    addMessage(userMsg);
    setInputText('');
    setIsAIThinking(true);

    // Call Mock AI Service
    const aiResponseText = await processConsultation(inputText);
    
    const aiMsg = {
      id: Date.now() + 1,
      sender: 'ai',
      text: aiResponseText,
      language: 'en',
    };
    
    setIsAIThinking(false);
    addMessage(aiMsg);
  };

  const toggleListen = () => {
    setIsListening(!isListening);
    // STT integration would go here (Web Speech API)
    if (!isListening) {
      // simulate speech recognition
      setTimeout(() => {
        setInputText("I have been experiencing a mild headache and some dizziness since yesterday morning.");
        setIsListening(false);
      }, 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Chat Area */}
      <div className="flex-1 glass rounded-3xl p-6 flex flex-col min-h-[600px] shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200/50 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">BAANI AI Doctor</h2>
              <p className="text-sm text-green-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
            <Globe className="w-4 h-4 text-slate-500" />
            <select className="bg-transparent text-sm font-medium outline-none text-slate-700">
              <option>English</option>
              <option>Hindi</option>
              <option>Punjabi</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-6">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <Mic className="w-16 h-16 mb-4 text-slate-400" />
              <p className="text-lg font-medium text-slate-500 max-w-sm">
                Press the microphone to start speaking, or type your symptoms below.
              </p>
            </div>
          )}
          
          {messages.map((msg) => (
            <ChatCard key={msg.id} message={msg} />
          ))}
          
          {isAIThinking && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="glass px-6 py-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-200"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce animation-delay-400"></span>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="mt-4 pt-4 border-t border-slate-200/50 flex gap-4 items-center">
          <button 
            onClick={toggleListen}
            className={`p-4 rounded-full transition-all flex items-center justify-center shrink-0 ${isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <div className="flex-1 relative">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your symptoms here..."
              className="w-full pl-6 pr-14 py-4 rounded-full bg-white/50 border border-slate-200 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all text-slate-800 placeholder-slate-400"
            />
            <button 
              onClick={handleSend}
              disabled={!inputText.trim() || isAIThinking}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors"
            >
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Side Panel for Diagnostics */}
      <div className="w-full lg:w-96 flex flex-col gap-6">
        <SymptomAnalyzer />
      </div>
    </div>
  );
};

export default ConsultationPanel;
