---
type: source
sources: ["raw/Health-Insurance/Context/RUN_THIS_NOW.md"]
updated: 2026-10-22
tags: [whatsapp, baileys, setup, runbook]
summary: "Runbook for starting the WhatsApp sync service: QR linking, expected output, troubleshooting."
---
# Source: WhatsApp setup quick start

Original file: [[raw/Health-Insurance/Context/RUN_THIS_NOW.md|RUN_THIS_NOW.md]]. A one-screen runbook for getting the WhatsApp sync service running and linking the phone. It is a **design/runbook intent document**: it describes what the terminal should print and what to do when it does not.

## The command
- One command starts the service: `node wa-sync-simple.js start` (run from the `Scripts` folder).
- The path in the note is an older machine path (`c:\Users\Matheesha-IM.AE\Desktop\Health Insurance\Scripts`). Paths were reorganised later - see [[Workspace reorganization]] - and the note has not been updated, so treat the path as stale and the file name as the reliable part.

## Expected terminal behaviour
1. Connection attempts for 10-30 seconds, then a "not logged in, attempting registration" line.
2. A QR code block asking to be scanned by the phone.
3. On success: "WhatsApp connected" and the service keeps syncing until stopped with `Ctrl+C`.

## How the linking works
Phone-side path is WhatsApp Settings -> Linked Devices -> Link a Device -> scan. The note then explains the mechanism in five steps: the library connects over the WhatsApp Web protocol, generates the QR code, syns all messages into the local SQLite database, stores them locally with no cloud, and makes them searchable/exportable through the sibling scripts.

## Troubleshooting the note gives
- **QR never appears:** connection may still be in progress (wait up to a minute); retry; make sure the phone is online.
- **"Connection failure" errors:** described as normal, the library retries automatically; after two minutes, stop, delete the credential folder and retry.
- **QR scanned but not connected:** the device was not authorised - remove it under Linked Devices and retry.

## Tool commands it repeats
Send text, send a document with a caption, search by phone, search by name, export a chat by JID. See [[Baileys migration notes]] for the same commands with file names.

## Caveats
- The note names a script (`wa-sync-simple.js`) that the migration note does not list; the script family in the workspace has both a simple and a full variant, and the recovered-files area contains empty placeholder copies of the simple variant. The file listing is not reliable.
- Requirements listed: Node.js (v22.17.0 installed), WhatsApp on the phone, internet on both.
- It ends by pointing at a tool guide that is not in this scope.

Related: [[Baileys]], [[Linked device authentication]], [[WhatsApp automation stack]], [[Local message archive]].
