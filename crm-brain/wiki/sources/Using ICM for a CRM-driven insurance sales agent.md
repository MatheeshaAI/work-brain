---
type: source
sources: ["raw/10_Work-Insurance/CRM & Insurance Sales Notes.md"]
updated: 2026-10-22
tags: [icm, crm, design, sales-agent, architecture]
privacy: no client data in this source
summary: "A design proposal for a CRM-driven insurance sales agent built on ICM folder structure - proposal, not a built system."
---
# Source: Using ICM for a CRM-driven insurance sales agent

Title in the raw file: *Using ICM for a CRM-Driven Insurance Sales Agent*. 49 lines. Dated in the note as discussed **1 June 2026**, and based on the ICM paper (arXiv:2603.16021v2).

> **Status: design intent.** Nothing in this note is a description of working software. It is a proposal and a set of requirements. See [[IMCRM Data Extractor]] for the piece that *is* built.

## The question the note asks
> Can you use the folder-structure method (ICM) to build a health/motor insurance sales agent that pulls data from a company CRM?

The answer given is **"Yes, partially"**, with a specific division of labour: **use ICM for the guided sales workflow, use a proper CRM for the customer database.** ICM is not proposed as a customer database.

## The proposed architecture

```
Company CRM  →  Connector script  →  ICM workspace (folders)
(Salesforce,    (pulls customer     (AI guides the agent
 HubSpot, etc.)  data via API,       step by step through
                 saves as markdown)   each lead)
```

## How data is meant to flow
1. A small script connects to the CRM's API.
2. It pulls the customer details for one lead - name, age, policy history and similar.
3. It writes them into a markdown file inside the ICM folder.
4. The agent reads that file and starts the pipeline.

The example given is a command-line fetch for one lead ID that produces a single `customer_data.md` file containing the lead's name, age, existing cover, medical history and budget.

## The proposed pipeline stages

```
01_qualify_lead/          → Is this lead worth pursuing?
02_needs_analysis/        → What coverage do they need?
03_policy_recommendation/ → Which product fits best?
04_generate_quote/        → Price calculation
05_closing_docs/          → Final paperwork
```

**With a human review at every stage** - "at each step, you review the agent's work before it moves on".

## The proposed dashboard
Because everything is a plain file, an HTML dashboard can be built that reads the folder and shows leads, stages and quotes; a small script serves the data. The note's phrasing is **"no heavy database needed for a small team"**.

## What it says it needs from IT
- API access to the company CRM
- One small script, built once ("a developer can do this in a few hours")
- An API key for authentication

## Stated limitations
- Not for real-time customer chat
- Not for handling hundreds of concurrent leads
- Best for one agent or a small team working through leads one at a time

## How it reads against the vault
- The folder-per-stage shape is the vault's own convention - see [[Folder structure convention]] and [[Interpretable Context Methodology paper]]. The proposal is essentially **"apply that convention to a CRM-fed sales pipeline"**.
- **The privacy conflict is in the proposal itself.** Step 2 and 3 put names, medical history and policy history into markdown files on disk. That is exactly the data set that [[Leads missing from the CRM]] shows the CRM actually holds - including medical history. Any build would need the redaction step described in [[Getting client data from the CRM]] before the file is written.
- **The "not real-time chat" limitation collides with reality.** The desk's actual first channel is WhatsApp - see [[Batch intro messaging]] and [[WhatsApp follow-up gaps]] - and [[IMCRM Data Extractor]] exists precisely because the data is needed while a conversation is open. The proposal covers the *after-the-call* pipeline, not the live channel.
- **The dashboard idea is already partly built elsewhere.** The vault has a dashboard source ([[Architecture - Localhost Dashboard]]) and a project page ([[Agent OS Dashboard]]) - a different build, but the same "read markdown, serve HTML" idea.

## Dangling link
The note ends with a wikilink to `Folder Structure Paper - Paper Explained`, which **does not exist** in the vault. The paper itself is present as [[Interpretable Context Methodology paper]] and [[Interpretable Context Methodology Folder Structure as Agent Architecture]]. Recorded here rather than fixed, since that page belongs to a different ingestion scope.

Related: [[IMCRM]], [[IMCRM Data Extractor]], [[Extracting leads from the CRM]], [[Getting client data from the CRM]], [[Process inbox workflow]], [[Folder structure convention]].
