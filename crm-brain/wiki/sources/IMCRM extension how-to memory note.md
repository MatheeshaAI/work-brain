---
type: source
sources: ["raw/Health-Insurance/Memory/IMCRM_Extension_How_to_Use.md"]
updated: 2026-10-22
tags: [imcrm, extension, howto, memory]
summary: "Persistent memory: how to load the IMCRM extension into Chrome and use its three main buttons."
---
# Source: IMCRM extension how-to memory note

Original file: [[raw/Health-Insurance/Memory/IMCRM_Extension_How_to_Use.md|IMCRM_Extension_How_to_Use.md]]. A persistent memory with a step-by-step usage guide. Client identifiers are not copied; the original contains example phone numbers and a sample client name.

## Loading the extension (built facts)
1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. **Load unpacked** and select the `IMCRM Data Extracting Extention` folder in the project.
4. The extension icon appears in the toolbar.

## Using it
1. Go to the IMCRM site, log in, open a health insurance quote that has plans available.
2. Open the popup from the toolbar.
3. Choose an action:
   - **Extract Data** - lead details + members + available plans.
   - **Extract Basic Plans** - the filtered basic subset (E CARE BLUE, E CARE and AAFIYA networks only). See [[Basic plan filter]].
   - **Create Lead File** - writes `Workspace/Leads/[REF_ID]-[Name].md` and creates the matching `Workspace/Documents/[REF_ID]-[Name]/` folder. Requires the local server to be running: [[Local file writing sidecar]].
4. **Copy to Clipboard** to take the output elsewhere; **Debug** to inspect the page DOM when something looks wrong.

## Troubleshooting the note gives
- **"Could not create lead. Make sure the local server is running"** - start the Node.js server and keep the terminal open.
- **"0 results" for basic plans** - the page lazy-loads ("1-15 of 382"), so not all plans are in the DOM yet; use Debug and check the console.
- **Icon missing** - reload Chrome and confirm Developer mode is still on and the extension loaded successfully.

## Best practices it states
Use Debug first when the output looks wrong; keep the server running while creating lead files; review the output before copying it; check the popup console when something fails.

## Caveats
- The guide predates the reorganisation in one respect: it points at the project root, while leads now live under `Workspace/`. See [[Workspace reorganization]].
- It describes the button set that existed when it was written - no entry-plans button. See [[IMCRM extension memory note]].

Related: [[IMCRM Data Extractor]], [[IMCRM extension memory note]], [[IMCRM extension server memory note]], [[Basic plan filter]].
