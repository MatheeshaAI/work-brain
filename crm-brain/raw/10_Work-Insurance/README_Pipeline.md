# Insurance Sales Pipeline - 16-Stage System

## 📊 Pipeline Stages (Health, Motor, Renewals)

| Stage # | Stage Name | Description | Auto Follow-up |
|---------|-----------|-------------|----------------|
| **1** | New Lead | Fresh inquiry received | - |
| **2** | Allocated | Lead assigned to advisor | - |
| **3** | Followed Up | Initial contact made | ✅ Auto-remind after 2 days |
| **4** | Quoted | Quote sent to client | - |
| **5** | In Negotiation | Discussing terms/price | - |
| **6** | Application Pending | Waiting for client to submit application | ✅ Auto-remind after 3 days |
| **7** | Missing Documents Requested | Requested specific documents from client | ✅ Auto-remind daily |
| **8** | Application Submitted | Submitted to insurance company | - |
| **9** | Sent for Transaction Approval | Awaiting company approval | - |
| **10** | KYC Cleared | KYC verification complete | - |
| **11** | Payment Link Sent to Customer | Payment link shared with client | ✅ Auto-remind after 1 day |
| **12** | Payment Pending | Waiting for payment confirmation | ✅ Auto-remind daily |
| **13** | Payment Initiated | Payment in process | - |
| **14** | Policy Documents Pending | Waiting for policy docs from company | - |
| **15** | Policy Booked | ✅ COMPLETED - Policy active | - |
| **16** | Lost | Lead declined/not interested | - |

## 📁 Folder Structure

```
test_work_os/
├── Lead_Tracker.csv                    # Master tracking spreadsheet
│
├── 01_New_Leads/                       # Stage 1-2
├── 02_Active_Followup/                 # Stage 3-5
├── 03_Application_Stage/               # Stage 6-7
├── 04_Submitted_Pending/               # Stage 8-10
├── 05_Payment_Stage/                   # Stage 11-13
├── 06_Policy_Finalization/             # Stage 14
├── Onboarding_policies/                # Stage 15 (Completed)
├── Lost_Leads/                         # Stage 16
│
└── Knowledge_Base/
    ├── Health_Insurance/
    │   ├── Insurance_Companies.md
    │   ├── Document_Checklist.md
    │   └── Quote_Templates/
    ├── Motor_Insurance/
    │   ├── Insurance_Companies.md
    │   ├── Document_Checklist.md
    │   └── Quote_Templates/
    └── Message_Templates/
        ├── WhatsApp_Templates.md
        └── Email_Templates.md
```

## 🎯 Current Pipeline Status (13-Jan-2026)

### By Stage:
- **Stage 1 (New Lead)**: 6 leads
- **Stage 3 (Followed Up)**: 24 leads
- **Stage 4 (Quoted)**: 1 lead
- **Stage 5 (In Negotiation)**: 1 lead
- **Stage 11 (Payment Link Sent)**: 1 lead
- **Stage 15 (Policy Booked)**: 3 leads ✅
- **Stage 16 (Lost)**: 0 leads

### Priority Actions Today:
1. **6 New Leads** → Need allocation & first contact
2. **24 Followed Up** → Need quotes or next action
3. **1 Payment Link Sent** → Follow up for payment

## 🤖 Auto Follow-up Rules

### Stage 3: Followed Up
- **Trigger**: No update for 2 days
- **Action**: Send WhatsApp reminder to follow up

### Stage 6: Application Pending
- **Trigger**: No update for 3 days
- **Action**: Call client + WhatsApp reminder

### Stage 7: Missing Documents
- **Trigger**: Daily reminder
- **Action**: WhatsApp message with document checklist

### Stage 11: Payment Link Sent
- **Trigger**: No payment after 24 hours
- **Action**: WhatsApp + Call reminder

### Stage 12: Payment Pending
- **Trigger**: Daily reminder
- **Action**: Escalate to urgent follow-up

## 📋 Document Checklists

### Health Insurance Documents:
- [ ] Passport copy (all members)
- [ ] Visa copy (all members)
- [ ] Emirates ID (all members)
- [ ] Medical reports (if pre-existing conditions)
- [ ] Sponsor documents (for dependents)
- [ ] Birth certificate (for newborns)
- [ ] Discharge summary (if applicable)
- [ ] Medical application form (signed)
- [ ] KYC form (signed)
- [ ] Signed quotation

### Motor Insurance Documents:
- [ ] Emirates ID
- [ ] Mulkiya (vehicle registration)
- [ ] Passing certificate
- [ ] Inspection pictures
- [ ] Driver's license
- [ ] Previous policy (for renewals)

## 🚀 Quick Actions

### Add New Lead:
1. Add row to `Lead_Tracker.csv`
2. Set Stage Number = 1
3. Create folder: `01_New_Leads/[Client Name] - [Ref ID]/`
4. Set Next Action = "Initial contact"

### Move Lead to Next Stage:
1. Update Stage Number in CSV
2. Move folder to corresponding directory
3. Update Next Action
4. Set Follow-up Date

### Daily Dashboard View:
- Filter by Follow-up Date = Today
- Sort by Stage Number
- Focus on Stages 3, 6, 7, 11, 12 (auto-follow-up stages)

## 📊 Reporting Dashboard

### Weekly Report:
- **New Leads**: Count Stage 1-2
- **Active Pipeline**: Count Stage 3-14
- **Closed Won**: Count Stage 15
- **Closed Lost**: Count Stage 16
- **Conversion Rate**: Stage 15 / (Stage 15 + Stage 16)

### Monthly Report:
- Leads by Source (Bought vs Self Assigned)
- Leads by Visa Type
- Average time in each stage
- Revenue by Insurance Company

## 🎯 Next Steps

1. **Fill in missing contact info** in Lead_Tracker.csv
2. **Create folder structure** (automated)
3. **Set up auto-reminders** (Python script)
4. **Build WhatsApp templates** for each stage
5. **Create daily task dashboard**

---

**One Dashboard: Leads → Quotes → Payments → Booked** ✅
