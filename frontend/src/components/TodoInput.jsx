import React, { useState } from 'react';
import { Plus, Tag, Flag } from 'lucide-react';

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('devops');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || isSubmitting) return;

    setIsSubmitting(true);
    await onAdd({ text: text.trim(), priority, category });
    setText('');
    setIsSubmitting(false);
  };

  return (
    <form className="glass-card todo-form" onSubmit={handleSubmit}>
      <div className="input-row">
        <div className="main-input-wrapper">
          <input
            type="text"
            className="todo-input"
            placeholder="Add a new task (e.g. Set up Jenkins pipeline, Write Kubernetes YAML...)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={!text.trim() || isSubmitting}>
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

      <div className="options-row">
        <div className="select-wrapper">
          <Flag size={14} />
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High 🔥</option>
          </select>
        </div>

        <div className="select-wrapper">
          <Tag size={14} />
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="devops">DevOps</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="testing">Testing</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>
    </form>
  );
}
