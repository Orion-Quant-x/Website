import React, { useEffect } from 'react';

const heatmapData = {
  2021: { Jan: -6.9, Feb: 46.1, Mar: 40.1, Apr: -7.8, May: 25.0, Jun: -11.9, Jul: -18.8, Aug: -5.3, Sep: -27.7, Oct: 11.4, Nov: 21.6, Dec: 65.9 },
  2022: { Jan: -28.7, Feb: 33.5, Mar: 6.6, Apr: 27.0, May: 41.8, Jun: 25.8, Jul: 29.2, Aug: -2.1, Sep: 36.0, Oct: 2.0, Nov: 6.2, Dec: -38.0 },
  2023: { Jan: 28.8, Feb: -16.2, Mar: -5.8, Apr: 22.1, May: -301.1, Jun: 236.5, Jul: 435.7, Aug: 4.2, Sep: 20.0, Oct: 3.1, Nov: -3.3, Dec: 43.0 },
  2024: { Jan: 184.1, Feb: 169.5, Mar: 86.8, Apr: -1.8, May: 89.2, Jun: 204.9, Jul: 43.5, Aug: 67.1, Sep: 15.0, Oct: 147.9, Nov: 114.5, Dec: 52.4 },
  2025: { Jan: 56.7, Feb: 133.9, Mar: 100.7, Apr: 88.5, May: 174.5, Jun: 121.3, Jul: 75.3, Aug: 76.3, Sep: 72.0, Oct: 9.3, Nov: 18.5, Dec: 86.4 },
  2026: { Jan: -36.0, Feb: 152.4 }
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
      const gridColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)';
      document.querySelectorAll('.chart-svg line').forEach(l => {
        l.setAttribute('stroke', gridColor);
        l.setAttribute('stroke-dasharray', '4,4');
      });
      document.querySelectorAll('.chart-svg text').forEach(t =>
        t.setAttribute('fill', isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)')
      );

      // Raw P&L monthly values
      const rawPL = [
        // 2021
        -6.9, 46.1, 40.1, -7.8, 25.0, -11.9, -18.8, -5.3, -27.7, 11.4, 21.6, 65.9,
        // 2022
        -28.7, 33.5, 6.6, 27.0, 41.8, 25.8, 29.2, -2.1, 36.0, 2.0, 6.2, -38.0,
        // 2023
        28.8, -16.2, -5.8, 22.1, -301.1, 236.5, 435.7, 4.2, 20.0, 3.1, -3.3, 43.0,
        // 2024
        184.1, 169.5, 86.8, -1.8, 89.2, 204.9, 43.5, 67.1, 15.0, 147.9, 114.5, 52.4,
        // 2025
        56.7, 133.9, 100.7, 88.5, 174.5, 121.3, 75.3, 76.3, 72.0, 9.3, 18.5, 86.4,
        // 2026
        -36.0, 152.4
      ];

      // Calculate cumulative sum
      let sum = 0;
      const cumulative = rawPL.map(val => {
        sum += val;
        return sum;
      });

      // We only plot Jan 2024 to Feb 2026
      // Jan 2024 is index 36 (12 * 3) in rawPL
      const startIdx = 36;
      const plotVals = cumulative.slice(startIdx); // 26 values

      const minVal = Math.min(...plotVals);
      const maxVal = Math.max(...plotVals);
      const valRange = maxVal - minVal;
      const paddedMin = minVal - valRange * 0.05;
      const paddedMax = maxVal + valRange * 0.05;

      const W_chart = 500, H_chart = 180;
      const oqPts = [];

      for (let i = 0; i < plotVals.length; i++) {
        const x = (i / (plotVals.length - 1)) * W_chart;
        const val = plotVals[i];
        const y = H_chart - 15 - ((val - paddedMin) / (paddedMax - paddedMin)) * (H_chart - 30);
        oqPts.push([x, y]);
      }

      const toPath = pts_arr => pts_arr.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
      const toFill = pts_arr => toPath(pts_arr) + ` L${pts_arr[pts_arr.length - 1][0]},${H_chart} L0,${H_chart} Z`;

      const oqLine = document.getElementById('oqLine');
      const oqFill = document.getElementById('oqFill');

      if (oqLine) oqLine.setAttribute('d', toPath(oqPts));
      if (oqFill) oqFill.setAttribute('d', toFill(oqPts));

      if (!isDark) {
        if (oqLine) oqLine.setAttribute('stroke', '#059669');
        if (oqFill) oqFill.setAttribute('fill', 'url(#lineGradLight)');
      } else {
        if (oqLine) oqLine.setAttribute('stroke', '#10b981');
        if (oqFill) oqFill.setAttribute('fill', 'url(#lineGrad)');
      }
    };

    drawChart();

    const observer = new MutationObserver(drawChart);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
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
          <div className="perf-chart">
            <div className="perf-chart-label">CUMULATIVE RETURNS / ORION QUANT LLP</div>
            <svg className="chart-svg" viewBox="0 0 500 200" preserveAspectRatio="none" id="chartSvg">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGradLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="50" x2="500" y2="50" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <text x="5" y="46" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="DM Mono">100%</text>
              <text x="5" y="96" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="DM Mono">50%</text>
              <text x="5" y="146" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="DM Mono">0%</text>
              <path id="oqFill" fill="url(#lineGrad)" opacity="0.6" d="" />
              <path id="oqLine" fill="none" stroke="#10b981" strokeWidth="2" d="" />
              <text x="10" y="194" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="DM Mono">2024</text>
              <text x="240" y="194" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="DM Mono">2025</text>
              <text x="460" y="194" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="DM Mono">2026</text>
            </svg>
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
            <span className="metric-label metric-key">Sharpe Ratio</span>
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
          <div className="heatmap-actions" style={{ display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: '20px' }}>
            <a href="#" className="btn-ghost" style={{ display: 'inline-block' }}>FACT SHEET</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PerformanceSection;
