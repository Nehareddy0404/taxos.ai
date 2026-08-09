import React, { useState } from 'react';

export default function ContextNavGraph({ onNavigateToModule }) {
  const [activeNode, setActiveNode] = useState('doc-w2');
  const [historyStack, setHistoryStack] = useState(['Form 1040 Line 1a']);

  const OBJECT_NODES = [
    {
      id: 'field-1a',
      type: 'tax_field',
      title: 'Form 1040 Line 1a (Wages)',
      icon: '📊',
      connections: ['doc-w2', 'task-verify-w2', 'msg-w2-clarification'],
      details: 'Extracted $230,500 across 2 W-2 statements.'
    },
    {
      id: 'doc-w2',
      type: 'source_doc',
      title: '2025 W-2 PDF (Acme Cloud Tech)',
      icon: '📄',
      connections: ['field-1a', 'task-verify-w2'],
      details: 'Uploaded Jan 28, 2026. OCR confidence: 99%.'
    },
    {
      id: 'task-verify-w2',
      type: 'action_task',
      title: 'Task #104: Foreign Tax Verification',
      icon: '⚡',
      connections: ['field-1a', 'doc-w2', 'msg-w2-clarification'],
      details: 'Assigned to Alex Rivera. Due in 2 days.'
    },
    {
      id: 'msg-w2-clarification',
      type: 'chat_thread',
      title: 'Thread #1: Coinbase & W-2 Basis',
      icon: '💬',
      connections: ['field-1a', 'task-verify-w2'],
      details: '3 messages. Owner: Client (Sarah Jenkins).'
    }
  ];

  const currentNode = OBJECT_NODES.find(n => n.id === activeNode) || OBJECT_NODES[0];

  const handleNodeClick = (node) => {
    setHistoryStack([...historyStack, node.title]);
    setActiveNode(node.id);
  };

  return (
    <div className="module-container nav-graph-module">
      <div className="module-header-banner">
        <div>
          <h2>Context-Preserving Connected Objects Graph</h2>
          <p>Seamless movement between return fields, source documents, action tasks, and chat threads without ever losing your place.</p>
        </div>
      </div>

      {/* Persistent Sticky Breadcrumb Navigation */}
      <div className="sticky-breadcrumbs-bar">
        <span className="crumb-label">📍 Context Path:</span>
        <div className="crumbs-list">
          <span className="crumb-item">Clients</span>
          <span className="crumb-sep">›</span>
          <span className="crumb-item">Sarah & David Jenkins (2025)</span>
          <span className="crumb-sep">›</span>
          {historyStack.map((h, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <span className="crumb-sep">›</span>}
              <span className={`crumb-item ${idx === historyStack.length - 1 ? 'active' : ''}`}>{h}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="graph-layout">
        {/* Connected Objects Graph Inspector */}
        <div className="graph-canvas-card">
          <div className="card-header">
            <h3>🕸️ Connected Objects Relational Graph</h3>
            <span className="info-tag">Hover/click nodes to jump context</span>
          </div>

          <div className="nodes-visualizer">
            {OBJECT_NODES.map(node => {
              const isSelected = node.id === activeNode;
              const isConnected = currentNode.connections.includes(node.id);
              return (
                <div
                  key={node.id}
                  className={`node-card ${isSelected ? 'selected' : ''} ${isConnected ? 'connected' : ''}`}
                  onClick={() => handleNodeClick(node)}
                >
                  <div className="node-icon">{node.icon}</div>
                  <div className="node-type">{node.type.replace('_', ' ').toUpperCase()}</div>
                  <div className="node-title">{node.title}</div>
                  {isConnected && <div className="link-badge">🔗 Linked Object</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Node Detail & Jump Controls */}
        <div className="node-detail-card">
          <div className="card-header">
            <h3>{currentNode.icon} Object Details: {currentNode.title}</h3>
          </div>

          <div className="node-info-body">
            <p className="node-desc">{currentNode.details}</p>

            <h4>🔗 Linked Cross-Object Shortcuts:</h4>
            <div className="connections-list">
              {currentNode.connections.map(connId => {
                const target = OBJECT_NODES.find(n => n.id === connId);
                if (!target) return null;
                return (
                  <button
                    key={connId}
                    className="btn-jump-node"
                    onClick={() => handleNodeClick(target)}
                  >
                    <span>Jump to {target.type.replace('_', ' ')}:</span>
                    <strong>{target.title}</strong> →
                  </button>
                );
              })}
            </div>

            <div className="deep-link-box">
              <span className="dl-label">🌐 Deep Link URL:</span>
              <code className="dl-code">https://taxos.ai/client/ret-101?object={currentNode.id}&tab=traceability</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
