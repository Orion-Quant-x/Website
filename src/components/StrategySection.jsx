import React, { useEffect } from 'react';

const StrategySection = () => {
  useEffect(() => {
    const card3d = document.getElementById('card3d');
    const handleCardTilt = (e) => {
      const rect = card3d.parentElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
      card3d.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };
    const resetCardTilt = () => {
      card3d.style.transform = 'rotateY(0) rotateX(0)';
      card3d.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    };
    const startCardTilt = () => {
      card3d.style.transition = 'transform 0.1s';
    };
    if (card3d) {
      card3d.parentElement.addEventListener('mousemove', handleCardTilt);
      card3d.parentElement.addEventListener('mouseleave', resetCardTilt);
      card3d.parentElement.addEventListener('mouseenter', startCardTilt);
    }

    const stratCard = document.getElementById('stratCard');
    const handleStratCardMove = (e) => {
      const r = stratCard.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
      const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
      stratCard.style.setProperty('--mx', x + '%');
      stratCard.style.setProperty('--my', y + '%');
    };
    if (stratCard) stratCard.addEventListener('mousemove', handleStratCardMove);

    return () => {
      if (card3d) {
        card3d.parentElement.removeEventListener('mousemove', handleCardTilt);
        card3d.parentElement.removeEventListener('mouseleave', resetCardTilt);
        card3d.parentElement.removeEventListener('mouseenter', startCardTilt);
      }
      if (stratCard) stratCard.removeEventListener('mousemove', handleStratCardMove);
    };
  }, []);

  return (
    <>
      {/* STRATEGY INTRO */}
      <section className="scroll-section" id="strategy">
        <div className="scroll-section-inner">
          <div className="strategy-grid">
            <div className="strategy-left">
              <span className="section-tag reveal">01 / Our Approach</span>
              <h2 className="section-title reveal reveal-delay-1">
                Gravity-driven<br />quantitative<br />alpha
              </h2>
              <p className="section-body reveal reveal-delay-2">
                Like a black hole bending spacetime, our algorithms bend the fabric of financial markets, finding signal in noise, extracting value from asymmetry and capturing returns invisible to conventional analysis.
              </p>
              <a href="#performance" className="btn-ghost reveal reveal-delay-3" onClick={(e) => {
                e.preventDefault();
                document.getElementById('performance')?.scrollIntoView({ behavior: 'smooth' });
              }}>Fact Sheet</a>
            </div>
            <div className="strategy-right reveal reveal-delay-2">
              <div className="card-3d-container" id="card3d">
                <div className="strategy-card" id="stratCard">
                  <div className="card-orbit">
                    <div className="orbit-ring"></div>
                    <div className="orbit-ring orbit-ring-2"></div>
                    <div className="orbit-ring orbit-ring-3"></div>
                    <div className="orbit-center"></div>
                    <div className="orbit-dot"></div>
                  </div>
                  <h3>Singularity Model™️</h3>
                  <p>Our proprietary multi-factor model identifies gravitational inflection points in price structure, moments where probability density collapses into tradeable opportunity.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIES */}
      <section className="strategies-section" id="strategies">
        <div className="strategies-header">
          <span className="section-tag reveal" style={{ display: 'block', textAlign: 'center', fontFamily: "'DM Mono',monospace", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>02 / Strategy Suite</span>
          <h2 className="section-title reveal reveal-delay-1">Four vectors.<br />One gravitational force.</h2>
        </div>
        <div className="strategies-list">
          <div className="strategy-item reveal">
            <span className="strategy-num">001</span>
            <h3>Statistical Arbitrage</h3>
            <p>Mean-reversion strategies exploiting temporary deviations in correlated assets. Machine learning models trained on 20+ years of cross-asset microstructure data.</p>
          </div>
          <div className="strategy-item reveal reveal-delay-1">
            <span className="strategy-num">002</span>
            <h3>Options Alpha</h3>
            <p>Volatility surface arbitrage and dynamic delta-neutral structures that harvest risk premia across the options term structure.</p>
          </div>
          <div className="strategy-item reveal reveal-delay-2">
            <span className="strategy-num">003</span>
            <h3>Alternative Data</h3>
            <p>Satellite imagery, tick-historical and high-frequency WebSockets real-time market depth data at 4nm/sec frequency, sentiment NLP and supply chain analytics feed real-time signals into our ensemble alpha engine.</p>
          </div>
          <div className="strategy-item reveal reveal-delay-3">
            <span className="strategy-num">004</span>
            <h3>Crypto Alpha</h3>
            <p>Market-neutral strategies across digital asset ecosystems: funding rate harvesting, on-chain analytics and cross-exchange arbitrage.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default StrategySection;
