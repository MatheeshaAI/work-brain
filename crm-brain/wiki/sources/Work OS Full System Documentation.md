---
type: source
sources: ["raw/work_os system designing documents/02_SYSTEM_DESIGN/Full_System_Documentation.md", "raw/work_os system designing documents/00_ORIGINALS/Full_System_Documentation.md"]
updated: 2026-10-22
tags: [architecture, whatsapp, notion, node, claude, scheduler, diagrams]
summary: "A visual, non-technical overview of the Node-based automation system: WhatsApp bridge, Notion, browser automation, SQLite, Claude and a scheduler, with three user scenarios and the planned file layout."
---
# Source: Work OS Full System Documentation

A non-technical explanation of the "PKM_System" automation (the [[ClaudeClaw]] lineage): components, data flow, three interaction scenarios and a file layout, with two Mermaid diagrams. Two identical copies. It is **design intent** assembled in one chat; the index calls it "visual system overview" ([[Work OS Master Index]]).

## Components
- **WhatsApp Bridge:** controls WhatsApp Web via Puppeteer using [[whatsapp-web.js]].
- **Node Service:** main process tying together WhatsApp, Notion, CRM, Claude and the scheduler.
- **SQLite:** local store for messages, sessions and tasks.
- **Notion integration:** syncs the CRM pipeline and drafts with Notion pages ([[Notion]]).
- **Browser automation:** drives the CRM and Gmail when no API exists ([[Browser Automation for CRM and Gmail]]).
- **Claude Code:** generates text and orchestrates tools.
- **Scheduler/cron engine:** periodic summaries and follow-ups.

## Data flow
Phone/browser sends WhatsApp messages to the bridge and edits Notion; both feed the Node service; the service consults Claude, writes SQLite, drives browser automation and the scheduler; replies go back out through WhatsApp or are written to Notion/CRM.

## Three scenarios
1. **New WhatsApp message:** logged in SQLite, optionally pushed to Notion, Claude drafts a reply if the number is enabled, draft goes to Notion or the CLI for approval, sent on approval and CRM/Notion updated.
2. **CRM follow-up triggered from Notion:** Notion webhook notifies the service, it fetches WhatsApp history and the CRM record by browser automation, Claude drafts a follow-up, the draft is stored in Notion, ticking `Approved` sends via WhatsApp or Gmail and marks the lead contacted. A sequence diagram shows `NeedsFollowup` through to logging in SQLite.
3. **Scheduled summary:** the scheduler detects a due task, the service aggregates messages and notes, Claude writes a summary or action list, sent to Telegram or stored in Notion/CRM.

All three put a **human approval** step before sending; see [[Draft and approve messaging flow]].

## Planned file layout
`PKM_System/src/` with `agent.ts` (Claude wrapper), `whatsapp.ts`, `notion.ts`, `crm.ts` (browser automation helpers), `scheduler.ts`, `memory.ts`, `bot.ts` (Telegram/Discord/iMessage), `index.ts`, `config.ts`, `db.ts`, `logger.ts` (pino); `scripts/` (setup, status, notify.sh); `store/` (db, pid, logs); `workspace/uploads/`; `CLAUDE.md` system prompt; `.env.example`; `package.json`; `tsconfig.json`. This layout mirrors the file structure specified in [[ClaudeClaw Rebuild Prompt]].

## Tips for non-technical users (as written)
Update Notion pages or send WhatsApp and the system reacts; config lives in `.env`; `npm run status` checks WhatsApp, cron and Notion; add automations by writing a short prompt and attaching it to the scheduler or a webhook handler.

## Caveats and flags
- **Two stacks in the same folder:** this Node/TypeScript design (whatsapp-web.js, Notion) and the Python/FastAPI Evolution API MVP in [[WhatsApp Agent MVP Setup Guide]] are alternatives; the index marks only the Python one as a working skeleton. Neither is shown running in these notes.
- The "Telegram" output in scenario 3 conflicts with the WhatsApp-first plan elsewhere; Telegram is the ClaudeClaw default remote channel.
- Notion integration and CRM browser automation are "documented, not built" per [[Work OS Master Index]].
- No credentials are in the file.

Related: [[WhatsApp MVP and Notion Integration]], [[Work OS]].
