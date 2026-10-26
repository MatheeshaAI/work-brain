# WhatsApp Tool Guide - Baileys Integration

Complete guide for using the Baileys WhatsApp integration system for client communication and inquiry tracking.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Service Management](#service-management)
3. [Sending Messages](#sending-messages)
4. [Searching History](#searching-history)
5. [Exporting Chats](#exporting-chats)
6. [Client Inquiry Workflow](#client-inquiry-workflow)
7. [Troubleshooting](#troubleshooting)
8. [Database Info](#database-info)

---

## Quick Start

### One-Time Setup (First Run)

```bash
# Navigate to Scripts folder
cd "c:\Users\Matheesha-IM.AE\Desktop\Health Insurance\Scripts"

# Start the service
node wa-sync.js start
```

**What you'll see:**
- QR code printed in terminal
- "Starting WhatsApp sync service..."
- "Syncing WhatsApp messages (continuous)..."

**Next: Scan the QR code**
1. Open WhatsApp on your phone
2. Go to **Settings → Linked Devices → Link a Device**
3. Point phone camera at the QR code in terminal
4. Wait for confirmation message
5. Service begins syncing all message history automatically

✅ **Setup complete!** Service now runs continuously.

---

## Service Management

### Start Service
```bash
node wa-sync.js start
```
Runs in terminal foreground. To run in background:
```bash
# Windows: Run in separate terminal
node wa-sync.js start

# Or use NPM script
npm run sync:start
```

### Stop Service
```bash
node wa-sync.js stop
```

### Check Service Status
```bash
node wa-sync.js status
```

Output example:
```
✓ Status: Running (PID: 12345)
📄 Log file: ../logs/wa-sync.log
```

### View Live Logs
```bash
# Follow logs in real-time
tail -f ../logs/wa-sync.log

# View last 50 lines
tail -50 ../logs/wa-sync.log

# Search logs for errors
grep "ERROR" ../logs/wa-sync.log
```

---

## Sending Messages

### Send Text Message

**Syntax:**
```bash
node wa-send.js --phone "<phone_number>" --message "<message_text>"
```

**Example:**
```bash
node wa-send.js --phone "971501234567" --message "Hi Kenvil! Your insurance quote is ready. Can we discuss?"
```

**Requirements:**
- Phone number in international format without `+` (e.g., `971501234567`)
- Service must be running for authentication to work

### Send Document with Caption

**Syntax:**
```bash
node wa-send.js --phone "<phone_number>" --file "<file_path>" --caption "<caption_text>"
```

**Example (PDF Quote):**
```bash
node wa-send.js --phone "971501234567" --file "Documents/Kenvil Fernandes - HEA-AYS56M5E/Quote.pdf" --caption "Here's your insurance quote - let me know if you have any questions!"
```

**Example (Policy Document):**
```bash
node wa-send.js --phone "971501234567" --file "Documents/Kenvil Fernandes - HEA-AYS56M5E/PolicyCertificate.pdf" --caption "Your policy is now active! Here's your certificate."
```

**Supported File Types:**
- PDF (quotes, documents, certificates)
- Images (JPG, PNG)
- Word documents
- Excel sheets
- Any file type (uses MIME type detection)

**Best Practices:**
- Use relative paths from Scripts folder
- Include file paths in quotes if they contain spaces
- Keep captions professional and brief
- Always provide context in the caption

---

## Searching History

### Search by Phone Number

**Syntax:**
```bash
node wa-search.js --phone "<phone_number>" [--limit <number>]
```

**Example:**
```bash
node wa-search.js --phone "971501234567"
```

Shows all messages with this client, newest first.

**With limit:**
```bash
node wa-search.js --phone "971501234567" --limit 100
```
Shows last 100 messages (default is 50).

### Search by Client Name

**Syntax:**
```bash
node wa-search.js --name "<partial_name>" [--limit <number>]
```

**Examples:**
```bash
# Find all messages mentioning Kenvil
node wa-search.js --name "Kenvil"

# Search for Mandip conversations
node wa-search.js --name "Mandip"

# Limit to 30 results
node wa-search.js --name "Kenvil" --limit 30
```

### Search by REF-ID

**Syntax:**
```bash
node wa-search.js --ref "<REF_ID>" [--limit <number>]
```

**Examples:**
```bash
# Search using lead reference ID
node wa-search.js --ref "HEA-AYS56M5E"

# With custom limit
node wa-search.js --ref "HEA-AYS56M5E" --limit 100
```

### Search Output

Example output:
```
Found 42 messages:

[1] 21-Apr-2026, 14:35 📥 Lead
    Can you help me upgrade my plan?

[2] 21-Apr-2026, 14:40 📤 You
    Of course! Let me get you some options.

[3] 21-Apr-2026, 15:10 📥 Lead
    Thanks! I'm interested in the premium plan

-------------------------------------------
Last contact: 21-Apr-2026, 15:10
Total messages: 42
Chat: 971501234567@s.whatsapp.net
```

**Legend:**
- `📥 Lead` = Message from client
- `📤 You` = Message you sent
- Timestamp = When message was sent

---

## Exporting Chats

### Export to Markdown File

**Syntax:**
```bash
node wa-export.js --jid "<jid>" [--output <folder>] [--limit <number>]
```

**Required:** Use JID format `971501234567@s.whatsapp.net`

**Examples:**

```bash
# Export to default folder (./whatsapp-exports)
node wa-export.js --jid "971501234567@s.whatsapp.net"

# Export to custom folder
node wa-export.js --jid "971501234567@s.whatsapp.net" --output "Documents/exports"

# Export limited messages
node wa-export.js --jid "971501234567@s.whatsapp.net" --limit 200
```

### Export Output

Creates markdown file like:
```
# WhatsApp Conversation Export

**Chat JID:** 971501234567@s.whatsapp.net
**Exported:** 21-Apr-2026 15:45:30
**Total Messages:** 42

---

**Lead** - *21-Apr-2026, 14:35*
Can you help me upgrade my plan?

**You** - *21-Apr-2026, 14:40*
Of course! Let me get you some options.

**Lead** - *21-Apr-2026, 15:10*
Thanks! I'm interested in the premium plan

[... more messages ...]
```

**Use Cases:**
- Archive conversations for compliance
- Share with team members
- Document client requirements
- Attach to emails as records
- Create policy documentation

---

## Client Inquiry Workflow

### Step 1: Receive Inquiry (WhatsApp)
Client messages you asking to upgrade their plan.

### Step 2: Add to Lead File
Update the client's markdown file with inquiry details:

```markdown
## Inquiries & Interactions
- **Date:** 21-Apr-2026 14:35
- **Type:** Plan Upgrade Request
- **Current Plan:** Basic Health
- **Requested Plan:** Premium Health
- **Reason:** Wants better coverage
- **Quote Sent:** Yes (21-Apr-2026)
- **Status:** Awaiting client decision
```

### Step 3: Search Conversation History
```bash
node wa-search.js --phone "971501234567"
```

Verify full conversation history is captured.

### Step 4: Send Quote/Response

```bash
# Send text response
node wa-send.js --phone "971501234567" --message "Your new quote is ready! Let me send it to you."

# Send quote document
node wa-send.js --phone "971501234567" --file "Documents/client/premium-quote.pdf" --caption "Here's your premium plan quote with comparison to your current plan"
```

### Step 5: Document for Records

```bash
# Export full conversation
node wa-export.js --jid "971501234567@s.whatsapp.net" --output "Documents/exports"
```

Save exported markdown to client folder for audit trail.

### Step 6: Update Lead Status (IMCRM)
Once inquiry is resolved, update IMCRM status (use `alfred-lead-status-update` skill).

---

## Troubleshooting

### Issue: QR Code Doesn't Appear

**Symptoms:** Run `node wa-sync.js start` but no QR code shows

**Solutions:**
1. Make sure WhatsApp is installed and running on phone
2. Check phone has active internet connection
3. Try again: `node wa-sync.js start`
4. Check logs: `tail ../logs/wa-sync.log`

**If still fails:**
- Delete `wa-auth/` folder: `rm -rf wa-auth`
- Start fresh: `node wa-sync.js start`

### Issue: "Not authenticated" When Sending Message

**Symptoms:**
```
✗ Not authenticated. Run wa-sync.js first to authenticate.
```

**Solutions:**
1. Check service is running: `node wa-sync.js status`
2. Start service: `node wa-sync.js start`
3. Scan QR code again
4. Verify `wa-auth/` folder has files

### Issue: Messages Not Syncing

**Symptoms:**
- Service running but no new messages appear
- Search returns old messages only

**Solutions:**
1. Check phone WhatsApp is online (has internet)
2. Check service logs: `tail ../logs/wa-sync.log`
3. Restart service: `node wa-sync.js stop` then `node wa-sync.js start`
4. Check database isn't locked (only one script using it)

### Issue: "Database locked" Error

**Symptoms:**
```
Error: database is locked
```

**Causes:**
- Multiple scripts running simultaneously
- Database file open in another program
- Previous script didn't close properly

**Solutions:**
1. Stop service: `node wa-sync.js stop`
2. Wait 5 seconds
3. Restart: `node wa-sync.js start`
4. Don't run multiple scripts at once

### Issue: Permission Denied

**Symptoms:**
```
Error: Permission denied
```

**Solutions (Windows):**
1. Run terminal as Administrator
2. Or check file permissions in File Explorer
3. Ensure Scripts folder is writable

---

## Database Info

### Database Location
```
Scripts/wa-store/messages.db
```

SQLite database automatically created on first run.

### Database Tables

**messages**
- All WhatsApp messages (text, images, documents)
- Fields: id, jid, from_jid, from_me, timestamp, message_type, text, caption, filename, mimetype, media_path, created_at
- Indexed by: jid (chat), timestamp (date), text (search)

**contacts**
- Saved WhatsApp contacts
- Fields: jid, name, notify, phone

**chats**
- Chat metadata
- Fields: jid, name, last_message_time

### Database Size
- Typical: 10-50 MB per 1000 messages
- Keep backups: Database contains all client communications

### Backup Strategy

```bash
# Backup database
cp Scripts/wa-store/messages.db Scripts/wa-store/messages.db.backup

# Backup credentials
cp -r Scripts/wa-auth Scripts/wa-auth.backup
```

Schedule monthly backups for compliance.

### Direct Database Access (Advanced)

If you have SQLite CLI:
```bash
# Connect to database
sqlite3 Scripts/wa-store/messages.db

# Count messages from a phone
SELECT COUNT(*) FROM messages WHERE jid = '971501234567@s.whatsapp.net';

# Find messages with keyword
SELECT timestamp, text FROM messages WHERE text LIKE '%upgrade%' ORDER BY timestamp DESC;

# Export to CSV
.mode csv
.output messages.csv
SELECT * FROM messages;
```

---

## Reference

### Phone Number Format

Always use international format **without** `+`:
- ✅ Correct: `971501234567`
- ❌ Wrong: `+971501234567`
- ❌ Wrong: `971-501-234567`

### JID Format (For Exports)

Use format: `<phone>@s.whatsapp.net`
- Example: `971501234567@s.whatsapp.net`

### File Path Format

Use relative paths from Scripts folder:
- ✅ Correct: `"Documents/client/quote.pdf"`
- ✅ Correct: `../Documents/client/quote.pdf`
- ❌ Wrong: `C:\Users\...\Documents\quote.pdf`

### Message Type Codes

Stored in database:
- `text` = Text message
- `image` = Image attachment
- `document` = PDF or file
- `audio` = Audio message
- `video` = Video file
- `sticker` = Sticker

---

## Quick Command Reference

```bash
# Service
node wa-sync.js start          # Start service
node wa-sync.js stop           # Stop service
node wa-sync.js status         # Check status

# Send
node wa-send.js --phone "971501234567" --message "text"
node wa-send.js --phone "971501234567" --file "path.pdf" --caption "caption"

# Search
node wa-search.js --phone "971501234567"
node wa-search.js --name "Kenvil"
node wa-search.js --ref "HEA-AYS56M5E"

# Export
node wa-export.js --jid "971501234567@s.whatsapp.net"
node wa-export.js --jid "971501234567@s.whatsapp.net" --output "folder"

# Logs
tail -f ../logs/wa-sync.log
cat ../logs/wa-sync.log
```

---

## Support

- **Full Setup Guide:** See `Workflow_Baileys_Setup.md`
- **Project Info:** See `CLAUDE.md`
- **Migration Notes:** See `BAILEYS_MIGRATION.md`
- **Logs Location:** `logs/wa-sync.log`

For issues, check logs and troubleshooting section above.
