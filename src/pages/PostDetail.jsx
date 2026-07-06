import { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from '../components/Reveal'
import HikeStatsBadge from '../components/HikeStatsBadge'
import { VideoGallery } from '../components/VideoEmbed'
import ContentBlocks from '../components/ContentBlocks'
import usePageTitle from '../components/usePageTitle'
import NotFound from './NotFound'
import { hikePosts } from '../data/hikePosts'
import { beachPosts } from '../data/beachPosts'
import { travelPosts } from '../data/travelPosts'

// Handles /hikes/:slug, /beaches/:slug, and /travels/:slug as a
// magazine-style article. `kind` is 'hike' | 'beach' | 'travel'.
export default function PostDetail({ kind }) {
  const { slug } = useParams()

  const list = kind === 'hike' ? hikePosts : kind === 'beach' ? beachPosts : travelPosts
  const item = list.find((x) => x.slug === slug)

  // page title (hook must run before any early return)
  const isActivity = kind === 'hike' || kind === 'beach'
  const pageTitle = item ? (isActivity ? item.title : `${item.city}, ${item.country}`) : 'Not found'
  usePageTitle(pageTitle, item?.excerpt)

  // hero parallax (hook must also run unconditionally)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])

  if (!item) return <NotFound />

  const base = kind === 'hike' ? '/hikes' : kind === 'beach' ? '/beaches' : '/travels'
  const backLabel = kind === 'hike' ? 'hikes' : kind === 'beach' ? 'beaches' : 'travels'
  const title = isActivity ? item.title : `${item.city}, ${item.country}`
  const loc = isActivity ? item.region : item.country
  const logLine = `${kind.toUpperCase()} · ${loc} · ${item.date}`
  const related = list.filter((x) => x.slug !== slug).slice(0, 3)

  return (
    <article>
      {/* full-bleed hero with parallax */}
      <div ref={heroRef} className="relative h-[58vh] min-h-[380px] overflow-hidden">
        <motion.img
          src={item.image}
          alt={title}
          style={{ y: imgY }}
          className="absolute inset-0 w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/15" />
        <div className="absolute bottom-0 inset-x-0 pb-10">
          <div className="max-w-article mx-auto px-5 sm:px-6 text-paper">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-[11px] tracking-[0.22em] uppercase text-sand"
            >
              {logLine}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-3 font-serif text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.05]"
            >
              {title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* article body */}
      <div className="max-w-article mx-auto px-5 sm:px-6 py-12">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link
            to={base}
            className="font-mono text-[11px] tracking-[0.18em] uppercase text-terra hover:underline"
          >
            ← All {backLabel}
          </Link>
          {kind === 'hike' && (
            <HikeStatsBadge
              difficulty={item.difficulty}
              duration={item.duration}
              distance={item.distance}
              kind={kind}
            />
          )}
          {kind === 'beach' && (
            <HikeStatsBadge difficulty={item.difficulty} duration={item.duration} distance={item.distance} kind={kind} />
          )}
        </div>

        <p className="mt-10 text-xl sm:text-2xl leading-relaxed font-serif text-ink/85 dark:text-neutral-200">
          {item.excerpt}
        </p>
        <p className="mt-6 text-ink/75 dark:text-neutral-300 leading-[1.85] whitespace-pre-line">
          {item.content}
        </p>

        {/* Content blocks (optional): paragraphs, images & videos interleaved */}
        <ContentBlocks blocks={item.blocks} title={title} />

        {/* Videos section (optional) */}
        {item.videos?.length > 0 && (
          <Reveal className="mt-14">
            <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone dark:text-neutral-500 mb-6">
              {item.videos.length > 1 ? 'Videos' : 'Video'}
            </h2>
            <VideoGallery videos={item.videos} title={title} />
          </Reveal>
        )}

        {/* Gallery (optional) */}
        {item.gallery?.length > 0 && (
          <Reveal className="mt-14">
            <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone dark:text-neutral-500 mb-6">
              Gallery
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {item.gallery.map((g, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <img
                    src={g}
                    alt={`${title} ${i + 1}`}
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* Related */}
        {related.length > 0 && (
          <Reveal className="mt-16 pt-10 border-t border-ink/10 dark:border-white/10">
            <h2 className="font-mono text-[11px] tracking-[0.22em] uppercase text-stone dark:text-neutral-500 mb-6">
              More from this section
            </h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((x) => (
                <Link key={x.slug} to={`${base}/${x.slug}`} className="group block">
                  <div className="rounded-xl overflow-hidden aspect-[16/10]">
                    <img
                      src={x.image}
                      alt={isActivity ? x.title : x.city}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                    />
                  </div>
                  <p className="mt-2.5 font-serif font-semibold text-sm">
                    <span className="link-underline">{isActivity ? x.title : x.city}</span>
                  </p>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </article>
  )
}
