import { useEffect } from 'react'

// Sets the browser tab title (and optionally the meta description) for a page.
// Every page title ends with "ayaanoutdoors" so the brand shows in Google
// results and browser tabs. Pass just the page-specific part, e.g.
//   usePageTitle('Hikes & Trails')  ->  "Hikes & Trails — ayaanoutdoors"
// Pass nothing for the home page to use the full default title.
const BRAND = 'ayaanoutdoors'
const DEFAULT_TITLE = 'ayaanoutdoors — Hikes & Travels by Ayaan'

export default function usePageTitle(pageTitle, description) {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} — ${BRAND}` : DEFAULT_TITLE

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute('name', 'description')
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', description)
    }
  }, [pageTitle, description])
}
