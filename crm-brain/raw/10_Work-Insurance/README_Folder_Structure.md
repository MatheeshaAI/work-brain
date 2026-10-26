# Insurance Sales Workspace - Client-Centric Structure

**[← Back to Master Workspace](./README.md)**

## 📁 New Folder Structure

```
test_work_os/
├── Lead_Tracker.csv                    # Master tracking (tracks stage here)
├── Task_Tracker.csv                    # Daily tasks
├── Sales_Analytics.csv                 # Performance tracking
│
├── Clients/                            # All client folders
│   ├── [Client Name] - [Ref ID]/
│   │   ├── 01_Conversations/           # WhatsApp, Email, Call logs
│   │   ├── 02_Quotations/              # All quotes sent
│   │   ├── 03_Documents/               # Client documents (EID, Passport, etc.)
│   │   ├── 04_Applications/            # Application forms, KYC
│   │   ├── 05_Meetings/                # Meeting notes, transcripts
│   │   ├── 06_Policies/                # Final policy documents
│   │   └── _Client_Info.txt            # Quick reference info
│   │
│   ├── Harpreet Singh - HEA-86E7XFN3/
│   ├── Kenda Mohamed - HEA-YV9ZHF9B/
│   └── ... (all 37 leads)
│
├── Renewals/                           # Renewal tracking
├── Claims/                             # Claims management
├── Lost_Leads/                         # Archive of lost leads
│
└── Knowledge_Base/
    ├── Health_Insurance/
    │   ├── Insurance_Companies.md
    │   ├── Coverage_Comparison.md
    │   └── Quote_Templates/
    ├── Motor_Insurance/
    │   ├── Insurance_Companies.md
    │   ├── Coverage_Comparison.md
    │   └── Quote_Templates/
    └── Message_Templates/
        ├── WhatsApp_Templates.md
        └── Email_Templates.md
```

## 📂 Client Folder Template

Each client folder contains:

### 01_Conversations/
- `whatsapp_chat_[date].txt` - WhatsApp conversation exports
- `email_thread_[date].pdf` - Email conversations
- `call_log.txt` - Call notes and summaries

### 02_Quotations/
- `Quote_1_[Company]_[Date].pdf` - First quote sent
- `Quote_2_[Company]_[Date].pdf` - Alternative quotes
- `Final_Quote_Accepted.pdf` - The quote they chose

### 03_Documents/
- `[Name] - Emirates ID.pdf/jpeg`
- `[Name] - Passport.pdf/jpeg`
- `[Name] - Visa.pdf/jpeg`
- `[Name] - Medical Reports.pdf` (if applicable)
- `Sponsor Documents.pdf` (for dependents)

### 04_Applications/
- `Medical Application Form.pdf`
- `KYC Form.pdf`
- `Signed Quotation.pdf`
- `Additional Forms.pdf`

### 05_Meetings/
- `Meeting_Notes_[Date].txt` - Quick notes
- `Meeting_Transcript_[Date].txt` - Full transcript
- `Meeting_Recording_[Date].mp3` (if recorded)

### 06_Policies/
- `Policy_Document_[Policy Number].pdf`
- `Payment_Receipt.pdf`
- `Policy_Schedule.pdf`

### _Client_Info.txt
Quick reference file with:
```
Client: [Name]
Reference ID: [HEA-XXXXXXX]
Stage: [Current Stage Number & Name]
Insurance Type: Health/Motor
Contact: [Phone/Email]
Members: [Number of people]
Insurance Company: [Company Name]
Premium: AED [Amount]
Policy Number: [If confirmed]
Next Action: [What needs to be done]
Notes: [Important info]
```

## 🔄 Workflow with Client Folders

### When New Lead Comes In:
1. Add to `Lead_Tracker.csv` (Stage 1)
2. Create folder: `Clients/[Name] - [Ref ID]/`
3. Create subfolders (01-06)
4. Create `_Client_Info.txt`
5. Save initial conversation in `01_Conversations/`

### As Lead Progresses:
1. Update stage in `Lead_Tracker.csv`
2. Add documents to appropriate subfolders
3. Update `_Client_Info.txt`
4. Keep everything in one place!

### When Policy Confirmed:
1. Update to Stage 15 in `Lead_Tracker.csv`
2. Move all final documents to `06_Policies/`
3. Keep folder in `Clients/` for future reference
4. Use for renewals next year!

## 🎯 Benefits of This Structure

✅ **Everything in One Place** - All client info together
✅ **Easy to Find** - No searching across multiple folders
✅ **Conversation History** - Track all communications
✅ **Meeting Records** - Keep transcripts and notes
✅ **Document Organization** - Clear subfolder structure
✅ **Renewal Ready** - All info available for next year
✅ **Claims Support** - All documents ready if needed

## 🚀 Next Steps

1. **Delete stage-based folders** (01_New_Leads, 02_Active_Followup, etc.)
2. **Create Clients/ folder**
3. **Move existing client folders** (Harpreet Singh, Kenda Mohamed) into Clients/
4. **Create folders for all 37 active leads**
5. **Set up folder template** for quick creation

Would you like me to:
1. Execute this reorganization now?
2. Create a script to auto-generate client folders?
3. Build templates for _Client_Info.txt?
