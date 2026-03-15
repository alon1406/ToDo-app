import './App.css'
import { useTodo } from './hooks/useTodo'
import { TodoInput } from './components/ToDoInput'
import { TodoList } from './components/ToDoList'
import { TodoLogo } from './components/TodoLogo'
import { IconAdd, IconList, IconFilterAll, IconFilterActive, IconFilterDone, IconSearch } from './components/Icons'

export const App = () => {

  const { todos, totalCount, completedCount, addTodo, toggleTodo, deleteTodo, updateTodo, filter, setFilter, searchQuery, setSearchQuery } = useTodo()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="app-wrap">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <TodoLogo size={56} />
            <h1 className="header-title">ToDo</h1>
          </div>
          <div className="header-search">
            <span className="header-search-icon" aria-hidden>
              <IconSearch />
            </span>
            <input
              type="search"
              className="search-input"
              placeholder="Search for a task"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search tasks"
            />
          </div>
          <time className="header-date" dateTime={new Date().toISOString().slice(0, 10)}>{today}</time>
        </div>
      </header>
      <main className="app-main">
        <section className="card card-add">
          <h2 className="section-title">
            <span aria-hidden><IconAdd /></span>
            Add new
          </h2>
          <TodoInput onAdd={addTodo} />
        </section>
        <div className="dashboard-main">
          <div className="tabs" role="tablist" aria-label="Filter tasks">
            <button type="button" role="tab" className="tab" aria-selected={filter === 'all'} onClick={() => setFilter('all')}><span><IconFilterAll /></span>All</button>
            <button type="button" role="tab" className="tab" aria-selected={filter === 'active'} onClick={() => setFilter('active')}><span><IconFilterActive /></span>Active</button>
            <button type="button" role="tab" className="tab" aria-selected={filter === 'completed'} onClick={() => setFilter('completed')}><span><IconFilterDone /></span>Completed</button>
          </div>
          <section className="card card-list">
            <h2 className="section-title">
              <span aria-hidden><IconList /></span>
              To-Do list
            </h2>
            <TodoList todos={todos} totalCount={totalCount} completedCount={completedCount} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
          </section>
        </div>
      </main>
    </div>
  )
}
