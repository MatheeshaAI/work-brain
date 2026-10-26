---
type: project
sources: ["raw/10_Work-Insurance/IMCRM Data Extractor - Handoff.md", "raw/10_Work-Insurance/Crm_data_extraction.md", "raw/10_Work-Insurance/steps to get the client data from imcrm.md", "raw/30_Projects/IMCRM Data Extracting Extention (Copy )/PLAN.md", "raw/30_Projects/IMCRM Data Extracting Extention (Copy )/manifest.json", "raw/Health-Insurance/Memory/IMCRM_Chrome_Extension.md", "raw/Health-Insurance/Memory/IMCRM_Extension_How_to_Use.md", "raw/Health-Insurance/Memory/IMCRM_Extension_Server.md", "raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md"]
updated: 2026-10-22
tags: [project, extension, crm, imcrm, extraction, chrome]
summary: "Chrome extension that reads IMCRM lead and plan pages and copies formatted text out - live path, six buttons, backward pagination."
---
# IMCRM Data Extractor

**Goal:** read data out of IMCRM (https://imcrm.alfred.ae/) and copy it as formatted text, so a lead, its members, its plans or a shortlist of ticked plans can be moved into the next tool without retyping. Related: [[IMCRM]], [[Extracting leads from the CRM]].

## Where it actually lives
| Item | Value |
|---|---|
| Folder | `C:\Users\mathe\Desktop\PKM_System\Health-Insurance\IMCRM Data Extracting Extention` |
| Load mode | Unpacked, Chrome **Profile 4** |
| Extension ID | `nmchdolojjgaaoajokfgmlcclkogdebc` |
| Stale copy | `IMCRM Data Extracting Extention (Copy )` under `Inbox - Thinking & Capture` - **ignore it** |

**Correction (2026-10-22):** an earlier version of this page pointed at the `(Copy )` folder as the working copy and described `content.js` as active. The handoff shows `content.js` is **legacy and unused**, and the `(Copy )` folder is stale. Only edit the live path above. Source: [[IMCRM Data Extractor handoff]].

## Built facts
- **Manifest:** MV3, permissions `activeTab`, `scripting`, `clipboardWrite`, host permissions `*://*/*`.
- **Files:** `popup.html` (six buttons plus CSS), `popup.js` (all logic - event handlers, injected extraction functions, formatters, ~900 lines), `content.js` (legacy), `manifest.json`, `PLAN.md` (reference only).
- **Six buttons:** Extract Health Lead (`lead`), Extract Motor Lead (`motor`), Save Number (`saveNumber`), Save Checked, Extract Checked (`checkedPlans`), Copy to Clipboard (routes on the last type).
- **Health lead extraction** reads customer info, the member table (filtering non-member rows and de-duplicating) and the available-plans table; motor extraction covers the car side; **Save Number** formats `Name - RefID - Member Category`.
- **Save Checked** stores `Provider||PlanName` identifiers for ticked rows; **Extract Checked** walks the pagination **backward** and returns full plan data for the ticked rows only.

## The hard problems it solves
- **The plans table was invisible.** The original guard matched `Provider Name` but the headers are uppercase, and `.includes()` is case-sensitive - so no plans table was ever found. Now the table is found by lowercased header index detection.
- **Checkbox state is Vue-managed.** `vue3-easy-data-table` keeps it in reactivity, so the DOM `checked` property can be stale. Four indicators are now checked: `checked`, `allSelected`, `someSelected`, `aria-checked`.
- **Pagination ran the wrong way and duplicated.** Walking forward and matching identifiers produced the same plan 30 times. It now starts on the current page and walks backward to page 1, 600 ms per step, capped at 30 pages.
- **Provider cells are multi-line**, so the provider text is split on a newline and the first line is taken.

## What it does not do
- **No write-back.** It reads; CRM updates are manual.
- **No API.** The connector-script design in [[Using ICM for a CRM-driven insurance sales agent]] is still a proposal.
- **No redaction.** "Extract Health Lead" pulls the customer profile, including Emirates ID and the document file list, into the clipboard. See [[Getting client data from the CRM]].
- **One lead at a time.** The daily book is 68 leads ([[IMCR Health Leads 07-Jun-2026]]).

## Guardrails before changing anything
- Injected functions run in **page context**; they cannot close over popup variables unless passed through `args`.
- Three pairs must not break: `runExtraction()`/`formatAsBulletList()`, `runMotorExtraction()`/`formatMotorAsBulletList()`, `extractSaveNumber()`/`formatSaveNumber()`.
- A new extraction type needs a new `else if` branch in the `copyBtn` handler, plus its button element in `popup.html` and its listener in `popup.js`.
- Test on a lead that actually has plans; reload the extension from `chrome://extensions/?id=<id>` after every change.
- Column extraction is index-based on header text: a **renamed** column auto-adjusts, a **removed** column yields an empty string.

## Status as of 7 June 2026
- [x] 3 core extraction functions working
- [x] Extract Checked walks backward reading ticked checkboxes directly
- [x] Checkbox detection handles vue3-easy-data-table class-based state
- [x] Plans table found by header content, not case-sensitive guards
- [x] Copy button routes all 4 extraction types
- [ ] No known bugs - unconfirmed on a lead with real plans

## Related
[[IMCRM]], [[IMCRM Data Extractor handoff]], [[Extracting leads from the CRM]], [[IMCRM data handoff]], [[Getting client data from the CRM]], [[Lead capture gaps]], [[Insurance plan catalogue]].

## A second, differently-shaped build of the same extension (2026-10-22 ingest)
The in-place `raw/Health-Insurance/` folder holds **another set of notes about the extension**, with a different button set and a different live path. Both descriptions are in the vault; nothing says which is current.

| | Handoff page above | `raw/Health-Insurance/Memory/` notes |
|---|---|---|
| Buttons | six: Extract Health Lead, Extract Motor Lead, Save Number, Save Checked, Extract Checked, Copy to Clipboard | five: Extract Data, Extract Basic Plans, Copy to Clipboard, Debug, Create Lead File |
| Code size | `popup.js` about 900 lines | `popup.js` about 626 lines |
| Plan features | ticked plans only, walked backward | available plans, plus a **basic-plans** subset filtered by network |
| Writes | none - read only, copy to clipboard | **Create Lead File**, via a local Node server |
| Path | `C:\Users\mathe\Desktop\PKM_System\Health-Insurance\IMCRM Data Extracting Extention` | `raw/Health-Insurance/IMCRM Data Extracting Extention` |

Sources: [[IMCRM extension memory note]], [[IMCRM extension how-to memory note]], [[IMCRM extension server memory note]].

The in-place extension's own build plan - four extraction features, the basic-plans filter rules, the zero-results bug and the next steps - is in [[IMCRM Data Extracting Extention PLAN]].

**The two builds may simply be two generations.** The memory-note build can write files and filters plans; the handoff build reads ticked plans and cannot write. Both are Manifest V3 with the same permission set.

## The planned fifth extraction (2026-05-22)
A plan dated 2026-05-22 adds an **"Extract Entry Level Plans"** button. Two files change only (`popup.html`, `popup.js`); the extraction function is injected into the active tab and must be self-contained; the output is a markdown table with **4 fixed plan rows** (missing ones read `*(not found)*`), a profile table, a members table and **separate co-pay and co-insurance columns** plus **two price columns**.

It also names two bugs in the existing code: the co-pay header match catching "co-insurance", and the **`priceIdx` strict-equality bug** that mis-selected the price column. See [[Entry level plans extraction plan]], [[Co-pay and co-insurance]], [[Entry level plans]].

**Status: design intent.** Every checkbox in the plan is unticked, and neither set of memory notes lists such a button.
