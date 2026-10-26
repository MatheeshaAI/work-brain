# Workflow — Extract IMCRM Health Leads

## Purpose
Pull all leads from a filtered IMCRM Health List across every page, then save them as a markdown table inside `workspaces/Sales/Leads/`.

## What we did
- Opened IMCRM in a controllable browser tab
- Verified the Health List filters for the target date range
- Found that the paginated lead data is embedded in the page's `data-page` JSON
- Extracted all pages of results without manually clicking through pagination
- Pulled lead details including mobile number and email from each lead's detail page
- Saved the final output as a markdown table

## Output
- `workspaces/Sales/Leads/IMCRM Health Leads - May 2026.md`

## Script
- `workspaces/Sales/Workflows/Scripts/imcrm_collect_leads.js`

## Process
1. Open the filtered IMCRM Health List page
2. Confirm the correct date range / filters are applied
3. Read the page data from the embedded `data-page` JSON
4. Follow each `next_page_url` until all pages are collected
5. For contact info, fetch each lead detail page:
   - `/quotes/health/<UUID>`
6. Extract key fields:
   - Ref ID
   - First Name
   - Last Name
   - Mobile
   - Email
   - Emirate
   - Lead Status
   - Created Date
   - Last Modified
   - Team
   - Premium
   - Insurer
7. Save the final result into `workspaces/Sales/Leads/`

## Notes
- Pagination was 6 pages / 51 leads for the May 2026 run
- Contact info was not fully available in the list page alone; it came from each lead's detail page
- This workflow is useful when IMCRM table export is inconvenient or unavailable
