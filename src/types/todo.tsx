export type TodoStatus = 'pending' | 'completed'

/** Todo item: uses title + description (no deprecated "content" field). */
export interface Todo {
  id: string
  title: string
  description: string
  date: string
  hour?: string
  status: TodoStatus
}
