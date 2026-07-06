import Reveal from '../components/Reveal'
import InstagramIcon from '../components/InstagramIcon'
import usePageTitle from '../components/usePageTitle'
import { profile } from '../data/profile'
import { site } from '../data/site'

export default function About() {
  usePageTitle('About', "About Ayaan — engineering student, aspiring pilot, and the story behind ayaanoutdoors.")

  return (
    <section className="max-w-4xl mx-auto px-5 sm:px-6 pt-28 sm:pt-32 pb-16">
      <Reveal>
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-terra mb-3">
          {site.pageHeaders.about.eyebrow}
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight">
          Hey, I’m {profile.name}<span className="text-terra">.</span>
        </h1>
        <p className="mt-8 text-lg sm:text-xl leading-relaxed text-ink/80 dark:text-neutral-300 font-serif">
          {profile.bio}
        </p>
      </Reveal>

      {/* Passions — editorial list */}
      <Reveal className="mt-16">
        <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone dark:text-neutral-500 mb-2">
          What I’m about
        </h2>
        <div className="divide-y divide-ink/10 dark:divide-white/10">
          {profile.passions.map((p) => (
            <div key={p.title} className="py-5 flex items-start gap-5 group">
              <span className="text-2xl mt-0.5 grayscale group-hover:grayscale-0 transition">{p.icon}</span>
              <div>
                <h3 className="font-serif text-xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-stone dark:text-neutral-400 leading-relaxed">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Connect */}
      <Reveal className="mt-14">
        <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone dark:text-neutral-500 mb-5">
          Get in touch
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href={profile.instagram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink/15 dark:border-white/15 hover:border-terra hover:text-terra transition font-medium text-sm"
          >
            <InstagramIcon className="w-[18px] h-[18px]" />
            Instagram
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink/15 dark:border-white/15 hover:border-terra hover:text-terra transition font-medium text-sm"
          >
            <span className="font-bold">in</span>
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-ink/15 dark:border-white/15 hover:border-terra hover:text-terra transition font-medium text-sm"
          >
            ✉️ Email
          </a>
        </div>
      </Reveal>
    </section>
  )
}
