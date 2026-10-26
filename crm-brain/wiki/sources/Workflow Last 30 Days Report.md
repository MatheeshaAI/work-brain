---
type: source
sources: ["raw/Health-Insurance/Workflows/Workflow_Last_30_Days_Report.md"]
updated: 2026-10-22
tags: [imcrm, workflow, reporting, leads]
summary: "Four-phase procedure for exporting the last-30-days health lead table from the CRM."
---
# Workflow Last 30 Days Report

Procedure for the lead report that produced [[Leads Last 30 Days report]] and refreshes the pipeline. Concept page: [[Leads Last 30 Days report]].

1. **Authentication:** open Chrome with the work profile, go to the CRM health quotes page, sign in with Google and approve 2-step verification on the phone (see [[Workflow Login]]).
2. **Navigation:** left sidebar, Personal Quotes, then Health Quotes.
3. **Filters:** Filters button, choose "Last 30 Days"; check the created-date start and end fields.
4. **Extraction:** columns needed are reference ID (with link), first and last name, emirate of visa, lead status, assignment type, created date, health team type, starting-from price, lead type, member category. Read page by page with Next, then merge into one Markdown table.

A scripted version is `last_30_days_scraper.js`. Related: [[Extracting leads from the CRM]], [[IMCRM]], [[Work browser profile]].
