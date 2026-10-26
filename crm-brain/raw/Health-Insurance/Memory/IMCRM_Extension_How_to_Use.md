---
name: imcrm-extension-how-to-use
description: Step-by-step guide to load and use the IMCRM Data Extracting Chrome Extension
---

# How to Use the IMCRM Data Extracting Chrome Extension

## Loading the Extension into Chrome

1. Open Chrome browser
2. Go to `chrome://extensions`
3. Toggle **Developer mode** (top right corner)
4. Click **Load unpacked**
5. Navigate to and select: `IMCRM Data Extracting Extention` folder in your project
6. Click **Select Folder**

The extension icon will appear in your Chrome toolbar.

## Using the Extension

### Step 1: Navigate to IMCRM Quote Page
1. Go to https://imcrm.alfred.ae/
2. Log in with your credentials
3. Find and open a health insurance quote with available plans
4. The page should show lead details and a plans table

### Step 2: Open Extension Popup
- Click the extension icon in your Chrome toolbar
- A popup window opens with extraction buttons

### Step 3: Extract Data

**Option A: Extract All Data**
- Click **Extract Data**
- Extension shows: Lead details + Members + Available Plans
- Review the formatted output in the popup

**Option B: Extract Only Basic Plans**
- Click **Extract Basic Plans**
- Shows filtered list of "basic" plans (E CARE BLUE, E CARE, AAFIYA networks only)

**Option C: Create Lead File**
- Click **Create Lead File** (requires local server running)
- Creates markdown file: `Workspace/Leads/[REF_ID]-[Name].md`
- Creates document folder: `Workspace/Documents/[REF_ID]-[Name]/`

### Step 4: Copy or Review
- Click **Copy to Clipboard** to copy formatted output
- Click **Debug** to inspect the page DOM structure (for troubleshooting)

## Troubleshooting

**Error: "Could not create lead. Make sure the local server is running"**
- The Node.js server is not running
- Open PowerShell and run: `node Scripts/lead-file-server.js`
- Keep the terminal open while using the extension
- See: IMCRM_Extension_Server.md

**Error: "0 results" for Basic Plans**
- Some pages use lazy loading (shows "1-15 of 382")
- Not all plans may be loaded yet
- Click **Debug** button and check DevTools console for clues
- Verify page has plans table visible

**Extension Icon Not Showing**
- Reload Chrome
- Make sure Developer mode is still ON at `chrome://extensions`
- Check that extension was loaded successfully (green status)

## Best Practices

- **Always use Debug first** if extraction seems off
- **Keep the server running** when creating lead files
- **Review output** before copying to clipboard
- **Check the popup console** (F12 → Console) if something fails

## Related
- See: IMCRM_Chrome_Extension.md
- See: IMCRM_Extension_Server.md
