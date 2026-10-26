#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get arguments
const args = process.argv.slice(2);
let refId = '';
let name = '';
let phone = '';
let limit = 50;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--ref' && args[i + 1]) refId = args[++i];
  if (args[i] === '--name' && args[i + 1]) name = args[++i];
  if (args[i] === '--phone' && args[i + 1]) phone = args[++i];
  if (args[i] === '--limit' && args[i + 1]) limit = parseInt(args[++i]);
}

if (!refId && !name && !phone) {
  console.error('Usage: node wacli-search-lead.js --ref <REF_ID>');
  console.error('Or: node wacli-search-lead.js --name <name>');
  console.error('Or: node wacli-search-lead.js --phone <number>');
  process.exit(1);
}

try {
  let searchQuery = refId || name || phone;
  console.log(`Searching for: ${searchQuery}`);
  console.log('-------------------------------------------');

  const cmd = `wacli messages search "${searchQuery}" --json`;
  const result = execSync(cmd, { encoding: 'utf-8' });

  if (!result.trim()) {
    console.log('No messages found');
    process.exit(0);
  }

  const messages = JSON.parse(result);

  if (!Array.isArray(messages)) {
    console.log('No messages found');
    process.exit(0);
  }

  console.log(`Found ${messages.length} messages:\n`);

  messages.forEach((msg, index) => {
    const timestamp = new Date(msg.timestamp).toLocaleString();
    const fromMe = msg.from_me ? '📤 You' : '📥 Lead';
    const text = msg.text ? msg.text.substring(0, 80) : '[Media/Document]';

    console.log(`[${index + 1}] ${timestamp} ${fromMe}`);
    console.log(`    ${text}`);
    if (msg.text && msg.text.length > 80) console.log(`    ...`);
    console.log('');
  });

  const lastMessage = messages[messages.length - 1];
  const lastTime = new Date(lastMessage.timestamp).toLocaleString();
  console.log('-------------------------------------------');
  console.log(`Last contact: ${lastTime}`);
  console.log(`Total messages: ${messages.length}`);

} catch (error) {
  console.error('✗ Error searching messages:', error.message);
  process.exit(1);
}
