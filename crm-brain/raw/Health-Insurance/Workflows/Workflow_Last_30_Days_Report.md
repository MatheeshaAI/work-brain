# Workflow: Health Insurance Last 30 Days Report

This document outlines the steps to manually or semi-automatically generate the health insurance leads report for the last 30 days.

## Phase 1: Authentication
1. **Launch Browser:** Open Chrome using the specific profile (e.g., "Default" or "insurancemarket.ae").
2. **Navigate:** Go to `https://imcrm.alfred.ae/quotes/health`.
3. **Login:**
   - Click "Google Login".
   - Select the account: `matheesha.sarathchandra@insurancemarket.ae`.
   - Enter password and complete 2-Step Verification on iPhone.

## Phase 2: Navigation to Health Quotes
1. **Sidebar:** Locate the "Personal Quotes" button in the left sidebar and click to expand.
2. **Sub-menu:** Click on "Health Quotes" under the "Personal Quotes" section.
3. **Target Page:** Ensure you are at `https://imcrm.alfred.ae/quotes/health`.

## Phase 3: Applying Filters
1. **Filters Button:** Click the "Filters" button located above the lead table.
2. **Select Range:** From the dropdown menu, select **"Last 30 Days"**.
3. **Verification:** Confirm that the "Created Date Start" and "Created Date End" fields reflect the correct 30-day window.

## Phase 4: Data Extraction
1. **Columns Required:**
   - Reference ID (with link)
   - First Name & Last Name
   - Emirate of Visa
   - Lead Status
   - Assignment Type
   - Created Date
   - Health Team Type
   - Starting From Price
   - Lead Type
   - Member Category
2. **Pagination:** 
   - Extract data from the current page.
   - Click the "Next" button at the bottom of the table.
   - Repeat until no more pages are available.
3. **Consolidation:** Combine all extracted rows into a single Markdown table.
