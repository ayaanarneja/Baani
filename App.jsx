import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Hero from './components/Hero/Hero';
import ConsultationPanel from './components/Consultation/ConsultationPanel';
import HealthInsights from './components/Dashboard/HealthInsights';
import EmergencyBanner from './components/Emergency/EmergencyBanner';
import AccessibilityControls from './components/Accessibility/AccessibilityControls';
import { useStore } from './store/useStore';

function App() {
  const accessibilityMode = useStore((state) => state.accessibilityMode);
  
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${accessibilityMode ? 'text-xl' : ''}`}>
      {/* Background elements */}
      <div className="fixed inset-0 z-[-1] bg-[#fafafa]">
        <div className="absolute inset-0 bg-grid opacity-30"></div>
        <div className="absolute top-0 left-0 right-0 h-[50vh] bg-gradient-to-b from-blue-50 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <EmergencyBanner />
      <AccessibilityControls />

      <main className="container mx-auto px-4 md:px-8 py-12 relative z-10">
        <Hero />
        
        <div className="mt-32" id="consultation">
          <ConsultationPanel />
        </div>
        
        <div className="mt-32" id="insights">
          <HealthInsights />
        </div>
      </main>
    </div>
  );
}

export default App;
