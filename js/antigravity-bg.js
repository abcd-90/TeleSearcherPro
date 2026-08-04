/**
 * TeleSearch PRO — Light SaaS Ambient Background Particle Engine
 * High-performance light theme background with interactive mouse physics & subtle blue particles
 */

(function () {
  'use strict';

  const canvas = document.createElement('canvas');
  canvas.id = 'antiGravityCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-2';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const PARTICLE_DENSITY = 0.00006;
  const BG_PARTICLE_DENSITY = 0.00003;
  const MOUSE_RADIUS = 180;
  const RETURN_SPEED = 0.07;
  const DAMPING = 0.91;
  const REPULSION_STRENGTH = 1.2;

  let particles = [];
  let bgParticles = [];
  let mouse = { x: -1000, y: -1000, isActive: false };
  let width = 0;
  let height = 0;
  let isScrolling = false;
  let scrollTimeout = null;

  const colors = ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#1D4ED8'];

  function randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function initParticles() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 1. Foreground Interactive Particles
    const particleCount = Math.floor(width * height * PARTICLE_DENSITY);
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x: x,
        y: y,
        originX: x,
        originY: y,
        vx: 0,
        vy: 0,
        size: randomRange(1.5, 3.0),
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    // 2. Background Ambient Blue Dots
    const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY);
    bgParticles = [];
    for (let i = 0; i < bgCount; i++) {
      bgParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        size: randomRange(1.0, 2.0),
        alpha: randomRange(0.2, 0.45),
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function animate(time) {
    if (isScrolling) {
      requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // 1. Soft Ambient Blue Radial Glow
    const centerX = width / 2;
    const centerY = height / 4;
    const pulseOpacity = Math.sin(time * 0.0006) * 0.02 + 0.04;

    const gradient = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, Math.max(width, height) * 0.6
    );
    gradient.addColorStop(0, `rgba(37, 99, 235, ${pulseOpacity})`);
    gradient.addColorStop(0.6, `rgba(147, 197, 253, ${pulseOpacity * 0.4})`);
    gradient.addColorStop(1, 'rgba(248, 250, 252, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // 2. Render Drifting Blue Dots
    ctx.fillStyle = '#3B82F6';
    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const twinkle = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5;
      ctx.globalAlpha = p.alpha * (0.4 + 0.6 * twinkle);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    // 3. Render Interactive Particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (mouse.isActive && distance < MOUSE_RADIUS) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
        const repulsion = force * REPULSION_STRENGTH;

        p.vx -= forceDirectionX * repulsion * 3.5;
        p.vy -= forceDirectionY * repulsion * 3.5;
      }

      const springDx = p.originX - p.x;
      const springDy = p.originY - p.y;

      p.vx += springDx * RETURN_SPEED;
      p.vy += springDy * RETURN_SPEED;

      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.x += p.vx;
      p.y += p.vy;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.4 + velocity * 0.1, 0.85);

      ctx.fillStyle = p.color;
      ctx.globalAlpha = opacity;
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    requestAnimationFrame(animate);
  }

  window.addEventListener('scroll', function () {
    isScrolling = true;
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function () {
      isScrolling = false;
    }, 150);
  }, { passive: true });

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isActive = true;
  }, { passive: true });

  window.addEventListener('mouseleave', function () {
    mouse.isActive = false;
  });

  window.addEventListener('resize', function () {
    initParticles();
  });

  initParticles();
  requestAnimationFrame(animate);
})();
