# 📄 TaxOS.ai — AI-Powered Tax Platform Case Study Submission

**Candidate Submission:** AI Engineer Case Study  
**Platform Name:** TaxOS.ai (Designing an AI-Powered Tax Platform From Scratch)  
**Live Working Prototype:** http://taxos-ai-platform.surge.sh  
**Test Suite:** Passing Unit Tests (`npm test`)  

---

## 🌟 Executive Overview & Approach

TaxOS.ai is a next-generation, greenfield tax platform engineered to address the **10 core product challenges** outlined in the AI Engineer Case Study. Built with React 19, Vite, and a custom HSL design system, the platform balances deep professional CPA workflows with approachable, friction-free client experiences.

### Key Highlights
- **10/10 Case Study Challenges Solved**: Fully interactive, clickable prototype covering Traceability, Collaboration, Onboarding, Navigation Graphs, 6-Role Switcher, Status Pipelines, Actionable Dashboards, Interaction Affordances, Scale Explorer (150+ items), and Trustworthy AI Inspectors.
- **Dual Mental Model Architecture**: Adapts information density, permission boundaries, and terminology dynamically based on whether the user is a CPA Partner, Tax Preparer, Individual Taxpayer, Business Owner, Administrator, or Seasonal Staff member.

---

## 🗺️ Challenge Implementation Matrix (01 - 10)

| # | Challenge Name | Implementation & Design Decisions | Real vs. Simulated |
|---|---|---|---|
| **01** | **Source Document Traceability** | Interactive split-screen linking tax return line items directly to source PDFs (W-2, 1099-INT, 1099-DIV, Schedule C Expense PDF). Displays exact page numbers, bounding box overlays, and mathematical derivation formulas (e.g. `Primary W-2 + Spouse W-2 = $230,500`). | **Real:** Interactive bounding box renderer, formula parser, field state updates.<br>**Simulated:** OCR text extraction is mock JSON. |
| **02** | **Client & CPA Collaboration** | Contextual conversation threads anchored to specific document pages or return fields. Explicit visual distinction between **🔒 Internal Firm Notes** (yellow/amber tint, firm-only visibility) and **🌐 Client Messages** (blue tint, visible to taxpayer). Tracks next-action owner (`Waiting on Client` vs `Waiting on CPA`). | **Real:** Message state updates, internal/external visibility filtering, request owner pills.<br>**Simulated:** Chat backend. |
| **03** | **Where to Start (10s Onboarding)** | First-run client portal that surfaces the single #1 urgent action upfront (e.g., "Upload Coinbase 1099-B PDF") within 2 seconds of logging in. Non-essential modules are deferred until onboarding completion. Includes a 1-click toggle to demonstrate post-onboarding transformation. | **Real:** Interactive 3-step onboarding wizard, file drag-and-drop handler, portal mode transformer.<br>**Simulated:** File upload storage. |
| **04** | **Getting Lost in the App** | Context-preserving navigation system with sticky hierarchical breadcrumbs (`Clients > Sarah Jenkins > Schedule C > 1099-NEC > Thread #4`), an interactive Connected Object Relational Graph, and deep-link URL simulation. | **Real:** History navigation stack, cross-object jump shortcuts, breadcrumb updates.<br>**Simulated:** Browser URL routing. |
| **05** | **Role-Aware Experiences** | Single cohesive product shell adapting seamlessly across 6 distinct roles: *Tax Preparer*, *Tax Reviewer/Manager*, *Individual Taxpayer*, *Business Owner Client*, *Firm Administrator*, and *Seasonal Staff*. Includes a **Dual-Identity Switcher** to demonstrate how a CPA employee views firm workload vs. their personal return without context leaks. | **Real:** Role permission matrix engine, dynamic feature flag toggles, shell adaptation.<br>**Simulated:** Live authentication. |
| **06** | **Return Status & Progress** | Dual-audience status pipeline: **Client View** shows 4 simplified milestones (*Gathering Docs* → *In Preparation* → *Your Review* → *Filed*); **Firm View** displays 6 detailed internal stages with blocker tags (*"Missing Coinbase 1099-B"*) and next-action ownership. | **Real:** Status calculation algorithm, blocker resolution logic, audience view transformer.<br>**Simulated:** IRS E-file gateway. |
| **07** | **An Actionable Dashboard** | CPA landing page organized around decision-making and immediate action queues rather than static reporting graphs. Ranks client returns by SLA deadline, risk score, and blocker urgency. Features a **Scale Mode Simulator** to test prioritization across 120+ client returns. | **Real:** Multi-factor priority ranking algorithm (`taxEngine.js`), real-time search & filter.<br>**Simulated:** Live database query. |
| **08** | **Clickable vs. Editable Affordances** | Comprehensive visual design system enforcing 5 distinct affordance tokens: ✏️ *Editable Field*, ✨ *AI-Generated Value* (purple glow + confidence score), ✅ *Verified Value* (emerald checkmark), ⚠️ *Requires Approval* (amber highlight), and 🔒 *Locked/Read-Only* (slate gray + hover reason). Includes an interactive playground. | **Real:** Complete CSS design system, affordance state toggles, tooltip reason popovers.<br>**Simulated:** None (100% functional UI system). |
| **09** | **Complexity Made Navigable** | Progressive disclosure accordion hierarchy for complex returns containing 150+ line items and documents. Multi-level disclosure (Summary Cards → Category Breakdowns → Field Rows → Micro-details), instant search, and layout density controls (*Comfortable* vs *Compact*). | **Real:** Instant search over 150+ items, multi-level disclosure tree, density toggle.<br>**Simulated:** Backend query pagination. |
| **10** | **Trustworthy AI** | AI Transparency & Inspector drawer presenting **What the AI did**, **Why it made the recommendation (Reasoning Chain)**, **Supporting Evidence**, **Uncertainty Rating** (e.g. 78% confidence warning), and an **Inline Correction Workflow** that appends manual overrides to the audit trail. | **Real:** Reasoning chain renderer, inline value correction modal, audit trail logger.<br>**Simulated:** LLM inference call (uses structured JSON output). |

---

## 🏗️ Architecture & Code Organization

```
taxos.ai/
├── src/
│   ├── App.jsx                    # Main application shell & state coordinator
│   ├── index.css                  # Comprehensive CSS design system (tokens, themes, animations)
│   ├── components/
│   │   ├── Navigation.jsx         # Header nav, role switcher, dual-identity toggle, search
│   │   ├── TraceabilityView.jsx   # Source traceability & PDF bounding box inspector
│   │   ├── CollaborationHub.jsx   # Contextual threads (Firm notes vs Client messages)
│   │   ├── ClientOnboarding.jsx   # 10-second first-run client experience
│   │   ├── ContextNavGraph.jsx    # Connected object graph & breadcrumbs
│   │   ├── RoleArchitect.jsx      # 6-role permission matrix & shell transformer
│   │   ├── ReturnStatusTracker.jsx# Dual-view status pipeline & blocker tracker
│   │   ├── CPADashboard.jsx       # Actionable priority queue & SLA score ranking
│   │   ├── AffordanceSystem.jsx   # Visual affordances system & state playground
│   │   ├── ScaleExplorer.jsx      # Progressive disclosure over 150+ return items
│   │   └── TrustworthyAI.jsx      # AI reasoning inspector & inline correction modal
│   ├── data/
│   │   └── mockTaxData.js         # Synthetic tax return, document, thread & AI inspection data
│   └── utils/
│       ├── taxEngine.js           # Pure computational logic (prioritization, search, perms)
│       └── taxEngine.test.js      # Vitest unit test suite (33 passing tests)
├── package.json
└── vite.config.js
```

---

## ⚡ Quick Start & Verification

### Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Launch Vite development server
npm run dev

# 3. Open browser at http://localhost:5173
```

### Running Test Suite
```bash
# Runs Vitest unit tests (33 tests)
npm test
```

### Production Build
```bash
# Validates production bundle compilation
npm run build
```

---

## 🎥 Reviewer Guide

1. **Role Switcher**: Select *Individual Taxpayer* from the **View As Role** dropdown in the navigation bar to experience how the entire UI shell simplifies for clients.
2. **Dual Identity Toggle**: As a Tax Preparer, click **My Personal 2025 Return** to see how internal firm notes are automatically hidden to prevent self-audit context leaks.
3. **Scale Mode**: In the Action Dashboard tab, check **Scale Mode** to test real-time prioritization across 120+ client returns.
4. **AI Reasoning**: In the Traceability tab, click **AI Transparency Breakdown** on Qualified Dividends to inspect the 5-step reasoning chain, 78% confidence score, and inline correction workflow.

---

*TaxOS.ai — Designed & Built for the AI Engineer Case Study.*
