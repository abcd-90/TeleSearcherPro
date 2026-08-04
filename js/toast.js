/**
 * TeleSearch PRO — Global Toast Notification Manager
 * High-performance, animated toast alert system for SaaS actions
 */

(function (window) {
  'use strict';

  class ToastManager {
    constructor() {
      this.container = null;
      this.init();
    }

    init() {
      if (document.getElementById('tsToastContainer')) {
        this.container = document.getElementById('tsToastContainer');
        return;
      }

      const container = document.createElement('div');
      container.id = 'tsToastContainer';
      container.className = 'ts-toast-container';
      document.body.appendChild(container);
      this.container = container;
    }

    show(message, type = 'info', duration = 3000) {
      if (!this.container) this.init();

      const toast = document.createElement('div');
      toast.className = `ts-toast ts-toast-${type}`;

      let icon = 'ℹ️';
      if (type === 'success') icon = '✓';
      if (type === 'bookmark') icon = '⭐';
      if (type === 'warning') icon = '⚠️';
      if (type === 'error') icon = '❌';

      toast.innerHTML = `
        <span class="ts-toast-icon">${icon}</span>
        <span class="ts-toast-msg">${message}</span>
        <button class="ts-toast-close" onclick="this.parentElement.remove()">✕</button>
      `;

      this.container.appendChild(toast);

      // Trigger CSS animation
      requestAnimationFrame(() => {
        toast.classList.add('show');
      });

      // Auto dismiss
      setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        setTimeout(() => {
          if (toast.parentElement) toast.remove();
        }, 300);
      }, duration);
    }
  }

  window.TeleSearchToast = new ToastManager();
})(window);
