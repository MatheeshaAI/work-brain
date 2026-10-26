# 📊 Insurance Sales Operations - Master Workspace

Welcome to your central hub for managing insurance leads, sales, and documentation. This workspace is designed for high efficiency and automation.

---

## 📥 Quick Actions & Inbox
### **[INBOX/ Folder](../Inbox - To sort/)**
- **Drop Files Here**: Put EIDs, Passports, Quotations, or Policies into the `INBOX/` folder.
- **Update Tasks**: Add new tasks to [INBOX/tasks.md](./INBOX/tasks.md).
- **Run Workflow**: Say `/process-inbox` to have me automatically file everything and update your trackers.

---

## 🔍 Network & Facility Search
- **Quick Search**: Say "is [Hospital Name] covered?" or run `/find-network`.
- **Database**: Uses the latest 32GB [Dubaicare Network List_2026.csv](./Knowledge_Base/Health_Insurance/Networks/Dubaicare%20Network%20List_2026.csv).
- **Tool**: [facility_search.py](../90_Archive/facility_search.py) (PowerShell-optimized search).

---

## 📋 Core Trackers
- **[Task Tracker](../90_Archive/Task_Tracker.csv)**: Daily to-do list (New Leads, Renewals, Claims, Admin).
- **[Lead Tracker](../90_Archive/Lead_Tracker.csv)**: 16-stage pipeline for all active leads.
- **[Sales Analytics](../90_Archive/Sales_Analytics.csv)**: Performance data, commission tracking, and policy types.

---

## 📁 Workspace Structure
```text
test_work_os/
├── INBOX/                        # Task & Document entry point
│   ├── tasks.md                  # New tasks for AI to process
│   └── [Drop Files Here]         # PDFs, Images to be filed
│
├── Clients/                      # Master client storage
│   └── [Name] - [Ref ID]/        # Individual client folders
│       ├── 01_Conversations/     # WhatsApp, Email, Call logs
│       ├── 02_Quotations/        # All quotes sent
│       ├── 03_Documents/         # EID, Passport, Medicals
│       ├── 04_Applications/      # Signed forms, KYC
│       ├── 05_Meetings/          # Notes, transcripts
│       └── 06_Policies/          # Final policy documents
│
├── Knowledge_Base/               # Reference materials
│   ├── Health_Insurance/         # Company comparisons, templates
│   ├── Motor_Insurance/          # Coverage details
│   └── Message_Templates/        # WhatsApp & Email templates
│
├── Claims/                       # Dedicated claims tracking
├── Renewals/                     # Renewal logs & reminders
└── Lost_Leads/                   # Archive of inactive leads
```

---

## 🔄 Automated Workflows
1. **`/process-inbox`**: Scans the `INBOX/` folder, files documents into the correct client directories, and updates `Task_Tracker.csv`.
2. **`/rename-documents`**: Automatically analyzes images/PDFs in a folder and renames them based on content (e.g., "John Doe - Emirates ID.pdf").
3. **Daily Routine**:
   - **Morning**: Run `/process-inbox`.
   - **Day**: Update `Lead_Tracker.csv` stages.
   - **Evening**: Mark completed tasks.

---

## 📘 Documentation Links
- [Detailed Folder Guide](./README_Folder_Structure.md)
- [Pipeline & Lead Tracking Guide](./README_Pipeline.md)
- [Tasks & Analytics Dashboard](./README_Tasks_Analytics.md)
- [Lead Management Tips](./README_Lead_Tracking.md)

---
*Last Updated: 13-Jan-2026*
