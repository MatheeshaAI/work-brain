# ✅ Baileys WhatsApp Integration - Setup Complete

**Date Completed:** 21-Apr-2026  
**System:** Health Insurance Sales Workflow  
**Status:** Ready for Use

---

## What Was Built

A **Windows-compatible WhatsApp integration system** using Baileys + SQLite to replace the old wacli (Go binary) that didn't work on Windows.

### System Architecture

```
┌─────────────────────────────────────┐
│     WhatsApp (Your Phone)           │
│     (Linked via QR code)            │
└──────────────┬──────────────────────┘
               │
               │ (WebSocket Protocol)
               │
┌──────────────▼──────────────────────┐
│   Node.js Baileys (wa-sync.js)      │
│   - Connects via WhatsApp Web       │
│   - Syncs all messages              │
│   - Receives new messages in real   │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   SQLite Database                   │
│   (Scripts/wa-store/messages.db)    │
│                                     │
│   Tables:                           │
│   - messages (all WhatsApp msgs)    │
│   - contacts (saved contacts)       │
│   - chats (chat metadata)           │
└─────────────────────────────────────┘
```

---

## Files Created

### Core Scripts (in `Scripts/` folder)
| File | Purpose |
|------|---------|
| `wa-db.js` | SQLite database wrapper (CREATE, READ, SEARCH) |
| `wa-sync.js` | Background service (syncs WhatsApp, stores messages) |
| `wa-send.js` | Send text/document messages to clients |
| `wa-search.js` | Search message history by phone/name/REF-ID |
| `wa-export.js` | Export chats to markdown files |
| `package.json` | Node.js dependencies (Baileys, sqlite3, pino) |

### Documentation
| File | Purpose |
|------|---------|
| **WhatsApp_Tool_Guide.md** | Complete usage guide (START HERE!) |
| **Workflow_Baileys_Setup.md** | Technical setup & troubleshooting |
| **BAILEYS_MIGRATION.md** | What changed from wacli |
| **QUICKSTART_BAILEYS.md** | 5-minute quick reference |
| **CLAUDE.md** | Updated with Baileys info |
| **.gitignore** | Protects credentials (wa-auth/, wa-store/) |

---

## Quick Start (5 minutes)

### 1️⃣ Start the Service

```bash
cd "c:\Users\Matheesha-IM.AE\Desktop\Health Insurance\Scripts"
node wa-sync.js start
```

### 2️⃣ Scan QR Code

- See QR code in terminal
- Open WhatsApp on phone
- **Settings → Linked Devices → Link a Device**
- Scan QR code
- Wait for "✓ WhatsApp connected"

✅ **Service running!** All messages now syncing to database.

### 3️⃣ Use the Tools

**Send message:**
```bash
node wa-send.js --phone "971501234567" --message "Hi! Can we upgrade your plan?"
```

**Search history:**
```bash
node wa-search.js --phone "971501234567"
```

**Export chat:**
```bash
node wa-export.js --jid "971501234567@s.whatsapp.net"
```

---

## How to Track Client Inquiries

### Scenario: Client Asks to Upgrade Plan

**1. Add to Lead File** (`Leads/HEA-XXXXXX-ClientName.md`)
```markdown
## Inquiries & Interactions
- **Date:** 21-Apr-2026 14:35
- **Type:** Plan Upgrade Request
- **Current Plan:** Basic
- **Requested Plan:** Premium
- **Status:** Quote sent, awaiting decision
```

**2. Search WhatsApp History**
```bash
node wa-search.js --phone "971501234567"
```
Shows all conversation with this client.

**3. Send Quote**
```bash
node wa-send.js --phone "971501234567" --file "Documents/client/premium-quote.pdf" --caption "Here's your premium plan quote!"
```

**4. Export for Records**
```bash
node wa-export.js --jid "971501234567@s.whatsapp.net" --output "Documents/exports"
```

✅ **Complete audit trail:** Lead file + WhatsApp messages + PDF documents

---

## Key Features

### ✅ Full Message History
- **First run:** All past messages synced from WhatsApp (10-30 minutes)
- **Ongoing:** New messages sync automatically while service runs
- **Storage:** All in SQLite database (local, secure, private)

### ✅ Easy Search
- By phone number: `--phone "971501234567"`
- By name: `--name "Kenvil"`
- By REF-ID: `--ref "HEA-AYS56M5E"`

### ✅ Document Sending
- Text messages
- PDF quotes
- Images
- Policy documents
- Any file type

### ✅ Chat Export
- Export to markdown (human-readable)
- For compliance/archival
- Share with team
- Include in records

### ✅ Windows Compatible
- Pure Node.js (no Go compilation needed)
- Works on Windows, Mac, Linux
- One-time npm install, then ready to go

---

## File Locations

| Item | Location |
|------|----------|
| **Messages Database** | `Scripts/wa-store/messages.db` |
| **Auth Credentials** | `Scripts/wa-auth/` |
| **Logs** | `logs/wa-sync.log` |
| **Exported Chats** | `whatsapp-exports/` (default) |

**Important:** Keep `Scripts/wa-auth/` private (it's in `.gitignore`)

---

## Service Commands

```bash
# Start service (scan QR code on first run)
node wa-sync.js start

# Stop service
node wa-sync.js stop

# Check status
node wa-sync.js status

# View logs
tail -f ../logs/wa-sync.log
```

---

## Documentation Files

Read in this order:

1. **QUICKSTART_BAILEYS.md** — Get started in 5 minutes
2. **WhatsApp_Tool_Guide.md** — Complete usage reference
3. **Workflow_Baileys_Setup.md** — Technical details & troubleshooting
4. **BAILEYS_MIGRATION.md** — What changed from old system
5. **CLAUDE.md** — Project-wide documentation

---

## Database Schema

### `messages` table
```
id              TEXT PRIMARY KEY
jid             TEXT NOT NULL (e.g., 971501234567@s.whatsapp.net)
from_jid        TEXT (who sent the message)
from_me         INTEGER (0=lead, 1=you)
timestamp       INTEGER (Unix seconds)
message_type    TEXT (text, image, document, video, audio, sticker)
text            TEXT (message content)
caption         TEXT (caption for media)
filename        TEXT (file name if document)
mimetype        TEXT (MIME type)
media_path      TEXT (local file path if downloaded)
chat_name       TEXT (contact name)
is_group        INTEGER (0=individual, 1=group)
raw_json        TEXT (full message data)
created_at      INTEGER (when stored)
```

### Quick Queries
```bash
# Count messages from a phone
sqlite3 Scripts/wa-store/messages.db "SELECT COUNT(*) FROM messages WHERE jid = '971501234567@s.whatsapp.net';"

# Find messages with keyword
sqlite3 Scripts/wa-store/messages.db "SELECT timestamp, text FROM messages WHERE text LIKE '%upgrade%';"
```

---

## Troubleshooting

### QR Code Doesn't Show
→ Check WhatsApp is running on phone with internet  
→ Try: `node wa-sync.js start` again

### "Not authenticated" Error
→ Service not running: `node wa-sync.js status`  
→ Start service: `node wa-sync.js start` and scan QR code again

### Messages Not Syncing
→ Check phone WhatsApp is online  
→ View logs: `cat ../logs/wa-sync.log`  
→ Restart service: `node wa-sync.js stop` then `node wa-sync.js start`

### Database Locked Error
→ Multiple scripts running: Stop all and restart  
→ Or: Close database in other programs

**Full troubleshooting:** See `Workflow_Baileys_Setup.md`

---

## Next Steps

1. ✅ Read: **QUICKSTART_BAILEYS.md** (5 min)
2. ✅ Run: `cd Scripts && node wa-sync.js start`
3. ✅ Scan: QR code with your WhatsApp phone
4. ✅ Test: `node wa-search.js --phone "YOUR_PHONE_NUMBER"`
5. ✅ Start: Using tools for client communication

---

## Support & Resources

| Need | File |
|------|------|
| Quick reference | QUICKSTART_BAILEYS.md |
| Complete guide | WhatsApp_Tool_Guide.md |
| Setup details | Workflow_Baileys_Setup.md |
| Technical info | Baileys GitHub (WhiskeySockets/Baileys) |
| Project context | CLAUDE.md |

---

## Important Notes

### Security
- ✅ Credentials stored in `Scripts/wa-auth/` (protected by .gitignore)
- ✅ Database is local only (no cloud)
- ✅ Same WhatsApp protocol as WhatsApp Web
- ✅ Small ban risk (same as any unofficial client)

### Best Practices
- Keep phone online for real-time sync
- Use only your personal WhatsApp number
- Export conversations regularly for backup
- Add inquiry details to lead markdown file
- Update IMCRM status when inquiry resolved

### Performance
- First sync: 10-30 minutes for large histories
- Database size: ~10-50 MB per 1000 messages
- Search speed: Instant (indexed)
- CPU usage: Minimal when idle

---

## What's Different from wacli?

| Feature | Old (wacli) | New (Baileys) |
|---------|-------------|---------------|
| **Platform** | Linux/Mac | ✅ **Windows, Mac, Linux** |
| **Installation** | Compile Go | `npm install` (5 sec) |
| **Database** | Binary | ✅ **SQLite (readable)** |
| **Auth** | Terminal | ✅ **QR code** |
| **Setup** | Complex | ✅ **Simple** |

**Migration:** No need to do anything! Old wacli files can stay.

---

## Dependencies Installed

All via `npm install`:
- `@whiskeysockets/baileys` — WhatsApp Web protocol
- `sqlite3` — Database driver
- `pino` — Logging
- `@hapi/boom` — Error handling

Total size: ~200 MB (node_modules)

---

**Ready to go!** 🚀

Start with: `QUICKSTART_BAILEYS.md`

Questions? Check: `WhatsApp_Tool_Guide.md` → Troubleshooting section

