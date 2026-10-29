import React, { useEffect } from 'react';

const MetricsBand = () => {
  useEffect(() => {
    const animateCounters = () => {
      document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseFloat(el.getAttribute('data-count'));
        const isFloat = String(target).includes('.');
        const decimals = isFloat ? (String(target).split('.')[1] || '').length : 0;
        let startTs = null;
        const duration = 1800;
        const step = (ts) => {
          if (!startTs) startTs = ts;
          const progress = Math.min((ts - startTs) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = (eased * target).toFixed(decimals);
          el.textContent = val;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = target;
        };
        const obs = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) { requestAnimationFrame(step); obs.disconnect(); }
        }, { threshold: 0.5 });
        obs.observe(el);
      });
      document.querySelectorAll('[data-text]').forEach(el => {
        const target = el.getAttribute('data-text');
        const obs = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            setTimeout(() => { el.textContent = target; }, 600);
            obs.disconnect();
          }
        }, { threshold: 0.5 });
        obs.observe(el);
      });
    };
    animateCounters();
  }, []);

  return (
    <div className="metrics-band">
      <div className="metric reveal">
        <span className="metric-value" data-count="30.0">0</span>
        <span className="metric-label">Annualized Return %</span>
      </div>
      <div className="metric reveal reveal-delay-1">
        <span className="metric-value" data-count="3.61">0</span>
        <span className="metric-label">Monthly Sharpe</span>
      </div>
      <div className="metric reveal reveal-delay-2">
        <span className="metric-value" data-text="₹250 Million">₹0</span>
        <span className="metric-label">AUM</span>
      </div>
      <div className="metric reveal reveal-delay-3">
        <span className="metric-value" data-count="3">0</span>
        <span className="metric-label">Years of Alpha</span>
      </div>
    </div>
  );
};

export default MetricsBand;
