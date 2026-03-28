# Artkiv Static Website

Static marketing website for Artkiv - deployed to GitHub Pages. Supports English (default) and Italian via client-side i18n.

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

The site uses modular components (`components/header.html` and `components/footer.html`) loaded via JavaScript `fetch()`, and translation files loaded the same way. This requires an HTTP server - opening `index.html` directly with `file://` protocol won't work due to CORS restrictions. For offline/file:// use, switch to `loader-inline.js`.

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions (see `docs/site_deployment.md`). The component loader and i18n system work perfectly on GitHub Pages since it's served over HTTPS.

## Structure

```
site/
├── components/          # Reusable header/footer components
│   ├── header.html      # Navbar with language switcher (EN|IT)
│   ├── footer.html
│   ├── loader.js        # Fetch-based loader (calls I18n after load)
│   ├── loader-inline.js # Inline fallback for file:// protocol
│   └── README.md
├── css/                 # Stylesheets
├── i18n/                # Translation files
│   ├── en.json          # English translations (reference)
│   └── it.json          # Italian translations
├── js/                  # JavaScript modules
│   └── i18n.js          # i18n engine
├── image/               # Images and assets
├── index.html           # Landing page
├── privacy_policy.html
├── terms_of_service.html
├── support.html
└── copyright.html
```

## Components

Header and footer are maintained in `components/` folder. Changes to these files automatically reflect across all pages. See `components/README.md` for details.

## Internationalization (i18n)

The site supports multiple languages via a lightweight client-side JavaScript solution. No external libraries are used.

### How It Works

- English text is hardcoded in the HTML (default, no fetch needed)
- Non-English languages are loaded from JSON files in `i18n/`
- `data-i18n` attributes on HTML elements map to translation keys
- Language preference is saved in `localStorage` and auto-detected from the browser
- A language switcher (EN | IT) is displayed in the navbar

### Adding a New Language

1. Create `i18n/{code}.json` (e.g., `i18n/fr.json`) with all keys from `en.json`
2. Add the language code to `I18n.supportedLangs` in `js/i18n.js`
3. Add a new button in `components/header.html` and `components/loader-inline.js`:
   ```html
   <button class="lang-btn" data-lang="fr" onclick="I18n.setLanguage('fr')">FR</button>
   ```

### Translation Attributes

| Attribute | Usage |
|-----------|-------|
| `data-i18n="key"` | Replaces `textContent` |
| `data-i18n-html="key"` | Replaces `innerHTML` (for content with HTML tags) |
| `data-i18n-title="key"` | Sets the page `<title>` |
| `data-i18n-content="key"` | Sets the `content` attribute (for `<meta>` tags) |
| `data-i18n-placeholder="key"` | Sets the `placeholder` attribute |
| `data-i18n-alt="key"` | Sets the `alt` attribute |

### Updating Translations

When modifying site content:
1. Update the English text in the HTML file
2. Update the corresponding key in `i18n/en.json`
3. Update the same key in `i18n/it.json` (and any other language files)
