import { create } from 'zustand';

export const useStore = create((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  
  isListening: false,
  setIsListening: (status) => set({ isListening: status }),
  
  isSpeaking: false,
  setIsSpeaking: (status) => set({ isSpeaking: status }),
  
  isAIThinking: false,
  setIsAIThinking: (status) => set({ isAIThinking: status }),
  
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  
  symptoms: [],
  updateSymptoms: (newSymptoms) => set({ symptoms: newSymptoms }),
  
  emergency: false,
  setEmergency: (status) => set({ emergency: status }),
  
  accessibilityMode: false,
  toggleAccessibility: () => set((state) => ({ accessibilityMode: !state.accessibilityMode })),
}));
