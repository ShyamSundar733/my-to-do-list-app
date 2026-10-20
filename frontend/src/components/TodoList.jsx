import React from 'react';
import TodoItem from './TodoItem';
import { ClipboardList } from 'lucide-react';

export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <ClipboardList size={28} />
        </div>
        <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>No tasks found</p>
        <p style={{ fontSize: '0.85rem' }}>Add a task above or adjust your search filter</p>
      </div>
    );
  }

  return (
    <div className="todo-list-container">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}
