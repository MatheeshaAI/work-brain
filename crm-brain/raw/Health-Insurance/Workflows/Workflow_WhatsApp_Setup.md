# Workflow: WhatsApp Setup with wacli

## Overview

This workflow guides you through installing and authenticating **wacli**, a command-line WhatsApp client for local message management, search, and archival.

## Prerequisites

- Go 1.25+ installed on your system
- WhatsApp account on your primary mobile device
- Windows, macOS, or Linux

## Installation Steps

### Step 1: Install Go

**Windows:**
1. Visit https://go.dev/dl/
2. Download `go1.26.2.windows-amd64.zip` (or latest)
3. Extract to `C:\Program Files\Go`
4. Add to Windows PATH: `C:\Program Files\Go\bin`
5. Verify: Open PowerShell, run `go version`

**macOS (Homebrew):**
```bash
brew install go
go version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install golang-go
go version
```

### Step 2: Build wacli

Clone and build wacli from source:

```bash
# Clone repository
git clone https://github.com/steipete/wacli.git
cd wacli

# Build with FTS5 support (enables full-text search)
go build -tags sqlite_fts5 -o ./wacli ./cmd/wacli

# Move to PATH (optional but recommended)
# On Windows: wacli.exe should be in current directory or PATH
# On macOS/Linux: mv ./wacli /usr/local/bin/
```

### Step 3: Authenticate with WhatsApp

**First-time setup:**

```bash
wacli auth
```

This displays a QR code in your terminal.

**On your phone:**
1. Open WhatsApp
2. Go to Settings → Linked Devices (or Connected Devices)
3. Tap "Link a device"
4. Point your phone's camera at the QR code in the terminal
5. Scan it

The terminal shows:
```
Successfully authenticated!
Store initialized at: ./.wacli-store/
```

This creates session files in `./wacli-store/`:
- `session.db` - WhatsApp encryption keys (KEEP SECURE)
- `wacli.db` - Message history and contacts (SQLite)
- `media/` - Downloaded files

### Step 4: Configure Environment Variables

Edit `.env` file and add:

```bash
# WhatsApp CLI configuration
WACLI_STORE_DIR=./wacli-store
WACLI_DEVICE_LABEL="Matheesha's Insurance Lead Manager"
```

### Step 5: Verify Installation

```bash
# Check auth status
wacli auth status
# Output: "Authenticated as: +971..."

# Check store health
wacli doctor
# Shows store location, auth status, database health, lock file status

# List chats
wacli chats list --limit 10
```

## Troubleshooting

### Issue: "wacli command not found"
- **Cause:** wacli not in PATH
- **Fix:** Add directory containing `wacli` (or `wacli.exe` on Windows) to PATH environment variable

### Issue: "Timeout scanning QR code"
- **Cause:** QR code not scanned within 30 seconds
- **Fix:** Run `wacli auth` again and scan quickly

### Issue: "Store lock file exists"
- **Cause:** Another wacli process is running or crashed
- **Fix:** Check running processes, or delete `.wacli-store/LOCK` if no process is running

### Issue: "Not authenticated"
- **Cause:** Session expired or lost primary device connection
- **Fix:** Run `wacli auth` again to re-authenticate

## Starting Background Sync

Once authenticated, keep WhatsApp synced continuously:

**Option A: Run in terminal (foreground)**
```bash
wacli sync --follow --download-media
```

**Option B: Run as service (background)**
```bash
# Start sync service
./Scripts/wacli-sync-service.sh start

# Check status
./Scripts/wacli-sync-service.sh status

# View logs
./Scripts/wacli-sync-service.sh logs

# Stop when done
./Scripts/wacli-sync-service.sh stop
```

## What Gets Stored

All data stored locally in `./.wacli-store/`:

- **Messages:** Full-text searchable SQLite database
- **Contacts:** Phone numbers, names, aliases
- **Groups:** Group memberships, settings
- **Media:** Images, documents, voice notes (if `--download-media`)

## Security Notes

⚠️ **Important:**
- `.wacli-store/session.db` contains WhatsApp encryption keys—**treat it like a password**
- **Do not share** or commit to version control
- Add to `.gitignore`:
  ```
  .wacli-store/
  *.db
  .LOCK
  ```
- Session is logged in as your WhatsApp account
- Primary device must have WhatsApp open to receive new messages

## Next Steps

After setup, refer to:
- **Workflow_WhatsApp_Send_Message.md** - Send quotes/messages to leads
- **Workflow_WhatsApp_Search.md** - Search conversation history
- **Workflow_WhatsApp_Lead_Tracking.md** - Integrate with lead workflow
