---
name: imcrm-extension-server
description: How to start the local Node.js server required for the IMCRM Chrome Extension
---

# IMCRM Extension Local Server

## What It Does

The IMCRM Chrome Extension creates lead markdown files by sending data to a local Node.js server. The server:
- Receives extracted lead data from the extension
- Creates `Workspace/Leads/[REF_ID]-[Name].md` files
- Creates `Workspace/Documents/[REF_ID]-[Name]/` folders
- Adds rows to PIPELINE.md

**Required for:** Using the "Create Lead File" button in the extension.

## Starting the Server

### Command
```powershell
node Scripts/lead-file-server.js
```

### Steps

1. Open PowerShell
2. Navigate to project directory (if not already there):
   ```powershell
   cd C:\Users\mathe\Desktop\PKM_System\Health-Insurance
   ```
3. Run the server:
   ```powershell
   node Scripts/lead-file-server.js
   ```
4. You should see output like:
   ```
   Server running on http://localhost:3000
   ```
   (or another port — check the console output)

5. Keep this terminal **open and running** while you use the extension

### Stopping the Server
- Press `Ctrl+C` in the PowerShell window

## Important Notes

**Server must stay running:**
- The server runs in the foreground (doesn't background automatically)
- You must keep the terminal open while using the extension
- Close the terminal only when finished using the extension

**Error: "Failed to fetch"**
- Server is not running
- Or server crashed
- Check the PowerShell terminal for error messages
- Restart with `node Scripts/lead-file-server.js`

**Error: "EADDRINUSE: address already in use"**
- Another process is using the port
- Kill the existing process: `Get-Process node | Stop-Process`
- Start the server again

## File Location
```
Scripts/
└── lead-file-server.js
```

## Related
- See: IMCRM_Chrome_Extension.md
- See: IMCRM_Extension_How_to_Use.md
