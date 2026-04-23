/**
 * Artkiv i18n Engine
 * Lightweight client-side internationalization for static sites.
 * No dependencies, vanilla JS.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'artkiv-lang';

  var I18n = {
    currentLang: 'en',
    supportedLangs: ['en', 'it'],
    defaultLang: 'en',
    translations: {},
    _initialized: false,

    /**
     * Detect preferred language.
     * Priority: localStorage > navigator.language > default
     */
    detectLanguage: function () {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && this.supportedLangs.indexOf(stored) !== -1) {
        return stored;
      }

      var browserLang = (navigator.language || navigator.userLanguage || 'en')
        .substring(0, 2)
        .toLowerCase();
      if (this.supportedLangs.indexOf(browserLang) !== -1) {
        return browserLang;
      }

      return this.defaultLang;
    },

    /**
     * Initialize the i18n system.
     */
    init: function () {
      var self = this;
      this.currentLang = this.detectLanguage();
      localStorage.setItem(STORAGE_KEY, this.currentLang);

      if (this.currentLang === this.defaultLang) {
        this._initialized = true;
        this.updateSwitcher();
        document.documentElement.lang = this.currentLang;
        document.documentElement.classList.remove('i18n-loading');
        return Promise.resolve();
      }

      return fetch('i18n/' + this.currentLang + '.json')
        .then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          return response.json();
        })
        .then(function (data) {
          self.translations = data;
          self._initialized = true;
          document.documentElement.lang = self.currentLang;
          self.translatePage();
          self.updateSwitcher();
          document.documentElement.classList.remove('i18n-loading');
        })
        .catch(function (err) {
          console.error('[i18n] Failed to load translations:', err);
          self.currentLang = self.defaultLang;
          localStorage.setItem(STORAGE_KEY, self.defaultLang);
          self._initialized = true;
          document.documentElement.classList.remove('i18n-loading');
        });
    },

    /**
     * Get translation for a key. Returns null if not found.
     */
    t: function (key) {
      return this.translations[key] || null;
    },

    /**
     * Translate all elements on the page with data-i18n attributes.
     */
    translatePage: function () {
      if (this.currentLang === this.defaultLang) return;

      var self = this;

      // textContent
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var val = self.t(el.getAttribute('data-i18n'));
        if (val) el.textContent = val;
      });

      // innerHTML (for content with links/formatting)
      document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
        var val = self.t(el.getAttribute('data-i18n-html'));
        if (val) el.innerHTML = val;
      });

      // placeholder
      document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        var val = self.t(el.getAttribute('data-i18n-placeholder'));
        if (val) el.placeholder = val;
      });

      // alt text
      document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
        var val = self.t(el.getAttribute('data-i18n-alt'));
        if (val) el.alt = val;
      });

      // Page title
      var titleEl = document.querySelector('[data-i18n-title]');
      if (titleEl) {
        var titleVal = self.t(titleEl.getAttribute('data-i18n-title'));
        if (titleVal) document.title = titleVal;
      }

      // Meta description
      var metaDesc = document.querySelector('meta[data-i18n-content]');
      if (metaDesc) {
        var descVal = self.t(metaDesc.getAttribute('data-i18n-content'));
        if (descVal) metaDesc.setAttribute('content', descVal);
      }

      // Update language switcher
      this.updateSwitcher();
    },

    /**
     * Switch to a new language.
     */
    setLanguage: function (lang) {
      if (this.supportedLangs.indexOf(lang) === -1) return;
      if (lang === this.currentLang) return;

      localStorage.setItem(STORAGE_KEY, lang);
      this.currentLang = lang;

      if (lang === this.defaultLang) {
        window.location.reload();
        return;
      }

      var self = this;
      fetch('i18n/' + lang + '.json')
        .then(function (response) {
          if (!response.ok) throw new Error('HTTP ' + response.status);
          return response.json();
        })
        .then(function (data) {
          self.translations = data;
          document.documentElement.lang = lang;
          self.translatePage();
        })
        .catch(function (err) {
          console.error('[i18n] Failed to load language:', lang, err);
        });
    },

    /**
     * Update the visual state of the language switcher buttons.
     */
    updateSwitcher: function () {
      var self = this;
      document.querySelectorAll('.lang-btn').forEach(function (btn) {
        if (btn.getAttribute('data-lang') === self.currentLang) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }
  };

  // Expose globally
  window.I18n = I18n;

  // Auto-initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      I18n.init();
    });
  } else {
    I18n.init();
  }
})();
