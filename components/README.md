# Site Components

This folder contains reusable HTML components for the Artkiv static website.

## Files

- **header.html** - Navigation bar with language switcher (EN|IT)
- **footer.html** - Footer with links, copyright info, and i18n attributes
- **loader.js** - Fetch-based loader (calls I18n after load)
- **loader-inline.js** - Inline fallback for `file://` protocol

## Usage

In your HTML pages, add placeholders and load scripts in this order:

```html
<body>
  <!-- Header Placeholder -->
  <div id="header-placeholder"></div>

  <!-- Your page content here -->

  <!-- Footer Placeholder -->
  <div id="footer-placeholder"></div>

  <!-- i18n Engine -->
  <script src="js/i18n.js"></script>

  <!-- Component Loader -->
  <script src="components/loader.js"></script>
</body>
```

**Script order matters**: `i18n.js` must load before `loader.js` so the i18n engine is available when components are injected.

The loader tracks component load completion and calls `I18n.translatePage()` after both header and footer are injected.

## Loaders

### loader.js (default)
Fetches `header.html` and `footer.html` via `fetch()`. Requires an HTTP server (won't work with `file://` due to CORS). After both components load, triggers i18n translation.

### loader-inline.js (offline fallback)
Contains header and footer HTML as inline template strings. Works with `file://` protocol for offline use. To use it, replace the loader script tag:
```html
<script src="components/loader-inline.js"></script>
```
**Note**: When updating `header.html` or `footer.html`, the inline copies in `loader-inline.js` must be updated manually to stay in sync.

## i18n Integration

Both components use `data-i18n` attributes for translation support:

- **Header**: nav links use `data-i18n` for text replacement; includes a language switcher (`EN | IT`)
- **Footer**: column headings, links, and description use `data-i18n`; copyright line uses `data-i18n-html` (contains a link)

The language switcher in the header calls `I18n.setLanguage()` on click:
```html
<div class="lang-switcher" id="lang-switcher">
  <button class="lang-btn active" data-lang="en" onclick="I18n.setLanguage('en')">EN</button>
  <span class="lang-divider">|</span>
  <button class="lang-btn" data-lang="it" onclick="I18n.setLanguage('it')">IT</button>
</div>
```

## Benefits

- **DRY Principle**: Header and footer are defined once, used everywhere
- **Easy Maintenance**: Update navigation or footer in one place
- **Consistency**: Ensures all pages have identical headers and footers
- **i18n Ready**: Translation attributes and language switcher built in

## Updating Components

To update the header or footer across all pages:

1. Edit `header.html` or `footer.html`
2. Changes automatically apply to all pages that use `loader.js`
3. Update the inline copies in `loader-inline.js` to keep the offline fallback in sync
4. If adding/changing translatable text, update the corresponding keys in `i18n/en.json` and `i18n/it.json`
