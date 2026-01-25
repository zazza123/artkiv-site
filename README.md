# Artkiv Static Website

Static marketing website for Artkiv - deployed to GitHub Pages.

## Local Development

### Start Local Server

```bash
cd site
python3 -m http.server 8000
```

Then visit: **http://localhost:8000**

### Stop Server

Press `Ctrl+C` in the terminal where the server is running.

## Why a Server?

The site uses modular components (`components/header.html` and `components/footer.html`) loaded via JavaScript `fetch()`. This requires an HTTP server - opening `index.html` directly with `file://` protocol won't work due to CORS restrictions.

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions (see `docs/site_deployment.md`). The component loader works perfectly on GitHub Pages since it's served over HTTPS.

## Structure

```
site/
├── components/          # Reusable header/footer components
│   ├── header.html
│   ├── footer.html
│   ├── loader.js
│   └── README.md
├── css/                 # Stylesheets
├── image/               # Images and assets
├── index.html           # Landing page
├── privacy_policy.html
├── terms_of_service.html
├── support.html
└── copyright.html
```

## Components

Header and footer are maintained in `components/` folder. Changes to these files automatically reflect across all pages. See `components/README.md` for details.
