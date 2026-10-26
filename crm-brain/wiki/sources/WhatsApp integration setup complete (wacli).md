---
type: source
sources: ["raw/Health-Insurance/Context/WHATSAPP_INTEGRATION_COMPLETE.md"]
updated: 2026-10-22
tags: [whatsapp, wacli, setup, superseded]
summary: "The first WhatsApp integration, built on the wacli Go CLI; superseded four days later by the Baileys stack."
---
# Source: WhatsApp integration setup complete (wacli)

Original file: [[raw/Health-Insurance/Context/WHATSAPP_INTEGRATION_COMPLETE.md|WHATSAPP_INTEGRATION_COMPLETE.md]]. Last updated **2026-04-17**. The first-generation WhatsApp integration for the workspace, built on `wacli` - a self-hosted WhatsApp CLI. This page is in the vault mainly because it shows what was tried first and then replaced.

## What it claims to have built
- Four Node.js wrapper scripts around the CLI: send a message, search a lead's conversation (by name, phone or lead reference), export a chat to markdown, and run a background sync service.
- Four workflow docs under `Workflows/` (setup, send message, search, lead lifecycle).
- Two new configuration keys in `.env` for the store directory and the device label. The `.env` file itself holds credentials and is not ingested.

## Important caveat: the status line is not "done"
The note's own last line reads "Status: Setup complete. Ready for Go installation and authentication." Go was never installed - the next steps still ask the user to download Go, build `wacli.exe` from source and run `wacli auth`. So the integration was **documented but not installed**, and the wrappers could not have worked yet.

## The lead-lifecycle workflow it describes
Extract the lead from the CRM -> create a document folder -> generate a quote -> send the quote over WhatsApp -> track the response by searching the chat -> follow up -> close the sale and request documents -> send the policy documents -> export the conversation for compliance. This is the sales loop the whole workspace automates; the pipeline stages are described in [[Lead pipeline stages]].

## Security notes in the note
- Add the store directory, its dot-prefixed variant, `*.db` and `LOCK` to `.gitignore`.
- The session database holds WhatsApp encryption keys and is to be treated as a password.
- One session per WhatsApp account, and the primary phone must have WhatsApp open to receive messages.
- The session logs in as the user's **personal** WhatsApp account.

## Troubleshooting the note lists
`wacli: command not found` (not on PATH), "Not authenticated" (re-auth and keep the primary phone open), "No messages found" (sync not running yet), "Store lock file exists" (another process holds the lock, or delete the stale lock after a crash).

## Why it was replaced
Four days later, on 2026-04-21, the Baileys notes state the reason plainly: the old wacli Go binary **did not work on Windows**, which is the machine the work runs on. See [[Baileys migration notes]] and the full sequence in [[WhatsApp automation stack]].

Related: [[Baileys]], [[whatsapp-mcp]], [[WhatsApp automation stack]], [[Lead pipeline stages]].
