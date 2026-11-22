import useToggle from '../hooks/useToggle.js'
import FocusTimer from '../components/FocusTimer.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { defaultSettings } from '../data/defaultSettings.js'

export default function FocusPage() {
  const [isBreak, , setIsBreak] = useToggle(false)
  const sessionType = isBreak ? 'Break' : 'Study'
  const durationMinutes = isBreak ? 5 : settings.studyDuration
  const [settings] = useLocalStorage('studyflow-settings', defaultSettings)

  useDocumentTitle('Focus | StudyFlow')

  return (
    <div className="space-y-8">
      <header className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          Make space for focused work
        </p>
        <h1 className="mt-2 text-3xl font-bold">Focus timer</h1>
        <p className="mt-2 text-slate-600">
          Choose a session, then start when you’re ready.
        </p>
      </header>

      <div className="flex justify-center gap-3">
        <button
          type="button"
          aria-pressed={!isBreak}
          onClick={() => setIsBreak(false)}
          className={`rounded-lg px-4 py-2 font-semibold ${
            !isBreak
              ? 'bg-blue-700 text-white'
              : 'border border-slate-300 bg-white text-slate-700'
          }`}
        >
          Study
        </button>
        <button
          type="button"
          aria-pressed={isBreak}
          onClick={() => setIsBreak(true)}
          className={`rounded-lg px-4 py-2 font-semibold ${
            isBreak
              ? 'bg-blue-700 text-white'
              : 'border border-slate-300 bg-white text-slate-700'
          }`}
        >
          Break
        </button>
      </div>

      <FocusTimer
        key={sessionType}
        sessionType={sessionType}
        durationMinutes={durationMinutes}
      />

      <p className="text-center text-sm text-slate-500">
        Switching between Study and Break starts a fresh timer for that session.
      </p>
    </div>
  )
}