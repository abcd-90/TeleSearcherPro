/**
 * TeleSearch PRO — OSINT 3D Channel Network Graph Visualizer
 * Interactive 3D Node & Edge Canvas Visualizer for Telegram Channel Connection Ecosystems
 */

(function (window) {
  'use strict';

  class OSINTNetworkGraph {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.nodes = [];
      this.links = [];
      this.width = 0;
      this.height = 0;
      this.hoveredNode = null;
      this.draggedNode = null;
      this.zoom = 1;

      this.init();
    }

    init() {
      this.resize();
      this.generateMockNetwork();
      this.attachEvents();
      this.animate();
    }

    resize() {
      const parent = this.canvas.parentElement;
      if (!parent) return;
      const oldWidth = this.width || parent.clientWidth || 800;
      const oldHeight = this.height || parent.clientHeight || 500;
      this.width = parent.clientWidth || 800;
      this.height = parent.clientHeight || 500;
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);

      // Scale node positions relative to new bounds if already generated
      if (this.nodes && this.nodes.length && oldWidth && oldHeight) {
        const scaleX = this.width / oldWidth;
        const scaleY = this.height / oldHeight;
        this.nodes.forEach(node => {
          node.x = Math.max(30, Math.min(this.width - 30, node.x * scaleX));
          node.y = Math.max(30, Math.min(this.height - 30, node.y * scaleY));
        });
      }
    }

    generateMockNetwork() {
      const channels = [
        { id: '1', name: 'Zero To Mastery', category: 'Tech', size: 24, color: '#00F2FE' },
        { id: '2', name: 'Cyber Yodha', category: 'Security', size: 20, color: '#10B981' },
        { id: '3', name: 'AI & Prompt Engineers', category: 'AI', size: 26, color: '#7928CA' },
        { id: '4', name: 'Crypto Alpha Hub', category: 'Crypto', size: 22, color: '#F59E0B' },
        { id: '5', name: 'Dev Tools Vault', category: 'Tech', size: 16, color: '#0070F3' },
        { id: '6', name: 'Underground Leaks', category: 'Security', size: 18, color: '#EF4444' },
        { id: '7', name: 'Python Scripts', category: 'Tech', size: 15, color: '#00F2FE' },
        { id: '8', name: 'Forex VIP Signals', category: 'Crypto', size: 19, color: '#F59E0B' },
      ];

      const centerX = this.width / 2;
      const centerY = this.height / 2;

      this.nodes = channels.map((ch, idx) => {
        const angle = (idx / channels.length) * Math.PI * 2;
        const radius = 140 + Math.random() * 60;
        return {
          ...ch,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        };
      });

      this.links = [
        { source: 0, target: 1, label: 'Cross Forward' },
        { source: 0, target: 4, label: 'Shared Admin' },
        { source: 1, target: 5, label: 'Security Link' },
        { source: 2, target: 4, label: 'Tech Partner' },
        { source: 3, target: 7, label: 'Bot Link' },
        { source: 3, target: 0, label: 'Content Mirror' },
        { source: 6, target: 1, label: 'Forward' },
      ];
    }

    attachEvents() {
      window.addEventListener('resize', () => this.resize());

      this.canvas.addEventListener('mousemove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        this.hoveredNode = null;
        for (let node of this.nodes) {
          const dx = mouseX - node.x;
          const dy = mouseY - node.y;
          if (Math.sqrt(dx * dx + dy * dy) < node.size) {
            this.hoveredNode = node;
            break;
          }
        }
      });
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Render Connection Edges
      this.ctx.lineWidth = 1.5;
      for (let link of this.links) {
        const s = this.nodes[link.source];
        const t = this.nodes[link.target];
        if (!s || !t) continue;

        const grad = this.ctx.createLinearGradient(s.x, s.y, t.x, t.y);
        grad.addColorStop(0, s.color);
        grad.addColorStop(1, t.color);

        this.ctx.strokeStyle = grad;
        this.ctx.globalAlpha = 0.4;
        this.ctx.beginPath();
        this.ctx.moveTo(s.x, s.y);
        this.ctx.lineTo(t.x, t.y);
        this.ctx.stroke();
      }
      this.ctx.globalAlpha = 1.0;

      // Render Nodes
      for (let node of this.nodes) {
        // Floating motion
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 50 || node.x > this.width - 50) node.vx *= -1;
        if (node.y < 50 || node.y > this.height - 50) node.vy *= -1;

        // Glowing Halo
        const isHovered = this.hoveredNode === node;
        const radius = isHovered ? node.size * 1.3 : node.size;

        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
        this.ctx.fillStyle = node.color;
        this.ctx.globalAlpha = isHovered ? 0.35 : 0.15;
        this.ctx.fill();

        // Node Circle
        this.ctx.beginPath();
        this.ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        this.ctx.fillStyle = node.color;
        this.ctx.globalAlpha = 1.0;
        this.ctx.fill();

        // Label Text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(node.name, node.x, node.y + radius + 16);
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  window.OSINTNetworkGraph = OSINTNetworkGraph;
})(window);
