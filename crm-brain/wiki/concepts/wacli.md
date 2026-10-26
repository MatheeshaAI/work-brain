---
type: concept
sources: ["raw/Health-Insurance/Context/WHATSAPP_INTEGRATION_COMPLETE.md", "raw/Health-Insurance/Workflows/Workflow_WhatsApp_Setup.md", "raw/Health-Insurance/Workflows/Workflow_WhatsApp_Send_Message.md", "raw/Health-Insurance/Workflows/Workflow_WhatsApp_Search.md"]
updated: 2026-10-22
tags: [whatsapp, wacli, cli, tooling, superseded]
summary: "wacli - the self-hosted Go WhatsApp CLI the workspace used first, and why it was dropped."
---
# wacli

**wacli** is a self-hosted, command-line WhatsApp client for local message management, search and archival. It was the **first generation** of this workspace's WhatsApp tooling, used through Node.js wrapper scripts, and it was replaced within four days by the [[Baileys]] stack. It is dead code in the vault: nothing in the current notes depends on it. See [[WhatsApp stack timeline]] for the full sequence.

## What it was
- A **Go** program, built from source with the `sqlite_fts5` build tag so that full-text search worked. The binary was `wacli` (or `wacli.exe` on Windows).
- The upstream project is `steipete/wacli`. The workspace used it as a **local, self-hosted** tool: no cloud service, no per-message fees.
- Authentication was a one-time QR scan from the phone's Linked Devices screen - the same pattern every later generation kept. See [[Linked device authentication]].

## The command surface
| Job | Command |
|---|---|
| Authenticate | `wacli auth` (and `wacli auth status` to check) |
| Health check | `wacli doctor` - store location, auth status, database health, lock file |
| Sync continuously | `wacli sync --follow --download-media` |
| Search messages | `wacli messages search "<term>" --json` |
| List chats | `wacli chats list --limit 10` (also `--json`) |
| Read a chat | `wacli messages list --chat "<jid>" --limit 10` |

The JID form is `<phone>@s.whatsapp.net`; phone numbers are given in international format without a `+`.

## How the workspace wrapped it
Four Node.js scripts sat on top of the CLI, and they are what the workflow documents actually instruct you to run:
- `wacli-send-message.js` - send text or a file with a caption.
- `wacli-search-lead.js` - search a lead's conversation by name, phone or lead reference.
- `wacli-export-conversation.js` - export a whole chat to Markdown.
- `wacli-sync-service.sh` - run the sync in the background.

`Workflow_WhatsApp_Send_Message.md` and `Workflow_WhatsApp_Search.md` (see [[Workflow WhatsApp Send Message]] and [[WhatsApp Search And Export Workflow]]) are written entirely against these wrappers.

## The store
Everything landed under `.wacli-store/`: `session.db` (the WhatsApp encryption keys), `wacli.db` (messages and contacts in SQLite) and `media/`. The session file is **credentials** - never shared, never committed, and `.wacli-store/`, `*.db` and `LOCK` belonged in `.gitignore`. Nothing from the store is copied into this wiki.

## The behaviour it gave the sales loop
This is the part that still matters, because the later stacks kept the same shape: search a chat to count how many times a lead was contacted, to find the unanswered question, to check that a coverage topic was discussed, to see the last contact date; export the chat to Markdown after the quote and again after booking, for the compliance file. See [[Local message archive]] and [[WhatsApp Tool Guide]].

## Why it was replaced
- **Platform, not capability.** The binary ran on Linux and macOS only; the work is done on Windows. That single fact is what the migration note leads with. See [[Baileys migration notes]].
- **Install friction.** A Go toolchain and a source build, versus `npm install`.
- **The database was binary**, so it could not be queried with ordinary tools.
- The one thing it did better than what replaced it: full-text search was built into the CLI via FTS5.

## Caveats recorded in the notes
- The "setup complete" note was **documented but not installed** - the next steps still ask for Go and a build.
- One session per WhatsApp account, and the primary phone must have WhatsApp open to receive messages.
- The session logs in as the **personal** WhatsApp account, not a Business account. See [[WhatsApp Business]].
- The four wrapper scripts and the four workflow files were left in place after the migration, which is why two generations of tooling is still referenced from the same folder.

Related: [[WhatsApp stack timeline]], [[WhatsApp automation stack]], [[Baileys]], [[Baileys migration notes]], [[Local message archive]], [[Linked device authentication]], [[whatsapp-mcp]].
