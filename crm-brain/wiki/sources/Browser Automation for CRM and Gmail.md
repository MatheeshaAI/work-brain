---
type: source
sources: ["raw/work_os system designing documents/04_AUTOMATION/Browser_Automation.md", "raw/work_os system designing documents/00_ORIGINALS/Browser_Automation_Overview.md"]
updated: 2026-10-22
tags: [browser-automation, puppeteer, agent-browser, crm, gmail, architecture]
summary: "Why and how to drive the custom CRM and Gmail through a browser when no API exists: Puppeteer versus agent-browser, a lead-lookup example, session persistence and the end-to-end follow-up pipeline."
---
# Source: Browser Automation for CRM and Gmail

A design note (two identical copies) adding browser automation to the Node architecture in [[Work OS Full System Documentation]]. It argues that because the CRM ([[IMCRM]]) is a custom web app with no public API, and Gmail also needs handling, the only general route is to drive the browser as a human would.

## What to automate
Log in to the CRM, search leads, update stages, read notes; open Gmail or Outlook Web to read, compose and send; any other intranet tool opened by hand. Because it runs in the same Node process as the WhatsApp bridge, Notion and Claude logic, steps can be chained.

## Library choice
| Option | Notes |
|---|---|
| Playwright or Puppeteer | low-level, you write the steps; Puppeteer already present because [[whatsapp-web.js]] needs it |
| `agent-browser` (OpenClaw) skill | a higher-level DSL with `browser.open`, `.click`, `.write`; the model works out selectors from an English instruction; installed via `npx skills add rivet-dev/skills -s browser` |

An example `withBrowser(fn)` wrapper launches headless Chromium (`--no-sandbox`), logs in with credentials from environment variables, searches by phone number and returns name, stage and notes. The CRM URL and selectors in the example are placeholders. Gmail is possible but Google may block automated logins; the note recommends an app password and a persistent `--user-data-dir` profile, or the official Gmail API with OAuth.

## Fit with the workflow
1. Incoming WhatsApp message stored in SQLite, optionally pushed to Notion/CRM.
2. CRM lookup by number gives current stage and notes.
3. Prompt Claude with the chat, CRM notes and Notion pipeline info to draft a reply.
4. **Approval:** write the draft back to Notion or show in the CLI (see [[Draft and approve messaging flow]]).
5. On approval, update the CRM (stage, last contacted, note) by automation and send via WhatsApp or Gmail.
6. Email: navigate, compose, send, or use the Gmail API if allowed.

Final architecture: WhatsApp via whatsapp-web.js and Chromium, SQLite, Notion webhooks, a Node service (runAgent, CRM automation, Notion helpers), browser automation, then the CRM and Gmail web UIs.

## Practical tips
Persist sessions (profile directory or cookies); keep selectors in one file; wrap everything in try/catch and fail gracefully; many parallel browsers eat memory (pool or reuse a headless browser with pages); everything the script sees is stored on your server, so secure the VPS or desktop.

## Next steps listed
Pick Puppeteer or agent-browser; install packages; write login and lookup-by-phone helpers; add a follow-up handler to `index.js` or ClaudeClaw; test manually before wiring in.

## Status and flags
- **Documented, not built** at the time ([[Work OS Master Index]]). A real implementation later appeared as the Claude-in-Chrome route in [[Sales Automation Notes]] and the Chrome extension described in [[Extracting leads from the CRM]].
- The note's decisive point (reuse the logged-in Chrome session, do not start a fresh headless one) is reached later; here the headless relaunch with credentials would hit the CRM login and MFA, so treat the code as a sketch.
- Contains no credentials; it tells the reader to keep them in environment variables.

Related: [[Browser automation]], [[Browser Use real browser profiles]], [[Gmail]], [[Page data over screenshots]].
