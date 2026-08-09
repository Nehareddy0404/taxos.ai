import React from 'react';
import { MOCK_RETURNS } from '../data/mockTaxData.js';

export default function ReturnStatusTracker({ currentRole }) {
  const isClientRole = currentRole.id.startsWith('client');

  const FIRM_STAGES = [
    { id: 'doc_intake', label: '1. Document Intake', desc: 'Client uploads W-2, 1099s, receipts.' },
    { id: 'ai_extraction', label: '2. AI Extraction', desc: 'Auto-extracted fields and confidence scoring.' },
    { id: 'preparer_review', label: '3. Preparer Review', desc: 'CPA verifies source traceability & calculations.' },
    { id: 'manager_review', label: '4. Manager Sign-Off', desc: 'Partner reviews high-risk items & variances.' },
    { id: 'client_approval', label: '5. Client Approval', desc: 'Client reviews tax summary & signs Form 8879.' },
    { id: 'ready_to_efile', label: '6. Ready to E-File', desc: 'Scheduled for electronic IRS transmission.' }
  ];

  const CLIENT_STAGES = [
    { id: 'stage_1', label: 'Gathering Documents', desc: 'Uploading tax forms' },
    { id: 'stage_2', label: 'In Preparation', desc: 'CPA reviewing & calculating return' },
    { id: 'stage_3', label: 'Your Final Review', desc: 'Sign tax form' },
    { id: 'stage_4', label: 'Filed with IRS', desc: 'Filing complete' }
  ];

  return (
    <div className="module-container status-module">
      <div className="module-header-banner">
        <div>
          <h2>Return Status & Progress Pipeline</h2>
          <p>Unambiguous status tracking interpreted identically by clients and firm staff. Clear next-action ownership and blocker resolution.</p>
        </div>
      </div>

      <div className="audience-perspective-badge">
        Rendering View Tailored For: <strong>{isClientRole ? '👤 Client View (Simplified milestones)' : '💼 CPA Firm View (Granular workflow stages)'}</strong>
      </div>

      {/* Return List Status Breakdown */}
      <div className="returns-status-list">
        {MOCK_RETURNS.map(ret => {
          const isBlocked = ret.blockingIssue && ret.blockingIssue !== 'None - E-File Scheduled';

          return (
            <div key={ret.id} className="status-return-card">
              <div className="card-top">
                <div className="return-meta">
                  <h3>{ret.clientName}</h3>
                  <span className="form-type">{ret.formType} ({ret.taxYear})</span>
                </div>
                <div className="progress-value">
                  <span>{ret.progressPercent}% Complete</span>
                </div>
              </div>

              {/* Progress Pipeline Visual */}
              <div className="pipeline-bar">
                {isClientRole ? (
                  // Simplified Client Pipeline
                  CLIENT_STAGES.map((stg, i) => {
                    const activeIndex = Math.floor((ret.progressPercent / 100) * CLIENT_STAGES.length);
                    const isPassed = i <= activeIndex;
                    const isCurrent = i === activeIndex;

                    return (
                      <div key={stg.id} className={`pipeline-step ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''}`}>
                        <div className="step-num">{i + 1}</div>
                        <div className="step-name">{stg.label}</div>
                      </div>
                    );
                  })
                ) : (
                  // Detailed Firm Pipeline
                  FIRM_STAGES.map((stg, i) => {
                    const activeIndex = Math.floor((ret.progressPercent / 100) * FIRM_STAGES.length);
                    const isPassed = i <= activeIndex;
                    const isCurrent = i === activeIndex;

                    return (
                      <div key={stg.id} className={`pipeline-step ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''}`}>
                        <div className="step-num">{i + 1}</div>
                        <div className="step-name">{stg.label.split('. ')[1]}</div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Blocker & Action Owner Section */}
              <div className="status-footer-row">
                <div className="blocker-info">
                  <span className="label">Current Status:</span>
                  <span className={`status-pill pill-${ret.internalStatus}`}>
                    {ret.internalStatus.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                {isBlocked ? (
                  <div className="blocker-warning">
                    <span className="block-icon">⛔ BLOCKED:</span>
                    <span className="block-text">{ret.blockingIssue}</span>
                    <span className="block-owner">Owner: <strong>{ret.blockingOwner}</strong></span>
                  </div>
                ) : (
                  <div className="blocker-clear">
                    <span>✅ No Blockers - Moving to next stage</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
