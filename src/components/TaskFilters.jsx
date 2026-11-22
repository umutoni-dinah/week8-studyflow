import { useEffect, useRef } from 'react'

export default function TaskFilters({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  sortBy,
  onSortChange,
  categories,
}) {
  const searchInputRef = useRef(null)

  useEffect(() => {
    searchInputRef.current?.focus()
  }, [])

  return (
    <section className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
      <div className="sm:col-span-2 lg:col-span-1">
        <label htmlFor="task-search" className="mb-1 block text-sm font-medium">
          Search tasks
        </label>
        <input
          ref={searchInputRef}
          id="task-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Type a title..."
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="task-category" className="mb-1 block text-sm font-medium">
          Category
        </label>
        <select
          id="task-category"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="task-status" className="mb-1 block text-sm font-medium">
          Status
        </label>
        <select
          id="task-status"
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="all">All tasks</option>
          <option value="pending">Still to do</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label htmlFor="task-sort" className="mb-1 block text-sm font-medium">
          Sort by
        </label>
        <select
          id="task-sort"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2"
        >
          <option value="dueDate">Due date</option>
          <option value="title">Title A–Z</option>
        </select>
      </div>
    </section>
  )
}