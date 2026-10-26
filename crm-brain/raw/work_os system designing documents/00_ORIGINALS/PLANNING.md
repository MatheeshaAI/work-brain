# Health Insurance Sales Agent System - Complete Plan

## Overview
An intelligent agent system that manages the complete 20-stage insurance sales pipeline, from new lead to policy issuance or loss analysis. The agent will analyze chats, match networks, draft messages, recommend stage transitions, and provide actionable strategies to close every lead.

---

## Pipeline Stages (Updated)

### Stage 1: New Lead
**Current Workflow:**
- Lead arrives via email (bought leads) → enters CRM
- CRM already has: reference #, name, email, mobile, inquiry type, plan prices, member details
- You check CRM, get number, call client
- If no answer → Send WhatsApp: "convenient time to call OR share member details for quotation"

**AI Agent Actions:**
- Extract client data from CRM (name, email, mobile, inquiry type)
- Customize WhatsApp template with client details
- Send WhatsApp message automatically
- **Recommendation:** Remove "Allocated" stage, keep only "New Lead"

### Stage 2: Allocated
**Status:** REMOVED - Bought leads already have all data in CRM, you contact immediately

### Stage 3: Followed Up
**Follow-up Types:**
1. No answer call + WhatsApp
2. After quotation sent
3. Negotiation follow-up
4. Document follow-up

**Trigger to Stage 4:** Quotation sent

**AI Actions:**
- Analyze client response (sentiment, interest, objections)
- Draft personalized WhatsApp messages
- Suggest optimal follow-up timing
- Track follow-up count
- **Track client's planned proceed date** (if provided)

**Lost Criteria:**
- Standard: 3-5 follow-ups
- Custom: If client gives proceed date → 5 follow-ups from that date

### Stage 4: Quoted
**Trigger to Stage 5:** Client shows interest, asks for revised quote/options, or raises objections

**AI Analysis:**
- Client reaction time
- Client questions & objections
- Competitor mentions
- Budget signals & buying signals
- Draft **value-based messages** explaining coverage vs trade-offs

**Follow-up Timing:** 48 hours

**Common Objections:**
- Network gaps
- Coverage questions
- Too expensive
- Competitor comparisons
- **Budget mismatch:** Can't afford plan with required covers + hospitals
- **Trust issue:** Think you're hiding better options

### Stage 5: In Negotiation (Critical Stage)
**Main Problem:** Leads get stuck because:
- Clients focus on price, check other companies
- **You forget to follow up** (this is the main reason you need this system!)
- Health insurance is complex, people take time to think

**Client Behavior Types:**
1. **Quick buyers:** Quote received → Ask 1-2 questions → Buy
2. **Slow buyers:** Many questions over time → Eventually buy
3. **Comparison shoppers:** Will check other companies for lower price → Realize prices same everywhere → Come back

**Trigger to Application stages:** Agreement on plan

**AI Actions when client stuck on price:**
- Find alternative plans
- Create urgency
- Value messaging
- Competitor analysis

### Stages 6-8: Renewal Terms & BOR Request (Renewal Clients Only)
- Used for existing clients renewing policies
- Exclusive stages for renewal process

### Stages 9-16: Application to Payment
**Flow Speed:**
- **Fast:** Client sends documents immediately, no pre-existing or BMI issues → Get payment link quickly
- **Moderate:** No pre-existing conditions, standard processing
- **Slow:** BMI issues or pre-existing conditions → Need medical reports and pre-existing proof
- **Very Slow:** Underwriting review → Wait for underwriter to return with premium loading

**AI Actions:**
- Track document collection
- Identify missing documents
- Remind you to follow up
- Analyze underwriting delays
- Draft client update messages

### Stage 17: Sale Leads (Closed Won)
**AI Actions:**
- Draft congratulations message
- Prepare policy delivery plan
- Extract data for CRM sales report
- Analyze successful sales patterns

### Stages 18-19: Policy Documents Pending / Policy Pending
**AI Actions:**
- Track document generation
- Draft delivery notification
- Prepare onboarding information
- Suggest upsell/cross-sell opportunities

### Stage 20: Lost (Closed Lost)
**AI Actions:**
- Analyze complete chat history for loss reasons
- Identify specific objections that caused loss
- Detect patterns across multiple lost leads
- Generate loss analysis report
- Suggest re-engagement strategies
- Update knowledge base with new objections

---

## Core AI Modules

### 1. Chat Intelligence Module
- Parse WhatsApp `_chat.txt` exports
- Extract conversation timeline, sentiment, client mood
- Identify buying signals, objections, hesitation
- Extract client requirements (budget, hospitals, specialists)
- Extract personal details (DOB, Emirates ID, visa, nationality)
- Track document attachments (IDs, passports)

### 2. Network & Plan Matcher
- Match client's preferred hospitals with insurance networks
- Identify plans with direct specialist access vs GP referral
- Match budget constraints with available plan tiers
- Cross-reference CRM quotation data with client needs
- Filter by co-pay/coinsurance preferences

### 3. Message Drafter
- Generate personalized follow-up messages for WhatsApp
- Tailor tone based on client sentiment and stage
- Include educational content about UAE health insurance
- Handle objections (price, coverage, network, timing)
- Draft quotation presentations with plan comparisons

### 4. Pipeline Advisor
- Analyze current stage and recommend next best action
- Suggest optimal timing for follow-ups
- Identify stuck leads and re-engagement strategies
- Recommend stage transitions with rationale
- Alert for missed actions or delayed responses

### 5. Lost Lead Analyzer
- Analyze chat history to identify loss reasons
- Detect patterns across lost leads
- Suggest recovery strategies for re-engagement
- Generate "Win-Back" message templates
- Provide insights to improve future conversions

### 6. WhatsApp-to-Email Syncer (No API Keys)
- Monitor WhatsApp Web for new messages
- Automatically forward conversations to your email
- Link to client records
- Create searchable chat logs in CRM

---

## File Structure

```
Leads/
├── agents/
│   ├── __init__.py
│   ├── chat_analyzer.py          # Parse & analyze WhatsApp chats
│   ├── info_extractor.py         # Extract client details
│   ├── network_matcher.py        # Match hospitals to networks
│   ├── message_drafter.py        # Generate WhatsApp messages
│   ├── pipeline_advisor.py       # Stage-based recommendations
│   ├── lost_analyzer.py          # Analyze lost leads
│   └── agent_orchestrator.py     # Main agent controller
│
├── integrations/
│   ├── whatsapp_connector.py     # WhatsApp Web sync
│   ├── whatsapp_to_email.py      # Forward to email
│   └── crm_connector.py          # CRM data extraction
│
├── knowledge/
│   ├── networks.json             # Network provider database
│   ├── plans.json                # Plan structure database
│   ├── insurers.json             # Insurance company details
│   ├── regulations.json          # UAE insurance regulations
│   ├── templates.json            # Message templates
│   └── objections.json           # Objections & rebuttal scripts
│
├── data/
│   ├── clients/                  # Per-lead folder structure
│   ├── extracted/                # Extracted client data
│   └── pipeline_tracking.json    # Pipeline state database
│
├── ui/
│   ├── dashboard.py              # Streamlit dashboard
│   └── client_view.py            # Individual client view
│
├── system_prompt.txt             # 20-year UAE expert prompt
├── main.py                       # Application entry point
├── config.py                     # Configuration settings
└── requirements.txt              # Python dependencies
```

---

## Tech Stack

- **Backend:** Python 3.10+
- **AI Model:** OpenAI GPT-4 / Anthropic Claude
- **Web Framework:** Selenium / Playwright (for WhatsApp Web)
- **CRM Integration:** API connectors or web scraping
- **Dashboard:** Streamlit or FastAPI + React
- **Data Storage:** SQLite / JSON
- **OCR:** Tesseract or cloud OCR service
- **Email:** SMTP/IMAP integration

---

## Implementation Phases

### Phase 1: Core Functionality (1-2 weeks)
- Chat parser and info extractor
- Basic network matcher
- Message drafter (basic templates)
- Pipeline tracking (JSON/SQLite)

### Phase 2: Integrations (1 week)
- WhatsApp-to-Email syncer (no API keys)
- CRM connector
- Document upload tracking

### Phase 3: Advanced AI Features (1-2 weeks)
- Sentiment analysis
- Lost lead analyzer
- Predictive recommendations
- Value-based messaging

### Phase 4: Dashboard & UI (1 week)
- Streamlit dashboard
- Individual client view
- Pipeline visualization

---

## Key Features

### Dashboard
- Pipeline Overview: Visual representation of all 20 stages
- Leads per Stage: Real-time statistics
- Stuck Leads: Highlighted for attention
- Lost Analysis: Patterns of loss reasons
- Performance Metrics: Conversion rates, follow-up speed

### Individual Client View
- Client Details: Name, contact info, family details
- Chat History: Complete WhatsApp conversation
- Current Stage: Progress and next steps
- AI Suggestions: Actionable recommendations and messages
- Document Tracking: Submitted/missing files
- Timeline: Full history through pipeline

---

## Insurance Companies Supported

Abu Dhabi National Insurance Company, Abu Dhabi National Takaful Insurance, Adamjee Insurance, Alliance Insurance, Cigna Insurance, Dubai Insurance, Fidelity United, GIG Insurance (previously AXA), Hayah Insurance, IONSECURE Insurance, Max Health (Product of Dubai Insurance), NLGIC – Liva Insurance, National General Insurance (NGI), National Health Insurance Company – Daman, Orient Insurance, Orient Takaful Insurance, Orient UNB Insurance, Orient-Allianz Insurance, Qatar Insurance, RAK Insurance, Salama Insurance, Sukoon Insurance (previously Oman Insurance), Takaful Emarat Insurance, Watania Takaful Insurance

---

## Success Metrics

### Conversion Rate Improvement
- Reduce Stage 5 (Negotiation) time by 30%
- Reduce lead drop-off by 50% through better follow-ups
- Increase overall close rate by 20%

### Efficiency Gains
- Reduce follow-up time by 80% (automation)
- Reduce message drafting time by 70%
- Automate lost lead analysis

### Customer Satisfaction
- Faster response times
- More personalized communication
- Better objection handling
