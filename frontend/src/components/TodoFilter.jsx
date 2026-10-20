import React from 'react';
import { Search, Trash2 } from 'lucide-react';

export default function TodoFilter({ 
  filter, 
  setFilter, 
  searchQuery, 
  setSearchQuery,
  hasCompleted,
  onClearCompleted 
}) {
  const tabs = [
    { id: 'all', label: 'All Tasks' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="filter-bar">
      <div className="filter-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`filter-tab ${filter === tab.id ? 'active' : ''}`}
            onClick={() => setFilter(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="search-wrapper">
        <Search size={16} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {hasCompleted && (
        <button 
          className="filter-tab"
          onClick={onClearCompleted}
          style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Trash2 size={14} />
          <span>Clear Completed</span>
        </button>
      )}
    </div>
  );
}
