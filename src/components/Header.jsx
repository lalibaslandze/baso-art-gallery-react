
import { useState } from "react";
import translations from "../translations";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const language = localStorage.getItem("baso-language") || "EN";
  const t = translations[language] || translations.EN;

  function changeLanguage(selectedLanguage) {
    localStorage.setItem("baso-language", selectedLanguage);
    window.location.reload();
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="logo">
          <img src="/images/logo-for-light.png" alt="BASO Art Gallery" />
        </a>

        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          id="main-nav"
          aria-label="Main navigation"
        >
          <a href="/">{t.home}</a>
          <a href="/artists.html">{t.artists}</a>
          <a href="/artworks.html">{t.artworks}</a>
          <a href="/about.html">{t.about}</a>
          <a href="/contact.html">{t.contact}</a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn shopping-cart"
            type="button"
            aria-label={t.viewCart}
          >
            <img src="/images/shopping-bag.svg" alt="" />
          </button>

          <button
            className="icon-btn account"
            type="button"
            aria-label={t.viewAccount}
          >
            <img src="/images/user-logo.svg" alt="" />
          </button>

          <div className="language-selector">
            <button
              className="language-toggle"
              type="button"
              aria-label={t.chooseLanguage}
              aria-expanded={languageOpen}
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <svg
                viewBox="0 0 24 24"
                width="19"
                height="19"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18" />
                <path d="M12 3a14 14 0 0 1 0 18" />
                <path d="M12 3a14 14 0 0 0 0 18" />
              </svg>
            </button>

            {languageOpen && (
              <div className="language-dropdown">
                <button
                  type="button"
                  className={language === "EN" ? "active" : ""}
                  onClick={() => changeLanguage("EN")}
                >
                  English
                </button>

                <button
                  type="button"
                  className={language === "KA" ? "active" : ""}
                  onClick={() => changeLanguage("KA")}
                >
                  ქართული
                </button>
              </div>
            )}
          </div>

          <button
            className="icon-btn menu-toggle"
            id="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-controls="main-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img src="/images/toggle.svg" alt="" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
