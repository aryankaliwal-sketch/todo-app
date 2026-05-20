import React, { useState } from 'react';
import './TaskItem.css';

export default function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) return;
    await onUpdate(task.id, { title, description });
    setEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setEditing(false);
  };

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(task.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {editing ? (
        <div className="edit-body">
          <input
            className="edit-title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className="edit-desc"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={2}
            placeholder="Description (optional)"
          />
          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave} disabled={!title.trim()}>Save</button>
            <button className="btn-discard" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <button
            className="checkbox"
            onClick={() => onToggle(task.id)}
            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {task.completed && (
              <svg viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <div className="task-body">
            <p className="task-title">{task.title}</p>
            {task.description && <p className="task-desc">{task.description}</p>}
          </div>
          <div className="task-actions">
            <button className="icon-btn edit-btn" onClick={() => setEditing(true)} title="Edit">
              <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.69 2.31a1.5 1.5 0 012.12 2.12l-9.9 9.9-2.83.71.71-2.83 9.9-9.9z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className={`icon-btn delete-btn ${confirmDelete ? 'confirm' : ''}`}
              onClick={handleDelete}
              title={confirmDelete ? 'Click again to confirm' : 'Delete'}
            >
              {confirmDelete ? (
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6h14M8 6V4h4v2M6 6l1 10h6l1-10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </>
      )}
    </li>
  );
}
