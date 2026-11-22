import { useMemo, useState } from 'react'
import TaskCard from '../components/TaskCard.jsx'
import TaskFilters from '../components/TaskFilters.jsx'
import TaskForm from '../components/TaskForm.jsx'
import useDebounce from '../hooks/useDebounce.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function TasksPage({
  tasks,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  onToggleTask,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const debouncedSearch = useDebounce(searchTerm)
  const pendingCount = tasks.filter((task) => !task.completed).length
  useDocumentTitle(`Tasks (${pendingCount} pending) | StudyFlow`)

  const categories = [...new Set(tasks.map((task) => task.category))].sort()

  const visibleTasks = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase()

    const filteredTasks = tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(normalizedSearch)
      const matchesCategory = category === 'all' || task.category === category
      const matchesStatus =
        status === 'all' ||
        (status === 'completed' && task.completed) ||
        (status === 'pending' && !task.completed)

      return matchesSearch && matchesCategory && matchesStatus
    })

    return [...filteredTasks].sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title)
      }

      return (a.dueDate || '9999-12-31').localeCompare(
        b.dueDate || '9999-12-31',
      )
    })
  }, [tasks, debouncedSearch, category, status, sortBy])

  function openAddForm() {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  function closeForm() {
    setEditingTask(null)
    setIsFormOpen(false)
  }

  function handleFormSubmit(taskDetails) {
    if (editingTask) {
      onUpdateTask({ ...editingTask, ...taskDetails })
    } else {
      onAddTask(taskDetails)
    }

    closeForm()
  }

  function handleEdit(task) {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Plan your study time
          </p>
          <h1 className="mt-2 text-3xl font-bold">Tasks</h1>
          <p className="mt-2 text-slate-600">
            Add tasks, track progress, and find what you need to work on.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
        >
          Add task
        </button>
      </header>

      {isFormOpen && (
        <TaskForm
          key={editingTask?.id ?? 'new-task'}
          initialTask={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
        />
      )}

      <TaskFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        category={category}
        onCategoryChange={setCategory}
        status={status}
        onStatusChange={setStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories}
      />

      <p className="text-sm text-slate-600" aria-live="polite">
        Showing {visibleTasks.length} of {tasks.length} tasks
      </p>

      {tasks.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          You don’t have any tasks yet. Add one to get started.
        </p>
      ) : visibleTasks.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          No tasks match those search and filter choices. Try changing them.
        </p>
      ) : (
        <ul className="space-y-3">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onEdit={handleEdit}
              onDelete={onDeleteTask}
            />
          ))}
        </ul>
      )}
    </div>
  )
}