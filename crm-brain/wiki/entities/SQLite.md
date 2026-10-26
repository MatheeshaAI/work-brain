---
type: entity
sources: ["raw/work_os system designing documents/05_CODE/config.py", "raw/work_os system designing documents/05_CODE/start.py", "raw/work_os system designing documents/00_ORIGINALS/config.py", "raw/work_os system designing documents/00_ORIGINALS/start.py"]
updated: 2026-10-22
tags: [database, storage, whatsapp, drafts, stub]
summary: "Stub. The embedded database used across the vault's WhatsApp tooling - the sales agent's drafts and lead DB, and the message archive."
---
# SQLite

**Stub.** An entity mentioned in the vault rather than researched here.

SQLite is the embedded database the [[WhatsApp Agent MVP Setup Guide]] MVP uses to hold pending drafts and the lead record: `config.py` points `DATABASE_PATH` at `data/leads_db.sqlite` and the documented fix for a "database is locked" error is to delete the SQLite file and restart - which loses the drafts. See [[Health Insurance Sales Agent Python Code]].

In the rest of the vault SQLite is the storage layer for the WhatsApp tooling: the local message archive that makes chats searchable ([[Local message archive]]), the Baileys and whatsapp-mcp message stores ([[Baileys]], [[WhatsApp automation stack]]), and ClaudeClaw's memory tables with full-text search and salience ([[Decaying memory model]]).

The `requirements.md` pin list includes `sqlite3`, which is built into Python and not pip-installable - one of the signs that the list is a wish list rather than a lockfile ([[Work OS Master Index]]).

Related: [[Health Insurance Sales Agent Python Code]], [[WhatsApp Agent MVP Setup Guide]], [[Local message archive]], [[Decaying memory model]], [[Baileys]].
