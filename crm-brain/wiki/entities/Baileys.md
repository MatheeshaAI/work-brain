---
type: entity
sources: ["raw/Health-Insurance/Context/BAILEYS_MIGRATION.md", "raw/Health-Insurance/Context/SETUP_COMPLETE.md", "raw/Health-Insurance/Context/RUN_THIS_NOW.md"]
updated: 2026-10-22
tags: [library, whatsapp, node, tool]
summary: "The unofficial WhatsApp Web library the second-generation local tooling was built on, chosen because it runs on Windows with only Node.js."
---
# Baileys

An unofficial **WhatsApp Web client library**. It is the foundation of the second generation of the workspace's local WhatsApp tooling: a Node.js service that connects to WhatsApp over the Web protocol, syncs history and receives new messages into a local SQLite database.

Sources: [[Baileys migration notes]], [[Baileys WhatsApp integration setup complete]], [[WhatsApp setup quick start]].

## Why it was chosen
The reason is platform, not features. The previous tool was a **Go binary that would not run on Windows**, and Windows is the working machine. The migration note's comparison table lists the changes: Linux/Mac -> Windows, compiled binary -> `npm install`, terminal auth -> QR scan, Bash sync service -> pure Node.js, opaque binary database -> readable SQLite.

## What was built on it
| Script | Purpose |
|---|---|
| `wa-db.js` | SQLite wrapper over `messages`, `contacts`, `chats` |
| `wa-sync.js` | background sync service |
| `wa-send.js` | send text and document messages |
| `wa-search.js` | search history by phone, name or lead reference |
| `wa-export.js` | export a chat to markdown |

Store: `Scripts/wa-store/messages.db`. Session credentials: `Scripts/wa-auth/` (gitignored, described as working like a password). See [[Local message archive]], [[Linked device authentication]].

## How it is authenticated
QR code printed in the terminal; the phone scans it from WhatsApp -> Linked Devices -> Link a Device. The phone must stay online for real-time sync. See [[Linked device authentication]].

## Caveats
- **Unofficial client.** Every note repeats a small ban risk, and that the phone's own WhatsApp must be the account used.
- **Superseded.** By 2026-05-04 the agent redesign spec points at a `whatsapp-mcp` store instead. No note in this scope records that migration, so the vault still contains Baileys instructions that read as current. See [[WhatsApp automation stack]], [[whatsapp-mcp]].
- The `wa-sync-simple.js` file name appears in the quick-start note but not in the file list; the workspace's recovered-files area contains empty placeholder copies of the simple variant. Treat file lists as unreliable.
- The credentials and database are excluded by `.gitignore`, but the note's own paths point at a machine that no longer holds this layout.

Related: [[WhatsApp automation stack]], [[Local message archive]], [[Linked device authentication]], [[whatsapp-mcp]], [[WhatsApp bridge server]].

Tutorial use: the library behind [[WhatsApp AI agent build recipe]]; its ban warning for bulk sends is in [[WhatsApp AI Agent with Claude Code]].
