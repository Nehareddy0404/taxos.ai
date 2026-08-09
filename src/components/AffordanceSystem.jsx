import React, { useState } from 'react';
import { MOCK_LINE_ITEMS } from '../data/mockTaxData.js';

export default function AffordanceSystem() {
  const [items, setItems] = useState(MOCK_LINE_ITEMS);

  const toggleState = (itemId, newState) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return { ...item, affordanceState: newState };
      }
      return item;
    }));
  };

  return (
    <div className="module-container affordances-module">
      <div className="module-header-banner">
        <div>
          <h2>Consistent Interaction Affordance System</h2>
          <p>Unambiguous visual language making immediately clear what can be clicked, edited, verified, approved, or locked (with explicit reason).</p>
        </div>
      </div>

      {/* Visual Design System Affordance Legend */}
      <div className="affordance-legend-grid">
        <div className="legend-card state-editable">
          <div className="card-badge">✏️ EDITABLE FIELD</div>
          <h4>User Editable Value</h4>
          <p>Subtle border, blue focus ring, click/type to modify directly.</p>
        </div>

        <div className="legend-card state-ai_generated">
          <div className="card-badge">✨ AI GENERATED</div>
          <h4>AI Extracted Value</h4>
          <p>Indigo sparkle badge & subtle glow. Hover displays extraction confidence & source trace.</p>
        </div>

        <div className="legend-card state-verified">
          <div className="card-badge">✅ VERIFIED</div>
          <h4>Human Verified Value</h4>
          <p>Solid emerald checkmark badge. High confidence, verified against source document.</p>
        </div>

        <div className="legend-card state-requires_approval">
          <div className="card-badge">⚠️ REQUIRES APPROVAL</div>
          <h4>Variance / Low Confidence</h4>
          <p>Pulsing amber highlight badge. Requires CPA sign-off before filing.</p>
        </div>

        <div className="legend-card state-locked">
          <div className="card-badge">🔒 LOCKED / READ-ONLY</div>
          <h4>System Calculated or Finalized</h4>
          <p>Slate gray background, lock icon. Hover displays reason why item cannot be edited.</p>
        </div>
      </div>

      {/* Interactive Affordance Playground */}
      <div className="playground-card">
        <div className="card-header">
          <h3>🧪 Interactive Affordance Playground</h3>
          <span className="info-tag">Try switching states on sample fields below:</span>
        </div>

        <div className="playground-items-list">
          {items.map(item => (
            <div key={item.id} className={`playground-row state-${item.affordanceState}`}>
              <div className="item-meta">
                <span className="code-tag">{item.fieldCode}</span>
                <span className="label-text">{item.label}</span>
              </div>

              {/* Render Field according to its affordance state */}
              <div className="field-input-container">
                {item.affordanceState === 'editable' && (
                  <input
                    type="text"
                    className="affordance-input input-editable"
                    defaultValue={item.displayValue}
                  />
                )}
                {item.affordanceState === 'ai_generated' && (
                  <div className="affordance-input input-ai" title={`AI Confidence: ${item.confidence}%`}>
                    <span className="sparkle">✨</span> {item.displayValue}
                    <span className="conf-pill">{item.confidence}% AI</span>
                  </div>
                )}
                {item.affordanceState === 'verified' && (
                  <div className="affordance-input input-verified">
                    <span>✅ {item.displayValue}</span>
                    <span className="verified-tag">Verified</span>
                  </div>
                )}
                {item.affordanceState === 'requires_approval' && (
                  <div className="affordance-input input-approval">
                    <span>⚠️ {item.displayValue}</span>
                    <button className="btn-quick-approve">Approve Value</button>
                  </div>
                )}
                {item.affordanceState === 'locked' && (
                  <div className="affordance-input input-locked" title={item.lockedReason}>
                    <span>🔒 {item.displayValue}</span>
                    <span className="lock-reason-tooltip">🔒 {item.lockedReason}</span>
                  </div>
                )}
              </div>

              {/* State Switcher Controls */}
              <div className="state-controls">
                <span className="ctrl-label">Switch State:</span>
                <button
                  className={`ctrl-btn ${item.affordanceState === 'editable' ? 'active' : ''}`}
                  onClick={() => toggleState(item.id, 'editable')}
                >
                  Editable
                </button>
                <button
                  className={`ctrl-btn ${item.affordanceState === 'ai_generated' ? 'active' : ''}`}
                  onClick={() => toggleState(item.id, 'ai_generated')}
                >
                  AI-Gen
                </button>
                <button
                  className={`ctrl-btn ${item.affordanceState === 'verified' ? 'active' : ''}`}
                  onClick={() => toggleState(item.id, 'verified')}
                >
                  Verified
                </button>
                <button
                  className={`ctrl-btn ${item.affordanceState === 'requires_approval' ? 'active' : ''}`}
                  onClick={() => toggleState(item.id, 'requires_approval')}
                >
                  Approval
                </button>
                <button
                  className={`ctrl-btn ${item.affordanceState === 'locked' ? 'active' : ''}`}
                  onClick={() => toggleState(item.id, 'locked')}
                >
                  Locked
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
