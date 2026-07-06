import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import InstagramIcon from './InstagramIcon'
import { profile } from '../data/profile'

// Activities is a dropdown containing Hikes + Beaches.
const activities = [
  { to: '/hikes', label: 'Hikes' },
  { to: '/beaches', label: 'Beaches' },
]

export default function Navbar({ dark, onToggle }) {
  const [open, setOpen] = useState(false) // mobile menu
  const [actOpen, setActOpen] = useState(false) // desktop dropdown
  const [mActOpen, setMActOpen] = useState(false) // mobile activities sub-list
  const location = useLocation()
  const onActivity =
    location.pathname.startsWith('/hikes') || location.pathname.startsWith('/beaches')

  const linkClass = ({ isActive }) =>
    'px-3 py-2 text-sm font-medium tracking-wide transition ' +
    (isActive
      ? 'text-ink dark:text-white'
      : 'text-stone dark:text-neutral-400 hover:text-ink dark:hover:text-white')

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-paper/80 dark:bg-night/80 border-b border-ink/10 dark:border-white/10">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand wordmark — unchanged */}
        <Link to="/" className="font-display font-extrabold text-lg tracking-tight shrink-0">
          ayaan<span className="text-terra">outdoors</span>
        </Link>

        {/* desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>
            <span className="link-underline">Home</span>
          </NavLink>

          {/* Activities dropdown (opens on hover) */}
          <div
            className="relative"
            onMouseEnter={() => setActOpen(true)}
            onMouseLeave={() => setActOpen(false)}
          >
            <button
              className={
                'px-3 py-2 text-sm font-medium tracking-wide transition inline-flex items-center gap-1 ' +
                (onActivity
                  ? 'text-ink dark:text-white'
                  : 'text-stone dark:text-neutral-400 hover:text-ink dark:hover:text-white')
              }
            >
              <span className="link-underline">Activities</span>
              <span className={'text-[9px] transition-transform ' + (actOpen ? 'rotate-180' : '')}>
                ▾
              </span>
            </button>

            {actOpen && (
              <div className="absolute left-0 top-full pt-2 w-44">
                <div className="rounded-xl border border-ink/10 dark:border-white/10 bg-paper dark:bg-card shadow-xl overflow-hidden">
                  {activities.map((a) => (
                    <NavLink
                      key={a.to}
                      to={a.to}
                      className={({ isActive }) =>
                        'block px-4 py-2.5 text-sm transition ' +
                        (isActive
                          ? 'bg-ink/5 dark:bg-white/10 text-ink dark:text-white font-medium'
                          : 'text-stone dark:text-neutral-400 hover:bg-ink/5 dark:hover:bg-white/5 hover:text-ink dark:hover:text-white')
                      }
                    >
                      {a.label}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/travels" className={linkClass}>
            <span className="link-underline">Travels</span>
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            <span className="link-underline">About</span>
          </NavLink>

          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="ml-2 w-9 h-9 grid place-items-center rounded-full border border-ink/15 dark:border-white/15 hover:bg-ink/5 dark:hover:bg-white/10 transition text-ink dark:text-neutral-300"
          >
            <InstagramIcon className="w-[17px] h-[17px]" />
          </a>
          <ThemeToggle dark={dark} onToggle={onToggle} className="ml-1" />
        </div>

        {/* mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 grid place-items-center rounded-full border border-ink/15 dark:border-white/15 text-ink dark:text-neutral-300"
          >
            <InstagramIcon className="w-[17px] h-[17px]" />
          </a>
          <ThemeToggle dark={dark} onToggle={onToggle} />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="w-9 h-9 grid place-items-center rounded-full border border-ink/15 dark:border-white/15"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-ink/10 dark:border-white/10 bg-paper dark:bg-night">
          <div className="px-6 py-3 flex flex-col">
            <NavLink to="/" end onClick={() => setOpen(false)} className="py-2.5 text-ink dark:text-neutral-200">
              Home
            </NavLink>

            <button
              onClick={() => setMActOpen((o) => !o)}
              className="py-2.5 text-left text-ink dark:text-neutral-200 inline-flex items-center justify-between"
            >
              Activities
              <span className={'text-xs transition-transform ' + (mActOpen ? 'rotate-180' : '')}>▾</span>
            </button>
            {mActOpen &&
              activities.map((a) => (
                <NavLink
                  key={a.to}
                  to={a.to}
                  onClick={() => setOpen(false)}
                  className="py-2.5 pl-4 text-stone dark:text-neutral-400"
                >
                  {a.label}
                </NavLink>
              ))}

            <NavLink to="/travels" onClick={() => setOpen(false)} className="py-2.5 text-ink dark:text-neutral-200">
              Travels
            </NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className="py-2.5 text-ink dark:text-neutral-200">
              About
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
