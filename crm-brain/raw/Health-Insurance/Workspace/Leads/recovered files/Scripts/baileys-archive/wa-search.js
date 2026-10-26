#!/usr/bin/env node

const { searchMessages, getMessagesByJid } = require('./wa-db');

// Parse arguments
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
  console.error('Usage: node wa-search.js --ref <REF_ID>');
  console.error('Or: node wa-search.js --name <name>');
  console.error('Or: node wa-search.js --phone <number>');
  process.exit(1);
}

async function runSearch() {
  try {
    let messages = [];
    let searchQuery = refId || name || phone;

    if (phone) {
      // Search by phone directly from messages
      const jid = phone.includes('@') ? phone : `${phone}@s.whatsapp.net`;
      messages = await getMessagesByJid(jid, limit);
    } else {
      // Full-text search
      messages = await searchMessages(searchQuery);
    }

    if (!messages || messages.length === 0) {
      console.log('✗ No messages found');
      process.exit(0);
    }

    console.log(`\nFound ${messages.length} messages:\n`);

    messages.forEach((msg, index) => {
      const timestamp = new Date(msg.timestamp * 1000).toLocaleString();
      const fromMe = msg.from_me ? '📤 You' : '📥 Lead';
      const text = msg.text ? msg.text.substring(0, 80) : `[${msg.message_type}]`;

      console.log(`[${index + 1}] ${timestamp} ${fromMe}`);
      console.log(`    ${text}`);
      if (msg.text && msg.text.length > 80) console.log(`    ...`);
      console.log('');
    });

    const lastMessage = messages[messages.length - 1];
    const lastTime = new Date(lastMessage.timestamp * 1000).toLocaleString();
    console.log('-------------------------------------------');
    console.log(`Last contact: ${lastTime}`);
    console.log(`Total messages: ${messages.length}`);
    console.log(`Chat: ${lastMessage.jid}`);
    process.exit(0);
  } catch (err) {
    console.error('✗ Error searching messages:', err.message);
    process.exit(1);
  }
}

runSearch();
