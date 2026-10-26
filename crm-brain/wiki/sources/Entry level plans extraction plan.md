---
type: source
sources: ["raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md"]
updated: 2026-10-22
tags: [imcrm, extension, plans, extraction, plan]
summary: "Implementation plan for an 'Extract Entry Level Plans' button that pulls 4 named plans from an IMCRM quote."
---
# Source: Entry level plans extraction plan

Original file: [[raw/Health-Insurance/docs/superpowers/plans/2026-05-22-entry-level-plans-extraction.md|2026-05-22-entry-level-plans-extraction.md]]. Dated **2026-05-22**. A task-by-task implementation plan (superpowers format) for adding one button to the IMCRM Chrome extension. **Design intent, not a built fact**: every step checkbox is unchecked and the plan says nothing about the feature having shipped.

## Goal (as stated in the note)
Add an "Extract Entry Level Plans" button to the IMCRM extension popup that pulls the customer profile, the member details and **4 specific plans**, and renders them as a markdown table ready to copy to the clipboard.

## The four target plans
| Provider | Plan | Why it is in the set |
|---|---|---|
| [[Takaful Emarat]] | APN Plan | entry-level |
| [[Takaful Emarat]] | Silver Plan | entry-level |
| [[Takaful Emarat]] | Essential Plan | entry-level (already known from [[Plan price tiers]]) |
| [[Dubai Insurance]] | Remento N4 Base Plan (also appears as RN4) | economy tier of the Dubai Care network family - see the naming note in [[Entry level plans]] |

## Architecture (design intent)
- **Two files change only**: `popup.html` (button + CSS class) and `popup.js` (extraction function, markdown formatter, event listener, copy-handler case).
- The extraction function is **injected into the active tab** with `chrome.scripting.executeScript`, and is written to be self-contained - it cannot reference popup-scope variables.
- It reuses the DOM patterns already used by the existing extraction routine: `dl`/`dt`/`dd` pairs for the profile, and a table walker for members.
- Tech stack: vanilla JS, Manifest V3, `navigator.clipboard.writeText`.
- **Plans are filtered by plan name, not by network** - a deliberate change from the older basic-plans filter. See [[Basic plan filter]].

## Three extraction problems it solves
1. **Co-pay vs co-insurance.** The column detection used to pick the first header containing "co-pay", which also matched "co-insurance". The plan fixes it by requiring the co-pay header to *exclude* "insurance", and by matching co-insurance separately. The two land in different output columns: [[Co-pay and co-insurance]].
2. **The price column.** `priceIdx` used strict equality on the header text, which missed headers phrased differently; the fix is `includes("price")` while excluding "total" and "indicative", with a second index for the total/indicative price. That gives the output two price columns: price and total indicative price.
3. **Missing plans must still show.** Result slots are pre-initialised so a plan the insurer did not offer appears as `*(not found)*` instead of vanishing. The table always has 4 rows in a fixed order.

## The output (as designed)
- A lead header (reference and name) - client identifiers, so they are not reproduced in this wiki.
- A small profile table: email, mobile, emirate of visa, member category.
- A members table (name, relation, date of birth, nationality, category), skipped when the lead is a single member with no extra detail.
- A 4-row plans table: provider, plan name, type, network, co-pay, co-insurance, price, total indicative price.
- All copyable to the clipboard as markdown, so it pastes straight into a note or a message.

## Verification steps in the plan
Reload the extension, open any IMCRM health quote page, click the button, expect the markdown block within 2-3 seconds, copy and paste it, then test the edge case of a lead with none of the four plans (all four rows should read `*(not found)*` with no console errors).

## Caveats
- **Not built, as far as this source says.** The plan is dated 2026-05-22 and the checkboxes are empty. The extension's own memory note lists only four buttons (Extract Data, Extract Basic Plans, Copy to Clipboard, Debug, Create Lead File) and does not mention an entry-plans button. Treat the feature as intended, not shipped. See [[IMCRM Data Extractor]].
- The plan is written for a folder named `IMCRM Data Extracting Extention/`, which is the live folder in the workspace; a second folder exists elsewhere with "Copy" in its name. Both are referenced by [[IMCRM Data Extractor]].
- A bug is named in the plan's own architecture line: the "known `priceIdx` strict-equality bug". The older basic-plans code is therefore known to have mis-selected the price column.

Related: [[Entry level plans]], [[Basic plan filter]], [[Co-pay and co-insurance]], [[IMCRM Data Extractor]], [[IMCRM]].
