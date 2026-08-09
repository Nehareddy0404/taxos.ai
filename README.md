<div align="center">

# ✨ TaxOS.ai — AI-Powered Tax Platform

**Designing an AI-Powered Tax Platform From Scratch**  
*AI Engineer Candidate Case Study Submission*

![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite 5](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/33_Tests_Passing-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Live Demo](https://img.shields.io/badge/Live_Demo-Active-success?style=for-the-badge)

</div>

---

## 🌐 Live Prototype & Submission

- 🔗 **Working Deployed Prototype**: [http://taxos-ai-platform.surge.sh](http://taxos-ai-platform.surge.sh)
- 🐙 **GitHub Repository**: [https://github.com/Nehareddy0404/taxos.ai](https://github.com/Nehareddy0404/taxos.ai)
- 🧪 **Test Suite**: 33 passing unit tests (`npm test`)

---

## 📌 Platform Overview

**TaxOS.ai** is an interactive, production-grade web application engineered for the **AI Engineer Case Study: Designing an AI-Powered Tax Platform From Scratch**.

It resolves the core design tensions of a modern tax platform: traceability, contextual collaboration, first-run orientation, navigation preserving context, role-aware experiences, clear return progress, decision-oriented dashboards, visual interaction affordances, scale disclosure, and trustworthy AI.

---

## 🎯 Architecture & Features

### 1. 🔍 Source Document Traceability Engine
- Trace every tax return line item (Form 1040, Schedule B, C, D, etc.) back to its source document (W-2, 1099-INT, 1099-DIV, Schedule C expense ledger).
- Displays exact page numbers, interactive bounding box overlays on source PDF canvas, and mathematical derivation formulas (e.g. `Form W-2 Primary ($142,500) + Form W-2 Spouse ($88,000) = $230,500`).

### 2. 💬 Client & CPA Contextual Communication Hub
- Unified message threads anchored directly to tax documents and return fields.
- Visually separates **🔒 Internal Firm Notes** (yellow/amber tint, firm-only visibility) from **🌐 Client Messages** (cyan tint).
- Tracks next-action ownership (`Waiting on Client` vs `Waiting on CPA`).

### 3. 🚀 10-Second First-Run Client Onboarding
- Simplified taxpayer portal surfacing the single #1 urgent task upfront (e.g. *"Upload Coinbase 1099-B PDF"*) within 2 seconds of logging in.
- Defers non-essential modules until onboarding completion. Includes a 1-click toggle to demonstrate post-onboarding portal transformation.

### 4. 🔗 Context-Preserving Connected Objects Navigation
- Sticky hierarchical breadcrumb navigator (`Clients > Sarah Jenkins > Schedule C > 1099-NEC > Thread #4`).
- Interactive Connected Object Relational Graph (`Tax Return Field` ↔ `Source Document` ↔ `Action Task` ↔ `Chat Thread`) with simulated deep links.

### 5. 👥 Role-Aware Architecture (6 Roles)
- Single cohesive shell adapting across 6 user roles: *Tax Preparer*, *Tax Reviewer/Manager*, *Individual Taxpayer*, *Business Owner Client*, *Firm Administrator*, and *Seasonal Staff*.
- Includes a **Dual-Identity Switcher** to demonstrate how a firm employee accesses their personal return without internal firm context leaks.

### 6. 📊 Shared Mental Model Progress Pipeline
- Dual-audience status pipeline:
  - **Client View**: 4 simplified milestones (*Gathering Docs* → *In Preparation* → *Your Review* → *Filed*).
  - **Firm View**: 6 granular internal stages with blocker tags (*"Missing Coinbase 1099-B"*) and next-action ownership.

### 7. ⚡ Actionable Decision-Oriented CPA Dashboard
- Priority queue ranking client returns by SLA deadline, risk score, and blocker urgency.
- Includes a **Scale Mode Simulator** to test real-time prioritization across 120+ client returns.

### 8. ✨ Interaction Affordance System
- Enforces 5 distinct visual affordance tokens: ✏️ *Editable Field*, ✨ *AI-Generated Value* (purple glow + confidence hover), ✅ *Verified Value* (emerald checkmark), ⚠️ *Requires Approval* (amber highlight), and 🔒 *Locked/Read-Only* (slate gray + hover reason). Includes an interactive playground.

### 9. 📦 Progressive Disclosure Explorer (150+ Line Items)
- Progressive disclosure hierarchy for complex returns containing 150+ items and documents.
- Multi-level disclosure (Summary Cards → Category Breakdowns → Field Rows → Micro-details), instant search, and layout density controls (*Comfortable* vs *Compact*).

### 10. 🤖 Trustworthy AI Evidence & Inspector
- AI Transparency & Inspector drawer presenting **What AI did**, **Why (Reasoning chain)**, **Supporting Evidence**, **Uncertainty Rating** (e.g. 78% confidence warning), and an **Inline Correction Workflow** that logs manual overrides to the audit trail.

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
# Builds production bundle
npm run build
```

---

## 📝 What's Real vs. Simulated (Case Study Note)

- **Real in Frontend**:
  - Full interactive React 19 state machine & UI components.
  - Multi-factor SLA prioritization ranking logic (`taxEngine.js`).
  - Interactive PDF bounding box highlight overlays & transformation formula renderer.
  - Internal firm note vs client message visibility filtering.
  - 6-role permission matrix & shell layout density adaptation.
  - Inline AI value correction modal & live audit trail logger.
  - Instant text search across 150+ return items.
  - 33 passing unit tests & 100% clean production build.
- **Simulated Behind Scenes**:
  - Document OCR extraction & LLM reasoning outputs use structured JSON responses.

---

*TaxOS.ai — Designed and built for the AI Engineer Candidate Evaluation.*
