# Revaz — Portfolio

Single-page personal portfolio. Pure HTML + CSS + vanilla JS. No frameworks, no build tools. Strict black & white theme. Ready for GitHub Pages.

## Structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── README.md
│   └── photo.jpg   ← add your photo here
└── README.md
```

## Local preview

Just open `index.html` in a browser, or serve locally:

```bash
python -m http.server 8000
# → http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `revaz.github.io` for a user site, or `portfolio` for a project site).
2. Initialize and push from this folder:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

3. On GitHub → **Settings → Pages**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `root`
   - Save.

4. Your site will be live at:
   - User site: `https://<your-username>.github.io`
   - Project site: `https://<your-username>.github.io/<repo>/`

## Customize

- **Photo:** drop `photo.jpg` into `assets/`. If missing, the hero falls back to an "R" monogram.
- **Links:** update GitHub / LinkedIn / email in the Contact section and footer of `index.html`.
- **Copy:** all content lives in `index.html` — edit directly.

## Design notes

- Pure monochrome (`#000` → `#fff` + grays). No accent color.
- Typography: JetBrains Mono + Space Grotesk (Google Fonts).
- Subtle animated particle/grid canvas in the hero.
- Scroll-triggered fade-in reveals via `IntersectionObserver`.
- Fully responsive: mobile, tablet, desktop.

Built by Revaz © 2026
