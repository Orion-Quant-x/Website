import React, { useEffect } from 'react';
import GlobalBackground from './components/GlobalBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsBand from './components/MetricsBand';
import StrategySection from './components/StrategySection';
import PerformanceSection from './components/PerformanceSection';
import PhilosophySection from './components/PhilosophySection';
import TeamSection from './components/TeamSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const App = () => {
  useEffect(() => {
    // ---- SCROLL REVEAL ----
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="app-container">
      <GlobalBackground />
      <Navbar />
      <Hero />
      <MetricsBand />
      <StrategySection />
      <PerformanceSection />
      <PhilosophySection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default App;
