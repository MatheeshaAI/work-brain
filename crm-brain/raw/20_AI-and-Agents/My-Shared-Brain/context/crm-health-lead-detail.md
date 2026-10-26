# IMCRM Health Lead Detail Page — Context & Extraction Guide

## Overview
Complete reference for the IMCRM Health insurance lead detail page. Use this to find any data on the page without screenshots. Includes ready-to-run browser-harness scripts for reading and writing.

**URL Pattern**: `https://imcrm.alfred.ae/quotes/health/{REF_ID}`  
**REF_ID format**: `HEA-XXXXXXXX` (e.g., `HEA-X5B2Z229`)  
**Page height**: ~8052px (26+ collapsible sections)

---

## Quick Reference: All Fields & Sections

| Section | Type | Collapsible | Lazy-load | Count |
|---------|------|-------------|-----------|-------|
| Lead Meta Info | Grid fields | Yes | No | — |
| Quote Details | Grid fields | No | No | — |
| Customer Profile | Grid fields | No | No | — |
| Member Details | Table | Yes | No | Shows count |
| Customer Additional Contacts | Table | Yes | No | Shows count |
| Lead Status | Form | No | No | — |
| E-COM Details | Grid fields | No | No | — |
| Available Plans | Table | Yes | No | Shows count (437) |
| Manage Payments | Table | No | No | — |
| Embedded Products | Table | Yes | No | Shows count |
| Email Status | Table | No | No | — |
| Policy Details | Form fields | No | No | — |
| Documents | Table | No | No | Shows count |
| BOR (Broker on Record) | Section | Yes | No | Shows count |
| Digital Consent | Section | Yes | No | — |
| Booking Details | Grid fields | No | No | — |
| Commission Schedule | Table | No | No | — |
| Lead Activities | Table | No | No | Shows count |
| Lead History | Table | Yes | Yes | Button: "Load History Data" |
| InstantAlfred Chat Logs | Section | Yes | Yes | Load on demand |
| FTC Tracking | Table | Yes | No | — |
| API Logs | Table | Yes | Yes | Button: "Load API Logs" |
| Audit Logs | Table | Yes | Yes | Button: "Load Audit Logs" |
| KYC Audit Logs | Table | Yes | Yes | Button: "Load KYC Audit Logs" |
| Health Routing Logs | Table | Yes | Yes | Button: "Load Health Routing Logs" |
| OCR AI Logs | Table | Yes | Yes | Button: "Load OCR Logs" |

---

## Page Header (Always Visible)
- **Title**: "Health Detail" + staleness badge ("Stale for X days")
- **Action buttons** (top-right):
  - Notes (shows count)
  - Duplicate Lead
  - Health List
  - Edit
- **Top bar counters**:
  - Pending Callbacks: X
  - Pending WhatsApp requests: X
  - Document Upload Link (orange button)
  - Payment Authorised: X

---

## Complete Section Map

### 1. Lead Meta Info (Top Accordion)
**DOM**: `div.grid.sm:grid-cols-2` rows  
**Collapsible**: Yes (expand/collapse chevron)

| Field | Example |
|-------|---------|
| Ref-ID | HEA-X5B2Z229 |
| CUSTOMER TYPE | Individual |
| IM AML STATUS | AML Pending |
| INSURER AML STATUS | N/A |
| CREATED DATE | 16-Feb-2026 20:03:45 |
| SUBTEAM | Good |
| ADVISOR | Matheesha Sarathchandra |
| OE/AE | — |
| SOURCE | https://insurancemarket.ae/health-insurance/ |
| IMCRM SUB-SOURCE | N/A |
| SUB SOURCE OPTION | N/A |
| LAST MODIFIED DATE | 18-May-2026 09:41:08 |
| PARENT REF-ID | — |
| IS ECOMMERCE | Yes |
| IS EBP RENEWAL | No |
| LOST REASON | — |
| DEVICE | DESKTOP |
| INSURER API STATUS | — |
| API ISSUANCE STATUS | — |
| IS STP Case | No |

### 2. Quote Details
**DOM**: `div.grid.sm:grid-cols-2` rows

| Field | Example |
|-------|---------|
| FOR WHOM DO YOU REQUIRE HEALTH INSURANCE? | Individual |
| CURRENTLY INSURED WITH | — |
| TYPE OF PLAN | Good |
| NEXT FOLLOWUP DATE | - |
| DETAILS | — |
| TRANSACTION APPROVED AT | — |
| ENQUIRY COUNT | 1 |
| ADDITIONAL NOTES | — |

### 3. Customer Profile
**DOM**: `div.grid.sm:grid-cols-2` rows  
**Badge**: KYC status (top-right, e.g., "KYC - Pending")

| Field | Example |
|-------|---------|
| FIRST NAME | AlexandraHenvard |
| LAST NAME | Velge |
| INSURED FIRST NAME | (editable) |
| INSURED LAST NAME | (editable) |
| MOBILE NUMBER | +971508241019 |
| EMAIL | googlevelge@icloud.com |
| NATIONALITY | Belgian |
| DATE OF BIRTH | 15-12-1998 |
| RECEIVE MARKETING UPDATES | Yes |
| EMIRATES ID NUMBER | (editable) |
| EMIRATES ID EXPIRY DATE | 28/09/2025 (editable) |
| EMIRATE OF VISA | Dubai |
| GENDER | Female-Single |
| MARITAL STATUS | — |
| SALARY BAND | More than AED 4000 |
| MEMBER CATEGORY | Golden visa |
| PRIVATE CLIENT | No |
| RISK CATEGORY | Pending for review |

### 4. Member Details
**Type**: Table, collapsible  
**Columns**: `Member Name | Policy PEC Flag | Gender | DOB | Relation | Nationality | Emirate of Visa | Member Category | Action`  
**Sub-table**: `Type | Value | Created At | Action`

### 5. Customer Additional Contacts
**Type**: Table, collapsible  
**Empty state**: "No Available Data"

### 6. Lead Status
**Type**: Form (not read-only)  
**Fields**:
- **Status**: dropdown (e.g., "Application Pending")
- **Transaction Type**: read-only field (e.g., "New Business")
- **Notes**: textarea
- **Button**: "Change Status"

### 7. E-COM Details
**DOM**: `div.grid.sm:grid-cols-2` rows

| Field | Example |
|-------|---------|
| PLAN NAME | Regional - General |
| PROVIDER NAME | Cigna Insurance |
| PAYMENT STATUS | N/A |
| AUTHORISED AT | N/A |
| PAID AT | N/A |
| NETWORK | N/A |
| TOTAL PRICE (with VAT) | 15,188.67 |
| CO-PAY / CO-INSURANCE | 20% max AED 100 per visit |
| PLAN TYPE | Best |

### 8. Available Plans
**Type**: Table, paginated (15 per page, 437 total)  
**Columns**: `checkbox | Provider Name | Plan Name | Plan Type | Network Provider | CO-PAY/CO-INSURANCE | Price | Total Indicative Price (with VAT) | Action`  
**Note**: Some plans tagged **Hidden** (red badge)

### 9. Manage Payments
**Button**: "Add Manual Payment"  
**Columns**: `PAYMENT NO | PAYMENT REF ID | COLLECTION DATE | DUE DATE | PAYMENT METHOD | PRICE(WITHOUT VAT) | VAT | TOTAL PRICE | DISCOUNT VALUE | TOTAL AMOUNT | COLLECTED AMOUNT | PAYMENT STATUS | PAYMENT ALLOCATION STATUS | Actions`

### 10. Embedded Products
**Type**: Table, collapsible  
**Columns**: `Product Reference ID | Product/Service | Price with VAT | Payment Captured date | Payment Status | Api Status | Sage AR Receipt ID | Sage Status | Actions`

### 11. Email Status
**Columns**: `# | Id | Email Subject | Email Address | Status | Reason | Template Id | Customer Id | Created At | Updated At`

### 12. Policy Details
**Type**: Form fields (all editable, marked with *)

| Field | Type |
|-------|------|
| POLICY NUMBER* | text input |
| ISSUANCE DATE* | date (pre-filled today) |
| PRICE (VAT NOT APPLICABLE)* | number |
| START DATE* | date |
| PRICE (VAT APPLICABLE)* | number |
| EXPIRY DATE* | date |
| TOTAL VAT AMOUNT | number |
| TOTAL PRICE | number |
| INSURER QUOTE NUMBER | text input |
| ISSUANCE STATUS | dropdown |

### 13. Documents
**Button**: "Upload Documents"  
**Columns**: `Document Type | Document Name | Member | Created At | Created By | Action`

### 14. BOR (Broker on Record)
**Type**: Collapsible section  
**Empty state**: "No BOR requests yet" + **Create First BOR Request** button

### 15. Digital Consent
**Empty state**: "No digital consent logs yet"

### 16. Booking Details
**DOM**: `div.grid.sm:grid-cols-2` rows

| Field | Example |
|-------|---------|
| Booking Date | — |
| Invoice Description | — |
| Line of Business | Health |
| Transaction Payment Status | N/A |
| Sub Type | — |
| Insurer Invoice Date | (editable) |
| Broker Invoice No | — |
| Insurer Tax Invoice No | (editable) |
| Discount Value | — |
| Insurer Commission Tax Invoice No | (editable) |
| Commission(%) | 0% |
| Commission (VAT NOT APPLICABLE) | (editable) |
| VAT on Commission | — |
| Commission (VAT APPLICABLE) | (editable) |
| Total Commission | — |
| Branch | Dubai & Northern Emirates |

### 17. Commission Schedule
**Columns**: `Payment No | Payment Ref ID | Commission (without VAT) | VAT | Total Commission`

### 18. Lead Activities
**Button**: "Add Activity"  
**Columns**: `CLIENT NAME | LEAD STATUS | TITLE | FOLLOWUP DATE | ASSIGNED TO | DONE | ACTION`

### 19. Lead History
**Lazy-loaded**: Click **"Load History Data"** button to load

### 20. InstantAlfred Chat Logs
**Lazy-loaded**: Load on demand

### 21. FTC Tracking
**Columns**: `ID | EMAIL SUBJECT | EMAIL ADDRESS | STATUS | LINK | CREATED AT | UPDATED AT | ACTION`

### 22–26. Log Sections (All Lazy-Loaded)
- **API Logs** → Click "Load API Logs"
- **Audit Logs** → Click "Load Audit Logs"
- **KYC Audit Logs** → Click "Load KYC Audit Logs"
- **Health Routing Logs** → Click "Load Health Routing Logs"
- **OCR AI Logs** → Click "Load OCR Logs"

---

## Ready-to-Run Scripts

### READ: Get all grid fields (entire page)
```python
result = js("""
(() => {
  const rows = Array.from(document.querySelectorAll('div'))
    .filter(d => d.className && d.className.includes('grid') && d.className.includes('sm:grid-cols-2'));
  const out = {};
  rows.forEach(row => {
    const label = row.children[0]?.textContent.trim();
    const value = row.children[1]?.textContent.trim();
    if (label) out[label] = value || '';
  });
  return out;
})()
""")
import json
fields = json.loads(result) if isinstance(result, str) else result
# Access: fields['MOBILE NUMBER'], fields['FIRST NAME'], etc.
```

### READ: Get one specific field
```python
def get_field(name):
    val = js(f"""
Array.from(document.querySelectorAll('div'))
  .filter(d => d.className && d.className.includes('grid') && d.className.includes('sm:grid-cols-2'))
  .find(row => row.children[0]?.textContent.trim() === '{name}')
  ?.children[1]?.textContent.trim() || ''
""")
    return val

# Usage:
mobile = get_field('MOBILE NUMBER')
dob = get_field('DATE OF BIRTH')
```

### READ: Get Lead Status
```python
status = js("""
(() => {
  const selects = document.querySelectorAll('select');
  return Array.from(selects).map(s => ({
    value: s.value,
    text: s.options[s.selectedIndex]?.text,
  }));
})()
""")
print(status[0])  # {value: '...', text: 'Application Pending'}
```

### READ: Get Member Details table
```python
members = js("""
(() => {
  const headers = ['Member Name','Policy PEC Flag','Gender','DOB','Relation','Nationality','Emirate of Visa','Member Category'];
  const rows = Array.from(document.querySelectorAll('tr')).slice(1);
  return rows.map(row => {
    const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
    const obj = {};
    headers.forEach((h, i) => obj[h] = cells[i] || '');
    return obj;
  }).filter(r => r['Member Name']);
})()
""")
print(members)  # [{Member Name: '...', ...}, ...]
```

### READ: Get All Available Plans (with pagination)
```python
import json, time

all_plans = []
page = 1

while True:
    # Extract current page
    plans = js("""
    (() => {
      const rows = Array.from(document.querySelectorAll('table tr')).slice(1);
      return rows.map(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        return {
          provider: cells[0]?.textContent.trim(),
          plan_name: cells[1]?.textContent.trim(),
          plan_type: cells[2]?.textContent.trim(),
          network: cells[3]?.textContent.trim(),
          copay: cells[4]?.textContent.trim(),
          price: cells[5]?.textContent.trim(),
          total_with_vat: cells[6]?.textContent.trim(),
          hidden: !!cells[0]?.querySelector('[class*="Hidden"], .bg-red-100')
        };
      }).filter(r => r.provider);
    })()
    """)
    page_data = json.loads(plans) if isinstance(plans, str) else plans
    all_plans.extend(page_data)
    print(f"Page {page}: {len(page_data)} plans (total: {len(all_plans)})")
    
    # Check for next page
    has_next = js("""
    (() => {
      const btns = Array.from(document.querySelectorAll('button, [role="button"]'));
      const nextBtn = btns.find(b => b.textContent.trim() === '>' || b.getAttribute('aria-label') === 'Next page');
      return nextBtn && !nextBtn.disabled && !nextBtn.getAttribute('disabled');
    })()
    """)
    
    if not has_next or not page_data:
        break
    
    # Click next
    js("""
    (() => {
      const btns = Array.from(document.querySelectorAll('button, [role="button"]'));
      const nextBtn = btns.find(b => b.textContent.trim() === '>' || b.getAttribute('aria-label') === 'Next page');
      if (nextBtn) nextBtn.click();
    })()
    """)
    time.sleep(1)
    page += 1

print(f"\nTotal: {len(all_plans)} plans")
# Filter visible: visible_plans = [p for p in all_plans if not p['hidden']]
```

### READ: Get Lead Activities
```python
activities = js("""
(() => {
  const headers = ['CLIENT NAME','LEAD STATUS','TITLE','FOLLOWUP DATE','ASSIGNED TO'];
  const tables = document.querySelectorAll('table');
  let targetTable = null;
  tables.forEach(t => {
    if (t.textContent.includes('FOLLOWUP DATE')) targetTable = t;
  });
  if (!targetTable) return [];
  return Array.from(targetTable.querySelectorAll('tr')).slice(1).map(row => {
    const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
    const obj = {};
    headers.forEach((h,i) => obj[h] = cells[i] || '');
    return obj;
  }).filter(r => r['CLIENT NAME']);
})()
""")
print(activities)
```

### READ: Get Payments
```python
payments = js("""
(() => {
  const headers = ['PAYMENT NO','PAYMENT REF ID','COLLECTION DATE','DUE DATE','PAYMENT METHOD','PRICE(WITHOUT VAT)','VAT','TOTAL PRICE','DISCOUNT VALUE','TOTAL AMOUNT','COLLECTED AMOUNT','PAYMENT STATUS','PAYMENT ALLOCATION STATUS'];
  const tables = document.querySelectorAll('table');
  let targetTable = null;
  tables.forEach(t => {
    if (t.textContent.includes('PAYMENT REF ID') && t.textContent.includes('COLLECTION DATE')) targetTable = t;
  });
  if (!targetTable) return [];
  return Array.from(targetTable.querySelectorAll('tr')).slice(1).map(row => {
    const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
    const obj = {};
    headers.forEach((h,i) => obj[h] = cells[i] || '');
    return obj;
  }).filter(r => r['PAYMENT NO']);
})()
""")
print(payments)
```

### READ: Get Email Status
```python
emails = js("""
(() => {
  const headers = ['#','Id','Email Subject','Email Address','Status','Reason','Template Id','Customer Id','Created At','Updated At'];
  const tables = document.querySelectorAll('table');
  let targetTable = null;
  tables.forEach(t => {
    if (t.textContent.includes('Email Subject') && t.textContent.includes('Template Id')) targetTable = t;
  });
  if (!targetTable) return [];
  return Array.from(targetTable.querySelectorAll('tr')).slice(1).map(row => {
    const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
    const obj = {};
    headers.forEach((h,i) => obj[h] = cells[i] || '');
    return obj;
  }).filter(r => r['Email Subject']);
})()
""")
print(emails)
```

### READ: Get Documents
```python
docs = js("""
(() => {
  const headers = ['Document Type','Document Name','Member','Created At','Created By'];
  const tables = document.querySelectorAll('table');
  let targetTable = null;
  tables.forEach(t => {
    if (t.textContent.includes('Document Name') && t.textContent.includes('Document Type')) targetTable = t;
  });
  if (!targetTable) return [];
  return Array.from(targetTable.querySelectorAll('tr')).slice(1).map(row => {
    const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
    const obj = {};
    headers.forEach((h,i) => obj[h] = cells[i] || '');
    return obj;
  }).filter(r => r['Document Name']);
})()
""")
print(docs)
```

### READ: Load lazy-loaded logs
```python
import time

def load_logs(button_text):
    clicked = js(f"""
    (() => {{
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.textContent.includes('{button_text}'));
      if (btn && !btn.disabled) {{ btn.click(); return true; }}
      return false;
    }})()
    """)
    if clicked:
        time.sleep(2)
    return clicked

# Load and extract:
if load_logs("Load API Logs"):
    # Now extract API logs table...
    pass
```

---

## Write / Action Scripts

### WRITE: Change Lead Status
```python
import time

# 1. Set status dropdown
js("""
(() => {
  const selects = Array.from(document.querySelectorAll('select'));
  const statusSelect = selects[0];
  const targetStatus = 'Application Pending';  // CHANGE THIS
  const option = Array.from(statusSelect.options).find(o => o.text === targetStatus);
  if (option) {
    statusSelect.value = option.value;
    statusSelect.dispatchEvent(new Event('change', {bubbles: true}));
  }
})()
""")
time.sleep(0.5)

# 2. Add notes (optional)
js("""
const textarea = document.querySelector('textarea');
if (textarea) {
  textarea.value = 'Status updated';  // CHANGE THIS
  textarea.dispatchEvent(new Event('input', {bubbles: true}));
}
""")
time.sleep(0.3)

# 3. Click Change Status
js("""
const btns = Array.from(document.querySelectorAll('button'));
const btn = btns.find(b => b.textContent.trim() === 'Change Status');
if (btn) btn.click();
""")
time.sleep(1)
capture_screenshot("status_changed.png")
```

### WRITE: Add Activity
```python
import time

# Click Add Activity button
js("""
const btns = Array.from(document.querySelectorAll('button'));
const btn = btns.find(b => b.textContent.trim() === 'Add Activity');
if (btn) btn.click();
""")
time.sleep(0.5)
capture_screenshot("activity_modal.png")
# Fill fields in modal (screenshot first to see layout)
```

### WRITE: Upload Document
```python
import time

# Click Upload Documents button
js("""
const btns = Array.from(document.querySelectorAll('button'));
const btn = btns.find(b => b.textContent.includes('Upload Documents'));
if (btn) btn.click();
""")
time.sleep(0.5)
capture_screenshot("upload_modal.png")
# Use upload_file() to attach documents
```

### WRITE: Add Manual Payment
```python
import time

js("""
const btns = Array.from(document.querySelectorAll('button'));
const btn = btns.find(b => b.textContent.trim() === 'Add Manual Payment');
if (btn) btn.click();
""")
time.sleep(0.5)
capture_screenshot("payment_modal.png")
```

### WRITE: Open Edit Mode
```python
import time

# Click top-right Edit button
js("""
const btns = Array.from(document.querySelectorAll('button'));
const btn = btns.find(b => b.textContent.trim() === 'Edit');
if (btn) btn.click();
""")
time.sleep(0.5)
capture_screenshot("edit_mode.png")
```

---

## Agent Tips

1. **Don't screenshot for data** — use the JS scripts above. Instant, no wasted tokens.
2. **Sections collapse by default** — count=0 doesn't mean empty. Click chevron (^) to expand and re-extract.
3. **Available Plans is paginated** — 437 total, 15 per page. Use the pagination script.
4. **Lazy-loaded logs** — click "Load X Logs" first, wait 2 seconds, then extract.
5. **Edit fields** — use `.value` to read/write, then `dispatchEvent(new Event('input', {bubbles:true}))` to notify React.
6. **After write actions** — always screenshot to confirm success.
7. **KYC badge** — in Customer Profile section, top-right corner.
8. **Stale badge** — next to page title; shows days since last activity.
9. **Hidden plans** — tagged red in Available Plans; filter with `not p['hidden']`.
10. **URL pattern** — `{REF_ID}` extracted from page breadcrumb or use the open lead's ID.
