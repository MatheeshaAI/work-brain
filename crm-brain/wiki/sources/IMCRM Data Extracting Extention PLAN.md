---
type: source
sources: ["raw/Health-Insurance/IMCRM Data Extracting Extention/PLAN.md"]
updated: 2026-10-22
tags: [imcrm, chrome-extension, plans, extraction]
summary: "The build plan of the IMCRM Chrome extension: four extraction features, the basic-plans filter rules, the zero-results bug and next steps."
---
# IMCRM Data Extracting Extention PLAN

The plan file inside the in-place extension folder. The vault already holds a copy of the same extension under [[IMCRM Data Extracting Extention (Copy ) PLAN]]; this page records the in-place file. The project is [[IMCRM Data Extractor]].

## What the extension is
A Manifest V3 Chrome extension that reads the Alfred CRM ([[IMCRM]]) and outputs formatted text. Files: `manifest.json`, `popup.html`, `popup.js` (about 626 lines).

## Features and status (as marked in the plan)
| Feature | Status | How |
|---|---|---|
| Lead details (ref ID, name, mobile, email, nationality, DOB, emirate of visa, gender, member category) | done | reads `<dl>/<dt>/<dd>` pairs of the CRM form |
| Member details | done | reads member tables, filters out activity/payment/document/policy rows, de-duplicates, falls back to lead info |
| Available plans | done | provider, plan name, type, network, co-pay, price, total price |
| Basic plans only | in progress | network filter, max 2 per provider, cheapest first |

## Basic-plans filter (design as written)
- **Include networks:** E CARE BLUE, E CARE, AAFIYA (APN).
- **Exclude:** Fidelity, Takaful Emarat Silver, HAYAH RN3 / Care Protect, Essential, Dubai Care, Blue (Enhance); each marked "Not Basic".
See [[Basic plan filter]] and [[Entry level plans]]. The exclusion list names plans (Essential, Takaful Emarat) that also sit on the include networks; that flag already exists on those pages.

## Known issue: basic plans returns 0 results
Debugging in progress. Suspected causes: network column header not detected, the plans table lazily loads (shows "1-15 of 382"), network names differ from the expected strings, header parsing is case sensitive. Debug steps: use the Debug button, read the console, verify the network column index, test on a real quote page.

## UI
Buttons: Extract Data, Extract Basic Plans, Copy to Clipboard, Debug; a status area and an output area.

## Next steps
1. Fix basic plans (test with a real page, verify column index, adjust filter).
2. Handle lazy loading (the "1-15 of 382" pattern): load all or warn.
3. Make Copy to Clipboard output a clean bullet list.

## Notes
- The "382" plan count is a third figure next to the 376-plan catalogue and the 418-plan library; see [[Plan library]] and [[Insurance plan catalogue]]. Each is a different lead's quote, so the counts differ.
- Design intent plus a bug list; nothing marks the basic-plans button as finished.
