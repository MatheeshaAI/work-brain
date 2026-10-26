---
type: source
sources: ["raw/10_Work-Insurance/CRM & Insurance Sales Notes.md"]
updated: 2026-10-22
tags: [insurance, crm, icm, sales-agent, workflow]
---

# CRM & Insurance Sales Notes

A Q&A-format note discussing how to combine the [[Interpretable Context Methodology]] (ICM) folder-based approach with a company CRM for a health/motor insurance sales agent. Discussed on 1 June 2026 based on the ICM paper (arXiv:2603.16021v2). See also [[Using ICM for a CRM-Driven Insurance Sales Agent]].

## Core Answer

Yes — partially. Use ICM for the guided sales workflow and a proper CRM (e.g., [[IMCRM]], Salesforce, HubSpot) for the customer database. The two systems are complementary, not competing.

## Hybrid Setup Architecture

```
Company CRM ──→ Connector Script ──→ ICM Workspace (folders)
(Salesforce,     (pulls customer       (AI guides the agent
 HubSpot, etc.)  data via API,          step-by-step through
                 saves as markdown)     each lead)
```

1. A script connects to the CRM's API
2. Fetches customer details for a specific lead (name, age, policy history, medical, budget)
3. Writes the data to a markdown file inside the ICM folder
4. The AI reads that file and begins the sales pipeline

## Proposed Pipeline Stages

| Folder | Purpose |
|--------|---------|
| `01_qualify_lead/` | Is this lead worth pursuing? |
| `02_needs_analysis/` | What coverage do they need? |
| `03_policy_recommendation/` | Which product fits best? |
| `04_generate_quote/` | Price calculation |
| `05_closing_docs/` | Final paperwork |

At each step, the advisor reviews the AI's work before it moves on — a human-in-the-loop gating model.

## Markdown Dashboard

Since all outputs are plain files, a small HTML/script dashboard can read the folder and display leads, stages, and quotes. No heavy database required for a small team.

## Limitations

- Not for real-time customer chat
- Not for handling hundreds of concurrent leads
- Best for one agent or a small team working through leads sequentially

## Requirements from IT

- API access to the company CRM
- One connector script (a few hours of developer time)
- An API key for authentication
