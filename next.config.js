/**
 * @type {import('next').NextConfig}
 * TeleSearch PRO — Multi-Layer Enterprise Security & Obfuscation Config
 */
const WebpackObfuscator = require('webpack-obfuscator');

const nextConfig = {
  // Layer 4: Disable Production Source Maps
  productionBrowserSourceMaps: false,

  // Layer 4: Hide Next.js Fingerprint
  poweredByHeader: false,

  // React Strict Mode
  reactStrictMode: true,

  // Compiler Options: Remove all console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error'],
    } : false,
  },

  // Security Headers configuration for Vercel
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive, nosnippet',
          },
        ],
      },
    ];
  },

  // Layer 1: Build-Time Obfuscation (Webpack)
  webpack: (config, { isServer, dev }) => {
    // Only obfuscate client-side bundles in production builds
    if (!dev && !isServer) {
      config.plugins.push(
        new WebpackObfuscator(
          {
            // High Obfuscation Preset
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: true,
            debugProtectionInterval: 2000,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            log: false,
            numbersToExpressions: true,
            renameGlobals: false,
            selfDefending: true,
            simplify: true,
            splitStrings: true,
            splitStringsChunkLength: 5,
            stringArray: true,
            stringArrayCallsTransform: true,
            stringArrayCallsTransformThreshold: 0.75,
            stringArrayEncoding: ['base64', 'rc4'],
            stringArrayIndexShift: true,
            stringArrayRotate: true,
            stringArrayShuffle: true,
            stringArrayThreshold: 0.8,
            transformObjectKeys: true,
            unicodeEscapeSequence: false,
          },
          // Only target client static JS chunks
          ['static/chunks/webpack-*.js', 'static/chunks/polyfills-*.js']
        )
      );
    }
    return config;
  },
};

module.exports = nextConfig;
