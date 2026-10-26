---
type: source
sources: ["raw/Health-Insurance/Workflows/QUICKSTART_BAILEYS.md"]
updated: 2026-10-22
tags: [whatsapp, baileys, setup, quickstart]
summary: "Five-minute quick start for the Node.js Baileys WhatsApp sync, send, search and export scripts."
---
# Quickstart Baileys WhatsApp

A one-page quick start written when the WhatsApp integration moved to [[Baileys]] (April 2026 examples). Full guide: [[Workflow Baileys Setup]]; command reference: [[WhatsApp Tool Guide]].

## Flow
1. **Start the sync service** from the `Scripts` folder (`wa-sync.js start`); a QR code prints in the terminal.
2. **Scan the QR** from WhatsApp, Settings, Linked Devices ([[Linked device authentication]]); wait for the connected message. The service then syncs every message to a local database.
3. **Send** a text or a file with a caption (`wa-send.js`, phone number in international format).
4. **Search** by phone, name or REF-ID (`wa-search.js`).
5. **Export** a chat to Markdown by WhatsApp JID (`wa-export.js`).
6. **Stop** with `wa-sync.js stop`.

## Where data lives
Messages in a SQLite file under `Scripts/wa-store/`, auth session keys under `Scripts/wa-auth/` (treat as credentials; not copied), logs under `logs/`.

## Troubleshooting
QR not showing: check the phone is online, restart. Messages not syncing: check service status and logs. "Not authenticated" on send: rescan the QR.

## Link to lead files
Suggests logging each client inquiry in the lead file under an "Inquiries & Interactions" heading (date, type, details, status), then searching the chat by phone. See [[Local message archive]], [[WhatsApp automation stack]].

Flag: the later system overview marks the Baileys stack as archived and replaced by a Go bridge; see [[WhatsApp stack timeline]].
