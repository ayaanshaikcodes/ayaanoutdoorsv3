import ActivityPage from './ActivityPage'
import usePageTitle from '../components/usePageTitle'
import { beachPosts } from '../data/beachPosts'
import { site } from '../data/site'

export default function Beaches() {
  const b = site.pageHeaders.beaches
  usePageTitle(b.title, b.subtitle)
  return (
    <ActivityPage
      posts={beachPosts}
      kind="beach"
      eyebrow={b.eyebrow}
      title={b.title}
      subtitle={b.subtitle}
      showDistance={false}
    />
  )
}
