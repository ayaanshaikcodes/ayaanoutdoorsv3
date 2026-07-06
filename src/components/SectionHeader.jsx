import { motion } from 'framer-motion'

// Editorial section header: mono eyebrow + serif title, left-aligned.
export default function SectionHeader({ eyebrow, title, sub, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className={(center ? 'text-center mx-auto ' : '') + 'max-w-2xl mb-10 sm:mb-14'}
    >
      {eyebrow && (
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-terra mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
      {sub && <p className="mt-3 text-stone dark:text-neutral-400">{sub}</p>}
    </motion.div>
  )
}
