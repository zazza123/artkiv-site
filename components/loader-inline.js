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
      <li><a href="index.html#features">Features</a></li>
      <li><a href="index.html#premium">Premium</a></li>
      <li><a href="index.html#about">About</a></li>
      <li><a href="support.html">Support</a></li>
      <li><a href="index.html#download" class="nav-cta">Download</a></li>
    </ul>

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
        <p class="footer-description">
          Turn your passion into profit! Perfect for artisans, collectors, and small businesses. Organize, track, and
          grow—100% offline.
        </p>
      </div>

      <div class="footer-column">
        <h4>Product</h4>
        <ul class="footer-links">
          <li><a href="index.html#features">Features</a></li>
          <li><a href="index.html#premium">Premium</a></li>
          <li><a href="index.html#download">Download</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h4>Support</h4>
        <ul class="footer-links">
          <li><a href="support.html">Help Center</a></li>
          <li><a href="support.html#faq">FAQ</a></li>
          <li><a href="support.html#contact">Contact Us</a></li>
        </ul>
      </div>

      <div class="footer-column">
        <h4>Legal</h4>
        <ul class="footer-links">
          <li><a href="privacy_policy.html">Privacy Policy</a></li>
          <li><a href="terms_of_service.html">Terms of Service</a></li>
          <li><a href="copyright.html">Copyright</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-copyright">© 2025 Artkiv. All rights reserved. Made by <a href="https://github.com/zazza123"
          target="_blank" rel="noopener noreferrer">Andrea Zanini</a>.</p>
      <div class="footer-legal">
        <a href="privacy_policy.html">Privacy</a>
        <a href="terms_of_service.html">Terms</a>
        <a href="copyright.html">Copyright</a>
      </div>
    </div>
  </div>
</footer>`;

  function loadComponents() {
    const headerElement = document.getElementById('header-placeholder');
    const footerElement = document.getElementById('footer-placeholder');
    
    if (headerElement) {
      headerElement.innerHTML = headerHTML;
    }
    
    if (footerElement) {
      footerElement.innerHTML = footerHTML;
    }
  }

  // Load components when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
  } else {
    loadComponents();
  }
})();
