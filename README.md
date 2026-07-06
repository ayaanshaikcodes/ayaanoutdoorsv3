# Ayaan — Portfolio & Travel/Hiking Blog

A premium personal portfolio + travel and hiking blog built with **React, Vite, Tailwind CSS, React Router, Framer Motion, and react-simple-maps**. Includes a Home page, an About/resume page, a Hikes blog with filtering, and a Travels page with an interactive world map, plus dynamic detail pages and dark mode.


## Editing through a visual dashboard (recommended)

This project includes **Sveltia CMS** — a visual admin panel at `/admin/` where you log in with GitHub and edit everything through forms with image uploads (no code, no files). One-time setup (~15 min) is in **CMS-SETUP.md**.

Once set up, you just visit `https://your-site/admin/`, edit, and hit Save — the site updates automatically.

---

## 1. Run it on your computer

You need **Node.js 18 or newer** installed (https://nodejs.org — download the "LTS" version).

Open a terminal in this folder and run:

```bash
npm install      # one time only — downloads the libraries
npm run dev      # starts the site at http://localhost:5173
```

Open the link it prints. The site reloads automatically every time you save a file.

To make the final files for hosting:

```bash
npm run build    # creates a "dist" folder with the finished site
npm run preview  # preview that finished build locally
```

---

## 2. Edit your content (no deep coding needed)

**All of your content lives in the `src/data/` folder.** You only edit text between quotes — never the surrounding code.

| File | What it controls |
|------|------------------|
| `src/data/profile.js`     | Your name, home intro, About-page bio, "passions" cards, and your Instagram / LinkedIn / email links |
| `src/data/hikePosts.js`   | The hikes (cards + detail pages) and the 5 region names used by the filter |
| `src/data/travelPosts.js` | Travel blog posts, the map dots, and the "places I've been" markers |

**To add a new hike / travel / project:** open the matching file, copy one `{ ... }` block, paste it, and change the values. Keep the commas between blocks.

**Important notes:**
- `slug` must be unique — it becomes the web address (e.g. `slug: "chengdu-china"` → `/travels/chengdu-china`).
- Travel `coordinates` are `[longitude, latitude]` — **longitude first**. Google "city name coordinates" to find them.
- Hike `difficulty` is a number 1–5; `distance` is in **kilometres (km)**.
- Hike `region` must exactly match one of the 5 names in the `REGIONS` list at the top of `hikePosts.js`.
- Images can be any web link. To use your own photos, drop them in the `public/` folder and reference them like `image: "/my-photo.jpg"`.

**The map (Travels page):**
- Places with a full write-up live in `travelPosts` and show as a card + a clickable dot.
- Places you've visited but haven't written about live in `extraMarkers` — they're just dots with a hover card.
- To promote a marker into a full post: cut its line from `extraMarkers`, paste it into `travelPosts`, and fill in `slug`, `image`, `excerpt`, `content`, and `gallery`.
- `markerImage` is the small photo shown when you hover a dot on the map. Leave it as `''` for now and add a link later.

**Your social links:** open `profile.js` and replace the `email` and `linkedin` placeholders with your real details. Instagram is already set to ayaanoutdoors.

**Changing the font:** swap the Google Fonts `<link>` in `index.html`, then update the `fontFamily` block in `tailwind.config.js` to match the new font name.

---

## 3. Put it online — Vercel vs Netlify

Both are free and excellent. Both config files are already included (`vercel.json` and `netlify.toml`) so deep links and refreshes work correctly.

**Recommendation:** use **Vercel** for this project. It's purpose-built for React/Vite, auto-detects all the settings, and gives you automatic redeploys whenever you change your content (see below). Netlify is equally capable — pick Vercel only because the React workflow is slightly smoother there.

### Easiest path (recommended): connect GitHub once, never touch the terminal again

1. Put this project on **GitHub** (free). Either use GitHub Desktop (a friendly app) or, in this folder:
   ```bash
   git init && git add . && git commit -m "my portfolio"
   ```
   then create a repo on github.com and follow its "push an existing repository" lines.
2. Go to **vercel.com** → sign in with GitHub → **Add New Project** → pick your repo → **Deploy**. Done — you get a live URL in ~1 minute.
3. **Future edits without the terminal:** edit any file in `src/data/` directly on github.com (click the file → pencil icon → change text → "Commit changes"). Vercel automatically rebuilds and updates your live site within a minute. You never run a command again.

### Alternative: Netlify drag-and-drop (no GitHub)

1. Run `npm run build` to create the `dist` folder.
2. Go to **app.netlify.com/drop** and drag the `dist` folder onto the page. Instant live URL.
3. Downside: every time you change content you must re-build and re-drag. The GitHub route above avoids this.

---

## 4. Project structure

```
portfolio/
├── index.html              # page shell
├── package.json            # dependencies & scripts
├── vite.config.js          # build tool config
├── tailwind.config.js      # colors & fonts
├── netlify.toml            # Netlify deploy + routing
├── vercel.json             # Vercel routing
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # app entry point
    ├── App.jsx             # routes + page transitions
    ├── index.css           # global styles
    ├── data/               # ← YOUR CONTENT LIVES HERE
    │   ├── profile.js
    │   ├── projects.js
    │   ├── hikePosts.js
    │   └── travelPosts.js
    ├── components/         # reusable building blocks
    │   ├── Navbar.jsx  Footer.jsx  Hero (in Home)  ThemeToggle.jsx
    │   ├── ProjectCard.jsx  BlogCard.jsx  HikeStatsBadge.jsx
    │   ├── WorldMap.jsx  Timeline.jsx  CTASection.jsx
    │   ├── SectionHeader.jsx  Reveal.jsx  ScrollToTop.jsx
    └── pages/
        ├── Home.jsx  About.jsx  Hikes.jsx  Travels.jsx
        ├── PostDetail.jsx  (handles both /hikes/:slug and /travels/:slug)
        └── NotFound.jsx
```

---

## 5. Customising colors / fonts

- **Colors:** `tailwind.config.js` → the `colors` block (`forest`, `sage`, `terra`, `sand`). Change the hex codes.
- **Fonts:** swap the Google Fonts link in `index.html` and the `fontFamily` block in `tailwind.config.js`.

Enjoy! ✈️🥾
