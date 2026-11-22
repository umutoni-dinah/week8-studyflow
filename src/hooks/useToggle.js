import { useState } from 'react'

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  function toggle() {
    setValue(currentValue => !currentValue)
  }

  return [value, toggle, setValue]
}