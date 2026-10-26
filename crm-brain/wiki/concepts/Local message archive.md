---
type: concept
sources: ["raw/Health-Insurance/Context/SETUP_COMPLETE.md", "raw/Health-Insurance/Context/BAILEYS_MIGRATION.md", "raw/Health-Insurance/Context/RUN_THIS_NOW.md"]
updated: 2026-10-22
tags: [whatsapp, sqlite, storage, privacy]
summary: "The local SQLite archive of WhatsApp messages - schema, volume, and why it is both the search tool and a privacy risk."
---
# Local message archive

Every generation of the WhatsApp tooling keeps a **local copy of the message history in SQLite**, so a conversation can be searched, summarised or exported without going back to the phone.

## The schema (Baileys generation)
| Table | Holds |
|---|---|
| `messages` | `id`, `jid`, `from_jid`, `from_me` (0 = them, 1 = you), `timestamp` (Unix seconds), `message_type` (text, image, document, video, audio, sticker), `text`, `caption`, `filename`, `mimetype`, `media_path`, `chat_name`, `is_group`, `raw_json`, `created_at` |
| `contacts` | contact records |
| `chats` | chat records |

Duplicates are handled on insert, so re-syncing is safe. Source: [[Baileys WhatsApp integration setup complete]].

## Why it exists
- **Search**: `wa-search.js` searches by phone, by name, or by **lead reference** - which is how a lead file is connected to its conversation without keeping a phone number in the lead file.
- **Export**: `wa-export.js` writes a chat to markdown for the record.
- **Audit trail**: the claimed end state of the workflow is lead file + message history + documents.

## Volume and performance
- First full-history sync: **10-30 minutes**.
- Database growth: roughly **10-50 MB per 1,000 messages**.
- Search is indexed and instant; idle CPU is minimal.

## The privacy problem
- The archive is **client communications**, so it is the highest-sensitivity artefact in the workspace: names, numbers, health questions, and often payment or medical detail.
- It stores the **raw JSON** of every message alongside the parsed columns, so redaction of the parsed fields does not redact the archive.
- The database sits in the workspace area and is excluded from git by `.gitignore`, but a local file is still a copy of the clients' conversations that nobody is tracking.
- **Nothing in the ingested notes says how long the archive is kept, or how it is deleted.** The export step is described as a backup practice; it is also the only removal path mentioned.

## Related
- The archive is what the `whatsapp-reader` agent would query under [[Context isolation]] - it is the reason a clean summary can be produced without loading a transcript.
- The bridge server generation reaches the same data over HTTP instead of a local file, which is why its outage left the audit reading zeros - see [[WhatsApp bridge server]].

Related: [[WhatsApp automation stack]], [[Baileys]], [[Linked device authentication]], [[Local file writing sidecar]].
