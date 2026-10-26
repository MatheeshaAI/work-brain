# Quick Start: Baileys WhatsApp Integration

## ✅ Installation Complete!

Dependencies installed. You're ready to use WhatsApp integration.

## 🚀 Getting Started (5 minutes)

### Step 1: Start the Sync Service
```bash
cd "c:\Users\Matheesha-IM.AE\Desktop\Health Insurance\Scripts"
node wa-sync.js start
```

**You'll see a QR code in the terminal.**

### Step 2: Scan the QR Code
1. Open WhatsApp on your phone
2. Go: **Settings → Linked Devices → Link a Device**
3. Point phone at the QR code in terminal
4. Wait for "✓ WhatsApp connected" message

✅ **Service now syncing all messages to database**

---

## 📱 Send Message (Client Inquiry Example)

```bash
# Text message
node wa-send.js --phone "971501234567" --message "Hi, can you upgrade my plan?"

# Send quote document
node wa-send.js --phone "971501234567" --file "Documents/client/new-plan.pdf" --caption "Here's your new plan quote"
```

---

## 🔍 Search Conversation History

```bash
# By phone
node wa-search.js --phone "971501234567"

# By client name
node wa-search.js --name "Kenvil"

# By REF-ID
node wa-search.js --ref "HEA-AYS56M5E"
```

---

## 📤 Export Chat to File

```bash
# Export to markdown
node wa-export.js --jid "971501234567@s.whatsapp.net"

# Export with custom folder
node wa-export.js --jid "971501234567@s.whatsapp.net" --output "./Documents/exports"
```

---

## 🛑 Stop Service (When Done)

```bash
node wa-sync.js stop
```

---

## 📂 Where's My Data?

- **Messages stored:** `Scripts/wa-store/messages.db`
- **Auth credentials:** `Scripts/wa-auth/` (keep secure!)
- **Logs:** `logs/wa-sync.log`

---

## ❓ Troubleshooting

### QR code not showing?
- Make sure WhatsApp is open on your phone with internet
- Try again: `node wa-sync.js start`

### Messages not syncing?
- Check service is running: `node wa-sync.js status`
- View logs: `cat ../logs/wa-sync.log` (or open in editor)

### "Not authenticated" when sending?
- QR code scan didn't work. Run: `node wa-sync.js start` again

---

## 📖 Full Documentation

See: `Workflows/Workflow_Baileys_Setup.md` for complete guide.

---

**Ready to add client inquiries? Add to Leads markdown file:**

```markdown
## Inquiries & Interactions
- **Date:** 21-Apr-2026 14:30
- **Type:** Plan Upgrade Request
- **Details:** Client wants to upgrade from Plan A to Plan B
- **Status:** Quote sent, awaiting decision
```

Then search WhatsApp history:
```bash
node wa-search.js --phone "971501234567"
```

All incoming and outgoing messages are now stored in SQLite! 🎉
