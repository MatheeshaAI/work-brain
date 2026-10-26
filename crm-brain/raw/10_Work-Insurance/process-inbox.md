---
description: Process tasks from the INBOX.md file into the Task_Tracker.csv and perform associated actions.
---

# Workflow: Process Inbox Folder

This workflow automates the processing of tasks and files from your `INBOX/` folder.

## Steps:

1. **Scan INBOX Folder**: Check `INBOX/tasks.md` for new instructions and look for any new files (PDFs, Images, Excel) in the `INBOX/` directory.
2. **Analyze Content**:
   - For **Tasks**: Read `tasks.md` to identify actions required.
   - For **Files**: Use `rename-documents` workflow if they are new client docs, or attach them to existing client folders in `Clients/`.
3. **Categorize & Action**:
   - **New Lead**: Create folder, move documents to `03_Documents/`, and add to `Task_Tracker.csv`.
   - **Quotes/Policies**: Move PDF quotes to `02_Quotations/` or policies to `06_Policies/`.
   - **Claims**: Move files to `Claims/` folder and log the task.
4. **Update Trackers**: Sync `Task_Tracker.csv` and `Lead_Tracker.csv` based on the processed items.
5. **Clean Up**: 
   - Move processed files to the correct client/category folders.
   - Mark tasks in `tasks.md` as processed.
6. **Summary Report**: Provide a detailed summary of all files moved and tasks updated.

// turbo
7. Run the processing script (if available) or perform the manual steps to sync data.

---

*Tip: You can just say "process inbox" or "check inbox" and I will run this workflow.*
