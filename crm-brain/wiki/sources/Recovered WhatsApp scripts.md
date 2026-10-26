---
type: source
sources: ["raw/Health-Insurance/Workspace/Leads/recovered files/RECOVERY_NOTES.txt", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/check_wa_responses.py", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/get_recent_messages.js", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/send_onboarding_messages.js", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/wacli-export-conversation.js", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/wacli-search-lead.js", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/wacli-send-message.js", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/wacli-sync-service.sh", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/baileys-archive/wa-db.js", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/baileys-archive/wa-export.js", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/baileys-archive/wa-search.js", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/baileys-archive/wa-send.js", "raw/Health-Insurance/Workspace/Leads/recovered files/Scripts/baileys-archive/wa-sync.js"]
updated: 2026-10-22
tags: [insurance, whatsapp, scripts, archive, recovery]
privacy: aggregate only - one script hardcodes client phone numbers and first names, and the debug dump holds member dates of birth; no value is reproduced
summary: "The 20 May 2026 git recovery: 15 archived WhatsApp scripts from the Baileys and wacli generations, plus a plan debug dump."
---
# Source: Recovered WhatsApp scripts

`raw/Health-Insurance/Workspace/Leads/recovered files/` holds the remains of an earlier WhatsApp toolchain, pulled back out of git history on **20 May 2026** - the same day the daily note was written. It is **archive**: the live stack is the Go bridge and MCP server described in [[WhatsApp setup quick start]] and [[Baileys migration notes]].

## The recovery note
`RECOVERY_NOTES.txt` separates two lists.

**Recovered (git-tracked, 15 files)** - one Python response checker, three Node scripts that shell out to the `wacli` CLI, a background sync shell script, five archived Baileys modules, a plan debug dump, and two **empty** files (`start-wa-sync.bat` and `wa-sync-simple.js`, both 0 bytes - recovered as placeholders, not content).

**Permanently lost (never tracked in git, 9 items)** - a `Leads-May-2026.csv` export, one individual lead dossier, an `Entry Level Plan.md`, `Plans/All-Plans-List.md`, a `Networks/Nextcare-Agent/` folder, an Obsidian web-viewer agent setup note, a `.claude/` folder, and three root-level scripts and screenshots (`get_plan_details.js`, `get_unread_emails.js`, two PNGs).

## What the scripts do
| Script | Purpose | Inputs -> outputs |
|---|---|---|
| `check_wa_responses.py` | scans the SQLite message archive for replies | `messages.db` -> reply/non-reply per chat |
| `get_recent_messages.js` | reads recent messages | the bridge's `store/messages.db`, opened **read-only** -> console |
| `send_onboarding_messages.js` | sends welcome/onboarding messages | a **hardcoded list of phone numbers, salutations and first names** -> POST to the bridge REST API |
| `wacli-send-message.js` | sends one message | shell out to the `wacli` Go CLI -> REST call |
| `wacli-search-lead.js` | finds a lead by name or number | shell out to `wacli` -> local JSON/contact file |
| `wacli-export-conversation.js` | exports a conversation | shell out to `wacli` -> conversation file on disk |
| `wacli-sync-service.sh` | background sync service | `--daemon` / `--idle-exit 30m` flags, keeps messages synced |
| `baileys-archive/wa-db.js` | the archive's store layer | reads and writes `wa-store/messages.db` |
| `baileys-archive/wa-search.js` | full-text message search | `messages.db` -> matching messages |
| `baileys-archive/wa-export.js` | exports messages by contact | `messages.db` -> file |
| `baileys-archive/wa-send.js` | sends via a Baileys socket | `makeWASocket` + multi-file auth state -> message |
| `baileys-archive/wa-sync.js` | syncs and keeps the session alive | QR login, reconnect handling, version check -> archive |

**Two generations, one job.** The `baileys-archive/` files are the old WhatsApp-web library stack; the `wacli-*` files drive a Go CLI; the `whatsapp-mcp` scripts talk to the bridge that superseded both. All three generations read or write the same kind of SQLite message archive - which is why the current bridge keeps `messages.db` at the same familiar path. See [[Baileys WhatsApp integration setup complete]] and [[Local message archive]].

## The plan debug dump
`Scripts/_debug_plans.json` (3.7 MB) is not a script. It is **one JSON array of 197 CRM plan records** in the shape the quote page returns internally: `id`, `planCode`, `name`, `planTypeId`, `selectedCopayId`, `isHidden`, `providerId` / `providerCode` / `providerName`, `healthNetwork`, `plan_type`, `ratesPerCopay`, `basmah`, `icpFee`, `policyFee`, `excess`, `coPayments`, `benefits`, `policyWordings`, `eligibilityName`, `addons`, plus a `memberPremiumBreakdown` computed **for one specific member** (date of birth, gender, member category, rate rows) and a `mafLink` pointing at the medical application form with a lead reference and an email address in the query string.

**That makes it the most PII-dense file in the workspace**, and it is filed under the *leads* folder rather than the plan folder. Only its shape is described here. See [[Client privacy exposure in agent memory]].

## Contradictions
- **Two "permanently lost" files exist now.** `Workspace/Entry Level Plan.md` and `Workspace/Plans/All-Plans-List.md` are both listed as unrecoverable in the note, and both are present in the plan folder today - they were re-created after the recovery, or recovered by another route. The note is stale on exactly the two files that mattered. See [[Insurance plan sheets]] and [[Plan sheet format]].
- **The lost list mixes content and tooling**: a lead dossier, a CSV export, two plan reference files, an agent setup note, a scripts folder and two screenshots. Only the first two are business records; the rest are tooling that the migration to `whatsapp-mcp` replaced.
- **The archived generation still carries a hardcoded recipient list** in `send_onboarding_messages.js`, and it was recovered into the live workspace rather than into an archive directory.

## Related
- [[Baileys migration notes]]
- [[Baileys WhatsApp integration setup complete]]
- [[WhatsApp setup quick start]]
- [[Local message archive]]
- [[WhatsApp non-responder follow-up]]
- [[Client dossiers]]
- [[Insurance plan sheets]]
- [[Client privacy exposure in agent memory]]
