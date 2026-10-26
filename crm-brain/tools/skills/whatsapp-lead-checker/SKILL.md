---
name: whatsapp-lead-checker
description: Analyze WhatsApp conversation history for a lead to determine their current status or last reply. Use when user asks "check WhatsApp for [lead]", "what did they reply", "any response from [name]", "what's the WhatsApp status for [REF_ID]", or "did [lead] respond".
---

# WhatsApp Lead Checker — Conversation History

## When to Use
Triggered when the user wants to know what a lead said on WhatsApp, whether they responded, or what their last message was.

## Steps

### Primary Method — MCP Tools (if available in session)

1. Use `search_messages` MCP tool with the lead's name or phone number
2. Or use `get_chat_messages` MCP tool with the lead's WhatsApp JID: `971XXXXXXXXX@s.whatsapp.net`
3. Review the last 10–20 messages and summarize the lead's response status

### Fallback Method — SQLite Query

If MCP tools are not available, query the local message archive directly:

```javascript
node -e "
const Database = require('better-sqlite3');
const db = new Database('Scripts/whatsapp-mcp/whatsapp-bridge/store/messages.db');
const rows = db.prepare('SELECT timestamp, sender, content FROM messages WHERE chat_jid LIKE ? ORDER BY timestamp DESC LIMIT 20').all('%971XXXXXXXXX%');
console.log(JSON.stringify(rows, null, 2));
"
```

Replace `971XXXXXXXXX` with the lead's phone number (no `+`, no spaces).

## Status Assessment

After reviewing the conversation, classify the lead as one of:

| Status | Meaning |
|--------|---------|
| **No Response** | Messages sent, no reply received |
| **Interested** | Replied positively, asking questions |
| **Not Interested** | Declined or asked to stop |
| **Documents Sent** | Shared EID / passport / visa |
| **Awaiting Info** | Replied but waiting for more details from us |

## Notes
- Phone number format: `971501234567` (international, no `+`)
- WhatsApp JID format: `971501234567@s.whatsapp.net`
- The bridge must be running for MCP tools to work — verify: `curl http://localhost:8080/api/health`
- Bridge location: `Scripts/whatsapp-mcp/whatsapp-bridge/`
