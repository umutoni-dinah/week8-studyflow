import { Link } from 'react-router-dom'
import SummaryCard from '../components/SummaryCard.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { defaultSettings } from '../data/defaultSettings.js'

export default function DashboardPage({ tasks }) {
  useDocumentTitle('Dashboard | StudyFlow')
  const [settings] = useLocalStorage('studyflow-settings', defaultSettings)
  const completedCount = tasks.filter((task) => task.completed).length
  const pendingCount = tasks.length - completedCount
  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100)

  const upcomingTasks = tasks
    .filter((task) => !task.completed)
    .toSorted((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 3)

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          Your study space
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Welcome back, {settings.displayName || 'Student'}!
        </h1>
        <p className="mt-2 text-slate-600">
          A clear view of what you’re studying and what’s coming up.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          label="Total tasks"
          value={tasks.length}
          detail="Across all your study subjects"
        />
        <SummaryCard
          label="Still to do"
          value={pendingCount}
          detail="Tasks waiting for your attention"
        />
        <SummaryCard
          label="Progress"
          value={`${progress}%`}
          detail={`${completedCount} completed`}
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold">Upcoming tasks</h2>
            <p className="mt-1 text-sm text-slate-500">
              Your next few incomplete tasks
            </p>
          </div>
          <Link
            to="/tasks"
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            View all tasks
          </Link>
        </div>

        {upcomingTasks.length > 0 ? (
          <ul className="mt-5 divide-y divide-slate-100">
            {upcomingTasks.map((task) => (
              <li
                key={task.id}
                className="flex flex-wrap items-center justify-between gap-2 py-4"
              >
                <div>
                  <p className="font-medium text-slate-900">{task.title}</p>
                  <p className="text-sm text-slate-500">{task.category}</p>
                </div>
                <time
                  className="text-sm text-slate-600"
                  dateTime={task.dueDate}
                >
                  Due {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString()}
                </time>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 rounded-lg bg-slate-50 p-4 text-slate-600">
            No upcoming tasks yet. Add one from the Tasks page.
          </p>
        )}
      </section>
    </div>
  )
}