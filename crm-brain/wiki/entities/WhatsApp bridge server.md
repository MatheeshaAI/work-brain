---
type: entity
sources: ["raw/Insurance Workspace/Daily_Audit_2026-05-26.md", "raw/Insurance Workspace/Daily_Audit_2026-05-27.md", "raw/Insurance Workspace/Daily_Audit_2026-05-28.md", "raw/Insurance Workspace/Daily_Audit_2026-05-29.md", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-26.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-27.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-28.json", "raw/Insurance Workspace/Sales-System/Communications/WhatsApp/2026-05-29.json", "raw/Insurance Workspace/Sales-System/Logs/hourly_runs.log", "raw/Health-Insurance/Context/BAILEYS_MIGRATION.md", "raw/Health-Insurance/Context/SETUP_COMPLETE.md", "raw/Health-Insurance/docs/superpowers/specs/2026-05-04-agent-architecture-redesign-design.md"]
updated: 2026-10-22
tags: [infrastructure, whatsapp, automation, tool]
status: offline for the whole ingested window
summary: "Self-hosted WhatsApp bridge the sales audit reads chats from; unreachable on all 18 runs, 26-29 May 2026."
---
# WhatsApp bridge server

The self-hosted service the [[Sales System]] reads chats from. It listens on a dedicated port on the desk's own server and returns the chat list, which the audit then buckets into needs-reply, waiting-on-client and outbound-only.

**The host address and port are recorded in the source files and are not repeated here.** The audit reports it as a single endpoint; the bridge itself is a separate machine from the one running the audit.

## What it does
- Serves the chat list over HTTP on a fixed port.
- Is polled by the hourly comms job at the start of every run.
- Its output becomes `Sales-System/Communications/WhatsApp/<date>.json`.
- The audit's own note suggests it is one of the common self-hosted WhatsApp web libraries rather than a bespoke service - a design detail, not a confirmed fact.

## The failure, 26-29 May 2026
The bridge was unreachable on **every one of the 18 runs** in the ingested window. The signature changed each day, which is the most useful diagnostic clue in the sources:

| Date | Reported failure |
|---|---|
| 26 May | Connection refused - the host answered but nothing was listening on the port |
| 27 May | Host reachable by ping, all ports closed or filtered - a firewall or bind change rather than a dead process |
| 28 May | Connection refused on the port again - third consecutive offline run |
| 29 May | Connection timed out after 15 seconds - the port no longer answered at all |

Three distinct failure modes across four days points at a service that was being stopped, rebound or reconfigured rather than one that simply crashed.

## Why it matters
- **The channel was never read.** All four WhatsApp snapshot files hold empty arrays and zero counts. Every figure in the four daily audits is Gmail-only, and roughly half of a WhatsApp-heavy desk's work is invisible for the whole window.
- **Zeros read as an empty inbox.** The run log writes "0 need_reply (API OFFLINE), 0 waiting" - a dashboard reader would conclude the inbox was clear. It was never scanned. This is the single most misleading artefact in the [[Sales System]].
- **The outage was tracked as work, not retried.** The task list's last entry every run is "investigate the WhatsApp API bridge" (see [[Sales task automation]]), and the 28 May priority list includes a manual check of all active chats. But the job still reports "Run complete" after every failure.
- **Other channels carried the load.** Gmail alone produced 3-7 urgent and 4-11 action items per run.

## Related
[[Sales System]], [[Sales System automation]], [[Hourly run log]], [[Daily sales audit]], [[WhatsApp lead follow-up statuses]].

## It is one of four WhatsApp toolchains, not the local one (2026-10-22 ingest)
The in-place workspace documents a separate lineage of WhatsApp tooling, and the bridge server is **not** part of it:

| Generation | Where it runs | Store |
|---|---|---|
| wacli (Go CLI) | the workstation | session database |
| Baileys (Node.js) | the workstation | `Scripts/wa-store/messages.db` |
| whatsapp-mcp | the workstation | `Scripts/whatsapp-mcp/whatsapp-bridge/store/messages.db` |
| **the bridge server** | **a separate machine, reachable over HTTP** | daily JSON snapshots |

Source: [[WhatsApp automation stack]], [[Baileys]], [[whatsapp-mcp]].

So the audit's outage is a fact about the **remote service**, not about the local library stack. Two practical consequences:
- The audit's zeros are a **transport failure**, and the local stack's archives were untouched by it.
- The bridge server exposes a chat list over a fixed port with the credentials that keep it alive, which is exactly why the vault treats its address and port as sensitive - see [[Linked device authentication]].

The bridge's failure mode and the local stack's failure mode are the same shape, though: an offline source reports **zero** rather than "unknown", and a zero reads like an empty inbox. See [[WhatsApp lead follow-up statuses]].
