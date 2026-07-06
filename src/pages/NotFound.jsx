import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-5 pt-44 pb-32 text-center">
      <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-terra">Off the map</p>
      <h1 className="mt-4 font-serif text-7xl font-semibold">404</h1>
      <p className="mt-4 text-stone dark:text-neutral-400">That page wandered off the trail.</p>
      <Link
        to="/"
        className="inline-block mt-8 px-7 py-3 rounded-full bg-ink dark:bg-paper text-paper dark:text-ink font-display font-bold text-sm"
      >
        Back to camp
      </Link>
    </section>
  )
}
