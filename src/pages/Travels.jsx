import { lazy, Suspense } from 'react'
import Reveal from '../components/Reveal'
import BlogCard from '../components/BlogCard'
import SectionHeader from '../components/SectionHeader'
import usePageTitle from '../components/usePageTitle'
import { travelPosts, allMarkers } from '../data/travelPosts'
import { site } from '../data/site'

// Lazy-load the 3D globe so its heavy 3D library only downloads
// when someone actually opens this page.
const WorldMap = lazy(() => import('../components/WorldMap'))

export default function Travels() {
  usePageTitle('Travels', "A 3D globe of the places Ayaan has travelled around the world.")
  const posts = [...travelPosts].reverse() // newest first

  return (
    <>
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-28 sm:pt-32">
        <Reveal className="max-w-2xl mb-10">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-terra mb-3">
            {site.pageHeaders.travels.eyebrow} · {allMarkers.length} pins
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-semibold tracking-tight">
            {site.pageHeaders.travels.title}
          </h1>
          <p className="mt-4 text-stone dark:text-neutral-400 text-lg">
            {site.pageHeaders.travels.subtitle}
          </p>
        </Reveal>
      </section>

      {/* Interactive 3D globe */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6">
        <Reveal className="rounded-3xl overflow-hidden border border-ink/10 dark:border-white/10 bg-ink/[0.03] dark:bg-card p-2 sm:p-6">
          <Suspense
            fallback={
              <div className="h-[460px] grid place-items-center font-mono text-xs tracking-widest text-stone">
                LOADING GLOBE…
              </div>
            }
          >
            <WorldMap markers={allMarkers} />
          </Suspense>
        </Reveal>
      </section>

      {/* Destination stories */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-16 sm:pt-24 pb-8">
        <SectionHeader eyebrow="Trip reports" title="Stories from the road" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {posts.map((t, i) => (
            <Reveal key={t.slug} delay={(i % 3) * 0.08}>
              <BlogCard post={t} kind="travel" />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
