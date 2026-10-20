import React from 'react';
import { ListTodo, CheckCircle2, Clock, Flame } from 'lucide-react';

export default function Stats({ todos = [] }) {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  const pending = total - completed;
  const highPriority = todos.filter(t => !t.completed && t.priority === 'high').length;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-header">
          <span>Total Tasks</span>
          <ListTodo size={18} color="var(--primary)" />
        </div>
        <span className="stat-value">{total}</span>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span>Completed</span>
          <CheckCircle2 size={18} color="var(--success)" />
        </div>
        <span className="stat-value">{completed}</span>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span>Pending</span>
          <Clock size={18} color="var(--warning)" />
        </div>
        <span className="stat-value">{pending}</span>
      </div>

      <div className="stat-card">
        <div className="stat-header">
          <span>High Priority</span>
          <Flame size={18} color="var(--danger)" />
        </div>
        <span className="stat-value">{highPriority}</span>
      </div>
    </div>
  );
}
