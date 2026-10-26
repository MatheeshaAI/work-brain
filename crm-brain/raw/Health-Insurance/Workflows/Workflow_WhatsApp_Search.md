# Workflow: Search and Export WhatsApp Conversations

## Overview

This workflow explains how to search lead conversations, track follow-ups, and export chat history for documentation and compliance.

## Prerequisites

- wacli installed and authenticated
- Background sync running: `./Scripts/wacli-sync-service.sh start`
- Conversations already synced to local database

## Quick Search

### Search by Lead Name

```bash
node Scripts/wacli-search-lead.js --name "Ahmed Khan"
```

**Output:**
```
Searching for: Ahmed Khan
-------------------------------------------
Found 12 messages:

[1] 2026-04-15 14:32:15 📥 Lead
    Thanks for the quote! Can you explain the coverage?
[2] 2026-04-15 14:33:22 📤 You
    Of course! The plan covers outpatient, inpatient, and...
[3] 2026-04-16 10:15:08 📥 Lead
    What about pre-existing conditions?
...
-------------------------------------------
Last contact: 2026-04-16 22:45:33
Total messages: 12
```

### Search by REF-ID

```bash
node Scripts/wacli-search-lead.js --ref "HEA-12345678"
```

### Search by Phone Number

```bash
node Scripts/wacli-search-lead.js --phone "971501234567"
```

### Advanced Search

```bash
# Search for specific keywords
wacli messages search "premium" --json

# Search in specific time range (all messages)
wacli messages search "quote" --json
```

## Export Full Conversation

### Export as Markdown

```bash
node Scripts/wacli-export-conversation.js \
  --jid "971501234567@s.whatsapp.net" \
  --output "Documents/Ahmed-Khan-HEA-12345678"
```

**Creates:** `Documents/Ahmed-Khan-HEA-12345678/971501234567_s_whatsapp_net_WhatsApp_Chat.md`

**Content example:**
```markdown
# WhatsApp Conversation Export

**Chat JID:** 971501234567@s.whatsapp.net
**Exported:** 2026-04-17 15:30:00
**Total Messages:** 23

---

**Lead** - *2026-04-15 14:32:15*
Hi Matheesha! Do you have any plans available around AED 5,000 per year?

**You** - *2026-04-15 14:35:42*
Hi Ahmed! Yes, I have a few options. Let me send you a personalized quote...

[... continues with full conversation history ...]
```

## Use Cases

### Track Lead Follow-ups

**Question:** How many times have I contacted Ahmed?

```bash
# Search all your messages to Ahmed
node Scripts/wacli-search-lead.js --phone "971501234567" | grep "📤 You" | wc -l
# Output: 7 (you've sent 7 messages)
```

### Find Unanswered Questions

**Question:** What question did Ahmed ask that I haven't answered?

```bash
# Export full chat
node Scripts/wacli-export-conversation.js --jid "971501234567@s.whatsapp.net"

# Manually review the markdown file for unanswered questions
```

### Verify Coverage Discussion

**Question:** Did we discuss pre-existing conditions with Ahmed?

```bash
wacli messages search "pre-existing" --json | grep -c "971501234567"
# Output: 2 (mentioned twice in Ahmed's chat)
```

### Find All Leads Interested in Gold Plus Plan

```bash
wacli messages search "Gold Plus" --json
```

**Shows:** All mentions of "Gold Plus" across all chats (you can filter manually)

### Last Contact Date with Lead

```bash
node Scripts/wacli-search-lead.js --phone "971501234567" | tail -3
```

**Output:**
```
-------------------------------------------
Last contact: 2026-04-16 22:45:33
Total messages: 12
```

## Manual Search (Without Script)

If scripts have issues, use wacli directly:

```bash
# Search all messages
wacli messages search "Ahmed" --json | jq '.[] | {from_me, timestamp, text}'

# List chats (all conversations)
wacli chats list --json | jq '.[] | {name, jid, last_message_timestamp}'

# Get messages from specific JID (10 most recent)
wacli messages list --chat "971501234567@s.whatsapp.net" --limit 10
```

## Organize by Lead

### Automated Backup Script (Optional)

Create `Scripts/backup-whatsapp-conversations.sh`:

```bash
#!/bin/bash

# Export all conversations to Documents folder
wacli chats list --json | jq -r '.[].jid' | while read jid; do
  echo "Exporting: $jid"
  node Scripts/wacli-export-conversation.js --jid "$jid" --output "./Documents/WhatsApp_Exports"
done

echo "All conversations exported to Documents/WhatsApp_Exports/"
```

### Store Exports

Save conversation exports alongside lead documents:

```
Documents/
├── Ahmed-Khan-HEA-12345678/
│   ├── Passport.pdf
│   ├── EID.pdf
│   ├── Policy_Certificate.pdf
│   └── WhatsApp_Chat.md          ← Conversation export
├── Fatima-Al-Maktoum-HEA-87654321/
│   ├── Visa.pdf
│   └── WhatsApp_Chat.md          ← Conversation export
```

## Compliance & Auditing

### Export for Record-Keeping

All lead communications must be archived:

```bash
# After quote sent
node Scripts/wacli-export-conversation.js --jid "971501234567@s.whatsapp.net"

# After policy booked
node Scripts/wacli-export-conversation.js --jid "971501234567@s.whatsapp.net"

# Store in Documents folder with timestamp
# Documents/Ahmed-Khan-HEA-12345678/WhatsApp_Chat_2026-04-17.md
```

### Verify Coverage Details Discussed

Before claiming a lead is fully informed:

1. Search for key terms: "coverage", "benefits", "exclusions", "limits"
2. Verify you explained major features
3. Check for questions from lead (response rate)
4. Export conversation for compliance file

## Troubleshooting

### Issue: "No messages found"
- **Cause:** Search term not in messages, or no messages from that JID yet
- **Fix:** 
  - Try broader search: `wacli messages search "name"`
  - Check if lead replied: `wacli chats list` to see active chats
  - Wait for new messages to sync (if just received)

### Issue: "JID format error"
- **Cause:** Using phone number instead of WhatsApp JID format
- **Fix:** Use format: `971501234567@s.whatsapp.net` (ends with `@s.whatsapp.net`)

### Issue: "Export file shows no content"
- **Cause:** Chat has no synced messages yet
- **Fix:** Ensure background sync is running for a few minutes after receiving messages

## Next Steps

- See **Workflow_WhatsApp_Lead_Tracking.md** for complete lead lifecycle
- See **Workflow_WhatsApp_Send_Message.md** to send follow-ups based on search results
