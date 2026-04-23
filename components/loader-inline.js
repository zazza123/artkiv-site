// Inline component loader - works with file:// protocol
(function () {
  const headerHTML = `<!-- Navigation -->
<nav class="navbar" id="navbar">
  <div class="container">
    <a href="index.html" class="nav-brand">
      <img src="image/app.png" alt="Artkiv Logo" width="40" height="40" style="border-radius: 10px;">
      Artkiv
    </a>

    <ul class="nav-links" id="nav-links">
      <li><a href="index.html#features" data-i18n="common.nav.features">Features</a></li>
      <li><a href="index.html#premium" data-i18n="common.nav.premium">Premium</a></li>
      <li><a href="index.html#about" data-i18n="common.nav.about">About</a></li>
      <li><a href="support.html" data-i18n="common.nav.support">Support</a></li>
      <li><a href="index.html#download" class="nav-cta" data-i18n="common.nav.download">Download</a></li>
    </ul>

    <!-- Language Switcher -->
    <div class="lang-switcher" id="lang-switcher">
      <button class="lang-btn active" data-lang="en" onclick="I18n.setLanguage('en')" aria-label="English">EN</button>
      <span class="lang-divider">|</span>
      <button class="lang-btn" data-lang="it" onclick="I18n.setLanguage('it')" aria-label="Italiano">IT</button>
    </div>

    <div class="nav-toggle" id="nav-toggle" onclick="toggleNav()">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</nav>`;

  const footerHTML = `<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="footer-logo">
          <img src="image/app.png" alt="Artkiv Logo" width="40" height="40" style="border-radius: 10px;">
          Artkiv
        </a>
        <p class="footer-description" data-i18n="common.footer.description">
          Turn your passion into profit! Perfect for artisans, collectors, and small businesses. Organize, track, and
          grow—100% offline.
        </p>
        <div class="footer-social">
          <a href="https://www.instagram.com/artkiv.app" target="_blank" rel="noopener noreferrer" aria-label="Instagram @artkiv.app">
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-column">
        <h4 data-i18n="common.footer.product">Product</h4>
        <ul class="footer-links">
          <li><a href="index.html#features" data-i18n="common.nav.features">Features</a></li>
          <li><a href="index.html#premium" data-i18n="common.nav.premium">Premium</a></li>
          <li><a href="index.html#download" data-i18n="common.nav.download">Download</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h4 data-i18n="common.footer.supportTitle">Support</h4>
        <ul class="footer-links">
          <li><a href="support.html" data-i18n="common.footer.helpCenter">Help Center</a></li>
          <li><a href="support.html#faq" data-i18n="common.footer.faq">FAQ</a></li>
          <li><a href="support.html#contact" data-i18n="common.footer.contactUs">Contact Us</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h4 data-i18n="common.footer.legal">Legal</h4>
        <ul class="footer-links">
          <li><a href="privacy_policy.html" data-i18n="common.footer.privacyPolicy">Privacy Policy</a></li>
          <li><a href="terms_of_service.html" data-i18n="common.footer.termsOfService">Terms of Service</a></li>
          <li><a href="copyright.html" data-i18n="common.footer.copyright">Copyright</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-copyright" data-i18n-html="common.footer.copyrightText">© 2025 Artkiv - Andromeda di <a href="https://github.com/zazza123"
          target="_blank" rel="noopener noreferrer">Zanini Andrea</a> | P.IVA 04886580168. All rights reserved.</p>
      <div class="footer-legal">
        <a href="privacy_policy.html" data-i18n="common.footer.privacy">Privacy</a>
        <a href="terms_of_service.html" data-i18n="common.footer.terms">Terms</a>
        <a href="copyright.html" data-i18n="common.footer.copyrightLink">Copyright</a>
      </div>
    </div>
  </div>
</footer>`;

  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    } else {
      navbar.classList.add('scrolled');
    }

    // Close nav when clicking a nav link (event delegation)
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('#nav-links a')) {
        window.closeNav();
      }
    });

    // Close nav on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        window.closeNav();
      }
    });
  }

  // Expose nav toggle functions globally
  window.closeNav = function () {
    var navLinks = document.getElementById('nav-links');
    var navToggle = document.getElementById('nav-toggle');
    var overlay = document.getElementById('nav-overlay');
    if (navLinks) navLinks.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  };

  window.toggleNav = function () {
    var navLinks = document.getElementById('nav-links');
    var navToggle = document.getElementById('nav-toggle');
    if (!navLinks) return;
    if (navLinks.classList.contains('active')) {
      window.closeNav();
    } else {
      navLinks.classList.add('active');
      if (navToggle) navToggle.classList.add('active');
      var overlay = document.getElementById('nav-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'nav-overlay';
        overlay.className = 'nav-overlay';
        overlay.addEventListener('click', window.closeNav);
        document.body.appendChild(overlay);
      }
      overlay.classList.add('active');
    }
  };

  function loadComponents() {
    const headerElement = document.getElementById('header-placeholder');
    const footerElement = document.getElementById('footer-placeholder');

    if (headerElement) {
      headerElement.innerHTML = headerHTML;
      initNavbar();
    }

    if (footerElement) {
      footerElement.innerHTML = footerHTML;
    }

    // Trigger i18n translation after components are loaded
    if (window.I18n && typeof window.I18n.translatePage === 'function') {
      window.I18n.translatePage();
      window.I18n.updateSwitcher();
    }
  }

  // Load components when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
  } else {
    loadComponents();
  }
})();
