---
type: source
sources: ["raw/Health-Insurance/Context/SETUP_COMPLETE.md"]
updated: 2026-10-22
tags: [whatsapp, baileys, setup, sqlite, schema]
summary: "Completion report for the Baileys WhatsApp integration: architecture, scripts, SQLite schema, performance notes."
---
# Source: Baileys WhatsApp integration setup complete

Original file: [[raw/Health-Insurance/Context/SETUP_COMPLETE.md|SETUP_COMPLETE.md]]. Dated **21-Apr-2026**, status "Ready for Use". A completion report for the Node.js/Baileys WhatsApp integration that replaced `wacli`.

## Architecture as described (built claim)
Three tiers, drawn as an ASCII diagram in the note:
1. **WhatsApp on the phone**, linked by QR code.
2. **Node.js Baileys service** (`wa-sync.js`) speaking the WhatsApp Web protocol over a WebSocket, syncing history and receiving new messages.
3. **Local SQLite database** at `Scripts/wa-store/messages.db` with three tables: `messages`, `contacts`, `chats`.

## The scripts it lists
| File | Purpose |
|---|---|
| `wa-db.js` | SQLite wrapper (create, read, search) |
| `wa-sync.js` | background sync service |
| `wa-send.js` | send text and document messages |
| `wa-search.js` | search history by phone, name or lead reference |
| `wa-export.js` | export chats to markdown |

Plus documentation files it points to (tool guide, technical setup, migration note, quick start, project CLAUDE.md) and a `.gitignore` that protects the credential and store folders.

## The `messages` table (built fact, schema only)
Columns: `id` (primary key), `jid`, `from_jid`, `from_me` (0 = the other party, 1 = you), `timestamp` (Unix seconds), `message_type` (text, image, document, video, audio, sticker), `text`, `caption`, `filename`, `mimetype`, `media_path`, `chat_name`, `is_group`, `raw_json`, `created_at`. The note gives two example `sqlite3` queries: count messages for one chat, and find messages by keyword.

## The client-inquiry workflow it teaches
1. Add an "Inquiries & Interactions" block to the lead file (date, type, current plan, requested plan, status).
2. Search the WhatsApp history for that chat.
3. Send the quote as a document with a caption.
4. Export the chat to a folder for records.
The claimed result is an audit trail of lead file + messages + documents. The same four-step pattern appears in the migration note, so the two agree.

## Performance and operational notes
- First full-history sync 10-30 minutes; database grows roughly 10-50 MB per 1,000 messages; search is indexed and instant; idle CPU is minimal.
- Service commands: start, stop, status. Logs live in a `logs/` folder.
- Keep the phone online for real-time sync; use only the personal WhatsApp number; export conversations regularly for backup; update the CRM status when an inquiry is resolved.

## Security notes
- Credentials in `Scripts/wa-auth/` are protected by `.gitignore`; the database is local only; the note repeats the "small ban risk" caveat of unofficial clients.

## Caveats and later status
- Paths in the note use the old machine path (`c:\Users\Matheesha-IM.AE\...`).
- **Superseded later:** the database path here is `Scripts/wa-store/messages.db`, while the agent redesign spec (2026-05-04) points at `Scripts/whatsapp-mcp/whatsapp-bridge/store/messages.db`. The Baileys stack was replaced by the whatsapp-mcp stack. See [[WhatsApp automation stack]].
- The `.env` file in the vault holds credentials and is not ingested.

Related: [[Baileys]], [[whatsapp-mcp]], [[Local message archive]], [[IMCRM]].
