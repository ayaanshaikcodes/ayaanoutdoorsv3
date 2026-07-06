import { useEffect, useState } from 'react'

// Returns [isDark, toggle] and keeps <html class="dark"> + localStorage in sync.
export function useTheme() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    if (localStorage.theme === 'dark') return true
    if (localStorage.theme === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.theme = dark ? 'dark' : 'light'
  }, [dark])

  return [dark, () => setDark((d) => !d)]
}

export default function ThemeToggle({ dark, onToggle, className = '' }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle dark mode"
      className={
        'w-9 h-9 grid place-items-center rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition ' +
        className
      }
    >
      {dark ? '☀️' : '🌙'}
    </button>
  )
}
