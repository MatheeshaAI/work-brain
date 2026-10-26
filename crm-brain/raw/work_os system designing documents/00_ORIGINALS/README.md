# Health Insurance Sales Agent System

## Overview
An intelligent AI-powered system to manage your complete 20-stage insurance sales pipeline. This system will help you close more leads by automating follow-ups, analyzing conversations, and providing actionable recommendations.

## Current Status
**✅ Planning Complete - Ready for Development**

## What's Been Created

### Documentation Files
- **PLANNING.md** - Complete system plan with all stages, modules, and features
- **CONVERSATION_LOG.md** - Full record of our planning session with all requirements
- **system_prompt.txt** - 20-year UAE health insurance expert persona for the AI

### Folder Structure Created
```
Leads/
├── agents/           # AI agent modules (7 planned)
├── integrations/     # CRM, WhatsApp, Email connectors (3 planned)
├── knowledge/        # Databases for networks, plans, insurers (6 planned)
├── data/
│   ├── clients/      # Per-lead folder structure
│   └── extracted/    # Extracted client data
└── ui/               # Dashboard components (2 planned)
```

## Your Current Workflow Challenges

### Main Problem: Stage 5 (Negotiation) Gets Stuck
**You said:** "Mostly I lose track of them by forgetting to follow up with them and this is the main reason I started this to make this system"

**Client Behavior in Negotiation:**
1. Quick buyers: Quote → 1-2 questions → Buy
2. Slow buyers: Many questions over time → Eventually buy
3. Comparison shoppers: Check competitors → Realize prices same → Come back

**Common Objections:**
- Price too high (expect unrealistic prices)
- Network gaps (want HealthHub/Aster not in plan)
- Coverage confusion (don't understand what's included)
- Trust issues (think you're hiding better options)
- Budget mismatch (can't afford plan with needed hospitals)

## System Will Help You

### Automated Follow-Ups
- Track when clients are in negotiation
- Remind you to follow up at optimal times
- Prevent lost leads due to forgotten follow-ups
- Send 5 follow-ups based on client's planned proceed date

### Chat Analysis
- Parse WhatsApp conversations automatically
- Identify buying signals and objections
- Analyze client sentiment and mood
- Extract client requirements (budget, hospitals, specialists)

### Personalized Messages
- Draft WhatsApp messages tailored to each client
- Include educational content about UAE health insurance
- Handle objections professionally
- Create urgency without being pushy

### Pipeline Tracking
- Monitor all 20 stages in real-time
- Identify stuck leads that need attention
- Recommend stage transitions with rationale
- Track document collection and payment progress

### Lost Lead Analysis
- Analyze why leads were lost
- Detect patterns across lost leads
- Generate "Win-Back" strategies
- Provide insights to improve future conversions

## Next Steps - You Decide

### Option 1: Start Building Now
Tell me which module to build first:
- **Chat Analyzer** - Parse WhatsApp chats and extract info
- **Message Drafter** - Generate personalized WhatsApp messages
- **Pipeline Advisor** - Track stages and recommend actions
- **WhatsApp-to-Email Sync** - Auto-forward chats to email
- **Full Phase 1** - Build all core functionality

### Option 2: Refine Planning
We can adjust the plan:
- Modify pipeline stages or triggers
- Add/remove AI agent capabilities
- Change technical approach
- Adjust implementation phases

### Option 3: Test with Real Data
We can start testing with your existing client:
- Analyze Gaesh Rana's WhatsApp chat
- Generate follow-up message
- Match hospitals to insurance networks
- Draft value-based message for his price objection

## How to Use This System (When Built)

### Daily Workflow
1. **New Lead Arrives** → System auto-extracts data → Sends WhatsApp
2. **Follow-Up Time** → System reminds you → Drafts personalized message
3. **Client Responds** → System analyzes chat → Identifies objections
4. **Negotiation Stage** → System tracks follow-ups → Creates urgency → Drafts value messages
5. **Quote Sent** → System waits 48h → Reminds you to follow up
6. **Agreement** → System tracks documents → Monitors payment → Congratulates

### Dashboard Will Show
- All your leads across 20 stages
- Which leads need attention (stuck in negotiation)
- Client chat history with AI insights
- Recommended next actions for each client
- Lost lead analysis with improvement suggestions

## Technical Requirements

To build this system, you'll need:
- Python 3.10+ installed
- OpenAI API key or Anthropic API key
- Chrome or Edge browser (for WhatsApp Web automation)
- Access to your CRM (for quotation data)
- Email account (for WhatsApp sync)

## Questions Before Building

Before I start coding, please tell me:

1. **Priority Order:** What should I build FIRST?
   - Chat parser (to analyze your existing chats)
   - Message drafter (to generate WhatsApp messages)
   - WhatsApp sync (to forward chats to email)
   - Full Phase 1 (all core functionality)

2. **Testing:** Should I test with Gaesh Rana's existing data first?
   - Yes, start with real data
   - No, build with sample data first

3. **WhatsApp Sync:** How do you want to sync WhatsApp?
   - Auto-forward all chats to email
   - Only forward specific client conversations
   - Forward only new messages
   - Other approach?

4. **CRM Access:** How should I connect to your CRM?
   - You'll provide API credentials
   - You'll provide sample quotation data
   - Manual copy-paste for now
   - Other approach?

## Ready to Build!

When you're ready, just tell me what you want to build first, and I'll start coding.

**Example commands:**
- "Build the chat analyzer"
- "Create the message drafter"
- "Set up WhatsApp-to-Email sync"
- "Build full Phase 1"
- "Test with Gaesh Rana's data"

---

**Created:** January 31, 2026
**Status:** Planning Complete, Awaiting Your Decision
