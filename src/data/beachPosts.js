// ============================================================
//  BEACHES adapter
//  Content is edited in the CMS and stored in
//  src/data/content/beaches.json. Same shape as hikes.
//  You normally won't edit this file — use the CMS.
// ============================================================
import beachesJson from './content/beaches.json'

export const beachPosts = beachesJson.items.map((b) => ({
  ...b,
  gallery: (b.gallery || []).map((g) => (typeof g === 'string' ? g : g.src)),
}))
