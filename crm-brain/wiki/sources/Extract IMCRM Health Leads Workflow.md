---
type: source
sources: ["raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Workflows/Extract IMCRM Health Leads.md", "raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Workflows/Scripts/imcrm_collect_leads.js"]
updated: 2026-10-22
tags: [imcrm, workflow, extraction, javascript]
summary: "The documented IMCRM lead-extraction workflow and its JavaScript collector that walks every page of the paginated Health List."
---
# Source: Extract IMCRM Health Leads Workflow

Original notes: [[raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Workflows/Extract IMCRM Health Leads.md|Workflows/Extract IMCRM Health Leads.md]] and [[raw/20_AI-and-Agents/My-Shared-Brain/workspaces/Sales/Workflows/Scripts/imcrm_collect_leads.js|Workflows/Scripts/imcrm_collect_leads.js]]. The first real workflow built on top of the browser harness; it produced [[IMCRM Health Leads May 2026]].

## Purpose
Pull all leads from a filtered IMCRM Health List across every page and save them as a markdown table inside `workspaces/Sales/Leads/`.

## The recorded run
- Opened IMCRM in a controllable browser tab.
- Verified the Health List filters for the target date range.
- Found that the paginated lead data is embedded in the page's `data-page` JSON.
- Extracted all pages of results without manually clicking through pagination.
- Pulled lead details including mobile and email from each lead's detail page.
- Saved the final output as a markdown table.

## Documented process
1. Open the filtered IMCRM Health List page.
2. Confirm the correct date range and filters are applied.
3. Read the page data from the embedded `data-page` JSON.
4. Follow each `next_page_url` until all pages are collected.
5. For contact info, fetch each lead detail page at `/quotes/health/<UUID>`.
6. Extract: Ref ID, first and last name, mobile, email, emirate, lead status, created date, last modified, team, premium, insurer.
7. Save the final result into `workspaces/Sales/Leads/`.

## The collector script
A single-file JavaScript script that runs inside the browser harness session:
- `waitForReady()` polls `document.readyState` until `complete`, with a 30-second timeout and a 250 ms interval.
- `extractPage()` evaluates JavaScript in the page to find the `.vue3-easy-data-table` element, read the `thead th` headers, read every `tbody tr` into cells, normalise whitespace and non-breaking spaces, and locate the Next and Previous links plus the "Now displaying:" summary line.
- The loop runs up to 100 pages: it waits for readiness, sleeps 500 ms, extracts, tracks visited URLs to avoid loops, and follows `nextHref` via `Page.navigate` until there is no next page.
- The result returns a summary (page count, total rows, headers, per-page URLs and row counts) and a `details` object with every row.

## Status and caveats
- The run covered 6 pages and 51 leads for May 2026. Contact details were not available on the list page alone and had to be fetched per lead, which means one extra request per lead.
- The script reads the rendered DOM table, while the context notes say the data is also embedded as `data-page` JSON. The script does not use that JSON; the JSON route is described in the context note but not implemented here. See [[Sales Context File Set]].
- It collects contact fields, so its output is sensitive: the saved table holds names, phone numbers and emails. The wiki records only aggregates - see [[IMCRM Health Leads May 2026]].
- The 100-page loop limit and the URL-based loop detection are the only safety rails; there is no check that the applied filters match the target period once pagination starts.

Related: [[My Shared Brain]], [[IMCRM]], [[IMCRM Health Leads May 2026]], [[Sales Context File Set]], [[Browser harness]], [[Page data over screenshots]], [[Virtual scrolling and lazy loading]].
