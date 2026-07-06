import VideoEmbed from './VideoEmbed'

// Renders a post's "content blocks" — paragraphs, images and videos in any
// order. Each block is one of:
//   { type: 'paragraph', text: '...' }
//   { type: 'image', image: 'url', caption: '...', size: 'small'|'medium'|'large' }
//   { type: 'video', url: '...', orientation: 'auto'|'portrait'|'landscape', caption: '...' }
//
// Images/videos are centered. Size controls the max width:
//   small  -> up to 384px
//   medium -> up to 576px
//   large  -> up to 768px (full article width)
const SIZE_MAX = {
  small: 'max-w-sm', // 384px
  medium: 'max-w-xl', // 576px
  large: 'max-w-3xl', // 768px (article width)
}

export default function ContentBlocks({ blocks, title }) {
  if (!blocks || blocks.length === 0) return null

  return (
    <div className="mt-8 space-y-6">
      {blocks.map((b, i) => {
        // ---- image block ----
        if (b.type === 'image' && b.image) {
          const maxW = SIZE_MAX[b.size] || SIZE_MAX.large
          return (
            <figure key={i} className={`mx-auto ${maxW}`}>
              <div className="rounded-2xl overflow-hidden border border-ink/10 dark:border-white/10">
                <img
                  src={b.image}
                  alt={b.caption || `${title || 'Photo'} ${i + 1}`}
                  loading="lazy"
                  className="w-full h-auto object-cover"
                />
              </div>
              {b.caption && (
                <figcaption className="mt-2.5 text-center font-mono text-[11px] tracking-wider text-stone dark:text-neutral-500">
                  {b.caption}
                </figcaption>
              )}
            </figure>
          )
        }

        // ---- video block ----
        if (b.type === 'video' && b.url) {
          // landscape videos can use a wider column; portrait stays narrow
          const wide = b.orientation === 'landscape'
          return (
            <figure key={i} className={`mx-auto ${wide ? 'max-w-3xl' : 'max-w-md'}`}>
              <VideoEmbed url={b.url} orientation={b.orientation} title={b.caption || title} />
              {b.caption && (
                <figcaption className="mt-2.5 text-center font-mono text-[11px] tracking-wider text-stone dark:text-neutral-500">
                  {b.caption}
                </figcaption>
              )}
            </figure>
          )
        }

        // ---- paragraph block (default) ----
        if (b.type === 'paragraph' && b.text) {
          return (
            <p
              key={i}
              className="text-ink/75 dark:text-neutral-300 leading-[1.85] whitespace-pre-line"
            >
              {b.text}
            </p>
          )
        }
        return null
      })}
    </div>
  )
}
