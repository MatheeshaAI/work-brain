#!/usr/bin/env node

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion } = require('baileys');
const { Boom } = require('@hapi/boom');
const QRCode = require('qrcode-terminal');
const pino = require('pino');
const path = require('path');
const fs = require('fs');
const { saveBulkMessages, saveMessage, saveContact, saveChat, closeDb } = require('./wa-db');

const AUTH_DIR = path.join(__dirname, 'wa-auth');
const LOG_DIR = path.join(__dirname, '..', 'logs');
const LOG_FILE = path.join(LOG_DIR, 'wa-sync.log');
const PID_FILE = path.join(LOG_DIR, 'wa-sync.pid');

// Setup logger
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const pinoLogger = pino({ level: 'info' });

let sock = null;
let isConnecting = false;

// Extract text from Baileys message structure
function extractMessageText(msg) {
  if (msg.conversation) return msg.conversation;
  if (msg.extendedTextMessage?.text) return msg.extendedTextMessage.text;
  if (msg.imageMessage?.caption) return msg.imageMessage.caption;
  if (msg.videoMessage?.caption) return msg.videoMessage.caption;
  if (msg.documentMessage?.caption) return msg.documentMessage.caption;
  if (msg.audioMessage?.caption) return msg.audioMessage.caption;
  return null;
}

// Get message type
function getMessageType(msg) {
  if (msg.conversation || msg.extendedTextMessage) return 'text';
  if (msg.imageMessage) return 'image';
  if (msg.videoMessage) return 'video';
  if (msg.audioMessage) return 'audio';
  if (msg.documentMessage) return 'document';
  if (msg.stickerMessage) return 'sticker';
  return 'unknown';
}

// Get filename
function getFilename(msg) {
  if (msg.documentMessage?.fileName) return msg.documentMessage.fileName;
  if (msg.imageMessage?.fileName) return msg.imageMessage.fileName;
  if (msg.videoMessage?.fileName) return msg.videoMessage.fileName;
  return null;
}

// Get MIME type
function getMimetype(msg) {
  if (msg.documentMessage?.mimetype) return msg.documentMessage.mimetype;
  if (msg.imageMessage?.mimetype) return msg.imageMessage.mimetype;
  if (msg.videoMessage?.mimetype) return msg.videoMessage.mimetype;
  if (msg.audioMessage?.mimetype) return msg.audioMessage.mimetype;
  return null;
}

// Normalize JID format
function normalizeJid(jid) {
  if (!jid) return null;
  if (jid.includes('@')) return jid;
  return `${jid}@s.whatsapp.net`;
}

// Save message from Baileys event
function processMessage(waMsg, fromMe = false) {
  try {
    const msg = waMsg.message;
    if (msg == null) return;

    const messageId = waMsg.key.id;
    const jid = normalizeJid(waMsg.key.remoteJid);
    const senderJid = normalizeJid(waMsg.key.participant || waMsg.key.remoteJid);
    const timestamp = waMsg.messageTimestamp || Math.floor(Date.now() / 1000);
    const text = extractMessageText(msg);
    const messageType = getMessageType(msg);
    const filename = getFilename(msg);
    const mimetype = getMimetype(msg);

    const dbMsg = {
      id: messageId,
      jid,
      from_jid: senderJid,
      from_me: fromMe,
      timestamp,
      message_type: messageType,
      text,
      filename,
      mimetype,
      raw_json: waMsg,
    };

    saveMessage(dbMsg);
  } catch (err) {
    pinoLogger.error({ err }, 'Error processing message');
  }
}

async function connectWhatsApp() {
  if (isConnecting) return;
  isConnecting = true;

  try {
    if (!fs.existsSync(AUTH_DIR)) {
      fs.mkdirSync(AUTH_DIR, { recursive: true });
    }

    const { state, saveCreds } = await useMultiFileAuthState(AUTH_DIR);
    const { version } = await fetchLatestBaileysVersion();

    sock = makeWASocket({
      version,
      auth: state,
      logger: pino({ level: 'error' }),
      syncFullHistory: true,
      defaultQueryTimeoutMs: 0,
    });

    sock.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log('\n\n');
        console.log('╔════════════════════════════════════════════════════════════╗');
        console.log('║          📱  SCAN THIS QR CODE WITH YOUR PHONE  📱        ║');
        console.log('╚════════════════════════════════════════════════════════════╝');
        console.log('\n');
        QRCode.generate(qr, { small: true });
        console.log('\n');
        console.log('INSTRUCTIONS:');
        console.log('1️⃣  Open WhatsApp on your phone');
        console.log('2️⃣  Go to: Settings → Linked Devices → Link a Device');
        console.log('3️⃣  Point your phone camera at the QR code above');
        console.log('4️⃣  Wait for "✓ WhatsApp connected" message');
        console.log('\n');
      }

      if (connection === 'close') {
        const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
        console.error(`\n❌ Connection closed: ${shouldReconnect ? 'Reconnecting...' : 'Logged out'}`);
        if (shouldReconnect) {
          setTimeout(() => connectWhatsApp(), 5000);
        } else {
          process.exit(0);
        }
      } else if (connection === 'open') {
        console.log('\n✅ WhatsApp connected! Service running...');
        console.log('All messages syncing to database.\n');
        isConnecting = false;
      }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messaging-history.set', (update) => {
      const messages = update.messages.filter(waMsg => waMsg.message != null).map((waMsg) => {
        const msg = waMsg.message;
        const fromMe = update.isLatest || waMsg.key.fromMe;
        const text = extractMessageText(msg);
        const messageType = getMessageType(msg);
        const filename = getFilename(msg);
        const mimetype = getMimetype(msg);

        return {
          id: waMsg.key.id,
          jid: normalizeJid(waMsg.key.remoteJid),
          from_jid: normalizeJid(waMsg.key.participant || waMsg.key.remoteJid),
          from_me: fromMe,
          timestamp: waMsg.messageTimestamp || Math.floor(Date.now() / 1000),
          message_type: messageType,
          text,
          filename,
          mimetype,
          raw_json: waMsg,
        };
      });

      saveBulkMessages(messages);
      pinoLogger.info(`Synced ${messages.length} historical messages`);
    });

    sock.ev.on('messages.upsert', (m) => {
      if (m.type === 'notify') {
        m.messages.forEach((waMsg) => {
          processMessage(waMsg, waMsg.key.fromMe);
        });
      }
    });

    sock.ev.on('contacts.upsert', (contacts) => {
      contacts.forEach((contact) => {
        saveContact(normalizeJid(contact.id), contact);
      });
    });

    sock.ev.on('chats.upsert', (chats) => {
      chats.forEach((chat) => {
        saveChat(normalizeJid(chat.id), chat);
      });
    });
  } catch (err) {
    pinoLogger.error({ err }, 'Connection error');
    isConnecting = false;
    setTimeout(() => connectWhatsApp(), 3000);
  }
}

function startSync() {
  pinoLogger.info('Starting WhatsApp sync service...');
  fs.writeFileSync(PID_FILE, process.pid.toString());
  connectWhatsApp();
}

function stopSync() {
  pinoLogger.info('Stopping WhatsApp sync service...');
  if (sock) {
    sock.end(new Error('Service stopped'));
  }
  closeDb();
  if (fs.existsSync(PID_FILE)) {
    fs.unlinkSync(PID_FILE);
  }
  process.exit(0);
}

function statusSync() {
  if (fs.existsSync(PID_FILE)) {
    const pid = fs.readFileSync(PID_FILE, 'utf-8').trim();
    console.log(`✓ Status: Running (PID: ${pid})`);
    console.log(`📄 Log file: ${LOG_FILE}`);
  } else {
    console.log('✗ Status: Not running');
  }
}

const command = process.argv[2] || 'start';

switch (command) {
  case 'start':
    startSync();
    process.on('SIGTERM', stopSync);
    process.on('SIGINT', stopSync);
    break;
  case 'stop':
    stopSync();
    break;
  case 'status':
    statusSync();
    break;
  default:
    console.error(`Usage: node wa-sync.js [start|stop|status]`);
    process.exit(1);
}
