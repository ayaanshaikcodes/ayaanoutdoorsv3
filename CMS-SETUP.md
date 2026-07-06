# Setting up your editing dashboard (Sveltia CMS)

This gives you a visual admin panel at **`https://YOUR-SITE/admin/`** where you log in with GitHub and add/edit hikes, travels, map markers, and your profile through forms — with image uploads. Changes save straight to your repo and Vercel redeploys automatically.

You do this **once**. Budget ~15 minutes.

---

## Before you start
You should already have:
- Your project on **GitHub** (private is fine).
- The site deployed on **Vercel** with a live URL (e.g. `https://ayaanoutdoors.vercel.app`).

Write your live URL down — you'll paste it a few times. Below it's called **YOUR-SITE**.

---

## Step 1 — Tell the CMS where your repo lives

Open the file **`public/admin/config.yml`** and change the three marked lines near the top:

```yaml
backend:
  name: github
  repo: ayaanshaikcodes/ayaanoutdoorsv3 # e.g. ayaan/ayaanoutdoors
  branch: main
  base_url: https://ayaanoutdoors.vercel.app         # e.g. https://ayaanoutdoors.vercel.app
  auth_endpoint: api/auth
...
site_url: https://ayaanoutdoors.vercel.app           # same URL again
```

- `repo` is your `username/repository` exactly as it appears in the GitHub URL.
- `base_url` and `site_url` are your full live site URL (no trailing slash).

You can edit this file right on github.com (pencil icon) if you prefer — just commit when done.

---

## Step 2 — Create a GitHub OAuth app (this is the login)

1. Go to **github.com → your photo (top-right) → Settings → Developer settings → OAuth Apps → New OAuth App**.
   (Direct link: https://github.com/settings/developers)
2. Fill in:
   - **Application name:** anything, e.g. `ayaanoutdoors CMS`
   - **Homepage URL:** `https://YOUR-SITE`
   - **Authorization callback URL:** `https://YOUR-SITE/api/callback`
     ← this must be exact, including `/api/callback`
3. Click **Register application**.
4. On the next screen you'll see a **Client ID** — copy it.
5. Click **Generate a new client secret** — copy that too (you only see it once).

Keep both values handy for the next step.

---

## Step 3 — Add those secrets to Vercel

1. Go to **vercel.com → your project → Settings → Environment Variables**.
2. Add two variables (Production, Preview, and Development all ticked):

   | Name | Value |
   |------|-------|
   | `OAUTH_GITHUB_CLIENT_ID` | the Client ID from Step 2 |
   | `OAUTH_GITHUB_CLIENT_SECRET` | the Client secret from Step 2 |

3. Click **Save**.

> Important: environment variables only take effect on the **next** deploy. After saving, go to the **Deployments** tab → latest deployment → **⋯ → Redeploy** (or just push the changes from Step 1, which triggers a deploy anyway).

---

## Step 4 — Push your changes and let Vercel deploy

If you edited `config.yml` locally, commit and push (GitHub Desktop → Commit → Push), or commit the edit you made on github.com. Vercel rebuilds in about a minute.

---

## Step 5 — Log in and edit

1. Go to **`https://YOUR-SITE/admin/`**.
2. Click **Login with GitHub** → authorize the app (first time only).
3. You're in. You'll see four sections in the sidebar:
   - **Hikes** — add/edit/reorder/remove hikes
   - **Travels** — full destination posts (card + clickable map dot)
   - **Map markers** — places shown as dots only (no write-up yet)
   - **Profile & About** — your name, intros, bio, social links, "what I'm about" cards
4. Make a change → **Save** (top right). It commits to your repo; Vercel redeploys; your live site updates in ~1 minute.

That's it. From now on you never touch code or files — just visit `/admin/`.

---

## Day-to-day tips

- **Add a new hike:** Hikes → open "All hikes" → scroll to the list → **＋ Add Hike** → fill the form → Save. The `slug` must be unique and use only lowercase letters, numbers, and dashes (e.g. `tai-mo-shan`).
- **Add a place you visited but haven't written about:** use **Map markers** (just city, country, longitude, latitude). To turn it into a full post later, recreate it under **Travels** and delete the marker.
- **Coordinates:** Google "`<city> coordinates`". Longitude is the East-West number (can be negative); latitude is North-South. The form labels which is which.
- **Images:** click any image field → **Upload** → pick a photo from your computer. It's stored in your repo under `public/uploads/` and the link is filled in automatically. No more hunting for image URLs.
- **Marker hover photo:** the small image that pops up when someone hovers a dot on the map is the "markerImage" field (optional).

---

## Troubleshooting

- **"Login failed" / popup closes with an error:** double-check the callback URL in your GitHub OAuth app is exactly `https://YOUR-SITE/api/callback`, and that both environment variables are set in Vercel and you've redeployed since adding them.
- **Login popup is blank or 404:** make sure you deployed after adding the `api/` folder, and that `vercel.json` is the version that excludes `/api/` from the rewrite (it is, in this project).
- **Changes saved but site didn't update:** check the Vercel **Deployments** tab — a new deploy should start within a few seconds of saving. If a build fails, the log will say why.
- **Want a friend to edit too:** invite them to the GitHub repo with **write** access (repo → Settings → Collaborators). They log in at `/admin/` with their own GitHub account.
