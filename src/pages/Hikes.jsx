import ActivityPage from './ActivityPage'
import usePageTitle from '../components/usePageTitle'
import { hikePosts } from '../data/hikePosts'
import { site } from '../data/site'

export default function Hikes() {
  const h = site.pageHeaders.hikes
  usePageTitle(h.title, h.subtitle)
  return (
    <ActivityPage
      posts={hikePosts}
      kind="hike"
      eyebrow={h.eyebrow}
      title={h.title}
      subtitle={h.subtitle}
      showDistance={true}
    />
  )
}
