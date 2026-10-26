#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get arguments
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
  console.error('Usage: node wacli-export-conversation.js --jid <jid@s.whatsapp.net>');
  console.error('Example: node wacli-export-conversation.js --jid "971501234567@s.whatsapp.net" --output ./export');
  process.exit(1);
}

if (!outputDir) {
  outputDir = './whatsapp-exports';
}

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

try {
  console.log(`Exporting conversation for: ${jid}`);
  console.log('Fetching messages...');

  // Get messages from chat
  const cmd = `wacli messages list --chat "${jid}" --limit ${limit} --json`;
  const result = execSync(cmd, { encoding: 'utf-8' });

  if (!result.trim()) {
    console.log('No messages found for this chat');
    process.exit(0);
  }

  const messages = JSON.parse(result);

  if (!Array.isArray(messages) || messages.length === 0) {
    console.log('No messages found for this chat');
    process.exit(0);
  }

  // Build markdown content
  let markdown = `# WhatsApp Conversation Export\n\n`;
  markdown += `**Chat JID:** ${jid}\n`;
  markdown += `**Exported:** ${new Date().toLocaleString()}\n`;
  markdown += `**Total Messages:** ${messages.length}\n\n`;
  markdown += `---\n\n`;

  // Reverse to show chronological order (oldest first)
  messages.reverse().forEach((msg) => {
    const timestamp = new Date(msg.timestamp).toLocaleString();
    const from = msg.from_me ? '**You**' : '**Lead**';
    const text = msg.text || '[Media/Document]';

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
  console.log(`⏰ Time span: ${new Date(messages[0].timestamp).toDateString()} to ${new Date(messages[messages.length - 1].timestamp).toDateString()}`);

} catch (error) {
  console.error('✗ Error exporting conversation:', error.message);
  process.exit(1);
}
