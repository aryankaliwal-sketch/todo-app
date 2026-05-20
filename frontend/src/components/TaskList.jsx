import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

export default function TaskList({ tasks, onToggle, onUpdate, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty">
        <span className="empty-icon">🎉</span>
        <p>Nothing here — you're all caught up!</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
