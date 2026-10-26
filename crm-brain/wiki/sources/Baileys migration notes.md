---
type: source
sources: ["raw/Health-Insurance/Context/BAILEYS_MIGRATION.md"]
updated: 2026-10-22
tags: [whatsapp, baileys, migration, scripts]
summary: "Why the WhatsApp tooling was rebuilt from wacli to Baileys on Node.js, and what the new scripts do."
---
# Source: Baileys migration notes

Original file: [[raw/Health-Insurance/Context/BAILEYS_MIGRATION.md|BAILEYS_MIGRATION.md]]. The "what changed" note for replacing the `wacli` WhatsApp CLI with a Node.js/Baileys stack. It is written as a migration guide, so it mixes **built facts** (the new scripts exist, the database exists) with **claims** (features described as working).

## Why the rebuild happened
- The old tool was a **Go binary that only ran on Linux/Mac**, and the work is done on Windows. The note's table lists the platform change as the headline.
- Secondary reasons given: binary database format replaced by readable SQLite, source-compile install replaced by `npm install`, terminal-based auth replaced by QR scan, and a Bash sync service replaced by a pure Node.js one.

## Files it lists as created
- `wa-db.js` - SQLite wrapper over `messages`, `contacts` and `chats` tables.
- `wa-sync.js` - background service: syncs history, receives new messages.
- `wa-send.js` - send text and document messages.
- `wa-search.js` - search message history.
- `wa-export.js` - export a chat to markdown.
- `package.json` - dependencies.
- Docs it points to: a setup guide, a 5-minute quick start, and a `.gitignore` entry for the credential folder.

## How it is meant to be used
1. One-time: `npm install`, then start the sync service and scan the QR code (see [[WhatsApp setup quick start]]).
2. Daily: send a message, search a conversation, export a chat - each a one-line command with a `--phone` / `--jid` / `--file` flag.
3. The search command also accepts a name or a lead reference, which is how a lead file is connected to its conversation.

## The data model
- One SQLite file, `Scripts/wa-store/messages.db`, holding `messages`, `contacts` and `chats`.
- Timestamps are Unix seconds. Duplicates are handled on insert.
- First sync of a large history takes 10-30 minutes.

## Security and caveats stated in the note
- The session folder holds WhatsApp session keys and "works like a password": never committed, never shared, kept out of git via `.gitignore`.
- Nothing leaves the machine - no cloud sync.
- The note flags a **small ban risk**, the same as any unofficial client, and says the phone must stay online for real-time sync.
- The worked example ends in an "audit trail" claim: lead file plus message history plus documents.

## Status
- Built facts: the scripts and the SQLite store are described as created and installed.
- Later supersession: this note describes the Baileys generation. A later in-scope source (the agent redesign spec) points at a different store path under `whatsapp-mcp`, so the Baileys store is not the current one. See [[WhatsApp automation stack]] for the full sequence.

Related: [[Baileys]], [[WhatsApp automation stack]], [[Local message archive]], [[Linked device authentication]].
