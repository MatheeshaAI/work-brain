---
name: whatsapp-sender
description: Compose and send a context-aware WhatsApp follow-up message for a lead. Use when user says "send follow-up to [lead]", "WhatsApp [REF_ID]", "send a message to [name]", "follow up with [lead] about [topic]", or "chase [lead] on WhatsApp".
---

# WhatsApp Sender — Context-Aware Follow-Up

## When to Use
Triggered when the user wants to send a WhatsApp message to a specific lead.

## Steps

### 1. Read lead context
- Read `Workspace/Leads/HEA-[CODE]-[First]-[Last].md` for lead details, current status, and history
- Check recent WhatsApp conversation via `search_messages` MCP tool or `get_chat_messages` MCP tool

### 2. Compose a personalized message
- Use correct salutation (Mr./Mrs./Ms./Miss — per lead's gender/marital status)
- Reference their specific plan, situation, or last interaction
- Keep it professional, warm, and concise
- If user specified the intent/topic, center the message on that

### 3. Show message for user confirmation
Present the composed message to the user for review before sending. Do not send without approval.

### 4. Send via WhatsApp

**Primary — MCP tool (if available in session):**
```
send_message(recipient="971XXXXXXXXX", message="...")
```

**Fallback — Node.js REST API (when MCP tools not loaded):**
```javascript
node -e "
const msg = 'Your message here with emojis \u{1F44B}';
const body = JSON.stringify({ recipient: '971XXXXXXXXX', message: msg });
const http = require('http');
const options = { hostname: 'localhost', port: 8080, path: '/api/send', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) } };
const req = http.request(options, res => { let d = ''; res.on('data', c => d += c); res.on('end', () => console.log(d)); });
req.write(body); req.end();
"
```

⚠️ Always use Node.js — never `curl`. Curl breaks emoji Unicode encoding.

### 5. Update lead file and PIPELINE.md
After sending:
- Note the message sent in the lead's `.md` file
- Update `Workspace/PIPELINE.md` pending action (e.g., "Await reply to follow-up sent [date]")

## Notes
- Phone format: `971XXXXXXXXX` (international, no `+`)
- Verify bridge is running: `curl http://localhost:8080/api/health`
- Bridge must be started each session if not running
