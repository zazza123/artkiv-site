// Component loader for header and footer
(function () {
  var componentsToLoad = 2;
  var componentsLoaded = 0;

  function onAllComponentsLoaded() {
    if (window.I18n && typeof window.I18n.translatePage === 'function') {
      window.I18n.translatePage();
      window.I18n.updateSwitcher();
    }
  }

  function loadComponent(elementId, componentPath, callback) {
    fetch(componentPath)
      .then(response => response.text())
      .then(data => {
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = data;
          if (callback) callback();
        }
        componentsLoaded++;
        if (componentsLoaded >= componentsToLoad) {
          onAllComponentsLoaded();
        }
      })
      .catch(error => {
        console.error(`Error loading ${componentPath}:`, error);
        componentsLoaded++;
        if (componentsLoaded >= componentsToLoad) {
          onAllComponentsLoaded();
        }
      });
  }

  function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    // Navbar scroll effect for home page (index.html)
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    } else {
      // Other pages start with scrolled navbar
      navbar.classList.add('scrolled');
    }

    // Close nav when clicking a nav link (event delegation - works with async-loaded header)
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

  // Expose nav toggle functions globally so onclick="toggleNav()" in header works
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
    loadComponent('header-placeholder', 'components/header.html', initNavbar);
    loadComponent('footer-placeholder', 'components/footer.html');
  }

  // Load header and footer when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
  } else {
    loadComponents();
  }
})();
