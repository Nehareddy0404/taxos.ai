import React, { useState } from 'react';
import { MOCK_LINE_ITEMS } from '../data/mockTaxData.js';

export default function TraceabilityView({ selectedLineItemId, onSelectLineItem, onOpenAIInspector }) {
  const [activeItemId, setActiveItemId] = useState(selectedLineItemId || 'line-1a');
  const activeItem = MOCK_LINE_ITEMS.find(i => i.id === activeItemId) || MOCK_LINE_ITEMS[0];

  return (
    <div className="module-container traceability-module">
      <div className="module-header-banner">
        <div>
          <h2>Source Document Traceability Engine</h2>
          <p>Click any line item on the tax return to highlight its source document, exact page, bounding area, and calculation formula.</p>
        </div>
      </div>

      <div className="traceability-grid">
        {/* Left Column: Tax Return Field Selector */}
        <div className="return-fields-card">
          <div className="card-header">
            <h3>📋 Form 1040 & Schedules</h3>
            <span className="field-count">{MOCK_LINE_ITEMS.length} Line Items Traceable</span>
          </div>
          <div className="line-items-list">
            {MOCK_LINE_ITEMS.map(item => {
              const isSelected = item.id === activeItemId;
              return (
                <div
                  key={item.id}
                  className={`line-item-row ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    setActiveItemId(item.id);
                    if (onSelectLineItem) onSelectLineItem(item.id);
                  }}
                >
                  <div className="item-main">
                    <span className="field-code">{item.fieldCode}</span>
                    <span className="item-label">{item.label}</span>
                  </div>
                  <div className="item-meta">
                    <span className="item-value">{item.displayValue}</span>
                    <span className={`affordance-badge badge-${item.affordanceState}`}>
                      {item.affordanceState === 'verified' && '✅ Verified'}
                      {item.affordanceState === 'ai_generated' && `✨ AI (${item.confidence}%)`}
                      {item.affordanceState === 'requires_approval' && `⚠️ Approval (${item.confidence}%)`}
                      {item.affordanceState === 'editable' && '✏️ Editable'}
                      {item.affordanceState === 'locked' && '🔒 Locked'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center/Right Column: Interactive Document & Traceability Inspector */}
        <div className="traceability-detail-card">
          {activeItem && (
            <>
              <div className="card-header">
                <h3>🔍 Traceability Inspector: {activeItem.fieldCode} ({activeItem.label})</h3>
                <button className="btn-ai-inspect" onClick={() => onOpenAIInspector(activeItem.id)}>
                  🤖 AI Transparency Breakdown
                </button>
              </div>

              {/* Transformation Formula Panel */}
              <div className="formula-box">
                <div className="box-title">📐 Transformation & Derivation Formula:</div>
                <code className="formula-text">{activeItem.transformationFormula}</code>
                <p className="ai-explanation-text">{activeItem.aiExplanation}</p>
              </div>

              {/* Bounding Box Source Document Viewer */}
              <div className="doc-viewer-wrapper">
                <div className="doc-viewer-header">
                  <span className="doc-title">📄 {activeItem.sourceDocName}</span>
                  <span className="doc-page-badge">Page {activeItem.sourcePage} of 2</span>
                  <span className="doc-section-badge">{activeItem.sourceSection}</span>
                </div>

                <div className="mock-document-canvas">
                  <div className="mock-doc-paper">
                    <div className="doc-header-simulated">
                      <div className="sim-title">FORM {activeItem.sourceDocName.includes('W-2') ? 'W-2 Wage and Tax Statement' : '1099 CONSOLIDATED STATEMENT'} 2025</div>
                      <div className="sim-sub">OMB No. 1545-0008 | Copy B - To Be Filed With Tax Return</div>
                    </div>

                    <div className="doc-content-simulated">
                      <div className="sim-row">
                        <div className="sim-col">
                          <strong>Employer / Payer Name:</strong><br />
                          {activeItem.sourceDocName.split('-')[1] || 'Acme Corporation'}
                        </div>
                        <div className="sim-col">
                          <strong>Taxpayer SSN:</strong><br />
                          XXX-XX-4891
                        </div>
                      </div>

                      {/* Highlighted Bounding Box corresponding to selected return item */}
                      <div
                        className="active-bounding-box"
                        style={{
                          top: activeItem.sourceBbox.top,
                          left: activeItem.sourceBbox.left,
                          width: activeItem.sourceBbox.width,
                          height: activeItem.sourceBbox.height
                        }}
                      >
                        <div className="bounding-box-tag">
                          <span>🎯 Source Snippet: {activeItem.displayValue}</span>
                        </div>
                      </div>

                      <div className="doc-extracted-raw">
                        <strong>OCR Extracted Text Snippet:</strong>
                        <pre>"{activeItem.extractedRawText}"</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supporting Evidence Chain */}
              <div className="evidence-section">
                <h4>📚 Supporting Source Documents ({activeItem.evidenceItems?.length || 0})</h4>
                <div className="evidence-chips">
                  {activeItem.evidenceItems?.map((ev, idx) => (
                    <div key={idx} className="evidence-chip">
                      <span className="chip-doc">📄 {ev.doc} (Page {ev.page})</span>
                      <span className="chip-snippet">"{ev.snippet}"</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
