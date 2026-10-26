# WhatsApp Integration with Baileys & SQLite

## Overview
This replaces the old `wacli` system (Go binary) with a Node.js/Baileys solution that works natively on Windows.

**Features:**
- ✅ Send/receive WhatsApp messages
- ✅ Auto-sync all message history (full backup)
- ✅ Local SQLite database (no cloud dependency)
- ✅ Search conversation history
- ✅ Export chats to markdown
- ✅ Background service on Windows

## Installation

### 1. Install Node.js
Download from [nodejs.org](https://nodejs.org/) (version 16+ required). Verify installation:
```bash
node --version
npm --version
```

### 2. Install Dependencies
```bash
cd "c:\Users\Matheesha-IM.AE\Desktop\Health Insurance\Scripts"
npm install
```

This installs:
- `@whiskeysockets/baileys` — WhatsApp Web protocol
- `better-sqlite3` — Synchronous SQLite database
- `pino` — Logging

## Setup & Authentication

### First-Time Setup (One-time QR scan)

```bash
node wa-sync.js start
```

**What happens:**
1. QR code appears in terminal
2. Open WhatsApp on your phone
3. Go to **Settings > Linked Devices > Link a Device**
4. Scan the QR code with your phone
5. Wait for "✓ WhatsApp connected" message
6. Service continues running in background

**Database location:** `Scripts/wa-store/messages.db` (created automatically)

**Auth stored in:** `Scripts/wa-auth/` (do not delete)

### Verify Setup
```bash
node wa-sync.js status
```

## Usage

### Send a Message
```bash
# Text message
node wa-send.js --phone "971501234567" --message "Your quote is ready!"

# Send document with caption
node wa-send.js --phone "971501234567" --file "Documents/Client/quote.pdf" --caption "Here's your quote"
```

### Search Conversations
```bash
# By phone number
node wa-search.js --phone "971501234567"

# By name
node wa-search.js --name "Kenvil"

# By REF-ID
node wa-search.js --ref "HEA-AYS56M5E"

# Limit results
node wa-search.js --phone "971501234567" --limit 100
```

### Export Chat to Markdown
```bash
# Export to default folder (./whatsapp-exports)
node wa-export.js --jid "971501234567@s.whatsapp.net"

# Export to custom folder
node wa-export.js --jid "971501234567@s.whatsapp.net" --output "./Documents/Exports"

# Export with limit
node wa-export.js --jid "971501234567@s.whatsapp.net" --limit 500
```

## Service Management

### Start Service
```bash
node wa-sync.js start
```
Runs in foreground. To run as background process, use:
```bash
npm run sync:start &
```

### Stop Service
```bash
node wa-sync.js stop
```

### Check Status
```bash
node wa-sync.js status
```

### View Logs
```bash
# Follow logs in real-time
tail -f ../logs/wa-sync.log

# Or open file directly
cat ../logs/wa-sync.log
```

## Database Info

**Location:** `Scripts/wa-store/messages.db`

**Tables:**
- `messages` — All WhatsApp messages (text, images, documents, etc.)
- `contacts` — Saved contacts with JID mapping
- `chats` — Chat metadata and last message time

**Query examples (if you want to access directly):**
```bash
# Install sqlite3 CLI if needed (Windows: choco install sqlite or download .exe)
sqlite3 "Scripts/wa-store/messages.db"

# Count messages from a phone number
SELECT COUNT(*) FROM messages WHERE jid = '971501234567@s.whatsapp.net';

# Find messages with specific text
SELECT * FROM messages WHERE text LIKE '%plan%' ORDER BY timestamp DESC;

# Export raw data to CSV
.mode csv
.output messages.csv
SELECT * FROM messages;
```

## Troubleshooting

### QR code doesn't appear
- Make sure WhatsApp on your phone is active and has internet
- Try again: `node wa-sync.js start`
- Check logs: `cat ../logs/wa-sync.log`

### "Not authenticated" error when sending
- Ensure service is running: `node wa-sync.js status`
- Run setup again: `node wa-sync.js start`

### Messages not syncing
- Ensure service is running: `node wa-sync.js status`
- Check WhatsApp phone is connected and online
- View logs: `cat ../logs/wa-sync.log`

### Database locked error
- Only one process can write at a time
- Make sure only one instance of `wa-sync.js` is running
- Don't open the database in another tool while service runs

## Comparison: Old vs New

| Feature | wacli | Baileys |
|---------|-------|---------|
| **OS** | Linux/Mac only | Windows, Mac, Linux |
| **Auth** | `wacli auth` | QR code + `wa-auth/` folder |
| **Send message** | `wacli send text --to` | `node wa-send.js --phone` |
| **Search** | `wacli messages search` | `node wa-search.js --phone` |
| **Export** | `wacli messages list` | `node wa-export.js --jid` |
| **Sync** | `./wacli-sync-service.sh` | `node wa-sync.js` |
| **Database** | Binary format | SQLite (readable) |

## Important Notes

- **Keep running:** Service must be running to receive messages
- **Phone online:** Your WhatsApp phone must be online for syncing
- **Don't share credentials:** `Scripts/wa-auth/` folder contains session keys — keep private
- **First sync:** Full history sync takes time (can be 10+ minutes for large histories)
- **Ban risk:** Like all unofficial APIs, there's a small ban risk — follow WhatsApp ToS

## Migration from wacli

If you were using `wacli` before:

1. Install Baileys: `npm install` (in Scripts folder)
2. Authenticate: `node wa-sync.js start` → scan QR code
3. Old wacli database will be ignored — all messages sync fresh from WhatsApp
4. Delete old wacli files if you want (but no need to)

---

**Questions?** Check the logs:
```bash
tail -f logs/wa-sync.log
```

Or review the script documentation inline in each `.js` file.
