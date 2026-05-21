import React, { useState } from 'react';
import './TaskForm.css';

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd({ title, description });
    setTitle('');
    setDescription('');
    setExpanded(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-card">
        <input
          className="title-input"
          type="text"
          placeholder="What do you need to do?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          onFocus={() => setExpanded(true)}
        />
        {expanded && (
          <textarea
            className="desc-input"
            placeholder="Add a description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
          />
        )}
        <div className="form-actions">
          {expanded && (
            <button
              type="button"
              className="btn-cancel"
              onClick={() => { setExpanded(false); setTitle(''); setDescription(''); }}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-add" disabled={!title.trim()}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Add Task
          </button>
        </div>
      </div>
    </form>
  );
}
