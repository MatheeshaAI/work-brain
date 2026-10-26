# Insurance Sales Workspace - Lead Tracking System

## 📊 Lead Tracker Overview

Your lead tracking system is now set up in `Lead_Tracker.csv`

### Current Statistics (as of 13-Jan-2026)
- **Total Leads**: 37
- **New Leads**: 9
- **Followed Up**: 24
- **Qualified**: 1
- **Policy Booked**: 3
- **Payment Link Sent**: 1

### Lead Sources
- **Bought Leads**: 27
- **Self Assigned**: 9
- **Reassigned**: 4

## 📁 Folder Structure

```
test_work_os/
├── Lead_Tracker.csv                    # Main tracking spreadsheet
├── 1_New_Leads/                        # Fresh inquiries
├── 2_Info_Collected/                   # Client details gathered
├── 3_Quote_Sent/                       # Quotes prepared and sent
├── 4_Documents_Collection/             # Waiting for client documents
├── 5_Ready_for_Submission/            # All docs ready, needs portal upload
├── 6_Payment_Pending/                  # Submitted, waiting for payment
├── Onboarding_policies/                # Confirmed policies (paid)
├── Lost_Leads/                         # Declined or not interested
└── Knowledge_Base/                     # Insurance info, templates, guides
```

## 📋 Columns in Lead Tracker

1. **Reference ID** - Unique identifier (HEA-XXXXXXX for health)
2. **Client Name** - Primary contact name
3. **Status** - Current activity status
4. **Lead Source** - Where the lead came from
5. **Date** - Lead creation date
6. **Visa Type** - Employment/visa category
7. **Stage** - Pipeline stage
8. **Contact** - Phone/WhatsApp/Email
9. **Insurance Company** - Which provider
10. **Premium** - Quote amount
11. **Next Action** - What needs to be done
12. **Follow-up Date** - When to contact next
13. **Notes** - Additional information
14. **Documents Status** - Pending/Partial/Complete
15. **Payment Status** - Pending/Paid

## 🔄 Workflow Stages

### Stage 1: New Lead
- Lead comes in from WhatsApp/Email/Call/Referral
- Create folder: `1_New_Leads/[Client Name] - [Reference ID]/`
- Update tracker with basic info

### Stage 2: Info Collected
- Gather: Names, DOB, Visa, Emirates, Hospital preference, Budget
- Move folder to: `2_Info_Collected/`
- Update tracker with details

### Stage 3: Quote Sent
- Prepare and send quotation
- Save quote in client folder
- Move to: `3_Quote_Sent/`
- Set follow-up date

### Stage 4: Documents Collection
- Client approved quote
- Request documents (Passport, Visa, EID, etc.)
- Move to: `4_Documents_Collection/`
- Track which documents received

### Stage 5: Ready for Submission
- All documents collected
- Move to: `5_Ready_for_Submission/`
- Prepare for portal upload

### Stage 6: Payment Pending
- Documents submitted to portal
- Payment link received
- Move to: `6_Payment_Pending/`
- Share payment link with client

### Stage 7: Policy Confirmed
- Payment received
- Move to: `Onboarding_policies/[Client Name] - [Reference ID]/`
- Archive and celebrate! 🎉

## 📝 Next Steps

1. **Open `Lead_Tracker.csv`** in Excel
2. **Fill in missing information** (Contact, Next Action, Follow-up Date)
3. **Create folder structure** (I can do this for you)
4. **Set up automation workflows** for:
   - Document checklist generation
   - Follow-up reminders
   - Status updates
   - WhatsApp message templates

## 🚀 Quick Actions

- **Add New Lead**: Add row to CSV + Create folder
- **Update Status**: Change Status column + Move folder
- **Generate Report**: Filter by date/status/source
- **Daily Tasks**: Sort by Follow-up Date

Would you like me to:
1. Create the folder structure automatically?
2. Set up document checklists for each insurance type?
3. Create WhatsApp message templates?
4. Build automation scripts?
