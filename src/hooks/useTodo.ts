import type { Todo } from '../types/todo'
import { useState, useEffect, useMemo } from 'react'

const STORAGE_KEY = 'todos'

export type TodoFilter = 'all' | 'active' | 'completed'

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Todo[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<TodoFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const filteredTodos = useMemo(() => {
    let list = todos
    if (filter === 'active') list = list.filter((t) => t.status === 'pending')
    else if (filter === 'completed') list = list.filter((t) => t.status === 'completed')
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.date.toLowerCase().includes(q) ||
          (t.hour ?? '').toLowerCase().includes(q)
      )
    }
    return [...list].sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date)
      return (a.hour ?? '').localeCompare(b.hour ?? '')
    })
  }, [todos, filter, searchQuery])


    const addTodo = (title: string, description: string, date: string, hour?: string) => {
      const newTodo: Todo ={
        id: crypto.randomUUID(),
        title,
        description,
        date,
        hour,
        status: 'pending',
      }
      setTodos((prev: Todo[]) => [...prev, newTodo]);
    }

    const toggleTodo = (id: string) => {
      setTodos((prev) => 
        prev.map((todo) =>
          todo.id === id ? { ...todo, status: todo.status === 'pending' ? 'completed' : 'pending' } 
        : todo
        )
      )
    }

    const deleteTodo = (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

  const updateTodo = (id: string, payload: { title?: string; description?: string; date?: string; hour?: string }) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...payload } : todo
      )
    )
  }

  const totalCount = todos.length
  const completedCount = todos.filter((t) => t.status === 'completed').length

  return {
    todos: filteredTodos,
    totalCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
  }
}
