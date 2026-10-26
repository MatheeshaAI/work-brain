# Breakdown — Everything Built

## Round 1: Initial Dashboard

The first deliverable was a single-page CRM dashboard with:

### KPI Cards (3)
- **Renewals**: 48 renewals this month
- **Premiums**: $84,250 collected
- **Commissions**: $16,850 earned

All with percentage change vs. last month.

### Lead Pipeline
- Total leads: 284
- Active leads: 196
- 5-stage pipeline bar + stage breakdown:
  - New Leads (62 — 22%)
  - Contacted (80 — 28%)
  - Qualified (51 — 18%)
  - Proposal Sent (57 — 20%)
  - Closed-Won (34 — 12%)

### Pending Tasks
6 sample tasks with:
- Checkboxes (visual toggle)
- Priority tags: High, Med, Low
- Due dates

### Activity Feed
Recent actions with timestamps (12 min ago → 3 hr ago).

### Recent Clients Table
5 clients with name, policy type, status badge, and premium amount.

### Sidebar Navigation
Full sidebar: Dashboard, Leads, Renewals, Policies, Premiums, Commissions, Tasks, Profile, Settings.

---

## Round 2: AED Currency + Dark/Light Mode

### Currency Change
All values converted from USD to AED throughout the entire dashboard — KPI cards, client table, activity feed.

### Dark Mode
Full dark theme implemented using CSS custom properties:
- Every color, background, border, and text shade has a light and dark variant
- Dark theme activates via `[data-theme="dark"]` on the `<html>` element
- Smooth 0.3s transitions on all themed properties

### Theme Toggle
- Moon/sun button in the top-right header
- Click toggles between light and dark instantly
- Preference saved to `localStorage` — persists across page reloads

---

## Round 3: Targets, History, Contacts

### Renewal Premium
The Renewals KPI card was enhanced to show the premium generated from renewals:
- **48 renewals** + **AED 32,400 renewal premium**

### Monthly Targets (Office Goals)
Two office targets tracked with progress bars:

| Target | Current | Goal | Progress |
|--------|---------|------|----------|
| Premiums | AED 84,250 | AED 200,000 | 42% |
| Commissions | AED 16,850 | AED 20,000 | 84% |

Each target shows:
- Visual progress bar with percentage label
- Remaining amount
- Status message ("On track ✓" / "Almost there! 🔥")

A fourth KPI card shows the combined office target progress at 42%.

### Monthly History Chart
A 6-month bar chart showing Premiums + Commissions:
- Jan → Jun 2026 trending upward
- Premiums: 45k → 84k
- Commissions: 10k → 16.8k
- CSS-based bars with legend and hover labels

### Contacts Page
A separate page accessible from the sidebar:

**48 clients** displayed as expandable accordion cards.

Each card's **collapsed view** shows:
- Name, Email, Phone, Location

Each card's **expanded view** shows:
- Date of Birth
- Nationality
- Occupation
- Client Since date
- Last Contact date
- Total Premium paid
- **All policies** with:
  - Policy type (Auto / Home / Life / Health)
  - Policy number
  - Coverage details
  - Annual premium
  - Status badge (Active / Renewed / Pending)

### Page Navigation
Simple JS-based page switching:
- Click sidebar link → switches between Dashboard and Contacts
- Active page highlighted in sidebar
- Header title updates dynamically

---

## Design & Architecture

### Tech Stack
- **Vanilla HTML/CSS/JS** — zero dependencies, one file, opens in any browser
- **Inter font** via Google Fonts
- **CSS Grid + Flexbox** layout, responsive down to mobile

### Design System
- CSS custom properties for all colors and spacing
- Full light/dark theme via variable overrides
- 12px–32px type scale with consistent font weights
- 4px/8px spacing rhythm

### File Structure

```
InsureCRM/
├── index.html          ← The complete dashboard
├── InsureCRM.md        ← Overview
├── Original Idea.md    ← Original requirements
├── Breakdown.md        ← This file — everything built
└── Needs More Work.md  ← Gaps and next steps
```
