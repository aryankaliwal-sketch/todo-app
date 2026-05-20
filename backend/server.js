const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: uuidv4(), title: 'Buy groceries', description: 'Milk, eggs, bread', completed: false, createdAt: new Date().toISOString() },
  { id: uuidv4(), title: 'Read a book', description: 'Finish the novel on the nightstand', completed: true, createdAt: new Date().toISOString() },
];

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = {
    id: uuidv4(),
    title: title.trim(),
    description: (description || '').trim(),
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  res.status(201).json(task);
});

app.put('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Title is required' });
  }
  tasks[index] = { ...tasks[index], title: title.trim(), description: (description || '').trim() };
  res.json(tasks[index]);
});

app.patch('/api/tasks/:id/toggle', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks[index] = { ...tasks[index], completed: !tasks[index].completed };
  res.json(tasks[index]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });
  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
