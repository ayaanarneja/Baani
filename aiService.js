import { useStore } from '../store/useStore';

export const processConsultation = async (text) => {
  // In a real app, this would be an API call to OpenAI/Anthropic
  // We're mocking the delay and response for the presentation
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      
      // Basic Emergency Detection
      if (lowerText.includes('chest pain') || lowerText.includes('breathe') || lowerText.includes('heart')) {
        useStore.getState().setEmergency(true);
        resolve("I am detecting potentially severe symptoms. Please seek immediate medical attention or call emergency services right away. Do not wait.");
        return;
      }

      // Mock symptom extraction update
      if (lowerText.includes('headache') || lowerText.includes('dizzy')) {
        useStore.getState().updateSymptoms([
          { name: 'Headache', severity: 'medium', duration: 'Since yesterday', bodyPart: 'Head' },
          { name: 'Dizziness', severity: 'low', duration: 'Since yesterday', bodyPart: 'Head/Balance' }
        ]);
        
        resolve("I understand you're experiencing a headache and some dizziness since yesterday. To help me understand better, is the headache throbbing, aching, or sharp? And do you feel nauseous?");
        return;
      }
      
      // Default fallback
      resolve("Could you tell me a little more about how you're feeling? Any other symptoms like fever or fatigue?");
    }, 2500); // 2.5s mock processing delay
  });
};
