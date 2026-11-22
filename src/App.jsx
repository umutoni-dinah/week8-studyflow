import { Link, Route, Routes } from 'react-router-dom'

function DashboardPage() {
  return <h1 className="text-3xl font-bold text-blue-700">Dashboard</h1>
}

function TasksPage() {
  return <h1 className="text-3xl font-bold text-blue-700">Tasks</h1>
}

function FocusPage() {
  return <h1 className="text-3xl font-bold text-blue-700">Focus</h1>
}

function SettingsPage() {
  return <h1 className="text-3xl font-bold text-blue-700">Settings</h1>
}

function NotFoundPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Page not found</h1>
      <Link to="/">Return to Dashboard</Link>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <nav className="mb-8 flex flex-wrap gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/focus">Focus</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/focus" element={<FocusPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}