# Workflow: Filter Available Plans by Price

This document outlines the steps to identify health insurance plans within a specific budget range.

## Phase 1: Navigation
1. Open the detailed lead page: `https://imcrm.alfred.ae/quotes/health/[REF_ID]`.
2. Scroll down to the **"Available Plans"** section.

## Phase 2: Filtering (Manual or Scripted)
### Option A: Built-in Filters (Provider/Network/Type)
1. Click the **"Filters"** button in the section header.
2. Select the **Insurer**, **Network**, or **Plan Type** (Entry Level, Good, Best).
3. Click **"Apply"**.

### Option B: Price Range Search (Manual)
1. Observe that plans are typically sorted by price in ascending order.
2. Navigate through the pages using the **"Next"** button at the bottom of the section.
3. Identify the page where the price reaches your minimum threshold (e.g., 4000 AED).
4. Extract all plans until you reach your maximum threshold (e.g., 6000 AED).

## Phase 3: Data Extraction
For each matching plan, record:
- Insurance Provider
- Plan Name
- Plan Type
- Network Provider
- Co-pay Details
- Base Price
- Total Price (including VAT)

## Phase 4: Consolidation
Combine the matching plans into a Markdown table for review or sharing.
