import React from 'react';
import { ROLES } from '../data/mockTaxData.js';

export default function Navigation({
  currentRole,
  onRoleChange,
  theme,
  onToggleTheme,
  activeTab,
  onTabChange,
  isDualIdentityPersonal,
  onToggleDualIdentity,
  searchQuery,
  onSearchChange
}) {
  return (
    <header className="app-nav">
      <div className="nav-top">
        <div className="nav-brand">
          <div className="logo-icon">✨</div>
          <div className="logo-text">
            <span className="brand-name">TaxOS<span className="accent-ai">.ai</span></span>
            <span className="brand-tagline">AI-Powered Tax Platform</span>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="nav-search">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search return fields, clients, documents, or threads... (Press '/' to focus)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search" onClick={() => onSearchChange('')}>✕</button>
          )}
        </div>

        {/* Role Switcher & Dual Identity Control */}
        <div className="nav-controls">
          <div className="role-selector-wrap">
            <label className="control-label">View As Role:</label>
            <select
              className="role-select"
              value={currentRole.id}
              onChange={(e) => {
                const selected = ROLES.find(r => r.id === e.target.value);
                if (selected) onRoleChange(selected);
              }}
            >
              {ROLES.map(r => (
                <option key={r.id} value={r.id}>
                  {r.icon} {r.name} ({r.badge})
                </option>
              ))}
            </select>
          </div>

          {/* Dual Identity Toggle for Firm Staff */}
          {(currentRole.id === 'preparer' || currentRole.id === 'reviewer') && (
            <button
              className={`dual-identity-btn ${isDualIdentityPersonal ? 'personal-mode' : 'firm-mode'}`}
              onClick={onToggleDualIdentity}
              title="Access personal return without context leak"
            >
              {isDualIdentityPersonal ? '💼 Switch to CPA Firm Workload' : '👤 My Personal 2025 Return'}
            </button>
          )}

          {/* Theme Toggle */}
          <button className="theme-toggle-btn" onClick={onToggleTheme} title="Toggle Dark/Light Mode">
            {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </div>

      {/* Primary Module Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onTabChange('dashboard')}
        >
          ⚡ Action Dashboard
        </button>
        <button
          className={`nav-tab ${activeTab === 'traceability' ? 'active' : ''}`}
          onClick={() => onTabChange('traceability')}
        >
          🔍 Source Traceability
        </button>
        <button
          className={`nav-tab ${activeTab === 'collaboration' ? 'active' : ''}`}
          onClick={() => onTabChange('collaboration')}
        >
          💬 Client Messages
        </button>
        <button
          className={`nav-tab ${activeTab === 'onboarding' ? 'active' : ''}`}
          onClick={() => onTabChange('onboarding')}
        >
          🚀 Client Onboarding
        </button>
        <button
          className={`nav-tab ${activeTab === 'nav_graph' ? 'active' : ''}`}
          onClick={() => onTabChange('nav_graph')}
        >
          🔗 Context Graph
        </button>
        <button
          className={`nav-tab ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => onTabChange('status')}
        >
          📊 Progress Pipeline
        </button>
        <button
          className={`nav-tab ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => onTabChange('roles')}
        >
          👥 Role Matrix
        </button>
        <button
          className={`nav-tab ${activeTab === 'affordances' ? 'active' : ''}`}
          onClick={() => onTabChange('affordances')}
        >
          ✨ Design System
        </button>
        <button
          className={`nav-tab ${activeTab === 'scale' ? 'active' : ''}`}
          onClick={() => onTabChange('scale')}
        >
          📦 Return Explorer
        </button>
        <button
          className={`nav-tab ${activeTab === 'ai_trust' ? 'active' : ''}`}
          onClick={() => onTabChange('ai_trust')}
        >
          🤖 Trustworthy AI
        </button>
      </nav>
    </header>
  );
}
