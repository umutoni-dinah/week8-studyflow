import { useState } from 'react'
import useDocumentTitle from '../hooks/useDocumentTitle.js'
import useLocalStorage from '../hooks/useLocalStorage.js'
import { defaultSettings } from '../data/defaultSettings.js'

export default function SettingsPage() {
  const [settings, setSettings] = useLocalStorage(
    'studyflow-settings',
    defaultSettings,
  )
  const [savedMessage, setSavedMessage] = useState('')

  useDocumentTitle('Settings | StudyFlow')

  function handleChange(event) {
    const { name, value, type, checked } = event.target

    setSettings((currentSettings) => ({
      ...currentSettings,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'studyDuration'
            ? Number(value)
            : value,
    }))

    setSavedMessage('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    setSavedMessage('Your preferences are saved in this browser.')
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          Make StudyFlow yours
        </p>
        <h1 className="mt-2 text-3xl font-bold">Settings</h1>
        <p className="mt-2 text-slate-600">
          Your preferences are saved automatically in this browser.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${
          settings.compactMode ? 'space-y-4 p-4' : 'space-y-6 p-6'
        }`}
      >
        <div>
          <label
            htmlFor="displayName"
            className="mb-1 block text-sm font-medium"
          >
            Display name
          </label>
          <input
            id="displayName"
            name="displayName"
            value={settings.displayName}
            onChange={handleChange}
            required
            maxLength={40}
            className="w-full max-w-md rounded-lg border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="studyDuration"
            className="mb-1 block text-sm font-medium"
          >
            Preferred study session
          </label>
          <select
            id="studyDuration"
            name="studyDuration"
            value={settings.studyDuration}
            onChange={handleChange}
            className="w-full max-w-md rounded-lg border border-slate-300 px-3 py-2"
          >
            <option value={15}>15 minutes</option>
            <option value={25}>25 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes</option>
          </select>
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="compactMode"
            checked={settings.compactMode}
            onChange={handleChange}
            className="size-4 accent-blue-700"
          />
          <span className="font-medium">Use compact spacing on this page</span>
        </label>

        <button
          type="submit"
          className="rounded-lg bg-blue-700 px-4 py-2 font-semibold text-white hover:bg-blue-800"
        >
          Save preferences
        </button>

        {savedMessage && (
          <p role="status" className="text-sm text-green-700">
            {savedMessage}
          </p>
        )}
      </form>
    </div>
  )
}