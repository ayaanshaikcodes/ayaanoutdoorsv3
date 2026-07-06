import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { site } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 dark:border-white/10 mt-8">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-14 pb-10">
        {/* editorial sign-off */}
        <p className="font-serif text-3xl sm:text-4xl font-semibold">
          {site.footer.signoff.replace(/\.$/, '')}<span className="text-terra">.</span>
        </p>

        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          <div>
            <div className="font-display font-extrabold text-lg">
              ayaan<span className="text-terra">outdoors</span>
            </div>
            <p className="mt-3 text-sm text-stone dark:text-neutral-400 max-w-xs leading-relaxed">
              {profile.footerBio}
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone dark:text-neutral-500 mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/hikes" className="link-underline hover:text-terra">Hikes</Link></li>
              <li><Link to="/beaches" className="link-underline hover:text-terra">Beaches</Link></li>
              <li><Link to="/travels" className="link-underline hover:text-terra">Travels</Link></li>
              <li><Link to="/about" className="link-underline hover:text-terra">About</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone dark:text-neutral-500 mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={profile.instagram} target="_blank" rel="noreferrer" className="link-underline hover:text-terra">
                  Instagram
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="link-underline hover:text-terra">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`} className="link-underline hover:text-terra">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/10 dark:border-white/10 py-5 text-center font-mono text-[11px] tracking-wider text-stone dark:text-neutral-500">
        © {new Date().getFullYear()} {profile.name.toUpperCase()} · FIELD JOURNAL
      </div>
    </footer>
  )
}
