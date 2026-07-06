// ============================================================
//  HIKES adapter
//  Content is edited in the CMS and stored in
//  src/data/content/hikes.json. This file reshapes it for the
//  site components (e.g. turns the gallery objects into plain
//  string arrays). You normally won't edit this file.
// ============================================================
import hikesJson from './content/hikes.json'

// The five regions used by the filter dropdown. Keep in sync with
// the options in the CMS config (admin/config.yml).
export const REGIONS = [
  'Sai Kung & Eastern New Territories',
  'Central New Territories & Kowloon Ridges',
  'Northern & Northwestern New Territories',
  'Lantau Island',
  'Hong Kong Island & Southern Outlying Islands',
]

export const hikePosts = hikesJson.items.map((h) => ({
  ...h,
  // gallery is stored as [{src}], components expect [url]
  gallery: (h.gallery || []).map((g) => (typeof g === 'string' ? g : g.src)),
}))
