import React, { useEffect, useRef } from 'react';

const GlobalBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // ---- CURSOR ----
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    const handleMouseMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', handleMouseMove);

    let animId;
    const animCursor = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (cursor) {
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
      }
      if (ring) {
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
      }
      animId = requestAnimationFrame(animCursor);
    };
    animCursor();

    const interactables = document.querySelectorAll('a, button, .theme-toggle, .strategy-item');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => { if (ring) { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.opacity = '0.5'; } });
      el.addEventListener('mouseleave', () => { if (ring) { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '0.9'; } });
    });

    // ---- CANVAS STARS + GRAVITY ----
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, stars = [], mouseXPos = 0.5, mouseYPos = 0.5;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.floor(W * H / 2000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random(), y: Math.random(),
          ox: Math.random(), oy: Math.random(),
          size: Math.random() * 1.5 + 0.2,
          opacity: Math.random() * 0.4 + 0.1,
          twinkle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.003 + 0.001
        });
      }
    };

    const handleCanvasMouseMove = (e) => {
      mouseXPos = e.clientX / W;
      mouseYPos = e.clientY / H;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleCanvasMouseMove);
    resize();

    let canvasAnimId;
    const drawCanvas = () => {
      ctx.clearRect(0, 0, W, H);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

      const cx = W * 0.5, cy = H * 0.38;
      const grd1 = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.45);
      grd1.addColorStop(0, isDark ? 'rgba(74,143,255,0.06)' : 'rgba(26,95,212,0.04)');
      grd1.addColorStop(0.5, isDark ? 'rgba(200,169,110,0.04)' : 'rgba(139,106,46,0.03)');
      grd1.addColorStop(1, 'transparent');
      ctx.fillStyle = grd1;
      ctx.fillRect(0, 0, W, H);

      const nx = W * (0.3 + mouseXPos * 0.4);
      const ny = H * (0.2 + mouseYPos * 0.3);
      const grd2 = ctx.createRadialGradient(nx, ny, 0, nx, ny, W * 0.3);
      grd2.addColorStop(0, isDark ? 'rgba(200,169,110,0.04)' : 'rgba(139,106,46,0.025)');
      grd2.addColorStop(1, 'transparent');
      ctx.fillStyle = grd2;
      ctx.fillRect(0, 0, W, H);

      const scrollPercent = window.scrollY / (document.body.scrollHeight - H);
      stars.forEach(s => {
        s.twinkle += s.speed * 40;
        const tw = Math.sin(s.twinkle) * 0.5 + 0.5;
        const bhY = 0.38 - scrollPercent * 0.2;
        const dx = 0.5 - s.x;
        const dy = bhY - s.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.max(0, 0.04 - dist) * 0.4;
        const px = s.ox + (0.5 - s.ox) * pull + (mouseXPos - 0.5) * 0.015;
        const py = s.oy + (bhY - s.oy) * pull * 2 + (mouseYPos - 0.5) * 0.015;
        s.x += (px - s.x) * 0.005;
        s.y += (py - s.y) * 0.005;

        const alpha = s.opacity * (0.2 + tw * 0.6) * (isDark ? 0.75 : 0.45);
        const sizePulsing = s.size * (0.8 + tw * 0.4);
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, sizePulsing, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${isDark ? '255,252,245' : '26,23,20'},${alpha})`;
        ctx.fill();

        if (s.size > 1.3) {
          ctx.beginPath();
          ctx.arc(s.x * W, s.y * H, sizePulsing * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${isDark ? '255,215,0' : '139,106,46'},${alpha * 0.15})`;
          ctx.fill();
        }
      });
      canvasAnimId = requestAnimationFrame(drawCanvas);
    };
    drawCanvas();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleCanvasMouseMove);
      cancelAnimationFrame(canvasAnimId);
    };
  }, []);

  return (
    <>
      <canvas id="bgCanvas" ref={canvasRef}></canvas>
      <div className="cursor" id="cursor"></div>
      <div className="cursor-ring" id="cursorRing"></div>
    </>
  );
};

export default GlobalBackground;
