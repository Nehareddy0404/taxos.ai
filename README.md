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

> [!IMPORTANT]
> **Candidate Case Study Alignment: "What Good Looks Like"**  
> This project directly addresses all grading criteria specified in the case study:
> - **Real, Working Interface**: 100% interactive React application with zero static images.
> - **Thoughtful, Defensible Design Decisions**: Concise technical rationale provided for every feature.
> - **Rich Data & Edge Cases**: 150+ navigable line items, dual-identity edge cases, low-confidence warnings, and a 120-return scale simulator.
> - **Real vs. Simulated Transparency**: Explicit breakdown of frontend execution vs. mocked backend stubs.

---

## 🌐 Quick Links

- 🔗 **Live Working Prototype**: [http://taxos-ai.surge.sh](http://taxos-ai.surge.sh)  
- 🐙 **GitHub Repository**: [https://github.com/Nehareddy0404/taxos.ai](https://github.com/Nehareddy0404/taxos.ai)  
- 🧪 **Test Suite**: 33 passing unit tests (`npm test`)

---

## 🎯 Case Study Evaluation Criteria ("What Good Looks Like")

### 1. Real, Working Interface
- Built as a clickable, responsive React 19 application.
- All 10 challenges are fully testable in the browser with real state updates, search filtering, tab navigation, modals, and role switches.

### 2. Defensible Design Decisions & Rationale

| Feature Area | Core Tension | Defensible Design Decision & Rationale |
|---|---|---|
| **Source Traceability** | Black-box AI vs CPA Trust | **Side-by-Side PDF Canvas**: Clicking any tax field overlays an interactive bounding box on the source PDF with mathematical transformation formulas (`W-2 Primary + Spouse = $230,500`). CPAs verify derivations instantly without manual re-calculation. |
| **CPA Collaboration** | Client Leaks vs Fragmented Communication | **Strict Contextual Separation**: Internal firm notes (🔒 amber tint) are isolated from client-visible messages (🌐 cyan tint) at the data layer, preventing accidental disclosure of internal strategy. |
| **First-Run Onboarding** | Blank Screen vs Cognitive Overload | **10-Second Next-Action Focal Point**: Surfaces the single #1 urgent action upfront ("Upload Coinbase 1099-B PDF") within 2 seconds. Non-essential schedules are deferred until onboarding completion. |
| **Role Architecture** | Splintered Products vs One App Shell | **Role-Matrix Adaptive Shell**: 1 product shell adapting across 6 user roles (*Tax Preparer*, *Reviewer*, *Individual Taxpayer*, *Business Owner*, *Admin*, *Seasonal Staff*) with dynamic permission boundaries. |
| **Return Progress** | Ambiguous Status Labels | **Dual Mental Model Pipeline**: Clients see 4 simplified milestones (*Gathering Docs* → *In Preparation* → *Your Review* → *Filed*); CPAs view 6 detailed internal workflow stages with blocker ownership tags. |
| **Action Dashboard** | Passive Charts vs Work Prioritization | **Decision-Oriented Priority Queue**: Ranks returns by SLA deadline, risk score, and blocker urgency (`taxEngine.js` algorithm), answering "what should I work on right now?". |
| **Interaction Affordances** | Confusing Input Affordances | **5-Token Visual Language**: ✏️ *Editable Field*, ✨ *AI-Generated Value*, ✅ *Verified Value*, ⚠️ *Requires Approval*, and 🔒 *Locked/Read-Only* (with hover reason tooltip). |
| **Trustworthy AI** | Blind Trust vs AI Rejection | **AI Evidence Inspector & Inline Correction**: Displays 5-step reasoning chains, supporting evidence snippets, confidence ratings (e.g. 78%), and a non-disruptive inline correction modal that logs overrides to the audit trail. |

---

### 3. Edge Cases & Rich Test Data (Genuinely Testable)

To ensure the platform is genuinely testable beyond a single happy-path screen:

- 🧪 **Edge Case 1: Dual-Identity Firm Employee**  
  *Scenario:* CPA Alex Rivera has a personal tax return prepared in the same firm.  
  *Implementation:* Clicking **My Personal Return** automatically hides internal firm notes to prevent self-audit conflicts of interest.
- 🧪 **Edge Case 2: Low-Confidence Discrepancy Flagging**  
  *Scenario:* Line 3a Qualified Dividends extracted at 78% confidence.  
  *Implementation:* Surfaces foreign asset holding period audit warnings under IRC Section 1(h)(11) with recommended CPA action.
- 🧪 **Edge Case 3: Blocker Resolution & Ownership**  
  *Scenario:* Return status blocked by missing 1099-B cost basis.  
  *Implementation:* Explicitly tags action owner (*Client: Sarah*) and prevents E-file progression until resolved.
- 🧪 **Edge Case 4: Dashboard Scale Simulator**  
  *Scenario:* CPAs managing hundreds of returns.  
  *Implementation:* Toggle **Scale Mode** to test real-time SLA prioritization and instant text search across 120+ client returns.

---

### 4. 📝 What's Real vs. Simulated Behind the Scenes

> [!NOTE]
> **Behind the Scenes Architectural Breakdown**

#### ✅ Real in the Frontend Application:
- Full interactive React state machine & component hierarchy.
- Multi-factor SLA prioritization ranking algorithm (`taxEngine.js`).
- Interactive PDF bounding box highlight overlays & transformation formula parser.
- Internal firm note vs. client-visible message permission filtering.
- 6-role permission matrix & layout density transformer.
- Interactive AI confidence breakdown, risk warnings, inline value correction modal, and live audit trail logger.
- Instant full-text search across 150+ return items.
- 33 passing unit tests (`npm test`) & clean production build.

#### ⚙️ Simulated Behind the Scenes:
- Document OCR extraction & LLM reasoning outputs are structured JSON mocks (no live third-party API key required).
- IRS E-file transmission & live backend database queries.

---

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Launch Vite development server
npm run dev

# 3. Run unit test suite (33 tests passing)
npm test

# 4. Build production bundle
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

*TaxOS.ai — Designed & Built for the AI Engineer Candidate Evaluation.*
