import { useState } from 'react'

const categories = ['Programming', 'Reading', 'Math', 'Science', 'History', 'Other']

function getFormValues(task) {
  return {
    title: task?.title ?? '',
    category: task?.category ?? 'Programming',
    dueDate: task?.dueDate ?? '',
    priority: task?.priority ?? 'Medium',
  }
}

export default function TaskForm({
  initialTask,
  onSubmit,
  onCancel,
}) {
  const [formValues, setFormValues] = useState(() => getFormValues(initialTask))
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = formValues.title.trim()

    if (!trimmedTitle) {
      setError('Please enter a task title.')
      return
    }

    setError('')
    onSubmit({ ...formValues, title: trimmedTitle })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <h2 className="text-xl font-semibold">
        {initialTask ? 'Edit task' : 'Add a task'}
      </h2>

      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Task title
        </label>
        <input
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'title-error' : undefined}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
          placeholder="e.g. Review lecture notes"
        />
        {error && (
          <p id="title-error" role="alert" className="mt-1 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formValues.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dueDate" className="mb-1 block text-sm font-medium">
            Due date
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formValues.dueDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="priority" className="mb-1 block text-sm font-medium">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formValues.priority}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
        >
          {initialTask ? 'Save changes' : 'Add task'}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}