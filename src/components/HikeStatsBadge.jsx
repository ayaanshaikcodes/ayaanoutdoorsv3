// Stats as a single monospace "field log" line.
//   hikes:   ★★★☆☆ · 2H 30M · 8.5 KM      (difficulty · duration · distance)
//   beaches: RATED ★★★☆☆ · HALF DAY        (rating · visit length — no distance,
//                                            a walk-in km never made sense for a beach)
function difficultyStars(n) {
  let s = ''
  for (let i = 1; i <= 5; i++) s += i <= n ? '★' : '☆'
  return s
}

export default function HikeStatsBadge({ difficulty, duration, distance, kind = 'hike' }) {
  const base =
    'font-mono text-[11px] tracking-wider text-stone dark:text-neutral-400 whitespace-nowrap overflow-hidden text-ellipsis'

  if (kind === 'beach') {
    return (
      <p className={base}>
        RATED <span className="text-terra">{difficultyStars(difficulty)}</span>
        <span className="mx-1.5 opacity-50">·</span>
        {String(duration).toUpperCase()}
      </p>
    )
  }

  return (
    <p className={base}>
      <span className="text-terra">{difficultyStars(difficulty)}</span>
      <span className="mx-1.5 opacity-50">·</span>
      {String(duration).toUpperCase()}
      <span className="mx-1.5 opacity-50">·</span>
      {distance} KM
    </p>
  )
}

export { difficultyStars }
