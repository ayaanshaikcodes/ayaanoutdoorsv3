import { useEffect, useRef } from 'react'

// ------------------------------------------------------------
//  Embeds a video link. Supports:
//   - YouTube normal: youtu.be/ID, youtube.com/watch?v=ID  -> 16:9 landscape
//   - YouTube Shorts: youtube.com/shorts/ID                -> 9:16 portrait
//   - Instagram reel/post: instagram.com/reel/CODE/        -> portrait
//  A video can be {url, orientation} where orientation is
//  'portrait' | 'landscape' | '' (auto). The override wins if set.
// ------------------------------------------------------------

const PORTRAIT_MAX_H = 600 // cap portrait height so vertical videos aren't huge

function parseYouTube(url) {
  try {
    const u = new URL(url)
    if (u.hostname.includes('youtu.be')) return { id: u.pathname.slice(1), short: false }
    if (u.searchParams.get('v')) return { id: u.searchParams.get('v'), short: false }
    const parts = u.pathname.split('/')
    const sIdx = parts.indexOf('shorts')
    if (sIdx !== -1 && parts[sIdx + 1]) return { id: parts[sIdx + 1], short: true }
    const eIdx = parts.indexOf('embed')
    if (eIdx !== -1 && parts[eIdx + 1]) return { id: parts[eIdx + 1], short: false }
  } catch (e) {
    return null
  }
  return null
}

function isInstagram(url) {
  return /instagram\.com\/(reel|p|tv)\//i.test(url || '')
}

// Normalise an Instagram URL to its clean canonical form:
//   https://www.instagram.com/reel/CODE/   (strips ?igsh=... etc.)
function cleanInstagram(url) {
  try {
    const u = new URL(url)
    const m = u.pathname.match(/\/(reel|p|tv)\/([^/]+)/i)
    if (m) return `https://www.instagram.com/${m[1].toLowerCase()}/${m[2]}/`
  } catch (e) {
    return url
  }
  return url
}

// Load Instagram's embed script once and (re)process embeds when they appear.
function useInstagramScript(active) {
  const ref = useRef(null)
  useEffect(() => {
    if (!active) return
    const process = () => window.instgrm && window.instgrm.Embeds.process()
    const id = 'instagram-embed-script'
    if (document.getElementById(id)) {
      // script already there — process now and again shortly after (timing safety)
      process()
      const t = setTimeout(process, 600)
      return () => clearTimeout(t)
    }
    const s = document.createElement('script')
    s.id = id
    s.src = 'https://www.instagram.com/embed.js'
    s.async = true
    s.onload = process
    document.body.appendChild(s)
    const t = setTimeout(process, 1200)
    return () => clearTimeout(t)
  }, [active, ref.current])
  return ref
}

export default function VideoEmbed({ url, orientation = '', title }) {
  const yt = parseYouTube(url)
  const insta = !yt && isInstagram(url)
  const igRef = useInstagramScript(insta)

  // decide portrait vs landscape: explicit override > auto-detect
  const portrait =
    orientation === 'portrait'
      ? true
      : orientation === 'landscape'
      ? false
      : (yt && yt.short) || insta // Shorts + reels default to portrait

  if (yt) {
    if (portrait) {
      return (
        <div
          className="mx-auto w-full"
          style={{ maxWidth: `${Math.round(PORTRAIT_MAX_H * 9 / 16)}px` }}
        >
          <div
            className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            style={{ aspectRatio: '9 / 16', maxHeight: PORTRAIT_MAX_H }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${yt.id}`}
              title={title || 'Video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )
    }
    return (
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-video">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${yt.id}`}
          title={title || 'Video'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  if (insta) {
    const clean = cleanInstagram(url)
    return (
      <div ref={igRef} className="w-full flex justify-center">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={clean}
          data-instgrm-version="14"
          style={{
            background: '#fff',
            border: 0,
            borderRadius: 12,
            margin: 0,
            maxWidth: 400,
            width: '100%',
          }}
        >
          <a href={clean} target="_blank" rel="noreferrer">
            View this reel on Instagram
          </a>
        </blockquote>
      </div>
    )
  }

  if (!url) return null
  return (
    <a href={url} target="_blank" rel="noreferrer" className="text-terra font-semibold hover:underline">
      Watch video ↗
    </a>
  )
}

// A list of videos. Each item may be a string or {url, orientation}.
// Portrait videos get a narrower column; the layout stays tidy.
export function VideoGallery({ videos, title }) {
  const list = (videos || [])
    .map((v) => (typeof v === 'string' ? { url: v, orientation: '' } : v))
    .filter((v) => v && v.url)
  if (list.length === 0) return null
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {list.map((v, i) => (
        <div key={i} className="flex justify-center">
          <VideoEmbed url={v.url} orientation={v.orientation} title={`${title || 'Video'} ${i + 1}`} />
        </div>
      ))}
    </div>
  )
}
