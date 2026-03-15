import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Todo } from '../types/todo'
import { IconEmpty } from './Icons'
import { ProgressBar } from './ProgressBar'

export interface TodoListProps {
  todos: Todo[]
  totalCount: number
  completedCount: number
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, payload: { title?: string; description?: string; date?: string; hour?: string }) => void
}

export const TodoList = ({ todos, totalCount, completedCount, onToggle, onDelete, onUpdate }: TodoListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editHour, setEditHour] = useState('')

  const handleDelete = (id: string) => {
    setDeletingId(id)
  }

  const handleDeleteComplete = (id: string) => {
    onDelete(id)
    setDeletingId(null)
  }

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditTitle(todo.title)
    setEditDescription(todo.description)
    setEditDate(todo.date)
    setEditHour(todo.hour ?? '')
  }

  const saveEdit = (id: string) => {
    onUpdate(id, { title: editTitle, description: editDescription, date: editDate, hour: editHour || undefined })
    setEditingId(null)
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  if (todos.length === 0) {
    return (
      <>
        {totalCount > 0 && <ProgressBar completed={completedCount} total={totalCount} />}
        <div className="empty-state" role="status">
          <span aria-hidden><IconEmpty /></span>
          <p>{totalCount === 0 ? 'No tasks yet.' : 'No tasks match your filter.'}</p>
        </div>
      </>
    )
  }

  return (
    <>
      <ProgressBar completed={completedCount} total={totalCount} />
      <div className="todo-list-grid">
        <div className="todo-list-header">
          <div className="todo-list-header-cell todo-list-header-check">✓</div>
          <div className="todo-list-header-cell todo-list-header-title">Title</div>
          <div className="todo-list-header-cell todo-list-header-description">Description</div>
          <div className="todo-list-header-cell todo-list-header-date">Date</div>
          <div className="todo-list-header-cell todo-list-header-hour">Hour</div>
          <div className="todo-list-header-cell todo-list-header-actions">Actions</div>
        </div>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            className={`todo-item ${todo.status === 'completed' ? 'todo-item-completed' : ''}`}
            initial={{ opacity: 0, x: -24 }}
            animate={{
              opacity: deletingId === todo.id ? 0 : 1,
              x: deletingId === todo.id ? 24 : 0,
            }}
            transition={{
              duration: 0.25,
              ease: [0.4, 0, 0.2, 1],
            }}
            onAnimationComplete={
              deletingId === todo.id ? () => handleDeleteComplete(todo.id) : undefined
            }
          >
          {editingId === todo.id ? (
            <form className="todo-item-edit-wrap todo-edit-form" onSubmit={(e) => { e.preventDefault(); saveEdit(todo.id); }}>
              <div className="todo-edit-cell todo-edit-check" aria-hidden />
              <div className="todo-edit-cell todo-edit-title">
                <input className="todo-edit-input" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Title" aria-label="Edit title" />
              </div>
              <div className="todo-edit-cell todo-edit-description">
                <textarea className="todo-edit-input todo-edit-textarea" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="Description" aria-label="Edit description" />
              </div>
              <div className="todo-edit-cell todo-edit-date">
                <input type="date" className="todo-edit-input" value={editDate} onChange={(e) => setEditDate(e.target.value)} aria-label="Edit date" />
              </div>
              <div className="todo-edit-cell todo-edit-hour">
                <input type="time" className="todo-edit-input" value={editHour} onChange={(e) => setEditHour(e.target.value)} aria-label="Edit time" />
              </div>
              <div className="todo-edit-cell todo-edit-actions">
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>
              </div>
            </form>
          ) : (
            <>
              <div className="todo-item-check">
                <button
                  type="button"
                  className="btn-check"
                  onClick={() => onToggle(todo.id)}
                  aria-label={todo.status === 'completed' ? 'Mark incomplete' : 'Mark complete'}
                >
                  <span aria-hidden>{todo.status === 'completed' ? '✓' : ''}</span>
                </button>
              </div>
              <div className="todo-item-title">{todo.title}</div>
              <div className="todo-item-description" dir="auto">{todo.description || '—'}</div>
              <div className="todo-item-date">{todo.date}</div>
              <div className="todo-item-hour">{todo.hour ?? '—'}</div>
              <div className="todo-item-actions">
                <button type="button" className="btn btn-small" onClick={() => startEdit(todo)}>Edit</button>
                <button type="button" className="btn btn-small btn-danger" onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </>
          )}
          </motion.div>
        ))}
      </div>
    </>
  )
}
