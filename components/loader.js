// Component loader for header and footer
(function() {
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
  }

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
