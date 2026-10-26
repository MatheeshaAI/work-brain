---
name: imcrm-chrome-extension
description: IMCRM Data Extracting Chrome Extension — location, features, and purpose
---

# IMCRM Data Extracting Chrome Extension

**Location:** `IMCRM Data Extracting Extention/` (in project root)

**Type:** Chrome Extension (Manifest V3)

## What It Does

Extracts structured data from IMCRM (https://imcrm.alfred.ae/) health insurance quotes and automatically creates lead markdown files in the workspace.

## Files

- `manifest.json` — Extension configuration (MV3)
- `popup.html` — Extension popup UI
- `popup.js` — Main extraction logic (~626 lines)
- `content.js` — Content script for DOM interaction

## Key Features

### 1. Lead Details Extraction
Extracts from IMCRM quote pages:
- Ref-ID (HEA-XXXX format)
- Name (first + last name)
- Mobile, Email
- Nationality, Date of Birth
- Emirate of Visa
- Gender
- Member Category

**Method:** Reads from `<dl>/<dt>/<dd>` form elements on the page.

### 2. Member Details Extraction
- Extracts all family members from member tables
- Filters out non-member rows (activities, payments, documents, policies)
- Removes duplicates
- Falls back to lead info if no members found

### 3. Available Plans Extraction
- Lists all available insurance plans from the plans table
- Shows: Provider, Plan Name, Plan Type, Network, Co-pay, Price, Total Price

### 4. Basic Plans Extraction
- Filters plans by "basic" network criteria:
  - ✅ Include: E CARE BLUE, E CARE, AAFIYA (APN)
  - ❌ Exclude: Fidelity, Takaful Emarat, Essential, Dubai Care, etc.
- Max 2 plans per provider, sorted by price (lowest first)

## UI Buttons

- **Extract Data** — Lead + Members + Available Plans
- **Extract Basic Plans** — Basic plans only (filtered)
- **Copy to Clipboard** — Copy output
- **Debug** — Show DOM structure for troubleshooting
- **Create Lead File** — Creates markdown file in workspace (requires server running)

## Status

- ✅ Lead details extraction working
- ✅ Member details extraction working
- ✅ Available plans extraction working
- 🔄 Basic plans extraction (filtering in progress)

## Related
- See: IMCRM_Extension_How_to_Use.md
- See: IMCRM_Extension_Server.md
