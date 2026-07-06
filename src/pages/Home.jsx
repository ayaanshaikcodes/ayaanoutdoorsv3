import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeader from '../components/SectionHeader'
import Reveal from '../components/Reveal'
import BlogCard from '../components/BlogCard'
import CTASection from '../components/CTASection'
import usePageTitle from '../components/usePageTitle'
import { profile } from '../data/profile'
import { site } from '../data/site'
import { hikePosts } from '../data/hikePosts'
import { beachPosts } from '../data/beachPosts'
import { travelPosts, allMarkers } from '../data/travelPosts'

// ---- newest-first feed ----------------------------------------------------
// The CMS appends new entries at the END of each list, so the newest post is
// the last item. Reverse each list, then interleave the three kinds.
function buildFeed() {
  const h = [...hikePosts].reverse().map((post) => ({ post, kind: 'hike' }))
  const b = [...beachPosts].reverse().map((post) => ({ post, kind: 'beach' }))
  const t = [...travelPosts].reverse().map((post) => ({ post, kind: 'travel' }))
  const feed = []
  const max = Math.max(h.length, b.length, t.length)
  for (let i = 0; i < max; i++) {
    if (b[i]) feed.push(b[i])
    if (h[i]) feed.push(h[i])
    if (t[i]) feed.push(t[i])
  }
  return feed
}

// Renders the hero headline, wrapping each accent word (set in the CMS)
// in italic color — terra for the 1st, sage for the 2nd, alternating after.
function AccentHeadline({ text, accents }) {
  if (!accents || accents.length === 0) return <>{text}</>
  const colors = ['text-terra', 'text-sage']
  const pattern = new RegExp(`(${accents.map((a) => a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  const parts = text.split(pattern)
  let accentCount = 0
  return (
    <>
      {parts.map((part, i) => {
        const isAccent = accents.some((a) => a.toLowerCase() === part.toLowerCase())
        if (!isAccent) return <span key={i}>{part}</span>
        const cls = colors[accentCount % colors.length]
        accentCount++
        return (
          <em key={i} className={`${cls} italic`}>
            {part}
          </em>
        )
      })}
    </>
  )
}

export default function Home() {
  usePageTitle() // default brand title
  const feed = buildFeed()
  const featured = feed[0]
  const grid = feed.slice(1, 7)

  // ---- hero photo: shuffled on every visit --------------------------------
  // Picks a random image from the CMS "hero images" list each page load.
  const heroImages = site.hero.images?.length
    ? site.hero.images
    : ['/uploads/DJI_20260612181624_0015_D.JPG']
  const [heroImage] = useState(
    () => heroImages[Math.floor(Math.random() * heroImages.length)]
  )

  // explore tiles: labels/subtitles from CMS, images auto = latest covers
  const tileImages = [
    hikePosts[hikePosts.length - 1]?.image,
    beachPosts[beachPosts.length - 1]?.image,
    travelPosts[travelPosts.length - 1]?.image,
  ]
  const tileLinks = ['/hikes', '/beaches', '/travels']

  // places ticker: custom list from CMS wins; otherwise auto from map pins
  const places = (site.ticker.customPlaces?.length
    ? site.ticker.customPlaces.map((p) => (typeof p === 'string' ? p : p.name))
    : allMarkers.map((m) => m.city)
  ).map((p) => String(p).toUpperCase())
  const tickerSpeed = `${site.ticker.speedSeconds || 60}s`

  // hero parallax
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '55%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <>
      {/* ------------------------------ HERO ------------------------------ */}
      <section ref={heroRef} className="relative h-[92svh] min-h-[560px] overflow-hidden">
        <motion.img
          src={heroImage}
          alt="From Ayaan's field journal"
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[118%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/20" />

        <motion.div style={{ y: textY, opacity: fade }} className="absolute inset-x-0 bottom-0 pb-16 sm:pb-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-6 text-paper">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-mono text-[11px] sm:text-xs tracking-[0.24em] uppercase text-sand"
            >
              {site.hero.eyebrow}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-4 font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.04] max-w-3xl"
            >
              <AccentHeadline text={site.hero.headline} accents={site.hero.accentWords} />
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-5 max-w-xl text-paper/85 leading-relaxed"
            >
              {profile.homeIntro}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/travels"
                className="px-6 py-3 rounded-full bg-paper text-ink font-display font-bold text-sm hover:bg-sand transition"
              >
                {site.hero.primaryButton}
              </Link>
              <Link
                to="/about"
                className="px-6 py-3 rounded-full border border-paper/40 text-paper font-display font-semibold text-sm hover:bg-paper/10 transition"
              >
                {site.hero.secondaryButton}
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* --------------------------- PLACES TICKER ------------------------ */}
      {site.ticker.enabled && (
        <div
          className="border-y border-ink/10 dark:border-white/10 py-3 overflow-hidden select-none"
          aria-hidden="true"
        >
          <div className="marquee-track" style={{ animationDuration: tickerSpeed }}>
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0">
                {places.map((p, i) => (
                  <span
                    key={`${dup}-${i}`}
                    className="font-mono text-[11px] tracking-[0.2em] text-stone dark:text-neutral-500 px-5 whitespace-nowrap"
                  >
                    {p} <span className="text-terra ml-5">✦</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------------- LATEST ENTRY -------------------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-16 sm:pt-24">
        <SectionHeader
          eyebrow={site.homeSections.latestEyebrow}
          title={site.homeSections.latestTitle}
          sub={site.homeSections.latestSub}
        />
        {featured && (
          <Reveal>
            <BlogCard post={featured.post} kind={featured.kind} featured />
          </Reveal>
        )}
      </section>

      {/* --------------------------- RECENT GRID -------------------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-16 sm:pt-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {grid.map(({ post, kind }, i) => (
            <Reveal key={`${kind}-${post.slug}`} delay={(i % 3) * 0.08}>
              <BlogCard post={post} kind={kind} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------- EXPLORE TILES ------------------------- */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-20 sm:pt-28">
        <SectionHeader eyebrow={site.homeSections.browseEyebrow} title={site.homeSections.browseTitle} />
        <div className="grid sm:grid-cols-3 gap-5">
          {site.exploreTiles.map((tile, i) => (
            <Reveal key={tileLinks[i]} delay={i * 0.08}>
              <Link to={tileLinks[i]} className="group relative block rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src={tile.image || tileImages[i]}
                  alt={tile.label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-6 text-paper">
                  <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-sand/90">{tile.sub}</p>
                  <p className="mt-1 font-serif text-3xl font-semibold flex items-center gap-2">
                    {tile.label}
                    <span className="text-terra transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  )
}
