// ============================================================
//  TRAVELS adapter
//  Content is edited in the CMS and stored in:
//    src/data/content/travels.json  (full posts: card + map dot)
//    src/data/content/markers.json  (dots only, no post yet)
//  This file reshapes them for the site components. You normally
//  won't edit this file — use the CMS.
// ============================================================
import travelsJson from './content/travels.json'
import markersJson from './content/markers.json'

// Full posts: rebuild [lng,lat] -> coordinates, gallery -> [url]
export const travelPosts = travelsJson.items.map((t) => ({
  ...t,
  coordinates: [t.lng, t.lat],
  gallery: (t.gallery || []).map((g) => (typeof g === 'string' ? g : g.src)),
}))

// Marker-only places
export const extraMarkers = markersJson.items.map((m) => ({
  ...m,
  coordinates: [m.lng, m.lat],
}))

// Combined list the map uses. Posts are clickable (have a slug);
// extra markers are dots with a hover card only.
export const allMarkers = [
  ...travelPosts.map((p) => ({
    city: p.city,
    country: p.country,
    coordinates: p.coordinates,
    markerImage: p.markerImage,
    slug: p.slug,
  })),
  ...extraMarkers.map((m) => ({
    city: m.city,
    country: m.country,
    coordinates: m.coordinates,
    markerImage: m.markerImage,
    slug: null,
  })),
]
