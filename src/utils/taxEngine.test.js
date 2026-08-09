import { describe, it, expect } from 'vitest';
import { filterAndPrioritizeReturns, filterLineItems, getRolePermissions, calculateSummaryMetrics } from './taxEngine.js';
import { MOCK_RETURNS, MOCK_LINE_ITEMS } from '../data/mockTaxData.js';

describe('Tax Engine Unit Tests', () => {
  it('correctly ranks returns by urgency and deadline', () => {
    const prioritized = filterAndPrioritizeReturns(MOCK_RETURNS, { searchQuery: '', filterStatus: 'all', filterUrgency: 'all', role: 'preparer' });
    expect(prioritized.length).toBe(5);
    // CRITICAL items should be at top
    expect(prioritized[0].urgency).toBe('CRITICAL');
  });

  it('filters returns by search query', () => {
    const results = filterAndPrioritizeReturns(MOCK_RETURNS, { searchQuery: 'Apex', filterStatus: 'all', filterUrgency: 'all', role: 'preparer' });
    expect(results.length).toBe(1);
    expect(results[0].clientName).toBe('Apex Tech Solutions LLC');
  });

  it('filters line items by affordance state', () => {
    const verifiedItems = filterLineItems(MOCK_LINE_ITEMS, { searchQuery: '', filterState: 'verified', scheduleFilter: 'all' });
    expect(verifiedItems.length).toBe(1);
    expect(verifiedItems[0].id).toBe('line-1a');
  });

  it('returns role permissions accurately for CPA vs Client', () => {
    const cpaPerms = getRolePermissions('preparer');
    const clientPerms = getRolePermissions('client_ind');

    expect(cpaPerms.viewInternalNotes).toBe(true);
    expect(clientPerms.viewInternalNotes).toBe(false);
    expect(clientPerms.simplifiedClientView).toBe(true);
  });

  it('calculates summary metrics accurately', () => {
    const metrics = calculateSummaryMetrics(MOCK_RETURNS);
    expect(metrics.total).toBe(5);
    expect(metrics.urgent).toBe(3); // 2 CRITICAL + 1 HIGH
  });
});
