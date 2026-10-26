---
type: concept
sources: ["raw/Health-Insurance/Context/RUN_THIS_NOW.md", "raw/Health-Insurance/Context/SETUP_COMPLETE.md", "raw/Health-Insurance/Context/BAILEYS_MIGRATION.md", "raw/Health-Insurance/Context/WHATSAPP_INTEGRATION_COMPLETE.md"]
updated: 2026-10-22
tags: [whatsapp, auth, security, qr]
summary: "How the phone is linked to the tooling by QR code, what the linked-device session grants, and why the credentials are treated as a password."
---
# Linked device authentication

Every generation of the WhatsApp tooling authenticates the same way: **the advisor's phone links to the tooling as a linked device by scanning a QR code.** The change between generations was the *mechanism*, not the model.

| Generation | How the phone is linked | What the note says |
|---|---|---|
| wacli | `wacli auth` with the phone's WhatsApp open | "not authenticated" was a listed error; the note requires the primary phone to be open to receive messages |
| Baileys | QR code printed in the terminal, scanned from WhatsApp Settings -> Linked Devices -> Link a Device | the library connects over the WhatsApp Web protocol and generates the QR |
| whatsapp-mcp | inherits the bridge's session | - |

Sources: [[WhatsApp integration setup complete (wacli)]], [[Baileys migration notes]], [[WhatsApp setup quick start]], [[Baileys WhatsApp integration setup complete]].

## The linking sequence
1. Start the sync service (`node wa-sync-simple.js start`).
2. The terminal prints a QR code block after a short connection attempt.
3. Phone: WhatsApp -> Settings -> Linked Devices -> Link a Device -> scan.
4. The terminal prints "WhatsApp connected" and keeps syncing until stopped.

## The failure modes the notes name
- **QR never appears**: the connection attempt may still be running (wait up to a minute), or retry.
- **"Connection failure" errors**: described as normal - the library retries automatically. After two minutes, stop, delete the credential folder and start again.
- **QR scanned but not connected**: the device was not authorised; remove it under Linked Devices and retry.

## The security model
- **One session per WhatsApp account**, and it is the **personal** number, not a Business account.
- The session folder (Baileys: `Scripts/wa-auth/`) holds the **session keys** and is described as working "like a password": never committed, never shared, excluded by `.gitignore`.
- The device shows up under the phone's Linked Devices list and can be removed from there - which is also the recovery step.
- Nothing leaves the machine; there is no cloud sync.

## Why it matters operationally
- **The phone must be online** for real-time sync. Every generation repeats this, and it is the reason the tooling is a desk accessory rather than a server.
- Because the session is a linked device rather than a full WhatsApp takeover, the account is not restricted in the way a third-party client usually is - which is also why every note still carries a "small ban risk" caveat. The two are the same trade-off seen from two sides.

Related: [[WhatsApp automation stack]], [[Local message archive]], [[Baileys]], [[WhatsApp Business]].
