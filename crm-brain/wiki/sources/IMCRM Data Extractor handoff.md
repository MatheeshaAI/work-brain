---
type: source
sources: ["raw/10_Work-Insurance/IMCRM Data Extractor - Handoff.md"]
updated: 2026-10-22
tags: [imcrm, extension, chrome, handoff, extraction]
privacy: no client data in this source
summary: "Engineering handoff for the IMCRM Data Extractor Chrome extension: location, six buttons, the Extract Checked algorithm, four bug fixes and guardrails."
---
# Source: IMCRM Data Extractor handoff

The working handoff for the Chrome extension that reads IMCRM. It is a **built** artefact, not a proposal - but the files themselves live outside the vault, under `C:\Users\mathe\Desktop\PKM_System\Health-Insurance\`, so this page is the vault's record of it.

## Location and identity

| Item | Value |
|---|---|
| Extension folder | `C:\Users\mathe\Desktop\PKM_System\Health-Insurance\IMCRM Data Extracting Extention` |
| Load mode | Unpacked extension |
| Chrome profile | Profile 4 |
| Extension ID | `nmchdolojjgaaoajokfgmlcclkogdebc` |
| Stale copy | `(Copy )` folder under `Inbox - Thinking & Capture` - **ignore it** |
| Rule | Only edit files in the path above |

## Files and responsibilities

| File | Role |
|---|---|
| `popup.html` | UI: 6 buttons with CSS styling |
| `popup.js` | All logic - event handlers, injected extraction functions, formatters (~900 lines) |
| `content.js` | Legacy, no longer used |
| `manifest.json` | Extension metadata, rarely changed |
| `PLAN.md` | Original project notes, reference only |

## The six buttons

| Button | `lastExtractionType` | What it does |
|---|---|---|
| **Extract Health Lead** | `lead` | Full health lead: customer info + members + all plans |
| **Extract Motor Lead** | `motor` | Motor lead data |
| **Save Number** | `saveNumber` | Saves name + ref-ID + visa category |
| **Save Checked** | - | Saves `Provider||PlanName` identifiers from ticked rows on the current page |
| **Extract Checked** | `checkedPlans` | Reads ticked checkboxes, walks **backward** page by page, returns full plan data |
| **Copy to Clipboard** | switches formatter | Copies the output box using the formatter for the last extraction type |

## How "Extract Checked" works

**Workflow.** Open a health quote lead, page through the plan table (vue3-easy-data-table), tick the plans you want, then click Extract Checked.

**Algorithm.**
1. **Read the current page** - find the plans table by scanning every `<table>` for `<th>` headers containing `provider` and `plan name` (lowercased), then for each `<tbody>` row check the checkbox and read columns by header index.
2. **Walk backward** - click `.previous-page__click-button`, wait 600 ms (a blocking `while(Date.now())` loop), read ticked plans again, repeat until the button carries the `first-page` class or is `disabled`. **Capped at 30 pages.**
3. **Checkbox detection** uses four indicators in order: the DOM `checked` property, the `allSelected` class, the `someSelected` class (indeterminate), and `aria-checked === 'true'`.

**Return value:** `{ matchedPlans: [{ Provider, Plan Name, Plan Type, Network, Co-pay, Price, Total Price }], totalFound, pagesVisited }`.

**Pagination selectors:** previous `.previous-page__click-button` (edge class `first-page`), next `.next-page__click-button` (edge class `last-page`).

## Four bugs that were fixed

1. **Table detection was case-sensitive** - the guard checked for `Provider Name` but the headers are uppercase `PROVIDER NAME`, so `.includes()` never matched and **no plans table was ever found**. Fixed by dropping the text guard and using lowercased header index detection.
2. **Checkbox state is Vue-managed** - the `<input>` `checked` property does not stay in sync with the UI. Fixed by checking four indicators.
3. **Extraction direction was wrong** - the old code went to page 1 and scanned forward for 30 pages, matching saved identifiers, which produced the same plan 30 times. Fixed by starting on the current page and going **backward**.
4. **Duplicate results** - identifier matching found the same plan on every page it appeared. Fixed by reading ticked rows directly, with no matching at all.

## Guardrails to read before changing anything

**Architecture**
1. Injected functions run in **page context, not popup context**. A function passed to `chrome.scripting.executeScript({ func })` is serialised and cannot reference popup variables unless they are passed through `args`.
2. `extractCheckedPlans` is passed **without args** - if data must be passed in, use the `args` array.
3. Three core extraction functions must not break: `runExtraction()` + `formatAsBulletList()`, `runMotorExtraction()` + `formatMotorAsBulletList()`, `extractSaveNumber()` + `formatSaveNumber()`.
4. The Copy button routes on `lastExtractionType` - a new extraction type needs a new `else if` branch in the `copyBtn` handler.

**Testing**
5. Test on a **real lead with plans** - a lead with 0 plans tells you nothing.
6. **Reload the extension after every change** via `chrome://extensions/?id=<id>` -> Reload. Unpacked extensions read from disk each time the popup opens, but a reload guarantees freshness.

**UI**
7. Adding or removing buttons means updating `popup.html` (element + CSS class), `popup.js` (the `DOMContentLoaded` check + event listener + `copyBtn` routing).
8. Button CSS classes: green default (`#extractBtn`), `.motor-btn` orange, `.save-number-btn` teal, `.save-btn` amber, `.extract-checked-btn` purple, `.copy-btn` blue.

**Data structure**
9. Plans-table detection depends on the header text `provider` and `plan name`. If the IMCRM UI renames a header, this breaks.
10. Column extraction uses dynamic header index scanning, so reordering or renaming a column auto-adjusts - but a **removed** column makes its field return `""`.
11. The provider cell is split on `\n` and the first line taken, which handles multi-line provider names.

## Quick commands in the handoff
- Open the extension directory in Explorer
- Open `chrome://extensions/?id=nmchdolojjgaaoajokfgmlcclkogdebc`
- Launch Chrome Profile 4 via `CRM Debug Chrome - InsuranceMarket.bat`

## Status as of 7 June 2026
- [x] 3 core extraction functions working (Health Lead, Motor Lead, Save Number)
- [x] Extract Checked walks backward reading ticked checkboxes directly
- [x] Checkbox detection handles vue3-easy-data-table class-based state
- [x] Plans table found by header content, not case-sensitive text guards
- [x] Copy button routes all 4 extraction types (`lead`, `motor`, `saveNumber`, `checkedPlans`)
- [ ] No known bugs - but unconfirmed on a lead with real plans

## Contradiction to fix
[[IMCRM Data Extractor]] (project page) points at the **stale `(Copy )` folder** as the working copy and describes a `content.js` that this handoff says is **legacy and unused**. The handoff supersedes it. The project page needs updating to the live path, the six buttons and this status.

Related: [[IMCRM]], [[IMCRM Data Extractor]], [[IMCRM data handoff]], [[Extracting leads from the CRM]], [[Getting client data from the CRM]], [[Steps to get client data from IMCRM]], [[IMCRM health detail page extraction]].
