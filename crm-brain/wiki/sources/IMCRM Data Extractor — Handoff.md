---
type: source
sources: ["raw/10_Work-Insurance/IMCRM Data Extractor - Handoff.md"]
updated: 2026-10-22
tags: [imcrm, chrome-extension, data-extraction, browser-automation, handoff]
---

# IMCRM Data Extractor — Handoff

Technical handoff document for the [[IMCRM]] Data Extractor Chrome extension, written as of 7 Jun 2026. The extension lives at `C:\Users\mathe\Desktop\PKM_System\Health-Insurance\IMCRM Data Extracting Extention`, loaded as an **unpacked extension** in **Chrome Profile 4** (extension ID: `nmchdolojjgaaoajokfgmlcclkogdebc`). A stale `(Copy )` folder exists in the Inbox — ignore it; only the main path is authoritative.

## File Structure

| File | Role |
|------|------|
| `popup.html` | UI — 6 buttons with CSS styling |
| `popup.js` | All logic — event handlers, injected extraction functions, formatters (~900 lines) |
| `content.js` | Legacy — no longer used |
| `manifest.json` | Extension metadata (rarely changed) |
| `PLAN.md` | Original project notes (reference only) |

## The 6 Buttons

| Button | `lastExtractionType` | Function |
|--------|----------------------|----------|
| **Extract Health Lead** | `lead` | Full health lead: customer info + members + all plans |
| **Extract Motor Lead** | `motor` | Motor lead data |
| **Save Number** | `saveNumber` | Name + ref-ID + visa category |
| **Save Checked** | — | Saves `Provider‖PlanName` identifiers from ticked rows |
| **Extract Checked** | `checkedPlans` | Reads ticked checkboxes → goes backward page-by-page → returns full plan data |
| **Copy to Clipboard** | (switches formatter) | Copies output with correct formatter for last extraction type |

## "Extract Checked" — How It Works

The user browses plan pages (typically page 4 → 1), ticks checkboxes on desired plans, then clicks "Extract Checked."

**Behind the scenes:**
1. Reads ticked plans from **current page** via `readTickedPlans()`
2. Navigates **backward** page by page (clicks `.previous-page__click-button`)
3. Waits 600 ms between pages (blocking loop)
4. Reads ticked plans on each page
5. Repeats until button has `.first-page` class or `disabled`, capped at 30 pages

**Checkbox detection** uses 4 indicators: `cb.checked`, CSS class `allSelected`, CSS class `someSelected`, `aria-checked === 'true'` — needed because vue3-easy-data-table manages checkbox state via Vue reactivity, not always syncing the native DOM `checked` property.

## Return Value

```js
{
  matchedPlans: [{ Provider, "Plan Name", "Plan Type", Network, "Co-pay", Price, "Total Price" }, ...],
  totalFound: number,
  pagesVisited: number
}
```

## Bugs Fixed (Key History)

1. **Table detection case-sensitivity** — Old guard checked `"Provider Name"` but headers are uppercase `"PROVIDER NAME"`. Fix: removed text guard, uses lowercased header index detection.
2. **Vue checkbox state** — Native `cb.checked` was unreliable. Fix: 4-indicator detection.
3. **Wrong extraction direction** — Old code went page 1 → 30 with identifier matching → duplicates. Fix: starts current page → goes backward, reads ticked rows directly.
4. **Duplicate results** — Fixed by direct ticked-row reads rather than identifier matching.

## Architecture Guardrails

- Injected functions run in **page context**, not popup context — cannot reference popup variables directly
- `extractCheckedPlans()` takes no parameters; pass data via `args` array if needed
- Three core extraction functions must not break: `runExtraction()`, `runMotorExtraction()`, `extractSaveNumber()`
- Copy button routes by `lastExtractionType` — new extraction types need an `else if` branch
- Plans table detection relies on `<th>` headers containing `"provider"` and `"plan name"` (lowercased) — if IMCRM changes headers this breaks
- Column extraction uses dynamic header index scanning — resilient to column reordering

## Quick Commands

```bash
# Open extension directory
explorer "C:\Users\mathe\Desktop\PKM_System\Health-Insurance\IMCRM Data Extracting Extention"

# Open Chrome extensions page
chrome://extensions/?id=nmchdolojjgaaoajokfgmlcclkogdebc

# Launch Chrome Profile 4 with CRM
"C:\Users\mathe\Desktop\CRM Debug Chrome - InsuranceMarket.bat"
```

## Current Status (7 Jun 2026)

- ✅ 3 core extraction functions working (Health Lead, Motor Lead, Save Number)
- ✅ "Extract Checked" goes backward reading ticked checkboxes directly
- ✅ Checkbox detection handles vue3-easy-data-table class-based state
- ✅ Plans table found by header content (not case-sensitive text guards)
- ✅ Copy button routes all 4 extraction types
- ⬜ No known bugs — test on a lead with real plans to confirm

## Related Pages

- [[IMCRM]] — the CRM system this extension targets
- [[IMCRM Data Extracting Extention (Copy ) PLAN]] — original project notes
- [[Extracting leads from the CRM]] — concept page on CRM extraction patterns
- [[Steps to get client data from IMCRM]] — companion workflow guide
