---
type: source
sources: ["raw/work_os system designing documents/04_AUTOMATION/whatsapp_mvp_Based_on_Mark.md", "raw/work_os system designing documents/00_ORIGINALS/whatsapp_mvp_Based_on_Mark.md", "raw/work_os system designing documents/04_AUTOMATION/WhatsApp_Notion_Integration.md", "raw/work_os system designing documents/00_ORIGINALS/WhatsApp_Notion_Integration.md"]
updated: 2026-10-22
tags: [whatsapp, whatsapp-web-js, notion, mvp, webhook, polling]
summary: "A tiny whatsapp-web.js proof of concept (per-number auto-reply toggle) and the plan to link it to a Notion database for lead management, with draft-and-approve follow-ups."
---
# Source: WhatsApp MVP and Notion Integration

Two linked notes (each in two identical copies). The first, `whatsapp_mvp_Based_on_Mark`, is a short answer to "can I try WhatsApp automation without installing the whole ClaudeClaw stack?" ("Mark" in the filename is presumably the author of the ClaudeClaw project the owner studied; the note itself does not say; see [[ClaudeClaw]]). The second, `WhatsApp_Notion_Integration`, is a longer summary of the MVP and how to connect it to Notion. Both are design and snippet-level; the first note's bullet lists are empty link stubs in the source (formatting lost), so its steps are summarised from the prose.

## MVP (Node, whatsapp-web.js)
- Node 18+ and a Chromium build. A script `index.js` using [[whatsapp-web.js]] and `qrcode-terminal`. Scan a QR once; the session persists in `./.wwebjs_auth_mvp`.
- Features: log incoming messages; **enable or disable auto-reply per phone number**; send with `client.sendMessage()`; keyword rules ("call" alerts forwarded to the owner's own number); a few in-memory arrays or a small SQLite file for search; feed rows to Claude for "summary of today's chats" or sentiment.
- CLI (readline): `enable <number>`, `disable <number>`, `list`. Numbers are normalised to digits so `+97150...` and `97150...` match.
- Contact data: only numbers saved in the owner's account have a `name`; unsaved ones show digits plus a push name; the other party cannot see whether you saved them.
- Older messages: `fetchMessages({limit})` and `loadEarlierMsgs()` mirror WhatsApp Web behaviour.
- "Graduate" path: copy the handlers into `src/whatsapp.ts` of the bigger project and reuse its schema.

## Notion integration (design)
1. Create a Notion integration, give it page and database read/write scopes, store the token as `NOTION_TOKEN` in the environment (never in the notes) and share the target database with it. Install `@notionhq/client`.
2. Helper module: `addMessageToNotion(number, text, direction)` creates rows with Number, Text, Direction, Date; `checkForOutgoingNotionMessages()` queries rows where `Sent` is false, sends each via WhatsApp, then ticks `Sent`. Run on a timer (about every 30 seconds).
3. **Webhook versus polling:** Notion can POST changes to an Express endpoint (use ngrok or Make/IFTTT if there is no public URL); polling works when inbound connections are impossible. Both feed one handler.
4. **Follow-up cycle:** `NeedsFollowup = true` triggers `handleNotionChange(pageId)`, which loads the last 10 WhatsApp messages from SQLite, builds a prompt ("polite follow-up that picks up where we left off, asks if they need anything else, mentions the quoted plan"), runs Claude (`runAgent()`), saves the result in `DraftMessage`, and on tick of `Approved` sends and updates `Sent` and `NeedsFollowup`. See [[Draft and approve messaging flow]].
5. Ideas: store sentiment, latency and pipeline stage; a unique id linking WhatsApp, email and CRM; Notion views for "wants a callback"; analyse whole chat logs for templates.

## Status
- Everything is **documented, not built** (per [[Work OS Master Index]]: "Notion integration: documented, not built").
- The larger `PKM_System` (database tables `wa_messages`, `wa_outbox`, scheduler, memory, Telegram/Discord) is the intended target.

## Caveats and flags
- whatsapp-web.js automates a normal WhatsApp account through WhatsApp Web, which WhatsApp does not endorse; see [[WhatsApp Business]]. Later toolchains replaced it ([[WhatsApp automation stack]]).
- This Node/Notion route competes with the Python/Evolution API route in [[WhatsApp Agent MVP Setup Guide]]; the owner never says which won in these notes.
- The note refers to the project as "TPA's & Networks" in one place, a leftover from a copy/paste of a project name.

Related: [[Work OS Full System Documentation]], [[Notion]], [[Browser Automation for CRM and Gmail]].
