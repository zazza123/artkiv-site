// Inline component loader - works with file:// protocol
(function() {
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
  }

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
