import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logo from '../assets/orion.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      setIsMobileMenuOpen(false);
      // Wait for overlay close animation to start before scrolling
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  return (
    <>
      <nav id="nav" className={isScrolled ? 'scrolled' : ''}>
        <a href="#" className="nav-logo flex items-center group">
          <div className="flex items-center w-auto h-auto">
            <img
              src={logo}
              alt="Orion Quant LLP Logo"
              className="h-12 md:h-16 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(200,169,110,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(200,169,110,0.7)] transition-all duration-500 transform group-hover:scale-105"
            />
          </div>
        </a>
        
        {/* Desktop Links */}
        <ul className="nav-links">
          <li><a href="#strategy" onClick={(e) => { e.preventDefault(); scrollToSection('strategy'); }}>Strategy</a></li>
          <li><a href="#performance" onClick={(e) => { e.preventDefault(); scrollToSection('performance'); }}>Performance</a></li>
          <li><a href="#philosophy" onClick={(e) => { e.preventDefault(); scrollToSection('philosophy'); }}>Philosophy</a></li>
          <li><a href="#team" onClick={(e) => { e.preventDefault(); scrollToSection('team'); }}>Team</a></li>
        </ul>
        
        {/* Desktop CTA */}
        <div className="nav-right">
          <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Investor Relations</a>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="mobile-overlay"
          >
            <ul className="mobile-overlay-links">
              <li>
                <button onClick={() => scrollToSection('strategy')}>Strategy</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('performance')}>Performance</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('philosophy')}>Philosophy</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('team')}>Team</button>
              </li>
            </ul>
            <button
              onClick={() => scrollToSection('contact')}
              className="mobile-overlay-cta"
            >
              Investor Relations
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
