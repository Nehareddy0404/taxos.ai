// taxEngine.js - Pure functions for TaxOS AI logic, prioritization, permissions & search

export function filterAndPrioritizeReturns(returns, { searchQuery = '', filterStatus = 'all', filterUrgency = 'all', role = 'preparer' }) {
  if (!Array.isArray(returns)) return [];

  return returns.filter(ret => {
    // Role filter check (Client only sees their own returns)
    if (role === 'client_ind' && ret.id !== 'ret-101' && ret.id !== 'ret-103') {
      return false;
    }
    if (role === 'client_biz' && ret.id !== 'ret-102' && ret.id !== 'ret-105') {
      return false;
    }

    // Text search matching
    const search = searchQuery.toLowerCase().trim();
    if (search) {
      const matchName = ret.clientName.toLowerCase().includes(search);
      const matchForm = ret.formType.toLowerCase().includes(search);
      const matchPreparer = ret.assignedPreparer.toLowerCase().includes(search);
      const matchBlocker = ret.blockingIssue.toLowerCase().includes(search);
      if (!matchName && !matchForm && !matchPreparer && !matchBlocker) return false;
    }

    // Status filter
    if (filterStatus === 'action_needed') {
      if (role.startsWith('client')) {
        if (ret.blockingOwner !== 'Client (Sarah)' && ret.blockingOwner !== 'Client (Marcus)' && ret.blockingOwner !== 'Client (Elena)') return false;
      } else {
        if (ret.internalStatus === 'ready_to_efile' || ret.internalStatus === 'completed') return false;
      }
    } else if (filterStatus === 'high_risk') {
      if (ret.riskScore !== 'HIGH' && ret.riskScore !== 'MEDIUM') return false;
    } else if (filterStatus !== 'all' && ret.internalStatus !== filterStatus) {
      return false;
    }

    // Urgency filter
    if (filterUrgency !== 'all' && ret.urgency !== filterUrgency) {
      return false;
    }

    return true;
  }).sort((a, b) => {
    // Prioritization scoring algorithm
    const urgencyWeight = { CRITICAL: 100, HIGH: 75, MEDIUM: 50, NORMAL: 25 };
    const scoreA = (urgencyWeight[a.urgency] || 0) + (30 - a.daysRemaining) * 2 + (a.riskScore === 'HIGH' ? 30 : 0);
    const scoreB = (urgencyWeight[b.urgency] || 0) + (30 - b.daysRemaining) * 2 + (b.riskScore === 'HIGH' ? 30 : 0);
    return scoreB - scoreA;
  });
}

export function filterLineItems(items, { searchQuery = '', filterState = 'all', scheduleFilter = 'all' }) {
  if (!Array.isArray(items)) return [];

  return items.filter(item => {
    const search = searchQuery.toLowerCase().trim();
    if (search) {
      const matchLabel = item.label.toLowerCase().includes(search);
      const matchForm = item.form.toLowerCase().includes(search);
      const matchDoc = item.sourceDocName.toLowerCase().includes(search);
      const matchCode = item.fieldCode.toLowerCase().includes(search);
      if (!matchLabel && !matchForm && !matchDoc && !matchCode) return false;
    }

    if (filterState !== 'all' && item.affordanceState !== filterState) {
      return false;
    }

    if (scheduleFilter !== 'all' && item.schedule !== scheduleFilter) {
      return false;
    }

    return true;
  });
}

export function getRolePermissions(roleId) {
  switch (roleId) {
    case 'preparer':
      return {
        viewInternalNotes: true,
        editLineItems: true,
        approveReturn: false,
        reassignStaff: false,
        viewRawAIOutputs: true,
        simplifiedClientView: false,
        badge: 'CPA Staff'
      };
    case 'reviewer':
      return {
        viewInternalNotes: true,
        editLineItems: true,
        approveReturn: true,
        reassignStaff: true,
        viewRawAIOutputs: true,
        simplifiedClientView: false,
        badge: 'CPA Partner'
      };
    case 'client_ind':
      return {
        viewInternalNotes: false,
        editLineItems: false,
        approveReturn: true,
        reassignStaff: false,
        viewRawAIOutputs: false,
        simplifiedClientView: true,
        badge: 'Individual Client'
      };
    case 'client_biz':
      return {
        viewInternalNotes: false,
        editLineItems: false,
        approveReturn: true,
        reassignStaff: false,
        viewRawAIOutputs: false,
        simplifiedClientView: true,
        badge: 'Business Client'
      };
    case 'admin':
      return {
        viewInternalNotes: true,
        editLineItems: false,
        approveReturn: false,
        reassignStaff: true,
        viewRawAIOutputs: true,
        simplifiedClientView: false,
        badge: 'System Admin'
      };
    case 'seasonal':
      return {
        viewInternalNotes: true,
        editLineItems: true,
        approveReturn: false,
        reassignStaff: false,
        viewRawAIOutputs: false,
        simplifiedClientView: false,
        badge: 'Seasonal Staff'
      };
    default:
      return {
        viewInternalNotes: true,
        editLineItems: true,
        approveReturn: false,
        reassignStaff: false,
        viewRawAIOutputs: true,
        simplifiedClientView: false,
        badge: 'User'
      };
  }
}

export function calculateSummaryMetrics(returns) {
  if (!returns) return { total: 0, urgent: 0, blocked: 0, ready: 0, avgConfidence: 0 };
  const total = returns.length;
  const urgent = returns.filter(r => r.urgency === 'CRITICAL' || r.urgency === 'HIGH').length;
  const blocked = returns.filter(r => r.blockingIssue && r.blockingIssue !== 'None - E-File Scheduled').length;
  const ready = returns.filter(r => r.internalStatus === 'client_approval' || r.internalStatus === 'ready_to_efile').length;
  const avgConfidence = Math.round(returns.reduce((acc, r) => acc + (r.aiConfidenceOverall || 90), 0) / (total || 1));

  return { total, urgent, blocked, ready, avgConfidence };
}
