import { NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Dashboard', to: '/' },
  { label: 'Tasks', to: '/tasks' },
  { label: 'Focus', to: '/focus' },
  { label: 'Settings', to: '/settings' },
]

export default function SiteLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <NavLink to="/" className="text-xl font-bold text-blue-700">
            StudyFlow
          </NavLink>

          <nav aria-label="Main navigation" className="flex flex-wrap gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive
                      ? 'bg-blue-100 text-blue-800'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {children}
      </main>
    </div>
  )
}