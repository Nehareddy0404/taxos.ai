import React, { useState } from 'react';
import { MOCK_AI_INSPECTIONS, MOCK_LINE_ITEMS } from '../data/mockTaxData.js';

export default function TrustworthyAI({ selectedItemId }) {
  const [activeItemId, setActiveItemId] = useState(selectedItemId || 'line-3a');
  const [isCorrectionModalOpen, setIsCorrectionModalOpen] = useState(false);
  const [correctedValue, setCorrectedValue] = useState('');
  const [correctionReason, setCorrectionReason] = useState('OCR misread digit');
  const [auditLog, setAuditLog] = useState([
    { timestamp: 'Today 08:15 AM', user: 'AI TaxExtract v4.8', action: 'Extracted $12,450 (78% confidence)' }
  ]);

  const activeItem = MOCK_LINE_ITEMS.find(i => i.id === activeItemId) || MOCK_LINE_ITEMS[2];
  const aiData = MOCK_AI_INSPECTIONS[activeItemId] || MOCK_AI_INSPECTIONS['line-3a'];

  const handleApplyCorrection = () => {
    if (!correctedValue) return;
    const newEntry = {
      timestamp: 'Just now',
      user: 'Alex Rivera, CPA (Manual Override)',
      action: `Changed value to ${correctedValue}. Reason: ${correctionReason}`
    };
    setAuditLog([newEntry, ...auditLog]);
    setIsCorrectionModalOpen(false);
    setCorrectedValue('');
  };

  return (
    <div className="module-container ai-trust-module">
      <div className="module-header-banner">
        <div>
          <h2>Trustworthy AI Evidence & Correction Inspector</h2>
          <p>Transparency that builds confidence without technical overload. Clear reasoning chains, supporting evidence, uncertainty ratings, and non-disruptive inline correction.</p>
        </div>
      </div>

      <div className="ai-trust-layout">
        {/* Main AI Transparency Card */}
        <div className="ai-transparency-card">
          <div className="card-header">
            <h3>🤖 AI Decision & Reasoning Breakdown</h3>
            <span className="confidence-pill badge-warning">
              Confidence: {aiData.rawModelOutput.confidenceScore * 100}%
            </span>
          </div>

          <div className="ai-card-body">
            {/* Section 1: What AI Did */}
            <div className="ai-section">
              <h4>1. What the AI Did</h4>
              <p className="ai-highlight-box">
                Extracted <strong>{activeItem.label} ({activeItem.fieldCode})</strong> value of <strong>{activeItem.displayValue}</strong> from document <code>{activeItem.sourceDocName}</code>.
              </p>
            </div>

            {/* Section 2: Why & Reasoning Chain */}
            <div className="ai-section">
              <h4>2. Why It Made This Recommendation (Reasoning Chain)</h4>
              <ol className="reasoning-chain-list">
                {aiData.rawModelOutput.reasoningChain.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Section 3: Evidence & Uncertainty */}
            <div className="ai-section dual-cols">
              <div className="evidence-col">
                <h4>3. Supporting Evidence</h4>
                <ul>
                  {aiData.rawModelOutput.supportingEvidence.map((ev, i) => (
                    <li key={i}>📄 {ev}</li>
                  ))}
                </ul>
              </div>

              <div className="uncertainty-col">
                <h4>4. Uncertainty & Risk Warning</h4>
                <div className="warning-box">
                  ⚠️ {activeItem.uncertaintyNotes || 'Holding period verification recommended under IRC Section 1(h)(11).'}
                </div>
              </div>
            </div>

            {/* Section 5: Recommended Action & Inline Correction */}
            <div className="ai-action-bar">
              <div className="action-text">
                <strong>Recommended Action:</strong> {aiData.rawModelOutput.suggestedCorrection}
              </div>
              <div className="action-buttons">
                <button className="btn-approve-ai">
                  ✅ Confirm & Accept AI Value
                </button>
                <button
                  className="btn-correct-ai"
                  onClick={() => setIsCorrectionModalOpen(true)}
                >
                  ✏️ Correct AI Value
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Audit Trail & History Sidebar */}
        <div className="audit-trail-card">
          <div className="card-header">
            <h3>📜 Override & Audit History</h3>
          </div>
          <div className="audit-list">
            {auditLog.map((log, idx) => (
              <div key={idx} className="audit-item">
                <div className="audit-time">{log.timestamp}</div>
                <div className="audit-user">{log.user}</div>
                <div className="audit-action">{log.action}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inline Correction Modal */}
      {isCorrectionModalOpen && (
        <div className="modal-overlay">
          <div className="correction-modal">
            <div className="modal-header">
              <h3>✏️ Correct AI Extracted Value</h3>
              <button className="btn-close" onClick={() => setIsCorrectionModalOpen(false)}>✕</button>
            </div>

            <div className="modal-body">
              <label>Current AI Extracted Value:</label>
              <input type="text" disabled value={activeItem.displayValue} />

              <label>Enter Corrected Value ($):</label>
              <input
                type="text"
                placeholder="$10,700.00"
                value={correctedValue}
                onChange={(e) => setCorrectedValue(e.target.value)}
              />

              <label>Select Reason for Correction:</label>
              <select value={correctionReason} onChange={(e) => setCorrectionReason(e.target.value)}>
                <option value="OCR misread digit">OCR misread digit</option>
                <option value="Tax law rule override">Tax law rule override</option>
                <option value="Client clarified documentation">Client clarified documentation</option>
                <option value="Holding period disqualified">Holding period disqualified</option>
              </select>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsCorrectionModalOpen(false)}>Cancel</button>
              <button className="btn-save-override" onClick={handleApplyCorrection}>
                Save Override & Update Audit Trail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
