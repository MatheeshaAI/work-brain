#!/usr/bin/env node

const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const { saveMessage } = require('./wa-db');

const AUTH_DIR = path.join(__dirname, 'wa-auth');

// Parse arguments
const args = process.argv.slice(2);
let phone = '';
let message = '';
let filePath = null;
let caption = '';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--phone' && args[i + 1]) phone = args[++i];
  if (args[i] === '--message' && args[i + 1]) message = args[++i];
  if (args[i] === '--file' && args[i + 1]) filePath = args[++i];
  if (args[i] === '--caption' && args[i + 1]) caption = args[++i];
}

if (!phone) {
  console.error('Usage: node wa-send.js --phone <number> --message <text>');
  console.error('Or: node wa-send.js --phone <number> --file <path> [--caption <text>]');
  process.exit(1);
}

async function sendMessage() {
  try {
    // Check auth
    if (!fs.existsSync(AUTH_DIR)) {
      console.error('✗ Not authenticated. Run wa-sync.js first to authenticate.');
      process.exit(1);
    }

    const { state } = await useMultiFileAuthState(AUTH_DIR);
    const sock = makeWASocket({
      auth: state,
      logger: pino({ level: 'silent' }),
    });

    let isConnected = false;
    sock.ev.on('connection.update', (update) => {
      if (update.connection === 'open') {
        isConnected = true;
      }
    });

    // Wait for connection
    await new Promise((resolve) => {
      const checkInterval = setInterval(() => {
        if (isConnected) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
      setTimeout(() => {
        clearInterval(checkInterval);
        resolve();
      }, 5000);
    });

    if (!isConnected) {
      console.error('✗ Failed to connect to WhatsApp');
      process.exit(1);
    }

    const jid = phone.includes('@') ? phone : `${phone}@s.whatsapp.net`;

    if (filePath && fs.existsSync(filePath)) {
      // Send file
      const fileBuffer = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);
      await sock.sendMessage(jid, {
        document: fileBuffer,
        fileName,
        caption: caption || message,
      });
      console.log(`✓ Document sent to ${phone}`);
    } else if (message) {
      // Send text
      await sock.sendMessage(jid, { text: message });
      console.log(`✓ Message sent to ${phone}`);
    } else {
      console.error('✗ Either --message or --file must be provided');
      process.exit(1);
    }

    sock.end();
    process.exit(0);
  } catch (err) {
    console.error('✗ Error sending message:', err.message);
    process.exit(1);
  }
}

sendMessage();
