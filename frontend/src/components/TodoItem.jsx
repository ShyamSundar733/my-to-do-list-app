import React, { useState } from 'react';
import { Check, Trash2, Edit3, Save, X } from 'lucide-react';

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (!editText.trim()) return;
    onUpdate(todo.id, { text: editText.trim() });
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setIsEditing(false);
  };

  return (
    <div className={`todo-item animate-fade-in ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content-group">
        <button 
          className="checkbox-btn"
          onClick={() => onToggle(todo.id)}
          title={todo.completed ? "Mark as Active" : "Mark as Completed"}
        >
          {todo.completed && <Check size={16} />}
        </button>

        <div className="todo-text-group" style={{ flex: 1 }}>
          {isEditing ? (
            <input
              type="text"
              className="todo-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              style={{ padding: '0.4rem 0.8rem' }}
            />
          ) : (
            <span className="todo-text">{todo.text}</span>
          )}

          <div className="todo-meta">
            <span className={`priority-badge ${todo.priority}`}>
              {todo.priority}
            </span>
            <span className="category-tag">
              #{todo.category}
            </span>
          </div>
        </div>
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button className="icon-btn" onClick={handleSave} title="Save">
              <Save size={16} />
            </button>
            <button className="icon-btn danger" onClick={() => setIsEditing(false)} title="Cancel">
              <X size={16} />
            </button>
          </>
        ) : (
          <>
            <button className="icon-btn" onClick={() => setIsEditing(true)} title="Edit Task">
              <Edit3 size={16} />
            </button>
            <button className="icon-btn danger" onClick={() => onDelete(todo.id)} title="Delete Task">
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
