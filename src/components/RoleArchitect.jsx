import React from 'react';
import { ROLES } from '../data/mockTaxData.js';
import { getRolePermissions } from '../utils/taxEngine.js';

export default function RoleArchitect({ currentRole, onSelectRole, isDualIdentityPersonal, onToggleDualIdentity }) {
  const currentPerms = getRolePermissions(currentRole.id);

  return (
    <div className="module-container role-module">
      <div className="module-header-banner">
        <div>
          <h2>Role Matrix & Permission Architecture</h2>
          <p>One product shell adapting across 6 user roles without splintering into separate apps. Clean permission boundaries and dual-identity support.</p>
        </div>
      </div>

      {/* Role Switcher Grid */}
      <div className="roles-grid">
        {ROLES.map(role => {
          const isActive = role.id === currentRole.id;
          const perms = getRolePermissions(role.id);

          return (
            <div
              key={role.id}
              className={`role-card ${isActive ? 'active' : ''}`}
              onClick={() => onSelectRole(role)}
            >
              <div className="role-card-top">
                <span className="role-icon">{role.icon}</span>
                <span className="role-badge-tag">{role.badge}</span>
              </div>
              <h3 className="role-name">{role.name}</h3>
              <p className="role-desc">{role.description}</p>

              <div className="role-perms-mini">
                <span className={`perm-chip ${perms.viewInternalNotes ? 'yes' : 'no'}`}>
                  {perms.viewInternalNotes ? '🔒 Internal Notes' : '🚫 No Firm Notes'}
                </span>
                <span className={`perm-chip ${perms.approveReturn ? 'yes' : 'no'}`}>
                  {perms.approveReturn ? '✅ Can Approve' : '🔒 No Approval'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Role Permissions & Shell Comparison */}
      <div className="role-detail-panel">
        <div className="card-header">
          <h3>👤 Active Context: {currentRole.name} ({currentPerms.badge})</h3>
          <span className="info-tag">System Shell Configuration</span>
        </div>

        <div className="perms-matrix">
          <div className="perm-row">
            <span className="perm-name">Internal Firm Communication Access:</span>
            <span className="perm-val">{currentPerms.viewInternalNotes ? '🟢 Enabled (Can read/write internal CPA notes)' : '🔴 Disabled (Restricted to client-visible threads)'}</span>
          </div>
          <div className="perm-row">
            <span className="perm-name">Field Editing & Extraction Overrides:</span>
            <span className="perm-val">{currentPerms.editLineItems ? '🟢 Enabled' : '🔒 Read-Only'}</span>
          </div>
          <div className="perm-row">
            <span className="perm-name">Final Tax Return Manager Sign-Off:</span>
            <span className="perm-val">{currentPerms.approveReturn ? '🟢 Granted (Partner/Manager permission)' : '🔒 Restricted'}</span>
          </div>
          <div className="perm-row">
            <span className="perm-name">Interface Layout Density:</span>
            <span className="perm-val">{currentPerms.simplifiedClientView ? '📱 Simplified client action portal' : '🖥️ High-density CPA professional workstation'}</span>
          </div>
        </div>

        {/* Dual Identity Feature Card */}
        <div className="dual-identity-explainer">
          <h4>💼 Firm Employee with Personal Tax Return</h4>
          <p>
            When CPA Alex Rivera views client returns, the shell displays firm internal notes. When Alex toggles to <strong>My Personal Return</strong>, the context switcher automatically isolates firm notes to prevent self-audit conflict of interest.
          </p>
          <button
            className={`btn-dual-toggle ${isDualIdentityPersonal ? 'active-personal' : ''}`}
            onClick={onToggleDualIdentity}
          >
            {isDualIdentityPersonal ? '👤 Currently Viewing: Alex Rivera (Personal Return Mode)' : '💼 Currently Viewing: Alex Rivera (CPA Firm Workload Mode)'}
          </button>
        </div>
      </div>
    </div>
  );
}
