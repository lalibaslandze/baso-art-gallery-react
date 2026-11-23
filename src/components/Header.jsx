
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLanguage from "../useLanguage";
import AccountModal from "./AccountModal";
import "../styles/header.css";

function Header() {
  const imageBase = `${import.meta.env.BASE_URL}images/`;

  const { language, t, setLanguage } = useLanguage();
  const isKA = language === "KA";

  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("baso-demo-session")) || null;
    } catch {
      return null;
    }
  });

  const getBasketCount = () => {
    try {
      const basket = JSON.parse(localStorage.getItem("baso-basket")) || [];
      return basket.length;
    } catch {
      return 0;
    }
  };

  const [basketCount, setBasketCount] = useState(getBasketCount);

  useEffect(() => {
    function updateBasketCount() {
      setBasketCount(getBasketCount());
    }

    window.addEventListener("basketUpdated", updateBasketCount);
    window.addEventListener("storage", updateBasketCount);

    updateBasketCount();

    return () => {
      window.removeEventListener("basketUpdated", updateBasketCount);
      window.removeEventListener("storage", updateBasketCount);
    };
  }, []);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setAccountOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  function closeAccount() {
    setAccountOpen(false);
  }

  function openAccount() {
    setAccountOpen(true);
    setMenuOpen(false);
  }

  function toggleLanguage() {
    setLanguage(isKA ? "EN" : "KA");
  }

  const initials = user
    ? `${user.firstName?.[0] || ""}${user.surname?.[0] || ""}`.toUpperCase()
    : null;

  return (
    <>
      <header className="site-header">
        <div className="header-inner">

          {/* LOGO */}
          <Link to="/" className="logo" onClick={closeMenu}>
            <img
              src={`${imageBase}logo-for-light.png`}
              alt="BASO Art Gallery"
            />
          </Link>

          {/* MAIN NAVIGATION */}
          <nav
            className={`main-nav ${menuOpen ? "is-open" : ""}`}
            id="main-nav"
            aria-label="Main navigation"
          >
            <Link to="/" onClick={closeMenu}>{t.home}</Link>
            <Link to="/artists" onClick={closeMenu}>{t.artists}</Link>
            <Link to="/artworks" onClick={closeMenu}>{t.artworks}</Link>
            <Link to="/about" onClick={closeMenu}>{t.about}</Link>
            <Link to="/contact" onClick={closeMenu}>{t.contact}</Link>
          </nav>

          {/* HEADER ACTIONS */}
          <div className="header-actions">

            {/* BASKET */}
            <Link
              to="/basket"
              className="icon-btn shopping-cart"
              aria-label={t.viewCart}
              onClick={closeMenu}
            >
              <img src={`${imageBase}shopping-bag.svg`} alt="" />

              {basketCount > 0 && (
                <span className="basket-count">{basketCount}</span>
              )}
            </Link>

            {/* ACCOUNT */}
            <div className="account-area">
              <button
                className={`icon-btn account ${user ? "has-initials" : ""}`}
                type="button"
                aria-label={t.viewAccount}
                aria-expanded={accountOpen}
                onClick={openAccount}
              >
                {user ? (
                  <span>{initials}</span>
                ) : (
                  <img src={`${imageBase}user-logo.svg`} alt="" />
                )}
              </button>
            </div>

            {/* LANGUAGE */}
            <button
              className="language-toggle"
              type="button"
              onClick={toggleLanguage}
              aria-label={
                isKA ? "Switch language to English" : "ენის შეცვლა ქართულზე"
              }
              title={isKA ? "Switch to English" : "ქართულად"}
            >
              <span aria-hidden="true">
                {isKA ? "🇬🇪" : "🇬🇧"}
              </span>
            </button>

            {/* MOBILE MENU */}
            <button
              className={`icon-btn menu-toggle ${menuOpen ? "active" : ""}`}
              id="menu-toggle"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-controls="main-nav"
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((previous) => !previous);
                setAccountOpen(false);
              }}
            >
              <img src={`${imageBase}toggle.svg`} alt="" />
            </button>

          </div>
        </div>
      </header>

      {/* ACCOUNT MODAL */}
      {accountOpen && (
        <AccountModal
          user={user}
          setUser={setUser}
          isKA={isKA}
          onClose={closeAccount}
        />
      )}
    </>
  );
}

export default Header;
