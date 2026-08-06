/**
 * TeleSearch PRO — Layer 1: Build-Time JavaScript & HTML Obfuscator
 * Author: Mr Sami / TeleSearch Security System
 * 
 * Uses `javascript-obfuscator` with High Obfuscation Preset:
 * - Control Flow Flattening
 * - Base64 String Array Encoding & Rotation
 * - Dead Code Injection
 * - Self-Defending Runtime Loops
 * - Debug Protection & Console Stripping
 */

const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const OBFUSCATION_OPTIONS = {
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
  unicodeEscapeSequence: false
};

const JS_DIR = path.join(__dirname, '..', 'js');

function obfuscateJsFiles() {
  console.log('🔒 Starting Layer 1 Build-Time Obfuscation...');

  if (!fs.existsSync(JS_DIR)) {
    console.log('⚠️ js/ directory not found, skipping standalone JS obfuscation.');
    return;
  }

  const files = fs.readdirSync(JS_DIR);
  let obfuscatedCount = 0;

  files.forEach((file) => {
    if (file.endsWith('.js')) {
      const filePath = path.join(JS_DIR, file);
      const code = fs.readFileSync(filePath, 'utf8');

      try {
        const result = JavaScriptObfuscator.obfuscate(code, OBFUSCATION_OPTIONS);
        fs.writeFileSync(filePath, result.getObfuscatedCode(), 'utf8');
        console.log(`  ✓ Obfuscated [High Preset]: js/${file}`);
        obfuscatedCount++;
      } catch (err) {
        console.error(`  ❌ Failed to obfuscate js/${file}:`, err.message);
      }
    }
  });

  console.log(`✅ Obfuscated ${obfuscatedCount} client JS files successfully.`);
}

obfuscateJsFiles();
