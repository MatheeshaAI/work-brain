# IMCRM Data Extractor — Handoff

## Extension Location

```
C:\Users\mathe\Desktop\PKM_System\Health-Insurance\IMCRM Data Extracting Extention
```

Loaded as **unpacked extension** in **Chrome Profile 4**.
Extension ID: `nmchdolojjgaaoajokfgmlcclkogdebc`

**ONLY** edit files in the path above. The `(Copy )` folder in `Inbox - Thinking & Capture` is stale — ignore it.

---

## Files & Responsibilities

| File | Role |
|------|------|
| `popup.html` | UI: 6 buttons with CSS styling |
| `popup.js` | All logic — event handlers, injected extraction functions, formatters (~900 lines) |
| `content.js` | Legacy (no longer used) |
| `manifest.json` | Extension metadata (rarely changed) |
| `PLAN.md` | Original project notes (reference only) |

---

## The 6 Buttons

| Button | `lastExtractionType` | What it does |
|--------|----------------------|-------------|
| **Extract Health Lead** | `lead` | Extracts full health lead (customer info + members + all plans) |
| **Extract Motor Lead** | `motor` | Extracts motor lead data |
| **Save Number** | `saveNumber` | Saves name + ref-ID + visa category |
| **Save Checked** | — | Saves `Provider||PlanName` identifiers from ticked rows on current page |
| **Extract Checked** | `checkedPlans` | Reads ticked checkboxes → goes **backward** page-by-page → returns full plan data |
| **Copy to Clipboard** | (switches formatter) | Copies output box content using the right formatter for last extraction type |

---

## "Extract Checked" — How It Works

### User workflow

1. Open a health quote lead (e.g., `https://imcrm.alfred.ae/quotes/health/XXXX`)
2. Navigate through plan pages using vue3-easy-data-table pagination
3. **Tick checkboxes** on plans you want as you browse (page 4 → 3 → 2 → 1)
4. Click **"Extract Checked"**

### Behind the scenes

```js
// Injected into the page via chrome.scripting.executeScript
function extractCheckedPlans()
```

**Step 1** — Read ticked plans from **current page** via `readTickedPlans()`
- Finds the plans table by scanning all `<table>` elements for `<th>` headers containing `"provider"` and `"plan name"` (lowercased)
- For each row in `<tbody>`: checks if checkbox is ticked → reads columns by header index → pushes full row data

**Step 2** — Navigate **backward** page by page
- Clicks `.previous-page__click-button`
- Waits 600ms (blocking `while(Date.now())` loop)
- Reads ticked plans again
- Repeats until button has `.first-page` class or is `disabled`
- Capped at 30 pages

**Checkbox detection** (`isChecked(cb)` helper):
1. `cb.checked` — standard DOM property
2. `cb.classList.contains('allSelected')` — vue3-easy-data-table checked state
3. `cb.classList.contains('someSelected')` — indeterminate state
4. `cb.getAttribute('aria-checked') === 'true'` — ARIA attribute

### Return value

```js
{
  matchedPlans: [{ Provider, Plan Name, Plan Type, Network, Co-pay, Price, Total Price }, ...],
  totalFound: number,
  pagesVisited: number
}
```

---

## Pagination Selectors (vue3-easy-data-table)

| Element | Selector | Edge class |
|---------|----------|-----------|
| Previous button | `.previous-page__click-button` | `first-page` when at start |
| Next button | `.next-page__click-button` | `last-page` when at end |

---

## What We Fixed

### 1. Table detection was case-sensitive (root bug)
**Problem**: Guard checked `tText.includes("Provider Name")` — but table headers use `"PROVIDER NAME"` (uppercase). JavaScript `.includes()` is case-sensitive, so every table was skipped. **No plans table was ever found**.

**Fix**: Removed the text guard entirely. Now only uses lowercased header index detection (`hdr.findIndex(h => h.includes("provider"))`).

### 2. Checkbox detection for Vue components
**Problem**: vue3-easy-data-table manages checkbox state through Vue reactivity. The `<input>` element's `checked` property may not stay synced with UI state.

**Fix**: Check 4 indicators — `checkbox.checked`, CSS class `allSelected`, CSS class `someSelected`, `aria-checked` attribute.

### 3. Extraction direction was wrong
**Problem**: Old code went to page 1 → scanned forward 30 pages, matching saved identifiers → produced duplicates (same plan 30 times).

**Fix**: Starts on current page → goes **backward** to page 1 → reads **ticked rows only** (no identifier matching).

### 4. Duplicate results
**Problem**: Identifier matching found the same plan on every page it appeared.

**Fix**: Each ticked row produces exactly one entry. No matching — just direct checkbox state reads.

---

## Guardrails — Read Before Changing

### Architecture constraints

1. **Injected functions run in page context, not popup context.** Functions passed to `chrome.scripting.executeScript({ func: ... })` are serialized. They can't reference popup variables (like `extractedData`, `savedCheckedPlans`) unless passed via `args: [...]`.

2. **`extractCheckedPlans` is passed without args** — it takes no parameters. If you need to pass data in, use the `args` array.

3. **Three core extraction functions must not break:**
   - `runExtraction()` → `formatAsBulletList()`
   - `runMotorExtraction()` → `formatMotorAsBulletList()`
   - `extractSaveNumber()` → `formatSaveNumber()`
   These power the first 3 buttons and the Copy button.

4. **Copy button routes by `lastExtractionType`** — if you add a new extraction type, add an `else if` branch in the `copyBtn` handler.

### Testing

5. **Test on a real lead with plans.** Leads with 0 plans tell you nothing. Open `https://imcrm.alfred.ae/quotes/health` and pick one that has plans loaded.

6. **Reload the extension** after every change: open `chrome://extensions/?id=nmchdolojjgaaoajokfgmlcclkogdebc` → click Reload (the toggle button). Unpacked extensions read files from disk each time the popup opens, but a reload guarantees freshness.

### UI changes

7. **If adding/removing buttons**, update both:
   - `popup.html` — add the button element with CSS class
   - `popup.js` — add to `DOMContentLoaded` check + add event listener + add to `copyBtn` routing if it produces extractable output

8. **Button CSS classes** in `popup.html`:
   - Default: green background (used by `#extractBtn`)
   - `.motor-btn`: orange
   - `.save-number-btn`: teal
   - `.save-btn`: amber/orange
   - `.extract-checked-btn`: purple
   - `.copy-btn`: blue

### Data structure

9. **Plans table detection** relies on finding `<th>` headers containing `"provider"` and `"plan name"` (lowercased). If IMCRM UI changes header text, this breaks.

10. **Column extraction** uses dynamic header index scanning — it finds the right `<td>` by matching header text. If columns are reordered or renamed, indices auto-adjust. If a column is removed, the corresponding field returns `""`.

11. **Provider cell text** is split on `\n` and the first line is used (`cells[providerIdx]?.innerText?.trim().split('\n')[0]`). This handles multi-line provider names.

---

## Quick Commands

```bash
# Open extension directory in Explorer
explorer "C:\Users\mathe\Desktop\PKM_System\Health-Insurance\IMCRM Data Extracting Extention"

# Open extensions page in Chrome
chrome://extensions/?id=nmchdolojjgaaoajokfgmlcclkogdebc

# Launch Chrome Profile 4
"C:\Users\mathe\Desktop\CRM Debug Chrome - InsuranceMarket.bat"
```

---

## Current Status (7 Jun 2026)

- [x] 3 core extraction functions working (Health Lead, Motor Lead, Save Number)
- [x] "Extract Checked" goes backward reading ticked checkboxes directly
- [x] Checkbox detection handles Vue3-easy-data-table class-based state
- [x] Plans table found by header content (not case-sensitive text guards)
- [x] Copy button routes all 4 extraction types (`lead`, `motor`, `saveNumber`, `checkedPlans`)
- [ ] (No known bugs — test on a lead with real plans to confirm)
