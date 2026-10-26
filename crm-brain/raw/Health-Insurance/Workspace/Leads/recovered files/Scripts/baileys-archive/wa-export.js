#!/usr/bin/env node

const { getMessagesByJid } = require('./wa-db');
const fs = require('fs');
const path = require('path');

// Parse arguments
const args = process.argv.slice(2);
let jid = '';
let outputDir = '';
let limit = 1000;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--jid' && args[i + 1]) jid = args[++i];
  if (args[i] === '--output' && args[i + 1]) outputDir = args[++i];
  if (args[i] === '--limit' && args[i + 1]) limit = parseInt(args[++i]);
}

if (!jid) {
  console.error('Usage: node wa-export.js --jid <jid@s.whatsapp.net>');
  console.error('Example: node wa-export.js --jid "971501234567@s.whatsapp.net" --output ./export');
  process.exit(1);
}

if (!outputDir) {
  outputDir = './whatsapp-exports';
}

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function runExport() {
  try {
    console.log(`Exporting conversation for: ${jid}`);
    console.log('Fetching messages...');

    const messages = await getMessagesByJid(jid, limit);

    if (!messages || messages.length === 0) {
      console.log('✗ No messages found for this chat');
      process.exit(0);
    }

    // Build markdown content
    let markdown = `# WhatsApp Conversation Export\n\n`;
    markdown += `**Chat JID:** ${jid}\n`;
    markdown += `**Exported:** ${new Date().toLocaleString()}\n`;
    markdown += `**Total Messages:** ${messages.length}\n\n`;
    markdown += `---\n\n`;

    // Show in chronological order (oldest first)
    messages.forEach((msg) => {
      const timestamp = new Date(msg.timestamp * 1000).toLocaleString();
      const from = msg.from_me ? '**You**' : '**Lead**';
      const text = msg.text || `[${msg.message_type}]`;

      markdown += `**${from}** - *${timestamp}*\n`;
      markdown += `${text}\n\n`;
    });

    // Sanitize jid for filename
    const filename = jid.replace(/[^a-zA-Z0-9]/g, '_') + '_WhatsApp_Chat.md';
    const outputPath = path.join(outputDir, filename);

    fs.writeFileSync(outputPath, markdown);

    console.log(`✓ Conversation exported successfully`);
    console.log(`📄 File: ${outputPath}`);
    console.log(`📊 Messages: ${messages.length}`);
    const timeSpan = `${new Date(messages[0].timestamp * 1000).toDateString()} to ${new Date(messages[messages.length - 1].timestamp * 1000).toDateString()}`;
    console.log(`⏰ Time span: ${timeSpan}`);
    process.exit(0);
  } catch (err) {
    console.error('✗ Error exporting conversation:', err.message);
    process.exit(1);
  }
}

runExport();
