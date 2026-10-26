---
type: concept
sources: ["raw/Health-Insurance/Context/BAILEYS_MIGRATION.md", "raw/Health-Insurance/Context/SETUP_COMPLETE.md", "raw/Health-Insurance/Context/RUN_THIS_NOW.md", "raw/Health-Insurance/Context/WHATSAPP_INTEGRATION_COMPLETE.md", "raw/Health-Insurance/docs/superpowers/specs/2026-05-04-agent-architecture-redesign-design.md"]
updated: 2026-10-22
tags: [whatsapp, architecture, timeline, migration]
summary: "The four generations of the WhatsApp tooling in this workspace - wacli, Baileys, whatsapp-mcp, and the bridge server - with the reasons for each change."
---
# WhatsApp automation stack

The vault contains four different WhatsApp toolchains, each built to replace the one before it. Read together they explain why the paths in the notes do not match each other.

## The sequence
| Date | Stack | What it was | Why it ended |
|---|---|---|---|
| 2026-04-17 | **wacli** - self-hosted Go CLI + Node.js wrappers | send, search, export, background sync around a WhatsApp CLI | **Go binaries did not run on Windows**, the working machine; its own note still said "ready for Go installation" |
| 2026-04-21 | **Baileys** - Node.js library + SQLite store | `wa-db.js`, `wa-sync.js`, `wa-send.js`, `wa-search.js`, `wa-export.js`, store at `Scripts/wa-store/messages.db` | replaced by the whatsapp-mcp generation |
| 2026-05-04 | **whatsapp-mcp** - MCP server over a WhatsApp bridge | referenced by the agent redesign spec at `Scripts/whatsapp-mcp/whatsapp-bridge/store/messages.db` | - |
| 2026 (May-June) | **bridge server** - self-hosted HTTP service on the desk's server | returns the chat list for the hourly sales audit | **offline for all 18 runs, 26-29 May 2026** |

Sources: [[WhatsApp integration setup complete (wacli)]], [[Baileys migration notes]], [[Baileys WhatsApp integration setup complete]], [[Agent architecture redesign spec]], [[WhatsApp bridge server]].

## The shared shape
Every generation keeps messages **on the machine, in a database, searchable offline**:
- wacli: a session database with encryption keys.
- Baileys: SQLite with `messages`, `contacts`, `chats`.
- whatsapp-mcp: a bridge store, same SQLite shape.
- bridge server: an HTTP chat list, exported to JSON per day.

The channel is always **the advisor's personal WhatsApp number**, not a WhatsApp Business account - all four generations say so. See [[WhatsApp Business]].

## What the replacement was actually about
- **Platform, not capability.** The Baileys migration's headline table is OS, install method, database format and auth method. Nothing in the feature list was lost; the Go binary was the problem.
- **One thing per generation.** wacli needed a Go toolchain; Baileys needed only Node.js; whatsapp-mcp wrapped the store behind an MCP interface so an agent could query it as a tool rather than a script.
- **The bridge server was never the same tool.** It is not a replacement for the local library stack; it is a separate service on separate hardware that the audit polls. Its failure is therefore not evidence that Baileys or whatsapp-mcp failed.

## The contradiction to flag
Two different store paths are current in the notes: `Scripts/wa-store/messages.db` (Baileys, 21-Apr) and `Scripts/whatsapp-mcp/whatsapp-bridge/store/messages.db` (spec, 04-May). The later date wins for "what the agent reads today", but **both notes are still in the vault and both read as current**. Nothing records the migration itself - there is no whatsapp-mcp setup note in this scope.

## The recurring caveats
Every generation repeats the same three warnings, which is worth noting because they are stable properties of the approach rather than bugs:
1. **The session folder is a password.** It holds the encryption keys and must never be committed or shared.
2. **Unofficial clients carry a small ban risk.**
3. **The phone must stay online** for real-time sync; otherwise the stack only sees history.

Related: [[Baileys]], [[whatsapp-mcp]], [[Local message archive]], [[Linked device authentication]], [[WhatsApp bridge server]], [[WhatsApp Business]].

## Earlier and parallel generations (added)
Before the four generations above: a Playwright script described in [[send-whatsapp]]; and an Evolution API webhook plan on a VPS in [[Sales_OS_Opencode_Session]] (compare options in [[WhatsApp message access options]]). Tutorial route: [[WhatsApp AI agent build recipe]].
