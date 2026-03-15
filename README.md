# ToDo

A modern task manager built with React, TypeScript, and Vite. Add tasks with title, description, date, and time; filter by All / Active / Completed; search; and persist data in the browser.

---

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** – build and dev server
- **Framer Motion** – slide-in for new tasks, fade-out on delete
- **localStorage** – persistence (no backend)

---

## Project Structure

```
src/
├── main.tsx              # Entry: mounts App, loads global CSS
├── App.tsx                # Root layout: header, add form, filters, list
├── App.css                # App-only styles (layout, header)
├── index.css              # Global tokens, reset, shared component styles
├── types/
│   └── todo.tsx           # Todo interface, TodoStatus type
├── hooks/
│   └── useTodo.ts         # State, persistence, filtering, CRUD
└── components/
    ├── ToDoInput.tsx      # "Add new" form (title, description, date, time)
    ├── ToDoList.tsx       # Table of tasks + progress bar + edit/delete
    ├── ProgressBar.tsx    # Completed / total (percentage bar)
    ├── TodoLogo.tsx       # Header logo
    └── Icons.tsx          # SVG icons (add, list, filters, search)
```

---

## Data & UI Flow

### 1. Single source of truth: `useTodo`

All task state lives in the **`useTodo`** hook:

- **State:** `todos` (full list), `filter` (all | active | completed), `searchQuery`
- **Persistence:** `useEffect` writes `todos` to `localStorage` on change; `loadTodos()` reads on init
- **Derived:** `filteredTodos` = filter + search + sort by date/time; `totalCount`, `completedCount` for the progress bar
- **Actions:** `addTodo`, `toggleTodo`, `deleteTodo`, `updateTodo`, `setFilter`, `setSearchQuery`

### 2. App wires everything

**`App.tsx`** is the only consumer of `useTodo`. It:

- Gets `todos`, `totalCount`, `completedCount`, and all actions from `useTodo()`
- Renders **header** (logo, search, date)
- Renders **Add new** card → passes `addTodo` to `TodoInput`
- Renders **filter tabs** (All / Active / Completed) → `setFilter`
- Renders **To-Do list** card → passes `todos`, counts, and `onToggle` / `onDelete` / `onUpdate` to `TodoList`

So: **data and logic in the hook → App passes them down as props.**

### 3. Components

| Component   | Role |
|------------|------|
| **TodoInput** | Local state for form fields; on submit calls `onAdd(title, description, date, hour)` and clears fields. |
| **TodoList**  | Receives `todos` + handlers. Local state for `editingId`, `deletingId`, and edit form values. Renders progress bar, table, empty state; uses Framer Motion for list item animations. Delete: set `deletingId` → run fade-out → on animation end call `onDelete(id)`. |
| **ProgressBar** | Displays `completed / total` and an animated fill bar (Framer Motion). |

### 4. Flow summary

```
useTodo (state + localStorage)
    ↓
App (layout, passes props)
    ↓
TodoInput → addTodo
TodoList  → onToggle, onDelete, onUpdate (→ setTodos in useTodo)
```

Data flows **down** via props; changes flow **up** via callbacks that update state in `useTodo`, which then re-renders App and children with new `todos` / counts.

---

## Scripts

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build
npm run preview # preview production build
npm run lint    # ESLint
```

---

## Features

- Add task: title, description, date, time (optional)
- Mark complete / incomplete (toggle)
- Edit task (inline)
- Delete task (with fade-out animation)
- Filter: All, Active, Completed
- Search by title, description, date, or time
- Progress bar: completed vs total tasks
- Tasks sorted by date, then time
- Persistence in `localStorage`
- Responsive layout; accessibility-friendly markup
