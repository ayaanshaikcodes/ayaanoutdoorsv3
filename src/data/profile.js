// ============================================================
//  PROFILE adapter
//  The actual content is edited in the CMS and stored in
//  src/data/content/profile.json. This file just re-exports it
//  so the rest of the site keeps importing { profile } as before.
//  (You normally won't edit this file — edit it in the CMS, or
//   directly in content/profile.json.)
// ============================================================
import profileJson from './content/profile.json'

export const profile = profileJson
