import { useState } from 'react'
import { motion } from 'framer-motion'
import Reveal from '../components/Reveal'
import BlogCard from '../components/BlogCard'
import { REGIONS } from '../data/hikePosts'

// Reusable editorial listing page for hikes or beaches.
export default function ActivityPage({
  posts,
  kind,
  eyebrow,
  title,
  subtitle,
  showDistance = true,
}) {
  const [diff, setDiff] = useState('')
  const [region, setRegion] = useState('')
  const [dist, setDist] = useState('')

  const statKey = kind === 'beach' ? 'rating' : 'difficulty'
  const filtered = posts.filter((p) => {
    if (diff && p[statKey] < +diff) return false
    if (region && p.region !== region) return false
    if (showDistance && dist && p.distance >= +dist) return false
    return true
  })

  const selectClass =
    'rounded-full border border-ink/15 dark:border-white/15 bg-transparent dark:bg-card px-4 py-2 text-sm max-w-full text-ink dark:text-neutral-200 focus:border-terra'

  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-28 sm:pt-32 pb-16">
      {/* editorial header */}
      <Reveal className="max-w-2xl mb-10">
        <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-terra mb-3">
          {eyebrow} · {posts.length} {posts.length === 1 ? 'entry' : 'entries'}
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 text-stone dark:text-neutral-400 text-lg">{subtitle}</p>
      </Reveal>

      {/* filters */}
      <Reveal className="flex flex-wrap gap-3 mb-12 border-y border-ink/10 dark:border-white/10 py-4">
        <select value={diff} onChange={(e) => setDiff(e.target.value)} className={selectClass}>
          <option value="">{kind === 'beach' ? 'All ratings' : 'All difficulties'}</option>
          <option value="3">★★★ &amp; up</option>
          <option value="4">★★★★ &amp; up</option>
          <option value="5">★★★★★ only</option>
        </select>
        <select value={region} onChange={(e) => setRegion(e.target.value)} className={selectClass}>
          <option value="">All regions</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        {showDistance && (
          <select value={dist} onChange={(e) => setDist(e.target.value)} className={selectClass}>
            <option value="">Any distance</option>
            <option value="10">Under 10 km</option>
            <option value="15">Under 15 km</option>
          </select>
        )}
      </Reveal>

      {filtered.length === 0 ? (
        <p className="text-center text-stone dark:text-neutral-500 py-24 font-mono text-sm tracking-wider">
          NOTHING MATCHES THOSE FILTERS — TRY WIDENING THEM.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filtered.map((p, i) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <BlogCard post={p} kind={kind} />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
