#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get arguments
const args = process.argv.slice(2);
let phone = '';
let message = '';
let file = null;
let caption = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--phone' && args[i + 1]) phone = args[++i];
  if (args[i] === '--message' && args[i + 1]) message = args[++i];
  if (args[i] === '--file' && args[i + 1]) file = args[++i];
  if (args[i] === '--caption' && args[i + 1]) caption = args[++i];
}

if (!phone) {
  console.error('Usage: node wacli-send-message.js --phone <number> --message <text>');
  console.error('Or: node wacli-send-message.js --phone <number> --file <path> [--caption <text>]');
  process.exit(1);
}

try {
  let cmd = '';

  if (file) {
    if (!fs.existsSync(file)) {
      console.error(`File not found: ${file}`);
      process.exit(1);
    }
    cmd = `wacli send file --to ${phone} --file "${file}"`;
    if (caption) cmd += ` --caption "${caption}"`;
  } else if (message) {
    cmd = `wacli send text --to ${phone} --message "${message}"`;
  } else {
    console.error('Either --message or --file must be provided');
    process.exit(1);
  }

  console.log(`Sending to ${phone}...`);
  const result = execSync(cmd, { encoding: 'utf-8' });
  console.log(result);
  console.log('✓ Message sent successfully');
} catch (error) {
  console.error('✗ Error sending message:', error.message);
  process.exit(1);
}
