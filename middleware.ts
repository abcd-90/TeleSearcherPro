import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * TeleSearch PRO — Layer 3: Scraper & Bot Blocking Edge Middleware
 * Author: Mr Sami / TeleSearch Security System
 */

// List of known AI Crawlers & Scrapers to block
const BLOCKED_BOT_PATTERNS = [
  // AI Bots & LLM Crawlers
  /GPTBot/i,
  /ChatGPT-User/i,
  /ClaudeBot/i,
  /Claude-Web/i,
  /Google-Extended/i,
  /CCBot/i,
  /Bytespider/i,
  /Diffbot/i,
  /PerplexityBot/i,
  /FacebookBot/i,
  /Anthropic/i,
  /Cohere-training/i,
  /omgili/i,

  // Headless Browsers & Automation Frameworks
  /HeadlessChrome/i,
  /PhantomJS/i,
  /Puppeteer/i,
  /Playwright/i,
  /Selenium/i,
  /WebDriver/i,

  // CLI Tools & Non-Browser HTTP Clients
  /curl/i,
  /wget/i,
  /python-requests/i,
  /python-urllib/i,
  /aiohttp/i,
  /Go-http-client/i,
  /Java\//i,
  /libwww-perl/i,
  /Scrapy/i,
  /HTTPie/i,
  /node-fetch/i,
  /Axios/i,
  /PostmanRuntime/i,
  /Insomnia/i,
];

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const acceptHeader = request.headers.get('accept') || '';

  // 1. Check for Empty User-Agent
  if (!userAgent || userAgent.trim() === '') {
    return new NextResponse(
      JSON.stringify({ error: 'Access Denied: Non-browser client detected.' }),
      { status: 403, headers: { 'content-type': 'application/json' } }
    );
  }

  // 2. Check for Blocked Bots & Scrapers
  const isBlockedBot = BLOCKED_BOT_PATTERNS.some((pattern) => pattern.test(userAgent));
  if (isBlockedBot) {
    return new NextResponse(
      JSON.stringify({
        status: 403,
        message: '403 Forbidden: Automated crawling & scraping is strictly prohibited.',
        timestamp: new Date().toISOString(),
      }),
      {
        status: 403,
        headers: {
          'content-type': 'application/json',
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
        },
      }
    );
  }

  // 3. Check for Non-Browser Accept Headers on Document Requests
  const isDocumentRequest = request.nextUrl.pathname === '/' || request.nextUrl.pathname.endsWith('.html');
  if (isDocumentRequest && !acceptHeader.includes('text/html')) {
    return new NextResponse(
      JSON.stringify({ error: 'Access Denied: Invalid client accept headers.' }),
      { status: 403, headers: { 'content-type': 'application/json' } }
    );
  }

  // 4. Attach Security Headers to Allowed Requests
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
