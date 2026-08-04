/**
 * TeleSearch Client Security & Source Protection Guard
 * Author: Mr Sami
 */

(function () {
  'use strict';

  // 1. Disable Right-Click Context Menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  }, true);

  // 2. Disable Text Selection & Copying on Static Layout Elements
  document.addEventListener('selectstart', function (e) {
    if (e.target && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  }, true);

  document.addEventListener('copy', function (e) {
    if (e.target && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  }, true);

  // 3. Block Developer Tools & Source View Keyboard Shortcuts
  document.addEventListener('keydown', function (e) {
    const key = e.key ? e.key.toLowerCase() : '';
    const code = e.keyCode || e.which;

    // F12 Key
    if (key === 'f12' || code === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I / J / C / E / K (Inspect / Console)
    if (e.ctrlKey && e.shiftKey && (key === 'i' || key === 'j' || key === 'c' || key === 'e' || key === 'k')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // macOS Cmd+Option+I / J / C / K
    if (e.metaKey && e.altKey && (key === 'i' || key === 'j' || key === 'c' || key === 'k')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U / Cmd+U (View Page Source)
    if ((e.ctrlKey || e.metaKey) && key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && key === 's') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+P / Cmd+P (Print Page)
    if ((e.ctrlKey || e.metaKey) && key === 'p') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // 4. Overwrite & Neutralize Console Output
  const disableConsole = function () {
    const noop = function () {};
    const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'dirxml', 'group', 'groupEnd', 'time', 'timeEnd', 'assert', 'profile'];
    for (let i = 0; i < methods.length; i++) {
      try {
        window.console[methods[i]] = noop;
      } catch (err) {}
    }
  };
  disableConsole();

})();
