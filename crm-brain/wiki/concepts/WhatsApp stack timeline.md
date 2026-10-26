---
type: concept
sources: ["raw/Health-Insurance/Context/WHATSAPP_INTEGRATION_COMPLETE.md", "raw/Health-Insurance/Workflows/QUICKSTART_BAILEYS.md", "raw/Health-Insurance/Workflows/WhatsApp_Tool_Guide.md", "raw/Health-Insurance/Workflows/Workflow_Baileys_Setup.md", "raw/Health-Insurance/Workflows/Workflow_WhatsApp_Setup.md", "raw/Health-Insurance/Workflows/Workflow_WhatsApp_Search.md"]
updated: 2026-10-22
tags: [whatsapp, timeline, migration, tooling, documentation]
summary: "How the WhatsApp tooling evolved - wacli, then Baileys - and which document set belongs to which generation."
---
# WhatsApp stack timeline

The WhatsApp tooling in this workspace was rebuilt twice in a month, and the documentation was never retired. This page is the **chronological trail**: which generation of the tooling each document set describes, in what order, and what replaced what. For the "why" behind each change, see [[WhatsApp automation stack]].

## The trail

| Date | Generation | Documents that describe it | What replaced it |
|---|---|---|---|
| 2026-04-17 | **wacli** - a self-hosted Go CLI with Node.js wrapper scripts | [[WhatsApp integration setup complete (wacli)]], [[Workflow WhatsApp Setup]], [[Workflow WhatsApp Send Message]], [[WhatsApp Search And Export Workflow]] | the Baileys scripts, 4 days later |
| 2026-04-21 | **Baileys** - Node.js library plus a SQLite store | [[Quickstart Baileys WhatsApp]], [[Workflow Baileys Setup]], [[WhatsApp Tool Guide]] | the whatsapp-mcp generation |
| 2026-05-04 | **whatsapp-mcp** - MCP server over a WhatsApp bridge | referenced from the agent redesign spec; no setup note in this scope | - |
| May-June 2026 | **bridge server** - a separate self-hosted HTTP service | [[WhatsApp bridge server]] | - |

## Generation 1 - wacli (documented 17 April 2026)
- The CLI itself: `wacli auth` for a QR login, `wacli sync --follow --download-media` for continuous sync, `wacli messages search` and `wacli chats list` for the history, plus a `wacli doctor` health check. See [[wacli]].
- The wrappers: four Node.js scripts - send a message, search a lead's conversation by name, phone or reference, export a chat to Markdown, and a background sync service.
- **The status line is misleading.** The note's last line reads "Setup complete. Ready for Go installation and authentication" - Go was never installed, so the wrappers could not have run.
- The workflow set built on it is still the best-written description of the sales loop: pull the lead from the CRM, quote, send, search for the reply, follow up, book, send documents, export the conversation for compliance. See [[Workflow WhatsApp Send Message]] and [[WhatsApp Search And Export Workflow]].

## Generation 2 - Baileys (21 April 2026)
- Same five capabilities, rebuilt on Node.js so it would run on Windows. The comparison table in [[Workflow Baileys Setup]] is the clearest record of the swap: platform, install method, auth method, database format.
- The scripts change shape: `wa-sync.js`, `wa-send.js`, `wa-search.js`, `wa-export.js` replace the `wacli-*` wrappers, and the store becomes a readable SQLite file at `Scripts/wa-store/messages.db` with `messages`, `contacts` and `chats` tables.
- The documentation is layered: a five-minute start ([[Quickstart Baileys WhatsApp]]), the full install guide ([[Workflow Baileys Setup]]) and a long manual with troubleshooting, the database schema and a six-step client-inquiry workflow ([[WhatsApp Tool Guide]]).
- **Migration is a re-sync, not a conversion.** The old wacli database is ignored and the whole history is pulled from WhatsApp again.

## Generation 3 - whatsapp-mcp (4 May 2026)
The idea is the same as [[Baileys]] but the store sits behind an MCP interface, so an agent queries it as a tool rather than running scripts. The agent redesign spec points at a different store path than the Baileys notes do, and **both notes are still in the vault reading as current**. No whatsapp-mcp setup note exists in this scope, so the generation is documented only by its references.

## Generation 4 - the bridge server (May-June 2026)
A separate service on separate hardware that the hourly sales audit polls for a chat list. It is not a replacement for the local library stack, and its failure is not evidence about the earlier generations.

## What the timeline explains
- **Why the paths in the notes disagree.** Two store paths are current at once, and four generations of scripts are referenced by name across the same folder.
- **Why the old workflow files still read as current.** The wacli-era documents were never moved or marked superseded, so a reader who opens `Workflows/` first will meet the dead generation first.
- **What was stable.** Every generation kept messages **on the machine, in a database, searchable offline**, and every one repeated the same three warnings: the session folder is a password, unofficial clients carry a small ban risk, and the phone must stay online for real-time sync.

Related: [[WhatsApp automation stack]], [[wacli]], [[Baileys]], [[whatsapp-mcp]], [[Local message archive]], [[Linked device authentication]], [[WhatsApp Business]].
