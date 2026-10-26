# Baileys Migration: From wacli to Windows-Compatible System

## What Changed?

| Item | Old (wacli) | New (Baileys) |
|------|-------------|---------------|
| **Platform** | Linux/Mac only | ✅ **Windows, Mac, Linux** |
| **Language** | Go binary | Node.js (JavaScript) |
| **Database** | Binary format | ✅ **SQLite (readable, portable)** |
| **Installation** | Compile from source | `npm install` (5 seconds) |
| **Authentication** | Terminal-based | QR code scan |
| **Send Message** | `wacli send text --to ...` | `node wa-send.js --phone ...` |
| **Search** | `wacli messages search` | `node wa-search.js --phone ...` |
| **Export** | `wacli messages list` | `node wa-export.js --jid ...` |
| **Sync Service** | Bash script (shell) | `node wa-sync.js` (pure Node.js) |

## Files Created

### Core Scripts
- **wa-db.js** — SQLite database wrapper (messages, contacts, chats tables)
- **wa-sync.js** — Background service (syncs WhatsApp history, receives new messages)
- **wa-send.js** — Send text/document messages
- **wa-search.js** — Search message history
- **wa-export.js** — Export chats to markdown
- **package.json** — Node.js dependencies

### Documentation
- **Workflow_Baileys_Setup.md** — Complete setup & usage guide
- **QUICKSTART_BAILEYS.md** — 5-minute quick start
- **.gitignore** — Added wa-auth/ and wa-store/ to keep credentials private

## How to Use

### Initial Setup (One-time)
```bash
cd "Scripts"
npm install
node wa-sync.js start    # Scan QR code with phone
```

### Daily Use

**Send a message about client inquiry:**
```bash
node wa-send.js --phone "971501234567" --message "Hi! About your plan upgrade inquiry..."
```

**Search previous conversation:**
```bash
node wa-search.js --phone "971501234567"
```

**Export full chat history:**
```bash
node wa-export.js --jid "971501234567@s.whatsapp.net"
```

## Key Features

✅ **Full History Sync** — All past messages downloaded to local SQLite on first run
✅ **New Message Sync** — Continuous syncing while service runs
✅ **Local Database** — No cloud storage, all data stays private
✅ **Text Search** — Find messages by phone, name, or content
✅ **Document Export** — Export any chat to readable markdown file
✅ **Client Inquiry Tracking** — Combine with lead markdown files for complete history

## Database Location

**File:** `Scripts/wa-store/messages.db` (SQLite)

**Tables:**
- `messages` — All WhatsApp messages (text, images, documents, etc.)
- `contacts` — Phone contacts with JID mapping
- `chats` — Chat metadata (names, last message time)

## Important Notes

### ⚠️ Keep These Safe
- `Scripts/wa-auth/` folder — WhatsApp session keys (like passwords)
  - Already in `.gitignore`
  - Never commit to git
  - Don't share with others

### 📊 Message History
- **First sync:** Can take 10-30 minutes for large histories
- **Format:** All timestamps stored as Unix seconds
- **Duplicates:** Handled automatically (INSERT OR IGNORE)

### 🔒 Security
- No cloud sync — all data local
- Standard WhatsApp protocol (Baileys reverse-engineers WhatsApp Web)
- Small ban risk (same as any unofficial client)
- Keep phone online for real-time sync

## Quick Reference

```bash
# Start service (run once when system boots)
node wa-sync.js start

# Stop service (before shutting down)
node wa-sync.js stop

# Check if running
node wa-sync.js status

# Send message (with documents)
node wa-send.js --phone "971501234567" --message "Hello" [--file path --caption "text"]

# Search by phone/name/REF-ID
node wa-search.js --phone "971501234567" [--limit 100]

# Export chat
node wa-export.js --jid "971501234567@s.whatsapp.net" [--output folder]
```

## Comparison: How to Track Client Inquiries

### Old Way (with wacli)
1. Manually search `wacli messages search "client name"`
2. Manually create notes
3. No persistent database

### New Way (with Baileys + SQLite)
1. ✅ All messages auto-saved to database
2. ✅ Search history anytime: `node wa-search.js --phone "971501234567"`
3. ✅ Add inquiry to lead markdown file
4. ✅ Export conversation: `node wa-export.js --jid "971501234567@s.whatsapp.net"`
5. ✅ Archive for compliance

## Example Workflow: Client Plan Upgrade

**1. Receive inquiry on WhatsApp**
```
Client: "Can you upgrade my plan to a better one?"
```

**2. Add to lead file** (`Leads/HEA-XXXXXX-ClientName.md`)
```markdown
## Inquiries & Interactions
- **Date:** 21-Apr-2026 14:35
- **Type:** Plan Upgrade Request
- **Details:** Wants to upgrade from basic to premium
- **Status:** Quote prepared
```

**3. Send updated quote**
```bash
node wa-send.js --phone "971501234567" --file "Documents/client/premium-plan.pdf" --caption "Here's your premium plan quote"
```

**4. Track conversation**
```bash
node wa-search.js --phone "971501234567"
```

**5. Export for records** (if needed)
```bash
node wa-export.js --jid "971501234567@s.whatsapp.net" --output "./Documents/exports"
```

All done! Complete audit trail: lead file + WhatsApp messages + PDF documents.

## Next Steps

1. ✅ Read: [QUICKSTART_BAILEYS.md](QUICKSTART_BAILEYS.md)
2. ✅ Start service: `node wa-sync.js start`
3. ✅ Scan QR code
4. ✅ Test: `node wa-search.js --phone "YOUR_NUMBER"`
5. ✅ Start tracking client inquiries!

---

**Questions?** Check logs:
```bash
cat logs/wa-sync.log
```

Or see full docs in `Workflows/Workflow_Baileys_Setup.md`
