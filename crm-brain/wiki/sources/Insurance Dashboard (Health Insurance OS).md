---
type: source
sources: ["raw/Health-Insurance/Dashboard/README.md", "raw/Health-Insurance/Dashboard/package.json", "raw/Health-Insurance/Dashboard/server.js", "raw/Health-Insurance/Dashboard/lib/leadStore.js", "raw/Health-Insurance/Dashboard/public/index.html", "raw/Health-Insurance/Dashboard/public/main.js", "raw/Health-Insurance/Dashboard/public/main.css"]
updated: 2026-10-22
tags: [dashboard, node, express, leads, project]
privacy: "structure and counts only, no client names or lead IDs"
summary: "The local 'Health Insurance OS' dashboard: Express server + vanilla JS front end reading lead markdown files."
---
# Source: Insurance Dashboard (Health Insurance OS)

The dashboard application in `raw/Health-Insurance/Dashboard/`: `README.md`, `package.json`, `server.js`, `lib/leadStore.js`, `public/index.html`, `public/main.js`, `public/main.css`. It is a small local web app that reads the workspace's markdown files and writes back into them. Project page: [[Insurance Dashboard]].

## What it is
- A **Node.js / Express** app with **no build step and no framework**: `package.json` has one dependency pair (`express`, `multer`), `"type": "module"`, and a single `start` script that runs `node server.js`.
- The UI is plain HTML, CSS and JavaScript served as static files. No bundler, no client framework.
- It is **local only**: it binds a port on the machine (default 4000, overridable with `PORT`) and is opened in the browser at `http://localhost:4000`.

## Setup and use
1. Open a terminal in the `Dashboard/` folder.
2. `npm install`.
3. `npm start`.
4. Open `http://localhost:4000`.

## What it shows (the dashboard view)
The page is titled "Health Insurance OS" and is described in its own copy as a compact command center for leads, renewals, tasks, comments and documents. Sections:
- **Overview cards** - counts of lead files, new leads, in-progress, payment stage, booked, renewals, open tasks and urgent tasks.
- **Focus Board** - the live queues taken from the pipeline file: new leads, in progress, application/payment stage, renewals and tasks (slices of 10, 10, 10, 8 and 14 respectively).
- **Priority Radar** - urgent items and today's open tasks (up to 6 urgent, drawn from the pipeline's pending-task list).
- **Lead Explorer (sidebar)** - every lead, with a search box over name / reference / status and a status filter (all, new, quoted or followed up, application or payment, booked or allocated).
- **Lead detail panel** - metadata, member count, the document folder, the list of documents with links, and the comments from the lead file, plus a comment box and an upload control.

## How it works (the important part)
**The markdown files are the database.** `lib/leadStore.js` does all the work:
- **Lead discovery** - every `.md` file directly inside `Workspace/Leads/` is a lead. Each is parsed with regular expressions for the `Ref-ID`, `Full Name`, `Status`, `Customer Type`, `Created Date`, `Mobile`, `Email`, `Nationality`, `Gender`, `DOB`, `Member Category` and `Advisor` fields. A file without a reference is skipped. Leads are sorted by name.
- **Member count** - read from the rows of the `## Member Details` table.
- **Comments** - the text under a `## Comments` heading, split on ISO timestamps.
- **Pipeline parsing** - the dashboard finds the `## Production Summary`, `## New Leads`, `## In Progress`, `## Application / Payment Stage`, `## Policy Booked`, `## Renewals` and `## Pending Tasks` sections of `Workspace/PIPELINE.md` and parses the markdown tables inside them. Pending tasks are read as checkboxes, grouped by their `###` sub-heading, with a reference extracted from the task text and a "priority" flag if the text says priority or urgent.
- **Writing** - `POST /api/leads/:refId/comments` appends a timestamped comment to the lead file, inserting a `## Comments` section if the file has none (it goes before `## Lead Status` or `## Payment Details` when those exist). `POST /api/leads/:refId/documents` uploads a file into the lead's document folder and can also append an "Uploaded document" comment.
- **Document folders** are found by looking for a folder whose name contains the lead reference; if none exists one is created as `[REF_ID]-<safe name>`.
- **Document links** are served by Express static middleware from the workspace documents directory.

## The API
`GET /api/leads`, `GET /api/dashboard`, `GET /api/leads/:refId`, `POST /api/leads/:refId/comments`, `POST /api/leads/:refId/documents`, `GET /api/health`. Uploads use multer with disk storage; the destination is resolved from the lead reference, and the uploaded file keeps its original name. Anything unmatched returns 404.

## Interface details
- Dark by default with a light-mode toggle; the preference is stored locally in the browser.
- Output is HTML-escaped before rendering, so a lead name containing markup cannot break the page.
- The stylesheet is hand-written CSS with custom properties, a two-column layout that collapses at three breakpoints (1280, 1024, 680 px).

## Caveats
- **It has no authentication and no database.** Anyone who can reach the port can read lead data and write into the lead files. It is a localhost tool.
- It reads only `Workspace/Leads/*.md` - **one level deep**. Leads filed deeper (for example under product sub-folders) are not visible to it.
- The lead file format it expects is a flat `- **Field:** value` list; a file that uses a different shape parses to "Unknown" values.
- It is a separate tool from the browser extension that creates lead files, but both write the same markdown: [[Local file writing sidecar]], [[Markdown-backed lead store]].

Related: [[Insurance Dashboard]], [[Lead pipeline stages]], [[Markdown-backed lead store]], [[Task single source of truth]].
