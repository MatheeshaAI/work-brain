# Workflow: Single Lead Detail Extraction

This document outlines the steps to extract comprehensive details for a specific health insurance lead.

## Phase 1: Navigation
1. **Direct Access:** Navigate directly to the lead URL: `https://imcrm.alfred.ae/quotes/health/[REF_ID]`.
2. **Search Method:** 
   - Go to the Health List page.
   - Enter the Reference ID in the "Ref-ID" search box.
   - Click "Search" and then click the Reference ID link in the results table.

## Phase 2: Data Identification
Identify and extract data from the following key sections:
1. **Header Box:** Ref-ID, Customer Type, AML Statuses, Created/Modified Dates, Advisor, Source.
2. **Quote Details:** Requirement type, Current insurer, Plan category, Enquiry count.
3. **Customer Profile:** Full name, Contact info (Email/Mobile), Nationality, DOB, Gender, Salary Band, Member Category.
4. **Member Details:**
   - Locate the "Member Details" button.
   - **Important:** If the member table is not visible, click the button to expand the section.
   - Extract Name, Relation, Gender, DOB, Nationality, and PEC Flag for every member listed.
5. **Lead Status:** Current status, Notes, and Transaction Type.

## Phase 3: File Generation
1. Format the collected data into a structured Markdown format.
2. **Naming Convention:** `[REF_ID]-[First_Name]-[Last_Name].md`.
3. Save the file to the project folder.
