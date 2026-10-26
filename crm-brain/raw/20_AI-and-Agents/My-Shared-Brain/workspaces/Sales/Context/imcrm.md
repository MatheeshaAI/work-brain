# IMCRM

## Main use
IMCRM is the main CRM for sales lead and quote work.

## Known page
- Health List
- Example route: `/quotes/health?...`

## Known patterns
- The Health List is paginated
- List data is embedded in the page's `data-page` JSON
- This makes it possible to extract all pages without manually clicking through each page
- Lead detail pages are at `/quotes/health/<UUID>`
- Lead detail pages contain fields not fully visible in the list, including:
  - mobile number
  - email

## Useful fields
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

## Current known workflow
1. Open filtered Health List
2. Confirm date range / filters
3. Read list data from embedded `data-page`
4. Follow `next_page_url` until all pages are collected
5. Open/fetch each lead detail page for mobile and email
6. Save final output into `../Leads/`

## Notes
- This worked for May 2026 filtered leads
- A documented workflow and script already exist in `../Workflows/`
