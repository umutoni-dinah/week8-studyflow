import { useEffect, useRef, useState } from 'react'

export default function FocusTimer({ sessionType, durationMinutes }) {
  const totalSeconds = durationMinutes * 60
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = window.setInterval(() => {
      setRemainingSeconds((currentSeconds) =>
        Math.max(0, currentSeconds - 1),
      )
    }, 1000)

    return () => {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [isRunning])

  useEffect(() => {
    if (remainingSeconds === 0) {
      setIsRunning(false)
    }
  }, [remainingSeconds])

  function resetTimer() {
    setIsRunning(false)
    setRemainingSeconds(totalSeconds)
  }

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60
  const progress = ((totalSeconds - remainingSeconds) / totalSeconds) * 100

  const status =
    remainingSeconds === 0
      ? 'Session complete'
      : isRunning
        ? 'Focusing'
        : 'Ready when you are'

  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
        {sessionType} session · {durationMinutes} minutes
      </p>

      <p
        role="timer"
        aria-live="off"
        className="my-8 text-6xl font-bold tabular-nums text-slate-900"
      >
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </p>

      <div
        className="mb-5 h-3 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-label="Session progress"
        aria-valuenow={Math.round(progress)}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mb-6 text-slate-600" aria-live="polite">
        {status}
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setIsRunning(true)}
          disabled={isRunning || remainingSeconds === 0}
          className="rounded-lg bg-blue-700 px-5 py-2 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Start
        </button>

        <button
          type="button"
          onClick={() => setIsRunning(false)}
          disabled={!isRunning}
          className="rounded-lg border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Pause
        </button>

        <button
          type="button"
          onClick={resetTimer}
          className="rounded-lg border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-50"
        >
          Reset
        </button>
      </div>
    </section>
  )
}