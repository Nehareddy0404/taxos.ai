import React, { useState } from 'react';

export default function ScaleExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [density, setDensity] = useState('comfortable');
  const [expandedCategoryId, setExpandedCategoryId] = useState('sched-c');

  // Synthetic large dataset of 150+ return items
  const CATEGORIES = [
    {
      id: 'income',
      title: 'Income & Wages (Form 1040 Lines 1 - 9)',
      icon: '💰',
      totalAmount: '$342,850.00',
      itemsCount: 24,
      items: Array.from({ length: 24 }, (_, i) => ({
        id: `inc-${i}`,
        code: `Line 1${String.fromCharCode(97 + (i % 6))}`,
        label: i === 0 ? 'Wages, Salaries (Form W-2)' : i === 1 ? 'Taxable Interest (1099-INT)' : `Other Income Source #${i + 1}`,
        amount: `$${(45000 + i * 3200).toLocaleString()}.00`,
        doc: i === 0 ? 'W-2 Acme Tech' : '1099 Consolidated',
        state: i % 2 === 0 ? 'verified' : 'ai_generated'
      }))
    },
    {
      id: 'sched-c',
      title: 'Schedule C Profit/Loss from Business (Consulting)',
      icon: '🏢',
      totalAmount: '$124,500.00 Net',
      itemsCount: 42,
      items: Array.from({ length: 42 }, (_, i) => ({
        id: `schc-${i}`,
        code: `Line ${10 + (i % 20)}`,
        label: i === 0 ? 'Software & Cloud Subscriptions (AWS/OpenAI)' : i === 1 ? 'Contract Labor 1099-NEC' : `Business Expense Item #${i + 1}`,
        amount: `$${(1200 + i * 450).toLocaleString()}.00`,
        doc: 'Schedule C Ledger',
        state: i === 0 ? 'editable' : 'verified'
      }))
    },
    {
      id: 'sched-d',
      title: 'Schedule D Capital Gains & Stock Transactions',
      icon: '📈',
      totalAmount: '$18,400.00 Net Gain',
      itemsCount: 85,
      items: Array.from({ length: 85 }, (_, i) => ({
        id: `schd-${i}`,
        code: `Form 8949 Part ${i % 2 === 0 ? 'I' : 'II'}`,
        label: `Crypto / Stock Sale Position #${i + 1} (Coinbase / Fidelity)`,
        amount: `$${(3000 + (i * 1200) % 15000).toLocaleString()}.00`,
        doc: 'Consolidated 1099-B',
        state: i % 5 === 0 ? 'requires_approval' : 'verified'
      }))
    }
  ];

  const totalItemsCount = CATEGORIES.reduce((sum, c) => sum + c.itemsCount, 0);

  return (
    <div className="module-container scale-module">
      <div className="module-header-banner">
        <div>
          <h2>Progressive Disclosure & Return Explorer (150+ Line Items)</h2>
          <p>Navigable complexity for deep professional tax review. Summary cards expand into micro-details with instant search & density controls.</p>
        </div>
      </div>

      {/* Control Bar: Search, Density, Filters */}
      <div className="scale-controls-bar">
        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search 150+ return items, forms, or receipts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="density-toggle">
          <span className="lbl">Layout Density:</span>
          <button
            className={`density-btn ${density === 'comfortable' ? 'active' : ''}`}
            onClick={() => setDensity('comfortable')}
          >
            Comfortable
          </button>
          <button
            className={`density-btn ${density === 'compact' ? 'active' : ''}`}
            onClick={() => setDensity('compact')}
          >
            Compact (High Density)
          </button>
        </div>

        <div className="total-indicator">
          <strong>{totalItemsCount}</strong> Total Line Items Navigable
        </div>
      </div>

      {/* Progressive Disclosure Category List */}
      <div className="categories-accordion">
        {CATEGORIES.map(cat => {
          const isExpanded = expandedCategoryId === cat.id;
          const filteredItems = cat.items.filter(i =>
            !searchQuery ||
            i.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            i.code.toLowerCase().includes(searchQuery.toLowerCase())
          );

          return (
            <div key={cat.id} className="category-accordion-card">
              {/* Category Summary Header (Level 1 Disclosure) */}
              <div
                className="accordion-header"
                onClick={() => setExpandedCategoryId(isExpanded ? null : cat.id)}
              >
                <div className="header-left">
                  <span className="cat-icon">{cat.icon}</span>
                  <div>
                    <h3>{cat.title}</h3>
                    <span className="count-tag">{cat.itemsCount} Sub-items</span>
                  </div>
                </div>
                <div className="header-right">
                  <span className="cat-total">{cat.totalAmount}</span>
                  <span className="chevron">{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Category Micro-Details Table (Level 2 Disclosure) */}
              {isExpanded && (
                <div className={`accordion-body density-${density}`}>
                  <table className="scale-table">
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Item Description</th>
                        <th>Amount</th>
                        <th>Source Document</th>
                        <th>State</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredItems.map(item => (
                        <tr key={item.id}>
                          <td><code>{item.code}</code></td>
                          <td><strong>{item.label}</strong></td>
                          <td>{item.amount}</td>
                          <td>📄 {item.doc}</td>
                          <td>
                            <span className={`affordance-badge badge-${item.state}`}>
                              {item.state}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
