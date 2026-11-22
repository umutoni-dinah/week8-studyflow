import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const savedValue = window.localStorage.getItem(key)

      if (savedValue !== null) {
        return JSON.parse(savedValue)
      }

      return typeof initialValue === 'function'
        ? initialValue()
        : initialValue
    } catch {
      return typeof initialValue === 'function'
        ? initialValue()
        : initialValue
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}