# IMCRM Data Extraction Extension - Plan

## Project Overview
Create a Chrome extension that extracts data from the IMCRM (insurance CRM) website at https://imcrm.alfred.ae/

---

## Features Implemented

### 1. Lead Details Extraction ✅
- **Ref-ID**: Extract from page text (format: HEA-XXXX)
- **Name**: From FIRST NAME + LAST NAME fields
- **Mobile**: From MOBILE NUMBER field
- **Email**: From EMAIL field
- **Nationality**: From NATIONALITY field
- **Date of Birth**: From DATE OF BIRTH field
- **Emirate of Visa**: From EMIRATE OF VISA field
- **Gender**: From GENDER field
- **Member Category**: From MEMBER CATEGORY field

**Method**: Uses `<dl>/<dt>/<dd>` element pairs found in the CRM form

### 2. Member Details Extraction ✅
- Extracts member information from tables
- Filters out non-member rows (activities, payments, documents, policies)
- Removes duplicate entries
- Falls back to lead info if no members found

### 3. Basic Plans Extraction 🔄 (In Progress)
- **Goal**: Extract only Basic health insurance plans
- **Basic Network Criteria**: E CARE BLUE, E CARE, AAFIYA (APN) networks
- **Max**: 2 plans per insurance provider
- **Sort**: By price (lowest first)

### 4. Available Plans Extraction ✅
- Extracts all available plans from the plans table
- Includes Provider, Plan Name, Plan Type, Network, Co-pay, Price, Total Price

---

## Basic Plans Filter Rules

### Include (Basic Plans)
| Network | Notes |
|---------|-------|
| E CARE BLUE | Include |
| E CARE | Include |
| AAFIYA (APN) | Include |

### Exclude
| Provider/Plan | Reason |
|---------------|--------|
| Fidelity | Not Basic |
| Takaful Emarat Silver | Not Basic |
| HAYAH RN3/CARE PROTECT | Not Basic |
| Essential | Not Basic |
| Dubai Care | Not Basic |
| Blue (Enhance) | Not Basic |

---

## Known Issues

### Issue: Basic Plans Returns 0 Results
**Status**: Debugging in progress

**Possible Causes**:
1. Network column header detection may not match actual column name
2. The "Available Plans" table uses lazy loading (shows "1-15 of 382")
3. Network names may differ from expected patterns
4. Header text parsing may be case-sensitive or have extra spaces

**Debugging Steps**:
1. Use Debug button to inspect page DOM structure
2. Check console logs in DevTools for plan detection
3. Verify header index detection for network column
4. Test with actual IMCRM page containing plans

---

## File Structure
```
IMCRM Data Extracting Extension/
├── manifest.json      # Chrome Extension Manifest (MV3)
├── popup.html         # Extension popup UI
└── popup.js           # Main extraction logic (~626 lines)
```

---

## UI Components
1. **Extract Data** button - Extracts Lead + Members + Available Plans
2. **Extract Basic Plans** button - Extracts only Basic plans (filtered)
3. **Copy to Clipboard** button - Copies formatted output
4. **Debug** button - Shows DOM structure for troubleshooting
5. **Status** area - Shows extraction status/messages
6. **Output** area - Displays formatted extraction results

---

## Next Steps

### Priority 1: Fix Basic Plans Extraction
- [ ] Test with real IMCRM page
- [ ] Verify console.log output shows plans
- [ ] Check network column header index
- [ ] Adjust filter logic if needed

### Priority 2: Lazy Loading Handling
- [ ] Detect if more plans exist ("1-15 of 382" pattern)
- [ ] Add option to load all plans or warn user

### Priority 3: Output Formatting
- [ ] Ensure Copy to Clipboard works correctly
- [ ] Format output as clean bullet list

---

## Testing Notes
- Open IMCRM at https://imcrm.alfred.ae/
- Navigate to a health quote with available plans
- Click extension icon to open popup
- Use Debug button first to inspect page structure
