---
type: entity
sources: ["raw/Health-Insurance/docs/superpowers/specs/2026-05-04-agent-architecture-redesign-design.md"]
updated: 2026-10-22
tags: [mcp, whatsapp, tool, agents]
summary: "The MCP-server generation of the WhatsApp tooling - a bridge over the WhatsApp protocol with its own SQLite message store."
---
# whatsapp-mcp

The third generation of the workspace's WhatsApp tooling: a **Model Context Protocol server** that exposes WhatsApp data to an agent as tools, over a bridge that keeps a SQLite message store of its own.

**This page is a stub.** The only ingested evidence is one path reference in the agent redesign spec of 2026-05-04. No setup note, script listing, schema or usage guide for whatsapp-mcp exists in this ingest scope.

## What is known
- The store path cited in the spec is `Scripts/whatsapp-mcp/whatsapp-bridge/store/messages.db` - a **bridge** with its own SQLite store, in the same `messages` style as the Baileys generation.
- The spec's `whatsapp-reader` agent is described as querying "the WhatsApp bridge SQLite store (or MCP tools)", so the MCP tools and the database are two views of the same thing.
- It post-dates the Baileys generation (21-Apr-2026) and is the stack in force when the spec was written (04-May-2026).

## Why it is a different shape
- **Baileys** was a set of scripts the agent shelled out to; **whatsapp-mcp** wraps the same kind of capability as MCP tools, which is what lets an agent query a conversation without knowing the script names. This is the same move as the Tier 1 `whatsapp-reader` agent in [[Tiered agent architecture]].
- It is the reason the spec can promise that "the main session never contains raw WhatsApp data" - the tool returns a summary, and the store stays behind the tool.

## Caveats
- **No migration note.** The vault contains a detailed note for the previous generation and none for this one, so the path in the spec and the paths in the Baileys notes both read as current. Flagged in [[WhatsApp automation stack]].
- The later [[WhatsApp bridge server]] generation - the self-hosted HTTP service the daily audit polls - is a **separate** service on separate hardware, not a continuation of this one. Its outage is not evidence about whatsapp-mcp.

Related: [[Baileys]], [[WhatsApp automation stack]], [[Local message archive]], [[Tiered agent architecture]], [[WhatsApp bridge server]].
