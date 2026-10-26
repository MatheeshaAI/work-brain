# 🚀 RUN THIS NOW - WhatsApp Setup Instructions

## Quick Start

**Copy and paste this in your terminal/PowerShell:**

```bash
cd "c:\Users\Matheesha-IM.AE\Desktop\Health Insurance\Scripts"
node wa-sync-simple.js start
```

## What You'll See

1. **Connection attempts** (normal, takes 10-30 seconds)
   ```
   🚀 Starting WhatsApp sync service...
   connected to WA
   not logged in, attempting registration...
   ```

2. **QR Code appears** (when ready)
   ```
   ╔════════════════════════════════════════════════════════════╗
   ║          📱  SCAN THIS QR CODE WITH YOUR PHONE  📱        ║
   ╚════════════════════════════════════════════════════════════╝
   
   ██████████████████████████████████
   ██          QR CODE HERE          ██
   ██████████████████████████████████
   
   INSTRUCTIONS:
   1️⃣  Open WhatsApp on your phone
   2️⃣  Go to: Settings → Linked Devices → Link a Device
   3️⃣  Point your phone camera at the QR code above
   4️⃣  Wait for "✓ WhatsApp connected" message
   ```

3. **Success message**
   ```
   ✅ WhatsApp connected!
   
   Service is running. All messages are being synced...
   
   Press Ctrl+C to stop.
   ```

## Scan the QR Code

### Steps:

1. **Open WhatsApp on your phone**
2. **Go to Settings**
   - Tap your profile icon
   - Select "Settings"

3. **Find Linked Devices**
   - Scroll down to "Linked Devices"
   - Tap "Link a Device"

4. **Scan the QR Code**
   - Point your phone camera at the QR code in the terminal
   - A checkmark will appear when scanned
   - Wait for confirmation

5. **Confirm in Terminal**
   - You'll see `✅ WhatsApp connected!`
   - Service is now running

## After Setup

Service will run in the background syncing all messages.

### To Stop Service
Press: `Ctrl + C`

### To Use Tools

**Send message:**
```bash
node wa-send.js --phone "971501234567" --message "Hello!"
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

## Troubleshooting

### Issue: QR Code Never Appears

**What's likely happening:**
- Connection is still trying (can take up to 1 minute first time)
- WhatsApp server response delay

**What to do:**
1. Wait 60 seconds - it may still appear
2. If nothing happens, press `Ctrl + C` to stop
3. Try again: `node wa-sync-simple.js start`
4. Make sure WhatsApp is open on your phone with internet

### Issue: "Connection Failure" Errors Keep Appearing

**This is normal!** Baileys automatically retries.

Just wait and watch for the QR code to appear. If after 2 minutes no QR code appears:
1. Stop: `Ctrl + C`
2. Delete credentials: `rm -rf wa-auth`
3. Try again: `node wa-sync-simple.js start`

### Issue: QR Code Scanned But Didn't Connect

**WhatsApp didn't authorize the device.**

1. Stop: `Ctrl + C`
2. Go to WhatsApp → Settings → Linked Devices
3. Delete the device you just added
4. Try again: `node wa-sync-simple.js start`

---

## How It Works

1. **Baileys connects** to WhatsApp using the Web protocol (like WhatsApp Web)
2. **Generates a QR code** for you to scan (links your phone)
3. **Syncs all messages** from WhatsApp to SQLite database
4. **Stores them locally** (no cloud, all private)
5. **You can search/export** messages anytime using the other scripts

---

## Next: Use the Tools

Once connected, use these commands:

```bash
# Send text
node wa-send.js --phone "971501234567" --message "Your quote is ready!"

# Send document
node wa-send.js --phone "971501234567" --file "Documents/client/quote.pdf" --caption "Here's your quote"

# Search by phone
node wa-search.js --phone "971501234567"

# Search by name
node wa-search.js --name "Kenvil"

# Export to file
node wa-export.js --jid "971501234567@s.whatsapp.net"
```

---

## System Requirements

✅ Node.js installed (already installed: v22.17.0)  
✅ WhatsApp installed on phone  
✅ Phone has internet connection  
✅ Computer has internet connection  

---

**Ready? Run this now:**

```bash
cd "c:\Users\Matheesha-IM.AE\Desktop\Health Insurance\Scripts"
node wa-sync-simple.js start
```

Then scan the QR code with your phone! 📱

---

**Questions?** See `WhatsApp_Tool_Guide.md` for complete documentation.
