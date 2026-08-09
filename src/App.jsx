import React, { useState, useEffect } from 'react';
import { ROLES } from './data/mockTaxData.js';
import Navigation from './components/Navigation.jsx';
import TraceabilityView from './components/TraceabilityView.jsx';
import CollaborationHub from './components/CollaborationHub.jsx';
import ClientOnboarding from './components/ClientOnboarding.jsx';
import ContextNavGraph from './components/ContextNavGraph.jsx';
import RoleArchitect from './components/RoleArchitect.jsx';
import ReturnStatusTracker from './components/ReturnStatusTracker.jsx';
import CPADashboard from './components/CPADashboard.jsx';
import AffordanceSystem from './components/AffordanceSystem.jsx';
import ScaleExplorer from './components/ScaleExplorer.jsx';
import TrustworthyAI from './components/TrustworthyAI.jsx';
import './App.css';

export default function App() {
  const [currentRole, setCurrentRole] = useState(ROLES[0]); // Tax Preparer
  const [theme, setTheme] = useState('dark');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDualIdentityPersonal, setIsDualIdentityPersonal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLineItemId, setSelectedLineItemId] = useState('line-1a');

  // Apply theme to document html element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-root">
      {/* Main Header & Role Switcher */}
      <Navigation
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDualIdentityPersonal={isDualIdentityPersonal}
        onToggleDualIdentity={() => setIsDualIdentityPersonal(!isDualIdentityPersonal)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main View Container */}
      <main className="app-main-content">
        {activeTab === 'dashboard' && (
          <CPADashboard
            currentRole={currentRole}
            onSelectReturn={(retId) => setActiveTab('traceability')}
          />
        )}

        {activeTab === 'traceability' && (
          <TraceabilityView
            selectedLineItemId={selectedLineItemId}
            onSelectLineItem={setSelectedLineItemId}
            onOpenAIInspector={(itemId) => {
              setSelectedLineItemId(itemId);
              setActiveTab('ai_trust');
            }}
          />
        )}

        {activeTab === 'collaboration' && (
          <CollaborationHub currentRole={currentRole} />
        )}

        {activeTab === 'onboarding' && (
          <ClientOnboarding />
        )}

        {activeTab === 'nav_graph' && (
          <ContextNavGraph onNavigateToModule={setActiveTab} />
        )}

        {activeTab === 'roles' && (
          <RoleArchitect
            currentRole={currentRole}
            onSelectRole={setCurrentRole}
            isDualIdentityPersonal={isDualIdentityPersonal}
            onToggleDualIdentity={() => setIsDualIdentityPersonal(!isDualIdentityPersonal)}
          />
        )}

        {activeTab === 'status' && (
          <ReturnStatusTracker currentRole={currentRole} />
        )}

        {activeTab === 'affordances' && (
          <AffordanceSystem />
        )}

        {activeTab === 'scale' && (
          <ScaleExplorer />
        )}

        {activeTab === 'ai_trust' && (
          <TrustworthyAI selectedItemId={selectedLineItemId} />
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <span>✨ <strong>TaxOS.ai</strong> — Next-Generation AI Tax Platform</span>
          <span>Built with React 19 & Vite</span>
        </div>
      </footer>
    </div>
  );
}
