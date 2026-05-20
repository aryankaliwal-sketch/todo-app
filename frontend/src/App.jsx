import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

const API = '/api/tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all | active | completed

  useEffect(() => {
    fetch(API)
      .then(r => r.json())
      .then(data => { setTasks(data); setLoading(false); })
      .catch(() => { setError('Could not connect to server.'); setLoading(false); });
  }, []);

  const addTask = async ({ title, description }) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    const task = await res.json();
    setTasks(prev => [task, ...prev]);
  };

  const updateTask = async (id, { title, description }) => {
    const res = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });
    const updated = await res.json();
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
  };

  const toggleTask = async (id) => {
    const res = await fetch(`${API}/${id}/toggle`, { method: 'PATCH' });
    const updated = await res.json();
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
  };

  return (
    <div className="app">
      <Header />
      <main className="main">
        <TaskForm onAdd={addTask} />
        <div className="filters">
          {['all', 'active', 'completed'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="badge">{counts[f]}</span>
            </button>
          ))}
        </div>
        {loading && <p className="state-msg">Loading tasks…</p>}
        {error && <p className="state-msg error">{error}</p>}
        {!loading && !error && (
          <TaskList
            tasks={filtered}
            onToggle={toggleTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        )}
      </main>
    </div>
  );
}
