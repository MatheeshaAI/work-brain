Master Prompt for AI Coding Assistants
SALES AI TEAM - Complete Build Instructions
Project Overview
Build a Sales AI automation platform that helps sales teams automate WhatsApp messages, emails, and CRM updates using AI agents. Think "Strawberry Browser" but for sales automation.

Core Features
Chat interface for interacting with AI sales agents
WhatsApp Web automation (send/receive messages)
AI-powered lead qualification and response generation
Multi-agent system (each agent handles specific tasks)
CRM integration (HubSpot, Salesforce, Pipedrive)
Email automation via Gmail API
Task queue system for scheduled follow-ups
Analytics dashboard with lead metrics
Agent builder UI (create custom agents)
Tech Stack
Frontend
Next.js 14+ (App Router)
TypeScript
Tailwind CSS
Radix UI components
Lucide React icons
Framer Motion (animations)
Backend
Next.js API Routes
Prisma ORM + PostgreSQL
BullMQ + Redis (task queues)
Puppeteer (browser automation)
AI (NO PAID APIs - Use Free Options)
Choose ONE:

Option A: Ollama (local, 100% free) - llama3.1:8b
Option B: Groq API (14,400 free requests/day) - llama-3.3-70b
Option C: Hugging Face Inference API (free tier)
Integrations
whatsapp-web.js (WhatsApp automation)
Gmail API (emails)
HubSpot/Salesforce APIs (CRM)
Design System
Colors
Primary: #A855F7 (Purple 500)
Primary Hover: #9333EA (Purple 600)
Gray Scale: Tailwind default grays
Success: #10B981
Error: #EF4444
Warning: #F59E0B

Typography
Font: Inter (Google Fonts)
Headings: 600-700 weight
Body: 400-500 weight
Sizes: text-xs to text-4xl (Tailwind scale)

Components
Border radius: 12px (buttons/inputs), 16px (cards)
Shadows: soft, medium, strong (see Tailwind config)
Spacing: 4px base unit (Tailwind)
Database Schema (Prisma)
models User {
id, email, name, avatar, plan, credits
→ agents[], conversations[], leads[]
}

model Agent {
id, userId, name, type, avatar, status
systemPrompt, temperature, model
config (JSON), triggers (JSON), workflows (JSON)
messageCount, leadCount, avgResponseTime
→ messages[], tasks[]
}

model Conversation {
id, userId, title, platform, contactName, contactInfo
status, sentiment, buyingSignal
→ messages[], leads[]
}

model Message {
id, conversationId, agentId, role, content
toolCalls (JSON), context (JSON)
}

model Lead {
id, userId, conversationId
name, email, phone, company
source, status, score, tags[]
productType, budget, timeline
crmId, crmType, lastSyncedAt
}

model Task {
id, agentId, type, status, priority
data (JSON), result (JSON), error
scheduledFor, startedAt, completedAt
}

File Structure
sales-ai-team/
├── app/
│ ├── layout.tsx (root layout with Inter font)
│ ├── page.tsx (main chat interface)
│ ├── globals.css (Tailwind + custom styles)
│ ├── api/
│ │ ├── chat/route.ts (POST - process messages)
│ │ ├── agents/route.ts (GET/POST - CRUD agents)
│ │ ├── leads/route.ts (GET/POST - CRUD leads)
│ │ └── tasks/route.ts (task queue endpoints)
│ ├── agents/page.tsx (agents dashboard)
│ ├── analytics/page.tsx (analytics dashboard)
│ └── settings/page.tsx
├── components/
│ ├── layout/
│ │ ├── MainLayout.tsx
│ │ ├── Sidebar.tsx (collapsible, navigation)
│ │ └── Header.tsx (search, notifications, credits)
│ ├── chat/
│ │ ├── ChatContainer.tsx (main chat UI)
│ │ ├── MessageBubble.tsx (user/assistant messages)
│ │ └── ChatInput.tsx (textarea with send button)
│ ├── agents/
│ │ ├── AgentCard.tsx (agent stats card)
│ │ └── AgentBuilder.tsx (create/edit agents)
│ ├── analytics/
│ │ └── StatsCard.tsx (metric cards)
│ └── ui/
│ ├── Button.tsx (primary, secondary, outline, ghost)
│ ├── Card.tsx
│ ├── Badge.tsx
│ └── Input.tsx
├── lib/
│ ├── ai/
│ │ ├── agent.ts (SalesAgent class - core AI logic)
│ │ └── groq.ts (or ollama.ts - AI provider)
│ ├── automation/
│ │ └── whatsapp.ts (WhatsAppAutomation class)
│ ├── integrations/
│ │ ├── email.ts (sendEmail function)
│ │ └── crm.ts (syncToCRM function)
│ ├── queue/
│ │ └── workers.ts (BullMQ workers)
│ └── db.ts (Prisma client singleton)
├── prisma/
│ └── schema.prisma (full database schema)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── .env.example

Key Implementations
1. AI Agent Core (lib/ai/agent.ts)
Export class SalesAgent that:

Takes agentId and config in constructor
Has processMessage(message, context) method
Builds conversation history from DB
Calls AI provider (Groq/Ollama) with tools
Executes tool calls:
add_lead_to_crm
send_whatsapp_message
schedule_followup
send_email
analyze_buying_signal
update_lead_status
Saves messages to DB
Returns response with message, toolCalls, actions
2. WhatsApp Automation (lib/automation/whatsapp.ts)
Export class WhatsAppAutomation (EventEmitter) that:

Uses Puppeteer to control WhatsApp Web
Persists session with userDataDir
Detects QR code or existing session
Listens for incoming messages (polling)
Has sendMessage(contactName, message) method
Emits events: 'qr_code', 'ready', 'message'
Handles human-like delays to avoid detection
3. Task Queue (lib/queue/workers.ts)
Create BullMQ workers for:

messageQueue (send WhatsApp messages)
emailQueue (send emails)
schedulerWorker (execute scheduled tasks)
Each worker updates task status in DB
4. API Routes
/api/chat (POST):

Receive message + conversationId
Get/create conversation
Save user message to DB
Process with SalesAgent
Return AI response + actions
/api/agents (GET/POST):

List user's agents
Create new agent with config
/api/leads (GET/POST):

List leads with filters
Create new lead
5. UI Components
Sidebar:

Collapsible (64px collapsed, 256px expanded)
Navigation items with active state
New Chat button (primary purple)
User profile at bottom
ChatContainer:

Message list (scrollable)
MessageBubble for each message
ChatInput at bottom
Loading state with spinner
AgentCard:

Agent avatar (emoji or gradient)
Name, type, status badge
Stats grid (messages, leads, response time)
Action buttons
Environment Variables
DATABASE_URL="postgresql://..."
REDIS_URL="redis://..."

Choose ONE AI provider:
GROQ_API_KEY="gsk_..." (from console.groq.com - FREE)_

OR
OLLAMA_URL="http://localhost:11434" (local)

OR
HF_API_KEY="hf_..." (from huggingface.co - FREE)_

WhatsApp (uses local session)
WHATSAPP_SESSION_PATH="./whatsapp-session"

Email (optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="app-password"

CRM (optional)
HUBSPOT_API_KEY="..."

Setup Instructions
Install dependencies:
npm install next react react-dom typescript tailwindcss
npm install @prisma/client prisma
npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
npm install bullmq ioredis
npm install groq-sdk (or use Ollama)
npm install lucide-react clsx date-fns
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu
Setup database:
npx prisma init
npx prisma generate
npx prisma db push
Run dev server:
npm run dev
Start Redis (for queues):
docker run -d -p 6379:6379 redis
Start Ollama (if using local AI):
ollama serve
ollama pull llama3.1:8b
Design Preferences
Clean, modern, minimal design
Purple accent color (#A855F7)
Smooth animations (200ms transitions)
Rounded corners (12-16px)
Subtle shadows
Good spacing (24px padding for cards)
Mobile responsive
Dark mode support (optional)
Important Notes
Use FREE AI providers (Groq or Ollama) - NO OpenAI
WhatsApp automation should be stealthy (human-like delays)
All actions should be async with proper error handling
Use TypeScript strictly (no 'any' types)
Follow Next.js 14 App Router conventions
Keep components small and reusable
Use Prisma for all database operations
Queue all external actions (WhatsApp, email) via BullMQ
Priority Features (Build in Order)
Phase 1 (Week 1-2):

Basic UI (Sidebar, Chat, Input)
Chat with AI (using Groq/Ollama)
Message persistence (DB)
Phase 2 (Week 3-4):

Agent system (create/manage agents)
WhatsApp automation (send/receive)
Lead capture to DB
Phase 3 (Week 5-6):

Task queue system
Email integration
CRM sync (HubSpot)
Phase 4 (Week 7-8):

Analytics dashboard
Agent builder UI
Polish & testing
Questions to Answer
Which AI provider should I use? (Recommend Groq for ease + free)
Should I use whatsapp-web.js or Puppeteer directly? (Use Puppeteer for more control)
How to handle WhatsApp QR code in production? (Persist session, manual re-auth if needed)
Database: PostgreSQL or MongoDB? (PostgreSQL with Prisma)
Success Criteria
✅ Chat with AI agent works smoothly
✅ Can send/receive WhatsApp messages automatically
✅ Leads automatically saved to database
✅ Agents can be created and customized
✅ Tasks execute on schedule
✅ UI is clean and responsive
✅ No API costs (using free AI)
Build this step-by-step, test thoroughly, and prioritize working features over perfect code.

🤖 Specific Prompts for Each AI Tool
For Claude (Anthropic) / Claude Code (Artifacts)
I want to build a Sales AI Team automation platform. It's a Next.js app that:

Has a chat interface like Strawberry Browser
Uses AI agents to automate WhatsApp, email, and CRM
Uses FREE AI (Groq API or Ollama - no OpenAI)
Has browser automation for WhatsApp Web
Stores leads, conversations, and tasks in PostgreSQL
Here's the complete spec:
[paste the master prompt above]

Please help me:

Set up the project structure and package.json
Build the core SalesAgent class with tool calling
Create the WhatsApp automation module
Build the main chat UI components
Set up the database schema with Prisma
Start with step 1 and we'll go from there. Use TypeScript and follow Next.js 14 App Router best practices.

For Google AI Studio / Gemini
I need to build a Sales AI automation SaaS product. Tech stack:

Next.js 14 + TypeScript + Tailwind
Groq API (free) for AI - llama-3.3-70b model
Puppeteer for WhatsApp Web automation
Prisma + PostgreSQL database
BullMQ + Redis for task queues
Key features:

Multi-agent AI system (each agent handles WhatsApp/email/CRM)
Chat interface for controlling agents
Automated lead qualification
Browser automation for WhatsApp
Analytics dashboard
Full specification:
[paste the master prompt above]

Can you help me build this? Start by:

Creating the complete file structure
Writing the package.json with all dependencies
Setting up Tailwind config with the purple theme
Building the main layout components
Let's build this step-by-step, one file at a time.

For Cursor AI / Windsurf / Replit AI
Create a Sales AI Team automation platform.

Stack: Next.js 14, TypeScript, Tailwind, Groq API (free), Puppeteer, Prisma, BullMQ

Requirements:

Chat UI similar to Strawberry Browser (purple theme)
AI agent system that automates WhatsApp, email, CRM
WhatsApp Web automation using Puppeteer
Lead management and analytics
Task queue for scheduled messages
Uses FREE Groq API (no OpenAI costs)
Complete spec:
[paste the master prompt above]

Generate:

Complete project structure
All component files
AI agent logic with tool calling
WhatsApp automation module
API routes
Database schema
Optimize for: Modern design, type safety, scalability, NO paid APIs.

For Bolt.new / v0.dev (Vercel)
Build me a Sales AI automation dashboard.

Design: Clean, modern, purple accent (#A855F7), similar to Strawberry Browser UI

Features:

Sidebar navigation (collapsible)
Chat interface with AI assistant
Agent cards displaying stats
Analytics dashboard
Message input with send button
Responsive layout
Components needed:

Sidebar with navigation
ChatContainer with MessageBubble components
AgentCard with stats grid
Button, Input, Card UI components
Header with search bar
Style: Tailwind CSS, Inter font, rounded corners (12-16px), smooth transitions

Technical: Next.js 14, TypeScript, Radix UI for modals/dropdowns

[You can also paste the design specs section from the master prompt]

Make it look professional and production-ready.

💡 Pro Tips for Working with AI Coding Assistants
1. Break It Down
Don't give the entire prompt at once. Go in stages:

Session 1: Project setup + basic structure
Session 2: UI components only
Session 3: AI agent logic
Session 4: WhatsApp automation
Session 5: Database + API routes
Session 6: Integration + testing

2. Be Specific About What You Have
"I already have:

Next.js project set up
Tailwind configured
Prisma schema defined
Now I need you to build just the SalesAgent class that:

Uses Groq API (not OpenAI)
Supports tool calling
Handles these tools: [list]
"
3. Ask for Explanations
"Build the WhatsApp automation module AND explain:

Why you chose this approach
How to avoid WhatsApp detection
What could go wrong
How to debug if it breaks"
4. Request Free Alternatives
"In this code, you used OpenAI API. Please refactor to use:

Groq API (free tier) with llama-3.3-70b model
Show me the exact API calls
Include error handling
Keep the same functionality"
5. Test Incrementally
"We built the chat UI. Before moving on, give me:

A test file to verify it works
Example data to populate it
Common bugs to watch for
How to run it locally"
🎯 Suggested Order of Development (for AI Assistant)
Day 1: Foundation
plaintext
Prompt: "Set up Next.js 14 project with TypeScript, Tailwind, and Prisma. 
Include the purple color scheme (#A855F7) and Inter font. 
Show me package.json, tailwind.config.js, and basic project structure."
Day 2-3: UI Components
plaintext
Prompt: "Build these UI components following the Strawberry Browser design:
1. Sidebar (collapsible, navigation)
2. ChatContainer with MessageBubble
3. ChatInput with send button
4. AgentCard showing stats
Make them reusable and TypeScript typed."
Day 4-5: AI Integration (Free)
plaintext
Prompt: "Create SalesAgent class using Groq API (free).
- Use llama-3.3-70b model
- Support tool calling for: add_lead, send_message, schedule_followup
- Include conversation history from DB
- Error handling and retries
Show me .env.example too."
Day 6-7: WhatsApp Automation
plaintext
Prompt: "Build WhatsApp automation using Puppeteer:
- Login flow with QR code
- Session persistence
- Send/receive messages
- Human-like delays (avoid detection)
- Event emitter for new messages
Include stealth plugin configuration."
Day 8-9: Database & APIs
plaintext
Prompt: "Create:
1. Prisma schema (User, Agent, Conversation, Message, Lead, Task)
2. API routes: /api/chat, /api/agents, /api/leads
3. CRUD operations for each
4. Proper error handling and validation"
Day 10-11: Task Queue
plaintext
Prompt: "Set up BullMQ + Redis:
- Message queue for WhatsApp sends
- Email queue
- Scheduler for follow-ups
- Workers with error handling
- Dashboard to view queue status"
Day 12-14: Polish
plaintext
Prompt: "Add:
1. Loading states and error messages
2. Analytics dashboard (simple stats)
3. Agent builder form
4. Mobile responsive layout
5. Deploy instructions for Vercel/Railway"
🚨 Common Pitfalls & How to Avoid Them
Pitfall 1: AI generates OpenAI code
Fix: Explicitly say "Use Groq API, not OpenAI. Here's the Groq import: import Groq from 'groq-sdk'"

Pitfall 2: WhatsApp gets banned
Fix: Ask for "Add random delays between 1-3 seconds and use puppeteer-stealth plugin"

Pitfall 3: Code doesn't match design
Fix: Provide screenshot or say "Make it look exactly like Strawberry Browser with purple theme"

Pitfall 4: Too complex to understand
Fix: Say "Explain this like I'm a beginner. Add comments to every function."

Pitfall 5: Doesn't run locally
Fix: Ask for "Complete setup instructions including: npm install commands, .env variables, and how to run locally"

📋 Checklist Before You Start
Copy this into your AI chat:

Before we begin building, confirm you understand:

✅ Use Next.js 14 App Router (not Pages Router)
✅ Use Groq API (FREE) - NOT OpenAI
✅ Use Tailwind CSS with purple theme (#A855F7)
✅ Use TypeScript strictly (no 'any' types)
✅ Use Prisma for database operations
✅ WhatsApp automation should be stealth (avoid detection)
✅ Keep components small and reusable
✅ Mobile responsive design
✅ Proper error handling everywhere

Reply "CONFIRMED" if you're ready, then we'll start with project setup.

Ready to copy-paste?

The master prompt + these specific prompts will get you 80% of the way there with AI assistance. The AI will handle the heavy lifting, you just guide it and test.

Want me to: