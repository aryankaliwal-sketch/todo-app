# Taskly — Full-Stack To-Do App

A modern to-do list application with a React frontend and Node/Express backend.

## Project Structure

```
ToDo App/
├── backend/      # Express REST API (port 5000)
└── frontend/     # React app (port 3000)
```

## Getting Started

### 1. Install & run the backend

```bash
cd backend
npm install
npm run dev
```

### 2. Install & run the frontend (new terminal)

```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000**.  
The frontend proxies `/api` requests to the backend on port 5000.

## API Endpoints

| Method | Endpoint                  | Description          |
|--------|---------------------------|----------------------|
| GET    | /api/tasks                | List all tasks       |
| POST   | /api/tasks                | Create a task        |
| PUT    | /api/tasks/:id            | Update title/desc    |
| PATCH  | /api/tasks/:id/toggle     | Toggle completed     |
| DELETE | /api/tasks/:id            | Delete a task        |

## Features

- Add tasks with optional description
- Mark tasks complete / incomplete
- Edit task title and description inline
- Delete tasks (with a two-click confirmation)
- Filter by All / Active / Completed
- Clean, responsive design
