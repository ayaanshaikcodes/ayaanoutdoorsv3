import { Link } from 'react-router-dom'
import HikeStatsBadge from './HikeStatsBadge'

// Editorial card shared by hike / beach / travel listings.
// `kind` is 'hike', 'beach', or 'travel'.
// `featured` renders the large cover-story layout (image beside text).
export default function BlogCard({ post, kind, featured = false }) {
  const isActivity = kind === 'hike' || kind === 'beach'
  const base = kind === 'hike' ? '/hikes' : kind === 'beach' ? '/beaches' : '/travels'
  const title = isActivity ? post.title : post.city
  const logLine = isActivity
    ? `${kind.toUpperCase()} · ${post.region} · ${post.date}`
    : `TRAVEL · ${post.country} · ${post.date}`

  if (featured) {
    return (
      <Link to={`${base}/${post.slug}`} className="group grid md:grid-cols-2 gap-6 md:gap-10 items-center">
        <div className="overflow-hidden rounded-2xl aspect-[4/3]">
          <img
            src={post.image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-terra uppercase">{logLine}</p>
          <h3 className="mt-3 font-serif text-3xl sm:text-4xl font-semibold leading-tight">
            <span className="link-underline">{title}</span>
          </h3>
          <p className="mt-4 text-stone dark:text-neutral-400 leading-relaxed">{post.excerpt}</p>
          {isActivity && (
            <div className="mt-4">
              <HikeStatsBadge difficulty={post.difficulty} duration={post.duration} distance={post.distance} kind={kind} />
            </div>
          )}
          <p className="mt-5 font-mono text-xs tracking-wider text-ink dark:text-white uppercase">
            Read the entry <span className="text-terra">→</span>
          </p>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`${base}/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl aspect-[4/3]">
        <img
          src={post.image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-terra uppercase">{logLine}</p>
      <h3 className="mt-1.5 font-serif text-xl font-semibold leading-snug">
        <span className="link-underline">{title}</span>
      </h3>
      <p className="mt-2 text-sm text-stone dark:text-neutral-400 leading-relaxed line-clamp-2">
        {post.excerpt}
      </p>
      {isActivity && (
        <div className="mt-3">
          <HikeStatsBadge difficulty={post.difficulty} duration={post.duration} distance={post.distance} kind={kind} />
        </div>
      )}
    </Link>
  )
}
