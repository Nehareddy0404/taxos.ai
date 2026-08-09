import React, { useState } from 'react';
import { MOCK_RETURNS } from '../data/mockTaxData.js';
import { filterAndPrioritizeReturns, calculateSummaryMetrics } from '../utils/taxEngine.js';

export default function CPADashboard({ currentRole, onSelectReturn }) {
  const [filterStatus, setFilterStatus] = useState('action_needed');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScaleMode100, setIsScaleMode100] = useState(false);

  // Generate synthetic dataset for scale testing when Scale Mode is ON
  const baseReturns = isScaleMode100
    ? Array.from({ length: 120 }, (_, i) => ({
        id: `ret-scale-${i}`,
        clientName: i % 2 === 0 ? `Client ${i + 1} Corp` : `Family Return #${i + 1}`,
        clientEmail: `client${i}@taxmail.org`,
        taxYear: 2025,
        formType: i % 3 === 0 ? 'Form 1120-S' : 'Form 1040',
        assignedPreparer: i % 4 === 0 ? 'Jordan Lee, EA' : 'Alex Rivera, CPA',
        assignedReviewer: 'Elena Vance, Partner',
        urgency: i % 5 === 0 ? 'CRITICAL' : i % 3 === 0 ? 'HIGH' : 'NORMAL',
        dueDate: `2026-04-${10 + (i % 5)}`,
        daysRemaining: (i % 15) + 1,
        internalStatus: i % 4 === 0 ? 'preparer_review' : 'doc_gathering',
        clientStatus: 'in_progress',
        progressPercent: (i * 7) % 100,
        blockingIssue: i % 3 === 0 ? 'Missing W-2 Statement' : 'None',
        blockingOwner: i % 3 === 0 ? 'Client' : 'None',
        riskScore: i % 4 === 0 ? 'HIGH' : 'LOW',
        aiConfidenceOverall: 92,
        totalIncome: 120000 + i * 5000,
        taxOwed: 15000 + i * 800,
        refundAmount: 0,
        documentsCount: 8,
        itemsCount: 110,
        unreadMessages: i % 2
      }))
    : MOCK_RETURNS;

  const prioritizedReturns = filterAndPrioritizeReturns(baseReturns, {
    searchQuery,
    filterStatus,
    filterUrgency,
    role: currentRole.id
  });

  const metrics = calculateSummaryMetrics(baseReturns);

  return (
    <div className="module-container dashboard-module">
      <div className="module-header-banner">
        <div>
          <h2>Actionable Decision-Oriented CPA Dashboard</h2>
          <p>Organized around decisions and immediate action, not passive reporting. Priority queue surfaces critical SLAs and blocker resolutions.</p>
        </div>
      </div>

      {/* KPI Action Summary Widgets */}
      <div className="metrics-row">
        <div className="metric-card urgent-card">
          <div className="card-val">{metrics.urgent}</div>
          <div className="card-lbl">🔥 Urgent SLA (&lt; 5 Days)</div>
        </div>
        <div className="metric-card blocked-card">
          <div className="card-val">{metrics.blocked}</div>
          <div className="card-lbl">⛔ Blocked Returns</div>
        </div>
        <div className="metric-card ready-card">
          <div className="card-val">{metrics.ready}</div>
          <div className="card-lbl">✅ Ready for Review / E-File</div>
        </div>
        <div className="metric-card ai-card">
          <div className="card-val">{metrics.avgConfidence}%</div>
          <div className="card-lbl">✨ Avg AI Confidence</div>
        </div>
      </div>

      {/* Filter & Scale Controls Toolbar */}
      <div className="dashboard-toolbar">
        <div className="filter-tabs">
          <button
            className={`filter-btn ${filterStatus === 'action_needed' ? 'active' : ''}`}
            onClick={() => setFilterStatus('action_needed')}
          >
            ⚡ Action Needed ({metrics.urgent + metrics.blocked})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'high_risk' ? 'active' : ''}`}
            onClick={() => setFilterStatus('high_risk')}
          >
            ⚠️ High Risk / Variances
          </button>
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => setFilterStatus('all')}
          >
            📋 All Returns ({baseReturns.length})
          </button>
        </div>

        <div className="scale-mode-toggle">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={isScaleMode100}
              onChange={(e) => setIsScaleMode100(e.target.checked)}
            />
            <span>🚀 <strong>Scale Mode:</strong> {isScaleMode100 ? '120 Returns' : '5 Returns'}</span>
          </label>
        </div>
      </div>

      {/* Prioritized Decision & Work Queue */}
      <div className="priority-queue-card">
        <div className="card-header">
          <h3>⚡ Action Priority Queue (Ranked by Urgency & SLA)</h3>
          <span className="count-info">Showing {prioritizedReturns.length} actionable items</span>
        </div>

        <div className="queue-table-wrap">
          <table className="queue-table">
            <thead>
              <tr>
                <th>Priority</th>
                <th>Client / Entity</th>
                <th>Form Type</th>
                <th>SLA / Due Date</th>
                <th>Progress</th>
                <th>Blocking Issue</th>
                <th>Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {prioritizedReturns.map((ret, index) => (
                <tr key={ret.id} className={`queue-row urgency-${ret.urgency.toLowerCase()}`}>
                  <td>
                    <span className={`urgency-badge badge-${ret.urgency.toLowerCase()}`}>
                      #{index + 1} {ret.urgency}
                    </span>
                  </td>
                  <td>
                    <strong className="client-name">{ret.clientName}</strong>
                    <div className="client-sub">{ret.assignedPreparer}</div>
                  </td>
                  <td>{ret.formType}</td>
                  <td>
                    <div className={`sla-pill ${ret.daysRemaining < 5 ? 'critical-sla' : ''}`}>
                      📅 {ret.dueDate} ({ret.daysRemaining} days)
                    </div>
                  </td>
                  <td>
                    <div className="tbl-progress">
                      <div className="tbl-progress-bar" style={{ width: `${ret.progressPercent}%` }}></div>
                      <span>{ret.progressPercent}%</span>
                    </div>
                  </td>
                  <td>
                    {ret.blockingIssue && ret.blockingIssue !== 'None' ? (
                      <span className="block-issue-text">⛔ {ret.blockingIssue}</span>
                    ) : (
                      <span className="no-block">✅ Clean</span>
                    )}
                  </td>
                  <td>
                    <span className="owner-chip">{ret.blockingOwner || 'CPA'}</span>
                  </td>
                  <td>
                    <button
                      className="btn-take-action"
                      onClick={() => onSelectReturn(ret.id)}
                    >
                      Take Action →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
