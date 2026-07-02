import React, { useEffect } from 'react';

const Hero = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY;
      const bh = document.querySelector('.hero-blackhole');
      if (bh) {
        const scale = 1 + scroll * 0.0003;
        const opacity = 1 - scroll * 0.0015;
        bh.style.transform = `translate(-50%, -50%) scale(${scale})`;
        bh.style.opacity = Math.max(0, opacity);
      }
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scroll * 0.12}px)`;
        heroContent.style.opacity = 1 - scroll * 0.002;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-blackhole">
        <div className="bh-accretion"></div>
        <div className="bh-accretion-2"></div>
        <div className="bh-photon-stream"></div>
        <div className="bh-ring bh-ring-1"></div>
        <div className="bh-ring bh-ring-2"></div>
        <div className="bh-ring bh-ring-3"></div>
        <div className="bh-core"></div>
        <div className="bh-lens"></div>
      </div>
      <div className="hero-content">
        <div className="hero-eyebrow">Quantitative · Systematic · Absolute Return</div>
        <h1 className="hero-title">
          Where <em>Mathematics</em><br />Meets the Universe
        </h1>
        <p className="hero-sub">
          Orion Quant LLP harnesses the gravitational pull of data, bending probability,<br />
          collapsing inefficiency and generating returns across all market regimes.
        </p>
        <div className="hero-actions">
          <a href="#strategy" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollToId('strategy'); }}>Explore Strategy</a>
          <a href="#performance" className="btn-ghost" onClick={(e) => { e.preventDefault(); scrollToId('performance'); }}>View Performance</a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
