import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { site } from '../data/site'

// Closing band inviting readers to the globe.
export default function CTASection() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-ink dark:bg-card text-paper px-8 py-14 sm:px-14 sm:py-20">
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
              backgroundSize: '26px 26px',
            }}
          />
          <p className="relative font-mono text-[11px] tracking-[0.22em] uppercase text-terra">
            {site.cta.eyebrow}
          </p>
          <h2 className="relative mt-4 font-serif text-3xl sm:text-5xl font-semibold leading-tight max-w-xl">
            {site.cta.titleLine1}
            <br />
            <em className="text-sage font-medium">{site.cta.titleLine2}</em>
          </h2>
          <Link
            to="/travels"
            className="relative inline-block mt-8 px-7 py-3.5 rounded-full bg-paper text-ink font-display font-bold text-sm hover:bg-sand transition"
          >
            {site.cta.button}
          </Link>
        </div>
      </Reveal>
    </section>
  )
}
