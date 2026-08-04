/**
 * TeleSearch PRO — Interactive Live Telegram Bot Sandbox & Chat Simulator
 * Simulates real Telegram Bot interaction inside the web browser
 */

(function (window) {
  'use strict';

  class BotSandboxTester {
    constructor(chatContainerId, inputId) {
      this.chatContainer = document.getElementById(chatContainerId);
      this.input = document.getElementById(inputId);
      this.currentBot = '@TeleSearchProBot';
      if (!this.chatContainer || !this.input) return;
      
      this.init();
    }

    init() {
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && this.input.value.trim() !== '') {
          this.sendMessage(this.input.value.trim());
          this.input.value = '';
        }
      });
    }

    sendMessage(text) {
      this.appendMessage(text, 'user');
      this.showTypingIndicator();

      setTimeout(() => {
        this.hideTypingIndicator();
        this.generateBotResponse(text);
      }, 1200);
    }

    appendMessage(text, sender) {
      const bubble = document.createElement('div');
      bubble.className = `tg-msg-bubble tg-msg-${sender}`;

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      bubble.innerHTML = `
        <div class="tg-msg-text">${text}</div>
        <div class="tg-msg-time">${timeStr}</div>
      `;

      this.chatContainer.appendChild(bubble);
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    showTypingIndicator() {
      const typing = document.createElement('div');
      typing.id = 'botTypingIndicator';
      typing.className = 'tg-msg-bubble tg-msg-bot tg-msg-typing';
      typing.innerHTML = `
        <span class="tg-typing-dot"></span>
        <span class="tg-typing-dot"></span>
        <span class="tg-typing-dot"></span>
      `;
      this.chatContainer.appendChild(typing);
      this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    hideTypingIndicator() {
      const el = document.getElementById('botTypingIndicator');
      if (el) el.remove();
    }

    generateBotResponse(userMsg) {
      const trimmed = userMsg.trim();
      const lower = trimmed.toLowerCase();

      if (lower === '/start') {
        this.appendMessage(`👋 Welcome to <b>TeleSearch PRO Bot Sandbox</b>!<br><br>Commands:<br>• <code>/search &lt;query&gt;</code> - Search 10M+ Telegram channels & files<br>• <code>/status</code> - Engine health & latency<br>• <code>/help</code> - Bot usage guide`, 'bot');
      } else if (lower === '/status') {
        this.appendMessage(`⚡ <b>System Health Status</b><br>🟢 API Indexing: Operational<br>⚡ Latency: 38ms<br>🌐 Active Nodes: 180+ global servers`, 'bot');
      } else if (lower === '/help') {
        this.appendMessage(`ℹ️ <b>TeleSearch PRO Bot Help</b><br><br>Type <code>/search &lt;anything&gt;</code> or type your topic directly (e.g. <i>edu mail, python, hacking, crypto signals, movies</i>) to find instant verified Telegram channels, groups, and files!`, 'bot');
      } else {
        // Any query or command (like /search edu mail lifetime method or edu mail)
        const searchHtml = this.generateDynamicSearchResults(trimmed);
        this.appendMessage(searchHtml, 'bot');
      }
    }

    generateDynamicSearchResults(rawQuery) {
      const cleanQuery = rawQuery.replace(/^\/search\s*/i, '').trim();
      const searchTerm = cleanQuery || 'Telegram Resources';
      const lower = searchTerm.toLowerCase();

      const words = searchTerm.split(/\s+/).filter(w => w.length > 0);
      const capitalizedTerm = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

      let results = [];

      // Detect topic category for high relevance
      if (lower.includes('edu') || lower.includes('mail') || lower.includes('method') || lower.includes('student') || lower.includes('perk') || lower.includes('bin')) {
        results = [
          {
            name: `${capitalizedTerm} Hub & Perks Vault`,
            members: '245K members',
            username: 'edumail_methods_official',
            file: `Edu_Mail_Lifetime_Creation_Guide_2026.pdf (14.8 MB)`,
            desc: `Verified methods, student perk activation (GitHub Student Pack, Notion, Canva Pro), drive access, and lifetime edu email guides.`
          },
          {
            name: `VIP Tech Methods & ${capitalizedTerm}`,
            members: '188K members',
            username: 'vip_edu_methods_vault',
            file: `Edu_Account_Auto_Generator_Script.zip (32.4 MB)`,
            desc: `Daily updated working bin methods, university email portal tricks, and premium student perks.`
          },
          {
            name: `TeleDrive: ${capitalizedTerm} Resources`,
            members: '112K members',
            username: 'teledrive_edu_vault',
            file: `Lifetime_Edu_Mail_Pack_Resources.rar (85.2 MB)`,
            desc: `Archival database of verified email creation methods, guides, and tools.`
          }
        ];
      } else if (lower.includes('python') || lower.includes('code') || lower.includes('programming') || lower.includes('script') || lower.includes('java') || lower.includes('html') || lower.includes('web')) {
        results = [
          {
            name: `${capitalizedTerm} Masterclass & Projects`,
            members: '340K members',
            username: 'python_dev_mastery',
            file: `Python_Full_Stack_Course_Pack_2026.zip (1.2 GB)`,
            desc: `Complete tutorials, source code repositories, automation scripts, and full developer courses.`
          },
          {
            name: `Developer & ${capitalizedTerm} Scripts Hub`,
            members: '210K members',
            username: 'py_cyber_scripts',
            file: `Python_Automation_Tools_Library.zip (240 MB)`,
            desc: `Open-source scripts, API bots, web scraping tools, and backend frameworks.`
          },
          {
            name: `TeleDrive: ${capitalizedTerm} Ebooks & PDFs`,
            members: '125K members',
            username: 'teledrive_python_library',
            file: `Mastering_Python_Zero_To_Hero.pdf (45 MB)`,
            desc: `Free programming books, cheat sheets, interview questions, and project ideas.`
          }
        ];
      } else if (lower.includes('hack') || lower.includes('cyber') || lower.includes('security') || lower.includes('osint') || lower.includes('tool') || lower.includes('crack')) {
        results = [
          {
            name: `${capitalizedTerm} & Penetration Testing`,
            members: '410K members',
            username: 'cyberyodha_official',
            file: `Ethical_Hacking_Toolset_2026.zip (850 MB)`,
            desc: `Daily vulnerability reports, penetration testing labs, CTF solutions, and security tools.`
          },
          {
            name: `OSINT & ${capitalizedTerm} Underground`,
            members: '185K members',
            username: 'osint_network_vault',
            file: `OSINT_Recon_Toolkit_v3.apk (64 MB)`,
            desc: `Footprinting utilities, network scanners, metadata extractors, and privacy guides.`
          },
          {
            name: `TeleDrive: ${capitalizedTerm} Resources`,
            members: '150K members',
            username: 'teledrive_cyber_hub',
            file: `CyberSecurity_Certifications_Complete_Pack.pdf (180 MB)`,
            desc: `CEH, CISSP, CompTIA Security+ study guides and practice labs.`
          }
        ];
      } else if (lower.includes('crypto') || lower.includes('btc') || lower.includes('signal') || lower.includes('trading') || lower.includes('forex') || lower.includes('airdrop')) {
        results = [
          {
            name: `${capitalizedTerm} VIP Alpha Radar`,
            members: '520K members',
            username: 'crypto_alpha_signals_vip',
            file: `Crypto_Trading_Indicators_Strategy.pdf (12.4 MB)`,
            desc: `High accuracy spot & futures leverage signals, market analysis, and trade alerts.`
          },
          {
            name: `Whale Alerts & ${capitalizedTerm} Hub`,
            members: '290K members',
            username: 'whale_alpha_trading',
            file: `TradingView_VIP_Scripts_Pack.zip (18.6 MB)`,
            desc: `Real-time whale movement trackers, institutional order blocks, and signal feeds.`
          }
        ];
      } else if (lower.includes('movie') || lower.includes('series') || lower.includes('film') || lower.includes('netflix') || lower.includes('anime') || lower.includes('cinema')) {
        results = [
          {
            name: `${capitalizedTerm} Cinema & Series 4K`,
            members: '680K members',
            username: 'movies_hd_vault_official',
            file: `${capitalizedTerm.replace(/\s+/g, '_')}_1080p_HDR.mkv (2.4 GB)`,
            desc: `Ultra HD movies, dual audio releases, web series episodes, and direct streaming links.`
          },
          {
            name: `TeleDrive: ${capitalizedTerm} Streaming Hub`,
            members: '430K members',
            username: 'teledrive_movies_channel',
            file: `${capitalizedTerm.replace(/\s+/g, '_')}_Pack.zip (4.1 GB)`,
            desc: `Fast direct telegram download files without ads.`
          }
        ];
      } else {
        // Universal dynamic generator for ANY custom query
        const cleanSlug = words.join('_').toLowerCase().replace(/[^a-z0-9_]/g, '');
        results = [
          {
            name: `${capitalizedTerm} Official Hub`,
            members: `220K members`,
            username: `${cleanSlug || 'telegram'}_official_hub`,
            file: `${capitalizedTerm.replace(/\s+/g, '_')}_Master_Guide_2026.pdf (18.5 MB)`,
            desc: `Premier Telegram channel for verified ${searchTerm} updates, resources, and direct downloads.`
          },
          {
            name: `VIP ${capitalizedTerm} Community & Files`,
            members: `165K members`,
            username: `vip_${cleanSlug || 'vault'}_network`,
            file: `${capitalizedTerm.replace(/\s+/g, '_')}_Complete_Tools_Pack.zip (145.2 MB)`,
            desc: `Exclusive tools, community discussions, and daily shared file packs for ${searchTerm}.`
          },
          {
            name: `TeleDrive: ${capitalizedTerm} Vault`,
            members: `98K members`,
            username: `teledrive_${cleanSlug || 'resources'}_vault`,
            file: `${capitalizedTerm.replace(/\s+/g, '_')}_Resources_Archive.rar (64.0 MB)`,
            desc: `Archival drive index containing curated ${searchTerm} files, docs, and direct links.`
          }
        ];
      }

      let html = `🔎 <b>Search Results for:</b> "${searchTerm}"<br>`;
      html += `<small style="color:var(--text-muted, #8a99ad);">⚡ Indexing 10M+ Telegram nodes • Found ${results.length} verified hubs</small><br><br>`;

      results.forEach((item, idx) => {
        html += `${idx + 1}. <b>${item.name}</b> (${item.members})<br>`;
        html += `👉 <a href="https://t.me/s/${item.username}" target="_blank" rel="noopener">t.me/${item.username}</a><br>`;
        if (item.file) {
          html += `💾 <code>${item.file}</code><br>`;
        }
        html += `<span style="font-size:0.85em; opacity:0.85;">${item.desc}</span><br><br>`;
      });

      html += `<a class="disc-btn" style="display:inline-block; text-decoration:none; margin-top:4px;" href="https://t.me/s/${results[0].username}" target="_blank" rel="noopener">🚀 Open Top Channel in Telegram ↗</a>`;

      return html;
    }
  }

  window.BotSandboxTester = BotSandboxTester;
})(window);

