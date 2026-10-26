---
type: project
sources: ["raw/Health-Insurance/Dashboard/README.md", "raw/Health-Insurance/Dashboard/package.json", "raw/Health-Insurance/Dashboard/server.js", "raw/Health-Insurance/Dashboard/lib/leadStore.js", "raw/Health-Insurance/Dashboard/public/index.html", "raw/Health-Insurance/Dashboard/public/main.js", "raw/Health-Insurance/Dashboard/public/main.css"]
updated: 2026-10-22
tags: [project, dashboard, node, express, workspace]
summary: "Local 'Health Insurance OS' web app - Express plus vanilla JS - that reads the workspace's markdown lead files and writes comments back into them."
---
# Insurance Dashboard

A local web app in `raw/Health-Insurance/Dashboard/` that turns the workspace's markdown into a screen: a command centre for leads, renewals, tasks, comments and documents. It is the newest of the workspace's own tools and the only one with a UI.

Source page: [[Insurance Dashboard (Health Insurance OS)]].

## What it is
| Aspect | Value |
|---|---|
| Stack | Node.js + Express, one runtime dependency pair (`express`, `multer`) |
| Front end | plain HTML, CSS and JavaScript - no build step, no framework |
| Port | 4000 by default, overridable with `PORT` |
| Storage | the workspace's markdown files - **no database** |
| Auth | none; localhost only |
| Run | `npm install`, then `npm start`, then open `http://localhost:4000` |

## The views
- **Overview cards** - counts of lead files, new, in progress, payment stage, booked, renewals, open tasks, urgent tasks.
- **Focus Board** - the live queues from `Workspace/PIPELINE.md`: new leads, in progress, application/payment, renewals and tasks.
- **Priority Radar** - urgent items and today's open tasks, up to 6 urgent, from the pipeline's pending-task list.
- **Lead Explorer** - every lead, with search over name / reference / status and a status filter: all, new, quoted or followed up, application or payment, booked or allocated.
- **Lead detail panel** - metadata, member count, document folder, document links, the comments from the lead file, a comment box and an upload control.

## How it works
- **The markdown is the database.** `lib/leadStore.js` parses every `.md` file **directly inside** `Workspace/Leads/` with regular expressions over flat `- **Field:** value` lines, reads member counts from the `## Member Details` table, and reads the pipeline's markdown tables and task checkboxes out of `Workspace/PIPELINE.md`. See [[Markdown-backed lead store]].
- **It writes back.** `POST /api/leads/:refId/comments` appends a timestamped comment, creating the `## Comments` section if absent; `POST /api/leads/:refId/documents` stores an uploaded file in the lead's document folder and can append an "Uploaded document" comment. Uploads use multer with disk storage and keep the original filename.
- **Documents are served statically** from the workspace documents directory, and a lead's folder is found by matching the reference inside the folder name, creating `[REF_ID]-<safe name>` if it is missing.

## The API
`GET /api/leads`, `GET /api/dashboard`, `GET /api/leads/:refId`, `POST /api/leads/:refId/comments`, `POST /api/leads/:refId/documents`, `GET /api/health`. Unmatched routes return 404.

## Interface details
- Dark by default, light-mode toggle, preference kept in the browser's local storage.
- Output is HTML-escaped before rendering.
- Hand-written CSS with custom properties; a two-column layout collapsing at 1280, 1024 and 680 px.

## Why it exists
- The desk's state was spread over a task file, a pipeline file, a renewals file and a folder of lead files - all readable, none glanceable. The dashboard is the one screen that shows all of them.
- It completes the loop with the browser extension: the extension **creates** lead files, the dashboard **reads and annotates** them. Same files, two tools. See [[Local file writing sidecar]].

## Caveats
- **No authentication and no database.** Anything that can reach the port can read lead data and write into the lead files.
- **One level deep.** Leads filed in sub-folders are invisible to it.
- **Format-sensitive.** A lead file written in a different shape parses to "Unknown" values and still counts as a lead.
- The workspace root also holds a `Workspace-Audit-2026-06-01.md` file and a `daily/` folder; neither is part of the app.

Related: [[Markdown-backed lead store]], [[Lead pipeline stages]], [[Task single source of truth]], [[IMCRM Data Extractor]], [[Local file writing sidecar]], [[Lead file naming]].
