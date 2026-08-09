// mockTaxData.js - Comprehensive sample dataset for TaxOS AI Platform Case Study

export const ROLES = [
  { id: 'preparer', name: 'Tax Preparer', badge: 'Firm Staff', icon: '📝', description: 'Deep document review, AI extraction verification, field editing.' },
  { id: 'reviewer', name: 'Tax Reviewer / Manager', badge: 'Firm Manager', icon: '🔍', description: 'Approval workflows, risk score checks, variance review & sign-off.' },
  { id: 'client_ind', name: 'Individual Taxpayer', badge: 'Client', icon: '👤', description: 'Action-oriented first-run portal, document upload, status tracking.' },
  { id: 'client_biz', name: 'Business Owner Client', badge: 'Client', icon: '🏢', description: 'K-1 distribution approval, multi-entity filing status, document center.' },
  { id: 'admin', name: 'Firm Administrator', badge: 'Firm Admin', icon: '⚙️', description: 'Workload balancing, staff allocations, SLA performance monitoring.' },
  { id: 'seasonal', name: 'Seasonal Staff', badge: 'Seasonal', icon: '🌱', description: 'Guided basic verification queue with restricted administrative permissions.' }
];

export const CHALLENGES = [
  { id: '01', key: 'traceability', name: '01. Source Traceability', tag: 'Core AI', shortDesc: 'Trace every field to source PDF, page, and calculation formula.' },
  { id: '02', key: 'collaboration', name: '02. CPA Collaboration', tag: 'Communication', shortDesc: 'Internal firm notes vs. client messages with request ownership.' },
  { id: '03', key: 'where_to_start', name: '03. 10s First-Run', tag: 'Onboarding', shortDesc: 'First-time client knows their next action in under 10 seconds.' },
  { id: '04', key: 'navigation', name: '04. Context Navigation', tag: 'UX Flow', shortDesc: 'Breadcrumb graphs, deep linking & zero-context-loss navigation.' },
  { id: '05', key: 'roles', name: '05. Role-Aware UX', tag: 'Architecture', shortDesc: '1 app shell adapting seamlessly across 6 distinct user roles.' },
  { id: '06', key: 'status', name: '06. Status & Progress', tag: 'Mental Model', shortDesc: 'Shared progress pipeline interpretable by both clients & CPAs.' },
  { id: '07', key: 'dashboard', name: '07. Actionable Dashboard', tag: 'Decision Support', shortDesc: 'Action-oriented queue surfacing top priorities across 100+ returns.' },
  { id: '08', key: 'affordances', name: '08. Clickable vs Editable', tag: 'Design System', shortDesc: 'Consistent visual affordances (Editable, AI-Gen, Verified, Locked).' },
  { id: '09', key: 'scale', name: '09. Navigable Complexity', tag: 'Scale & Density', shortDesc: 'Progressive disclosure & search across 150+ return items.' },
  { id: '10', key: 'trust_ai', name: '10. Trustworthy AI', tag: 'AI Transparency', shortDesc: 'AI evidence inspector, confidence scores, and inline correction flow.' }
];

export const MOCK_RETURNS = [
  {
    id: 'ret-101',
    clientName: 'Sarah & David Jenkins',
    clientEmail: 'sarah.jenkins@gmail.com',
    taxYear: 2025,
    formType: 'Form 1040 (Individual Joint)',
    assignedPreparer: 'Alex Rivera, CPA',
    assignedReviewer: 'Elena Vance, Partner',
    urgency: 'HIGH',
    dueDate: '2026-04-15',
    daysRemaining: 12,
    internalStatus: 'preparer_review',
    clientStatus: 'in_progress',
    progressPercent: 65,
    blockingIssue: 'Missing 1099-B Crypto Basis Statement',
    blockingOwner: 'Client (Sarah)',
    riskScore: 'MEDIUM',
    aiConfidenceOverall: 94,
    totalIncome: 342850,
    taxOwed: 48120,
    refundAmount: 0,
    documentsCount: 14,
    itemsCount: 168,
    unreadMessages: 2,
    hasUnresolvedAIWarnings: true,
    lastActivity: '10 mins ago',
    onboardingComplete: false,
    firstRunTask: {
      id: 'task-ob-1',
      title: 'Confirm W-2 Foreign Tax Paid & Upload Missing 1099-B',
      estTime: '3 mins',
      urgency: 'Action Needed Today',
      description: 'Your tax preparer Alex needs you to verify 1 item and upload your Coinbase 1099-B form.',
      stepIndex: 1,
      totalSteps: 3
    }
  },
  {
    id: 'ret-102',
    clientName: 'Apex Tech Solutions LLC',
    clientEmail: 'finance@apextech.io',
    taxYear: 2025,
    formType: 'Form 1120-S (S-Corporation)',
    assignedPreparer: 'Jordan Lee, EA',
    assignedReviewer: 'Alex Rivera, CPA',
    urgency: 'CRITICAL',
    dueDate: '2026-03-15',
    daysRemaining: 4,
    internalStatus: 'manager_review',
    clientStatus: 'in_progress',
    progressPercent: 88,
    blockingIssue: 'Shareholder K-1 Allocation Approval',
    blockingOwner: 'Firm Reviewer',
    riskScore: 'HIGH',
    aiConfidenceOverall: 87,
    totalIncome: 1840000,
    taxOwed: 0,
    refundAmount: 0,
    documentsCount: 28,
    itemsCount: 312,
    unreadMessages: 0,
    hasUnresolvedAIWarnings: true,
    lastActivity: '1 hour ago',
    onboardingComplete: true
  },
  {
    id: 'ret-103',
    clientName: 'Marcus Vance',
    clientEmail: 'mvance@vancemedia.co',
    taxYear: 2025,
    formType: 'Form 1040 (Individual Single)',
    assignedPreparer: 'Alex Rivera, CPA',
    assignedReviewer: 'Elena Vance, Partner',
    urgency: 'MEDIUM',
    dueDate: '2026-04-15',
    daysRemaining: 18,
    internalStatus: 'doc_gathering',
    clientStatus: 'action_required',
    progressPercent: 30,
    blockingIssue: 'Schedule E Rental Expenses Upload',
    blockingOwner: 'Client (Marcus)',
    riskScore: 'LOW',
    aiConfidenceOverall: 98,
    totalIncome: 155000,
    taxOwed: 18400,
    refundAmount: 1250,
    documentsCount: 6,
    itemsCount: 74,
    unreadMessages: 4,
    hasUnresolvedAIWarnings: false,
    lastActivity: '3 hours ago',
    onboardingComplete: true
  },
  {
    id: 'ret-104',
    clientName: 'Elena & Dmitry Rostova',
    clientEmail: 'elena.rostova@globalnet.org',
    taxYear: 2025,
    formType: 'Form 1040 (Foreign Earned Income)',
    assignedPreparer: 'Taylor Swift, CPA',
    assignedReviewer: 'Alex Rivera, CPA',
    urgency: 'NORMAL',
    dueDate: '2026-06-15',
    daysRemaining: 68,
    internalStatus: 'client_approval',
    clientStatus: 'ready_for_review',
    progressPercent: 95,
    blockingIssue: 'Client Final Sign-off Needed',
    blockingOwner: 'Client (Elena)',
    riskScore: 'LOW',
    aiConfidenceOverall: 96,
    totalIncome: 210000,
    taxOwed: 4200,
    refundAmount: 3800,
    documentsCount: 11,
    itemsCount: 142,
    unreadMessages: 1,
    hasUnresolvedAIWarnings: false,
    lastActivity: 'Yesterday',
    onboardingComplete: true
  },
  {
    id: 'ret-105',
    clientName: 'Horizon Retail Partners',
    clientEmail: 'tax@horizonretail.com',
    taxYear: 2025,
    formType: 'Form 1065 (Partnership)',
    assignedPreparer: 'Jordan Lee, EA',
    assignedReviewer: 'Elena Vance, Partner',
    urgency: 'CRITICAL',
    dueDate: '2026-03-15',
    daysRemaining: 2,
    internalStatus: 'ready_to_efile',
    clientStatus: 'completed',
    progressPercent: 100,
    blockingIssue: 'None - E-File Scheduled',
    blockingOwner: 'None',
    riskScore: 'LOW',
    aiConfidenceOverall: 99,
    totalIncome: 4120000,
    taxOwed: 0,
    refundAmount: 0,
    documentsCount: 42,
    itemsCount: 520,
    unreadMessages: 0,
    hasUnresolvedAIWarnings: false,
    lastActivity: '2 hours ago',
    onboardingComplete: true
  }
];

// Sample Line Items for Return ret-101 (Sarah & David Jenkins)
export const MOCK_LINE_ITEMS = [
  {
    id: 'line-1a',
    form: 'Form 1040',
    schedule: 'Main Return',
    fieldCode: '1a',
    label: 'Wages, Salaries, Tips (Form W-2 Box 1)',
    value: 230500,
    displayValue: '$230,500.00',
    affordanceState: 'verified', // editable, ai_generated, verified, requires_approval, locked
    lockedReason: null,
    confidence: 99,
    sourceDocId: 'doc-w2-jenkins',
    sourceDocName: '2025 W-2 - Acme Cloud Tech (Sarah)',
    sourcePage: 1,
    sourceBbox: { top: '32%', left: '48%', width: '22%', height: '8%' },
    sourceSection: 'Box 1: Wages, tips, other compensation',
    extractedRawText: '1 Wages, tips, other comp. 142,500.00 | Box 1 Spouse: 88,000.00',
    transformationFormula: 'W-2 Box 1 (Primary: $142,500.00) + W-2 Box 1 (Spouse: $88,000.00) = $230,500.00',
    aiExplanation: 'Extracted wages from two W-2 forms. Primary taxpayer Acme Cloud Tech W-2 ($142,500) and Spouse BioHealth Systems W-2 ($88,000). Cross-checked with Social Security Box 3 caps.',
    uncertaintyNotes: null,
    evidenceItems: [
      { doc: '2025 W-2 - Acme Cloud Tech', snippet: 'Box 1: $142,500.00', page: 1 },
      { doc: '2025 W-2 - BioHealth Systems', snippet: 'Box 1: $88,000.00', page: 1 }
    ],
    lastModifiedBy: 'AI Auto-Extractor v4.2',
    lastModifiedTime: 'Today at 08:14 AM'
  },
  {
    id: 'line-2b',
    form: 'Form 1040',
    schedule: 'Schedule B',
    fieldCode: '2b',
    label: 'Taxable Interest Income',
    value: 4820,
    displayValue: '$4,820.00',
    affordanceState: 'ai_generated',
    confidence: 96,
    sourceDocId: 'doc-1099int-chase',
    sourceDocName: '1099-INT - Chase Wealth Management',
    sourcePage: 1,
    sourceBbox: { top: '24%', left: '15%', width: '30%', height: '10%' },
    sourceSection: 'Box 1: Interest Income',
    extractedRawText: 'Box 1 Interest Income: $4,820.45',
    transformationFormula: '1099-INT Box 1 ($4,820.45) rounded to nearest dollar = $4,820.00',
    aiExplanation: 'Summed interest income reported across Chase High Yield Savings account #8812.',
    uncertaintyNotes: 'Verify whether Box 3 U.S. Savings Bonds interest of $120 requires Schedule B disclosure.',
    evidenceItems: [
      { doc: '1099-INT - Chase Wealth', snippet: 'Box 1 Interest Income: $4,820.45', page: 1 }
    ],
    lastModifiedBy: 'AI Auto-Extractor v4.2',
    lastModifiedTime: 'Today at 08:14 AM'
  },
  {
    id: 'line-3a',
    form: 'Form 1040',
    schedule: 'Schedule B',
    fieldCode: '3a',
    label: 'Qualified Dividends',
    value: 12450,
    displayValue: '$12,450.00',
    affordanceState: 'requires_approval',
    confidence: 78,
    sourceDocId: 'doc-1099div-fidelity',
    sourceDocName: '1099-DIV - Fidelity Consolidated',
    sourcePage: 2,
    sourceBbox: { top: '55%', left: '20%', width: '35%', height: '12%' },
    sourceSection: 'Box 1b: Qualified Dividends',
    extractedRawText: 'Box 1a Ordinary Dividends: 14,200.00 | Box 1b Qualified: 12,450.00',
    transformationFormula: '1099-DIV Box 1b Qualified Dividends = $12,450.00',
    aiExplanation: 'AI detected discrepancy between total ordinary dividends ($14,200) and qualified portion ($12,450). Holding period verification recommended for foreign ETF position VANGUARD INTL.',
    uncertaintyNotes: 'Holding period requirement (60 days during 121-day window) has moderate uncertainty for 45 shares acquired on Dec 12.',
    evidenceItems: [
      { doc: '1099-DIV - Fidelity Consolidated', snippet: 'Box 1b Qualified Dividends: $12,450.00', page: 2 },
      { doc: 'Fidelity Gain/Loss Detail', snippet: 'Vanguard Intl Acquired 12/12/2025', page: 4 }
    ],
    lastModifiedBy: 'AI Confidence Inspector',
    lastModifiedTime: 'Today at 08:15 AM'
  },
  {
    id: 'line-sched-c-exp',
    form: 'Schedule C',
    schedule: 'Schedule C (Consulting)',
    fieldCode: 'Line 27a',
    label: 'Other Business Expenses (Software & Cloud)',
    value: 18450,
    displayValue: '$18,450.00',
    affordanceState: 'editable',
    confidence: 92,
    sourceDocId: 'doc-sch-c-expenses',
    sourceDocName: '2025 Schedule C Expense Ledger (CSV/PDF)',
    sourcePage: 1,
    sourceBbox: { top: '18%', left: '10%', width: '75%', height: '35%' },
    sourceSection: 'Software Subscriptions & AWS Infrastructure',
    extractedRawText: 'AWS Cloud: $12,400 | OpenAI API: $3,200 | GitHub Enterprise: $2,850',
    transformationFormula: 'SUM(AWS $12,400 + OpenAI $3,200 + GitHub $2,850) = $18,450.00',
    aiExplanation: 'Categorized business software subscription expenses from uploaded bank statements and AWS receipt PDFs.',
    uncertaintyNotes: null,
    evidenceItems: [
      { doc: 'AWS Annual Statement 2025', snippet: 'Total Paid 2025: $12,400.00', page: 1 },
      { doc: 'OpenAI Enterprise Invoice', snippet: 'Annual API Usage: $3,200.00', page: 1 }
    ],
    lastModifiedBy: 'Alex Rivera, CPA',
    lastModifiedTime: '2 hours ago'
  },
  {
    id: 'line-tax-owed',
    form: 'Form 1040',
    schedule: 'Tax & Credits',
    fieldCode: 'Line 37',
    label: 'Amount You Owe (Total Tax Liability Balance)',
    value: 48120,
    displayValue: '$48,120.00',
    affordanceState: 'locked',
    lockedReason: 'System calculated line item derived from Tax Tables & Net Investment Income Tax (NIIT). Cannot be directly edited.',
    confidence: 100,
    sourceDocId: 'calc-tax-engine',
    sourceDocName: 'IRS 2025 Form 1040 Tax Computation Worksheet',
    sourcePage: 1,
    sourceBbox: { top: '70%', left: '10%', width: '80%', height: '15%' },
    sourceSection: '2025 Tax Brackets & Schedule D Tax Worksheet',
    extractedRawText: 'Taxable Income $278,400 -> Regular Tax $44,820 + NIIT (3.8% on $86,840) $3,300 = $48,120',
    transformationFormula: 'Regular Tax ($44,820) + NIIT ($3,300) - Withholdings ($0 remaining balance) = $48,120.00',
    aiExplanation: 'Calculated using official IRS 2025 tax rates, Schedule D tax worksheet for preferential capital gains rates, and 3.8% Net Investment Income Tax on MAGI exceeding $250k threshold.',
    uncertaintyNotes: null,
    evidenceItems: [
      { doc: 'IRS Tax Computation Schedule D Worksheet', snippet: 'Line 28 Total Tax: $48,120.00', page: 1 }
    ],
    lastModifiedBy: 'IRS Calculation Core',
    lastModifiedTime: 'Today at 08:20 AM'
  }
];

// Sample Contextual Threads & Messages (Challenge 02)
export const MOCK_THREADS = [
  {
    id: 'thread-1',
    returnId: 'ret-101',
    title: '1099-B Coinbase Basis & Foreign Tax Verification',
    linkedDocument: 'doc-1099b-coinbase',
    linkedField: 'Schedule D Line 1a',
    status: 'open',
    urgency: 'high',
    owner: 'Client (Sarah)',
    ownerRole: 'client_ind',
    messages: [
      {
        id: 'msg-101',
        sender: 'Alex Rivera, CPA',
        senderRole: 'preparer',
        isInternal: false,
        timestamp: 'Yesterday at 2:15 PM',
        text: 'Hi Sarah, the AI extracted your Coinbase crypto sales, but 4 transactions are missing cost basis data (Line 1b). Could you upload your Consolidated 1099-B Tax Report from Coinbase?'
      },
      {
        id: 'msg-102',
        sender: 'Elena Vance, Partner',
        senderRole: 'reviewer',
        isInternal: true, // Internal Firm Note!
        timestamp: 'Yesterday at 3:30 PM',
        text: 'INTERNAL NOTE: Check if Sarah qualifies for de minimis crypto reporting exemption under Notice 2024-55 before flagging penalty risk.'
      },
      {
        id: 'msg-103',
        sender: 'Sarah Jenkins',
        senderRole: 'client_ind',
        isInternal: false,
        timestamp: 'Today at 9:10 AM',
        text: 'Just uploaded the PDF report! Let me know if you also need the CSV export.'
      }
    ]
  },
  {
    id: 'thread-2',
    returnId: 'ret-101',
    title: 'Schedule C Home Office Deduction Calculation',
    linkedDocument: 'doc-sch-c-expenses',
    linkedField: 'Line 27a',
    status: 'resolved',
    urgency: 'normal',
    owner: 'Firm Preparer',
    ownerRole: 'preparer',
    messages: [
      {
        id: 'msg-201',
        sender: 'Alex Rivera, CPA',
        senderRole: 'preparer',
        isInternal: true,
        timestamp: '3 days ago',
        text: 'INTERNAL NOTE: Simplified method ($5/sq ft up to 300 sq ft) yields $1,500 vs actual expense method ($3,420). Client confirmed 450 sq ft dedicated room. Using actual expense method.'
      }
    ]
  }
];

// Sample AI Audit & Trust Json (Challenge 10)
export const MOCK_AI_INSPECTIONS = {
  'line-3a': {
    fieldId: 'line-3a',
    fieldLabel: 'Qualified Dividends (Line 3a)',
    rawModelOutput: {
      modelName: 'TaxExtract-LLM-v4.8',
      confidenceScore: 0.78,
      extractionTimestamp: '2026-08-09T08:15:22Z',
      boundingArea: { page: 2, box: [120, 450, 310, 520] },
      reasoningChain: [
        'Detected 1099-DIV document format from Fidelity Brokerage.',
        'Extracted Box 1a Ordinary Dividends: $14,200.00.',
        'Extracted Box 1b Qualified Dividends: $12,450.00.',
        'FLAG: Holding period audit required for foreign asset Vanguard Intl ETF ($1,750 dividend portion).',
        'Calculated 78% confidence score due to potential holding period disqualification under IRC Section 1(h)(11).'
      ],
      supportingEvidence: [
        'Fidelity 1099-DIV Consolidated Statement Page 2 Line 1b',
        'Acquisition trade confirmation dated 12/12/2025'
      ],
      suggestedCorrection: 'Verify holding period > 60 days. If qualified, confirm $12,450. If un-qualified, adjust to $10,700.',
      userOverrideHistory: []
    }
  }
};
