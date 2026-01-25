# Site Components

This folder contains reusable HTML components for the Artkiv static website.

## Files

- **header.html** - Navigation bar component used across all pages
- **footer.html** - Footer component with links and copyright info
- **loader.js** - JavaScript module that dynamically loads header and footer into pages

## Usage

In your HTML pages, add these placeholders where you want the header and footer:

```html
<body>
  <!-- Header Placeholder -->
  <div id="header-placeholder"></div>
  
  <!-- Your page content here -->
  
  <!-- Footer Placeholder -->
  <div id="footer-placeholder"></div>
  
  <!-- Component Loader -->
  <script src="components/loader.js"></script>
</body>
```

The loader.js script will automatically fetch and inject the header and footer components when the page loads.

## Benefits

- **DRY Principle**: Header and footer are defined once, used everywhere
- **Easy Maintenance**: Update navigation or footer in one place
- **Consistency**: Ensures all pages have identical headers and footers
- **Clean Code**: Pages focus on content, not boilerplate

## Updating Components

To update the header or footer across all pages:

1. Edit `header.html` or `footer.html`
2. Changes automatically apply to all pages that use the loader
