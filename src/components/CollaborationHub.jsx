import React, { useState } from 'react';
import { MOCK_THREADS } from '../data/mockTaxData.js';

export default function CollaborationHub({ currentRole }) {
  const [threads, setThreads] = useState(MOCK_THREADS);
  const [activeThreadId, setActiveThreadId] = useState('thread-1');
  const [newMessageText, setNewMessageText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];
  const canSeeInternalNotes = currentRole.id === 'preparer' || currentRole.id === 'reviewer' || currentRole.id === 'admin' || currentRole.id === 'seasonal';

  const handleSendMessage = () => {
    if (!newMessageText.trim()) return;
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: currentRole.name,
      senderRole: currentRole.id,
      isInternal: isInternalNote && canSeeInternalNotes,
      timestamp: 'Just now',
      text: newMessageText
    };

    const updatedThreads = threads.map(t => {
      if (t.id === activeThreadId) {
        return {
          ...t,
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    setNewMessageText('');
  };

  return (
    <div className="module-container collaboration-module">
      <div className="module-header-banner">
        <div>
          <h2>Client & CPA Contextual Communication Hub</h2>
          <p>Unified communication anchored directly to tax documents and issues. Internal firm notes are visibly separated from client messages.</p>
        </div>
      </div>

      <div className="collaboration-layout">
        {/* Left Thread Navigator */}
        <div className="threads-sidebar">
          <div className="sidebar-header">
            <h3>💬 Contextual Threads</h3>
            <span className="count-badge">{threads.length} Active</span>
          </div>
          <div className="threads-list">
            {threads.map(t => (
              <div
                key={t.id}
                className={`thread-card ${t.id === activeThreadId ? 'active' : ''}`}
                onClick={() => setActiveThreadId(t.id)}
              >
                <div className="thread-title">{t.title}</div>
                <div className="thread-anchors">
                  <span className="anchor-pill">📄 {t.linkedDocument}</span>
                  <span className="anchor-pill">📍 {t.linkedField}</span>
                </div>
                <div className="thread-footer">
                  <span className={`owner-pill ${t.owner.includes('Client') ? 'owner-client' : 'owner-firm'}`}>
                    Next Action: {t.owner}
                  </span>
                  <span className="msg-count">{t.messages.length} msgs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Conversation Canvas */}
        <div className="thread-canvas">
          {activeThread && (
            <>
              <div className="canvas-header">
                <div>
                  <h3>{activeThread.title}</h3>
                  <div className="thread-context-meta">
                    <span>Anchored to Document: <strong>{activeThread.linkedDocument}</strong></span>
                    <span>Line Item: <strong>{activeThread.linkedField}</strong></span>
                  </div>
                </div>
                <div className="canvas-action-owner">
                  <span className="label">Current Action Owner:</span>
                  <div className="owner-badge">{activeThread.owner}</div>
                </div>
              </div>

              {/* Message List */}
              <div className="messages-scroll">
                {activeThread.messages
                  .filter(m => !m.isInternal || canSeeInternalNotes)
                  .map(m => (
                    <div
                      key={m.id}
                      className={`message-bubble ${m.isInternal ? 'internal-note' : 'client-visible'}`}
                    >
                      <div className="msg-header">
                        <span className="msg-sender">{m.sender}</span>
                        <span className="msg-type-tag">
                          {m.isInternal ? '🔒 INTERNAL FIRM NOTE (Not visible to client)' : '🌐 CLIENT VISIBLE'}
                        </span>
                        <span className="msg-time">{m.timestamp}</span>
                      </div>
                      <div className="msg-text">{m.text}</div>
                    </div>
                  ))}
              </div>

              {/* Message Composer */}
              <div className="message-composer">
                <div className="composer-toolbar">
                  {canSeeInternalNotes && (
                    <label className="internal-toggle">
                      <input
                        type="checkbox"
                        checked={isInternalNote}
                        onChange={(e) => setIsInternalNote(e.target.checked)}
                      />
                      <span className="toggle-text">
                        🔒 Post as <strong>Internal Firm Note</strong> (Client will NOT see this)
                      </span>
                    </label>
                  )}
                </div>

                <div className="composer-input-row">
                  <textarea
                    rows={3}
                    placeholder={
                      isInternalNote
                        ? 'Type an internal note for CPAs and Reviewers...'
                        : 'Type a message to Sarah & David Jenkins...'
                    }
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                  />
                  <button className="btn-send" onClick={handleSendMessage}>
                    Send {isInternalNote ? 'Internal Note 🔒' : 'Message 🌐'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
