# Needs More Work

The project is a **static design mockup / prototype** — visually complete but functionally limited. Below is everything that needs work, organized by priority.

---

## 🔴 Critical — Needs Backend / Data Layer

| Gap | Details |
|-----|---------|
| **No database** | All data is hardcoded in the HTML. No real clients, policies, leads, or tasks. |
| **No authentication** | No login screen, no user roles (agent vs. manager vs. admin). |
| **No CRUD operations** | Can't add, edit, or delete contacts, tasks, policies, or leads. |
| **No real data** | KPI numbers, monthly history, lead counts, contacts — all sample data. |
| **No API integration** | Nothing connects to an external system or backend service. |

---

## 🟡 High Priority

| Gap | Details |
|-----|---------|
| **Search not wired** | The search box in the header is decorative — it doesn't filter anything. |
| **Add Contact / Task modals** | Buttons exist but open no forms. No way to create real data. |
| **No commission engine** | Commissions are hardcoded — no calculation logic for splits, tiers, or referral fees. |
| **No real-time updates** | Activity feed is static HTML. No live data, no WebSocket/polling. |
| **No data export** | Export button exists but does nothing. |
| **Mobile navigation missing** | Sidebar is hidden below 992px but there's no hamburger menu to toggle it back. |
| **No sorting / filtering** | Client table, contacts list, tasks, and pipeline can't be sorted or filtered. |
| **No form validation** | No input handling whatsoever. |
| **No loading states** | No skeleton screens, spinners, or progress indicators anywhere. |
| **No error states** | No empty states, error messages, or fallback UI for any component. |

---

## 🟢 Nice-to-Have

| Gap | Details |
|-----|---------|
| **Proper charting library** | Current bars are pure CSS — no tooltips, no animation, no interactivity. Chart.js would be ideal. |
| **Dedicated Policy Management** | Policies only appear inside contact cards. Needs its own page with lifecycle tracking. |
| **Calendar view** | For renewals, task due dates, and client meetings. |
| **Email integration** | Click-to-send from contact cards. |
| **SMS / WhatsApp integration** | Common communication channel for UAE insurance. |
| **Reports & Analytics page** | Deeper data visualization — trends, projections, agent performance. |
| **Notifications system** | Bell icon is decorative — no real alerts or notification list. |
| **Lead scoring** | Prioritization logic for the pipeline. |
| **Activity audit log** | No history of who changed what or when. |
| **Dark mode refinement** | Some edge cases could use better contrast and polish. |
| **Task state persistence** | Checkboxes reset on page refresh — no localStorage save. |
| **Policy renewal reminders** | No alerts or notifications for upcoming renewals. |
| **Bulk actions** | Can't select multiple contacts or tasks for batch operations. |
| **Advanced pipeline drag & drop** | Moving leads between stages visually would be ideal. |

---

## Known Issues

| Issue | Notes |
|-------|-------|
| Sidebar disappears on tablet/mobile | No toggle to bring it back — makes navigation impossible on small screens |
| Contact expand/collapse is class-based | Works fine for 48 contacts but would need virtualization for 500+ |
| Task checkboxes visual-only | No state persistence — refresh resets all checkboxes |
| Chart hover labels don't auto-position | Hardcoded position, may overlap on small screens |
| "View All" and "Add" links are non-functional | All action links in card headers go to `#` — no routing |
| No favicon | Browser tab shows default icon |
| No page title suffix | All pages show "InsureCRM — Dashboard" regardless of active page |
| Search input is purely decorative | No JavaScript event listener attached |

---

## Suggested Next Steps (Ranked)

| # | Step | Why |
|---|------|-----|
| 1 | **Mount a data layer** | JSON file or IndexedDB for now, then migrate to Firebase / Supabase / custom backend |
| 2 | **Build modal system** | Add Contact, Add Task, Edit Policy — the most basic CRUD forms |
| 3 | **Wire search + filters** | Client-side filtering on contacts and leads — quick win, big usability impact |
| 4 | **Add login screen** | Simple email/password or Google OAuth — without this, nothing is secure |
| 5 | **Commission engine** | Input rate cards → auto-calculate commissions from premium data |
| 6 | **Replace emoji icons → SVG** | Use Lucide or Heroicons for consistent, professional iconography |
| 7 | **Mobile navigation** | Slide-out drawer or hamburger menu for small screens |
| 8 | **Live charts (Chart.js)** | Interactive historical data with tooltips, zoom, and animations |
| 9 | **Policy lifecycle** | Renewal reminders, lapse tracking, document upload per policy |
| 10 | **Deployment** | Package as PWA or integrate into the agency's existing system |

---

*Last updated: June 1, 2026*
