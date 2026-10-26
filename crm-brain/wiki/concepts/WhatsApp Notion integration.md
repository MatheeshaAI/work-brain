---
type: concept
sources: ["raw/work_os system designing documents/04_AUTOMATION/WhatsApp_Notion_Integration.md", "raw/work_os system designing documents/04_AUTOMATION/Browser_Automation.md", "raw/work_os system designing documents/04_AUTOMATION/whatsapp_mvp_Based_on_Mark.md"]
updated: 2026-10-22
tags: [whatsapp, notion, approval, automation, architecture]
summary: "Using a Notion database as the message store, outbox and approval screen for a whatsapp-web.js agent."
---
# WhatsApp Notion integration

A pattern where **Notion is the control surface for WhatsApp**: incoming messages are written into a Notion database, outgoing messages are queued as rows, and the owner approves a draft by ticking a checkbox. The agent then sends it and marks the row sent. Nothing reaches a client without a human tick.

Source: [[WhatsApp MVP and Notion Integration]].

## Why Notion is in the loop
The CRM has no API, and the desk already lives in Notion. Rather than build a database and a UI, the design reuses Notion as both: the message log, the pipeline view, the task list, and the approval screen. That is the same instinct as [[Markdown-backed lead store]] - use the tool the owner already has open.

## The database
A Notion integration needs four scopes (`pages:read`, `pages:write`, `databases:read`, `databases:write`), a token in `NOTION_TOKEN`, the database id in `NOTION_DB`, and the page shared with the integration. The properties named in the design:

| Property | Type | Role |
|---|---|---|
| `Number` | text | the chat's phone number |
| `Text` | text | the message body |
| `Direction` | select | `in` or `out` |
| `Date` | date | timestamp |
| `Sent` | checkbox | false = the agent's outbox work list |
| `NeedsFollowup` | checkbox | marks a row for follow-up |
| `DraftMessage` | text | the model's proposed reply |
| `Approved` | checkbox | the human tick |

## The loop
1. An incoming WhatsApp message hits the `message` handler; the text is stored in SQLite and pushed into Notion as a row with `Direction = in`.
2. A row is flagged `NeedsFollowup = true`.
3. The handler fetches the page, pulls the last 10 messages of that chat from local SQLite, and builds a prompt containing the conversation plus the CRM notes.
4. The prompt asks for a polite follow-up that picks up where the conversation left off, asks if anything else is needed, and mentions the quoted plan if it can infer one - **"Respond with just the message text."**
5. The draft is written back to Notion as `DraftMessage`.
6. The owner ticks `Approved`; the handler sends via `client.sendMessage()` and updates `Sent` and `NeedsFollowup`.

The design's own summary of the cycle: **Notion triggers -> Node fetches context -> AI drafts -> you approve -> WhatsApp sends.**

## Push or poll
- **Webhooks** - Notion POSTs when a row changes, received by an Express server on `/notion-hook`; register the webhook through the Notion API, or use a relay like Make or IFTTT when no public URL is available (`ngrok` for local development).
- **Polling** - query the database for rows where `Sent = false` on a timer, e.g. every 30 seconds. Works where incoming connections are not possible.

Both feed the same handler. The polling version is the one the reference code implements, via `checkForOutgoingNotionMessages()`.

## Details that matter
- **Number normalisation.** `whatsapp-web.js` hands over digits without the `+`, so strip non-digits before comparing. `+97150...` and `97150...` must resolve to the same contact.
- **Enable/disable per number.** `enable <number>` / `disable <number>` / `list` on a readline prompt. This is the switch that stops an auto-reply going to the wrong chat.
- **Sending is the fragile part.** Wrap sends in `try/catch`, and use `msg.from` so the right chat id is used.
- **Names only exist for saved contacts.** An unsaved number shows digits only; the other party cannot see whether you have saved them.
- **History needs explicit loading.** The library mirrors WhatsApp Web - `chat.fetchMessages({ limit: 100 })` then `loadEarlierMsgs()` in a loop.
- **Approval is not optional.** The draft-then-tick step is what stops a model drafting a price promise, a network claim or a policy statement the desk has not checked. See [[Approval gates]], [[Draft and approve messaging flow]] and [[Plan confirmation before payment]].

## Where it sits
The MVP is a small Node script (`index.js`, `whatsapp-web.js` + `qrcode-terminal`) that scans a QR code once and keeps a session in `./.wwebjs_auth_mvp`. The note is explicit that the full ClaudeClaw stack is **not** needed to try the idea, and the graduation path is to copy the same handlers into the larger project against its existing schema (`wa_messages`, `wa_outbox`).

Related: [[Sales Automation]], [[whatsapp-web.js]], [[Notion]], [[Approval gates]], [[Draft and approve messaging flow]], [[Browser automation]], [[ClaudeClaw]], [[Local message archive]], [[Phone number normalisation]].
