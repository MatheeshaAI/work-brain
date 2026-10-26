---
type: source
sources: ["raw/20_AI-and-Agents/send-whatsapp.md"]
updated: 2026-10-22
tags: [whatsapp, playwright, workflow]
summary: "A slash-command workflow that sends a WhatsApp message through a local Playwright script and a QR-code login."
---
# send-whatsapp

A workflow file (`description: Send a WhatsApp message to a specific phone number`) for an IDE agent.

## Flow
1. Check the number is in international format (a Gulf example is given).
2. Run `python send_whatsapp.py "<number>" "<message>"` (the `// turbo` marker tells the agent it may auto-run this step).
3. First run only: a browser window opens and the user must scan the WhatsApp QR code within 60 seconds.
4. After sending, the browser closes by itself.

Tip in the note: just say "send whatsapp to ... saying Hello".

## Where it sits
This is the earliest, simplest generation of WhatsApp tooling (browser automation of WhatsApp Web), before [[Baileys]], whatsapp-mcp and Evolution API. See [[WhatsApp automation stack]] and [[WhatsApp message access options]]. The script `send_whatsapp.py` itself is not in the vault, so the note is intent only. It sends without an approval step; later designs added one ([[Draft and approve messaging flow]], [[Approval gates]]).
