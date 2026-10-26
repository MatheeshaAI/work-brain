# Using ICM for a CRM-Driven Insurance Sales Agent

## The question

Can you use the folder-structure method (ICM) to build a health/motor insurance sales agent that pulls data from a company CRM?

## The answer

**Yes, partially.** Use ICM for the guided sales workflow. Use a proper CRM for the customer database.

## The hybrid setup

```
Your Company CRM  ──→  Connector Script  ──→  ICM Workspace (folders)
(Salesforce,          (pulls customer data    (AI guides the agent
 HubSpot, etc.)        via API, saves as       step-by-step through
                       markdown files)         each lead)
```

## How data flows

1. A small script connects to your CRM's API (most CRMs have one)
2. It grabs the customer details for a specific lead (name, age, policy history, etc.)
3. It writes that info into a markdown file inside the ICM folder
4. The AI reads that file and starts the sales pipeline

Example: `fetch_customer.py --id=12345` creates a file like:

```
customer_data.md
─────────────────
Name: Sarah Jones
Age: 34
Existing cover: None
Medical history: Asthma
Budget: $200-400/month
```

## What the pipeline stages could look like

```
01_qualify_lead/         → Is this lead worth pursuing?
02_needs_analysis/       → What coverage do they need?
03_policy_recommendation/ → Which product fits best?
04_generate_quote/       → Price calculation
05_closing_docs/         → Final paperwork
```

At each step, you review the AI's work before it moves on.

## Dashboard from markdown

Since everything is a plain file, you can build an HTML dashboard that reads the folder and displays leads, stages, quotes, etc. A small script serves the data — no heavy database needed for a small team.

## What you'd need from IT

- API access to your company CRM
- One small script built once (a developer can do this in a few hours)
- An API key for authentication

## Limitations

- Not for real-time customer chat
- Not for handling 100s of concurrent leads
- Best for one agent or a small team working through leads one at a time

---

*Discussed 1 June 2026, based on the ICM paper (arXiv:2603.16021v2)*

**See also:** [[Folder Structure Paper - Paper Explained]] — plain-language summary of the paper
