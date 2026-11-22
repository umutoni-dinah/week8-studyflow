export default function TaskCard({
  task,
  onToggle,
  onEdit,
  onDelete,
}) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            aria-label={`Mark "${task.title}" ${
              task.completed ? 'incomplete' : 'complete'
            }`}
            className="mt-1 size-4 accent-blue-700"
          />

          <div className="min-w-0">
            <h2
              className={`font-semibold ${
                task.completed ? 'text-slate-400 line-through' : 'text-slate-900'
              }`}
            >
              {task.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {task.category}
              {task.dueDate && (
                <>
                  {' · Due '}
                  <time dateTime={task.dueDate}>
                    {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString()}
                  </time>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
            {task.priority}
          </span>

          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  )
}