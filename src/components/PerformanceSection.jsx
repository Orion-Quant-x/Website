import React, { useEffect } from 'react';
const heatmapData = {
  2024: { Jan: 4800.7, Feb: 3976.6, Mar: 6922.4, Apr: -2494.9, May: 5216.6, Jun: 3151.5, Jul: 2407.6, Aug: 6196.0, Sep: 2664.8, Oct: 133.6, Nov: 1500.7, Dec: 2369.7 },
  2025: { Jan: 3492.8, Feb: 4744.8, Mar: 78.8, Apr: 3152.9, May: -10.0, Jun: 1541.3, Jul: 3892.7, Aug: 1008.2, Sep: 698.7, Oct: 1018.0, Nov: 1399.2, Dec: 805.9 },
  2026: { Jan: -681.1, Feb: 4271.4, Mar: -2261.1, Apr: 1935.6, May: 1726.9, Jun: 1551.5, Jul: 3794.9, Aug: 3075.7, Sep: 1616.8 }
};

const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getCellStyles = (val) => {
  if (val === undefined || val === null) {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      color: 'rgba(255, 255, 255, 0.15)'
    };
  }
  if (val > 0) {
    if (val <= 25) {
      return {
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        color: '#a7f3d0'
      };
    } else if (val <= 100) {
      return {
        backgroundColor: 'rgba(16, 185, 129, 0.4)',
        color: '#6ee7b7'
      };
    } else {
      return {
        backgroundColor: 'rgba(16, 185, 129, 0.75)',
        color: '#ffffff',
        fontWeight: 'bold'
      };
    }
  } else if (val < 0) {
    if (val >= -25) {
      return {
        backgroundColor: 'rgba(244, 63, 94, 0.2)',
        color: '#fecdd3'
      };
    } else {
      return {
        backgroundColor: 'rgba(244, 63, 94, 0.65)',
        color: '#ffffff',
        fontWeight: 'bold'
      };
    }
  } else {
    return {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: 'rgba(255, 255, 255, 0.4)'
    };
  }
};

const PerformanceSection = () => {
  useEffect(() => {
    const drawChart = () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';

      document.querySelectorAll('.chart-svg .chart-grid').forEach(line => {
        line.setAttribute('stroke', gridColor);
      });

      document.querySelectorAll('.chart-svg .axis-label').forEach(label => {
        label.setAttribute('fill', isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)');
      });

      const plotVals = [
        3, 4, 6, 11, 10, 13.5, 16, 18.5, 23, 25.5, 26, 28.5,
        31, 35, 38, 38.5, 41, 45.5, 47, 48, 49.5, 51, 52,
        51.5, 55.5, 54, 56.5, 58.5, 60, 62.5, 66, 69.5, 73.7
      ];

      const left = 60;
      const right = 985;
      const top = 20;
      const bottom = 340;
      const points = plotVals.map((value, index) => [
        left + (index / (plotVals.length - 1)) * (right - left),
        bottom - (value / 80) * (bottom - top)
      ]);

      const toPath = pts => pts.map((point, index) =>
        `${index === 0 ? 'M' : 'L'}${point[0]},${point[1]}`
      ).join(' ');
      const linePath = toPath(points);
      const fillPath = `${linePath} L${points[points.length - 1][0]},${bottom} L${points[0][0]},${bottom} Z`;

      const line = document.getElementById('oqLine');
      const fill = document.getElementById('oqFill');
      const endpoint = document.getElementById('endpointLabel');

      if (line) {
        line.setAttribute('d', linePath);
        line.setAttribute('stroke', isDark ? '#10b981' : '#059669');
      }
      if (fill) {
        fill.setAttribute('d', fillPath);
        fill.setAttribute('fill', isDark ? 'url(#lineGrad)' : 'url(#lineGradLight)');
      }
      if (endpoint) endpoint.setAttribute('fill', isDark ? '#34d399' : '#047857');
    };

    drawChart();
    const observer = new MutationObserver(drawChart);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="perf-section" id="performance">
      <div className="perf-inner">
        <div>
          <span className="section-tag reveal" style={{ fontFamily: "'DM Mono',monospace", fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px', display: 'block' }}>03 / Performance</span>
          <h2 className="section-title reveal reveal-delay-1">Numbers<br />that speak<br />across cycles</h2>
          <p className="section-body reveal reveal-delay-2">Consistent outperformance from 2021 and beyond. Our risk-adjusted returns place us in the top decile of global quantitative managers.</p>
        </div>
        <div className="reveal reveal-delay-2">
          <div className="perf-chart" style={{ minHeight: "460px", height: "auto", overflow: "visible" }}>
            <div className="perf-chart-label">CUMULATIVE RETURNS / ORION QUANT LLP</div>
            <div style={{ width: '100%', overflowX: 'auto', overflowY: 'visible' }}>
            <svg className="chart-svg" viewBox="0 0 1000 400" preserveAspectRatio="none" style={{ width: '100%', minWidth: '900px', height: '400px', display: 'block' }} id="chartSvg" role="img" aria-label="Cumulative returns from January 2024 to September 2026, ending at 73.70 percent">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGradLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                </linearGradient>
              </defs>

              {[0, 10, 20, 30, 40, 50, 60, 70, 80].map(value => {
                const y = 340 - (value / 80) * 320;
                return (
                  <g key={value}>
                    <line className="chart-grid" x1="60" y1={y} x2="985" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                    <text className="axis-label" x="50" y={y + 3} textAnchor="end" fill="rgba(255,255,255,0.55)" fontSize="8" fontFamily="DM Mono, monospace">{value}%</text>
                  </g>
                );
              })}

              <path id="oqFill" fill="url(#lineGrad)" opacity="0.6" d="" />
              <path id="oqLine" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="" />

              {Array.from({ length: 33 }, (_, index) => {
                const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const month = monthNames[index % 12];
                const year = 2024 + Math.floor(index / 12);
                const x = 60 + (index / 32) * 925;

                return (
                  <g key={index}>
                    <line x1={x} y1="340" x2={x} y2="346" stroke="rgba(255,255,255,0.16)" strokeWidth="0.7" />
                    <text
                      className="axis-label"
                      x={x}
                      y="360"
                      textAnchor="middle"
                      fill="rgba(255,255,255,0.55)"
                      fontSize="9"
                      fontFamily="DM Mono, monospace"
                    >
                      <tspan x={x} dy="0">{month}</tspan>
                      <tspan x={x} dy="12">{String(year).slice(-2)}</tspan>
                    </text>
                  </g>
                );
              })}

              <text id="endpointLabel" x="985" y="25" textAnchor="end" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="DM Mono, monospace">73.70%</text>
            </svg>
            </div>
            <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '9px', color: '#10b981', letterSpacing: '0.1em' }}>— ORION QUANT LLP</span>
            </div>
          </div>

        </div>
        <div className="metrics-band w-full reveal reveal-delay-3" style={{ gridColumn: '1 / -1', marginTop: '48px' }}>
          <div className="metric">
            <span className="metric-value metric-val">−3.2%</span>
            <span className="metric-label metric-key">Max Drawdown</span>
          </div>
          <div className="metric">
            <span className="metric-value metric-val">6.9</span>
            <span className="metric-label metric-key">Monthly Sharpe</span>
          </div>
          <div className="metric">
            <span className="metric-value metric-val">89%</span>
            <span className="metric-label metric-key">Positive Months</span>
          </div>
          <div className="metric">
            <span className="metric-value metric-val">5.6</span>
            <span className="metric-label metric-key">Sortino Ratio</span>
          </div>
        </div>
    

        {/* Heatmap Section */}
        <div className="perf-heatmap-container reveal reveal-delay-3" style={{ gridColumn: '1 / -1', marginTop: '48px', width: '100%', minWidth: 0 }}>
          <div className="perf-chart-label" style={{ marginBottom: '16px', fontSize: '10px', letterSpacing: '0.2em' }}>MONTHLY P&L HEATMAP (₹k)</div>
          <div className="heatmap-scroll-wrapper" style={{ overflowX: 'auto', width: '100%', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border)', borderRadius: '4px', padding: '16px' }}>
            <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', fontFamily: "'DM Mono', monospace", fontSize: '11px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={{ padding: '12px 6px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 'normal' }}>YEAR</th>
                  {monthsList.map(m => (
                    <th key={m} style={{ padding: '12px 6px', textAlign: 'center', color: 'var(--text-muted)', fontWeight: 'normal' }}>{m.toUpperCase()}</th>
                  ))}
                  <th style={{ padding: '12px 6px', textAlign: 'right', color: 'var(--text-muted)', fontWeight: 'normal' }}>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(heatmapData).map(yearStr => {
                  const year = parseInt(yearStr);
                  const yearData = heatmapData[year];
                  const total = Object.values(yearData).reduce((s, v) => s + v, 0);

                  return (
                    <tr key={year} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '8px 6px', textAlign: 'left', fontWeight: 'bold', color: 'var(--text)' }}>{year}</td>
                      {monthsList.map(m => {
                        const val = yearData[m];
                        const cellStyle = getCellStyles(val);
                        return (
                          <td key={m} style={{ padding: '4px 2px', textAlign: 'center' }}>
                            <div style={{
                              padding: '8px 4px',
                              borderRadius: '2px',
                              minWidth: '50px',
                              ...cellStyle
                            }}>
                              {val !== undefined ? `${val > 0 ? '+' : ''}${val.toFixed(1)}` : '—'}
                            </div>
                          </td>
                        );
                      })}
                      <td style={{
                        padding: '8px 6px',
                        textAlign: 'right',
                        fontWeight: 'bold',
                        color: total > 0 ? '#10b981' : total < 0 ? '#f43f5e' : 'var(--text)'
                      }}>
                        {total > 0 ? '+' : ''}{total.toFixed(1)}k
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
