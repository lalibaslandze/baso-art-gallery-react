
import { useState, useEffect } from "react";
import translations from "../translations";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [accountView, setAccountView] = useState("signin");
  const [message, setMessage] = useState("");

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("baso-demo-session")) || null;
    } catch {
      return null;
    }
  });

  // Basket item count
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

  const language = localStorage.getItem("baso-language") || "EN";
  const t = translations[language] || translations.EN;
  const isKA = language === "KA";

  function changeLanguage(selectedLanguage) {
    localStorage.setItem("baso-language", selectedLanguage);
    window.location.reload();
  }

  function handleRegister(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const firstName = form.get("firstName").trim();
    const surname = form.get("surname").trim();
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");
    const repeatPassword = form.get("repeatPassword");

    if (password !== repeatPassword) {
      setMessage(isKA ? "პაროლები არ ემთხვევა." : "Passwords do not match.");
      return;
    }

    const account = {
      firstName,
      surname,
      email,
    };

    localStorage.setItem("baso-demo-account", JSON.stringify(account));
    localStorage.setItem("baso-demo-session", JSON.stringify(account));

    setUser(account);
    setAccountOpen(false);
    setAccountView("signin");
    setMessage("");
  }

  function handleSignIn(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");

    const savedAccount = JSON.parse(
      localStorage.getItem("baso-demo-account") || "null"
    );

    if (!savedAccount || savedAccount.email !== email || !password) {
      setMessage(
        isKA
          ? "ანგარიში ვერ მოიძებნა. გთხოვთ, დარეგისტრირდეთ."
          : "Account not found. Please register first."
      );
      return;
    }

    localStorage.setItem("baso-demo-session", JSON.stringify(savedAccount));
    setUser(savedAccount);
    setAccountOpen(false);
    setMessage("");
  }

  function handleSignOut() {
    localStorage.removeItem("baso-demo-session");
    setUser(null);
    setAccountOpen(false);
    setAccountView("signin");
    setMessage("");
  }

  const initials = user
    ? `${user.firstName[0]}${user.surname[0]}`.toUpperCase()
    : null;

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
          {/* Basket */}
          <a
            href="/basket.html"
            className="icon-btn shopping-cart"
            aria-label={t.viewCart}
          >
            <img src="/images/shopping-bag.svg" alt="" />

            {basketCount > 0 && (
              <span className="basket-count">{basketCount}</span>
            )}
          </a>

          {/* Account */}
          <div className="account-area">
            <button
              className={`icon-btn account ${user ? "has-initials" : ""}`}
              type="button"
              aria-label={t.viewAccount}
              aria-expanded={accountOpen}
              onClick={() => {
                setAccountOpen(!accountOpen);
                setAccountView(user ? "profile" : "signin");
                setMessage("");
              }}
            >
              {user ? (
                <span>{initials}</span>
              ) : (
                <img src="/images/user-logo.svg" alt="" />
              )}
            </button>

            {accountOpen && (
              <div className="account-dropdown">
                {user && accountView === "profile" ? (
                  <div className="account-profile">
                    <h3>
                      {user.firstName} {user.surname}
                    </h3>
                    <p>{user.email}</p>

                    <button
                      type="button"
                      className="account-submit"
                      onClick={handleSignOut}
                    >
                      {isKA ? "გასვლა" : "Sign out"}
                    </button>
                  </div>
                ) : accountView === "signin" ? (
                  <>
                    <h3>{isKA ? "შესვლა" : "Sign in"}</h3>

                    <form onSubmit={handleSignIn}>
                      <input
                        type="email"
                        name="email"
                        placeholder={isKA ? "ელფოსტა" : "Email address"}
                        required
                      />

                      <input
                        type="password"
                        name="password"
                        placeholder={isKA ? "პაროლი" : "Password"}
                        required
                      />

                      <button type="submit" className="account-submit">
                        {isKA ? "შესვლა" : "Sign in"}
                      </button>
                    </form>

                    <p className="account-switch">
                      {isKA
                        ? "არ ხართ რეგისტრირებული?"
                        : "Not registered yet?"}{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setAccountView("register");
                          setMessage("");
                        }}
                      >
                        {isKA ? "რეგისტრაცია" : "Sign up"}
                      </button>
                    </p>
                  </>
                ) : (
                  <>
                    <h3>{isKA ? "რეგისტრაცია" : "Create account"}</h3>

                    <form onSubmit={handleRegister}>
                      <input
                        type="text"
                        name="firstName"
                        placeholder={isKA ? "სახელი" : "First name"}
                        required
                      />

                      <input
                        type="text"
                        name="surname"
                        placeholder={isKA ? "გვარი" : "Surname"}
                        required
                      />

                      <input
                        type="text"
                        name="personalId"
                        placeholder={
                          isKA
                            ? "პირადი ნომერი (11 ციფრი)"
                            : "Personal ID (11 digits)"
                        }
                        pattern="[0-9]{11}"
                        maxLength="11"
                        inputMode="numeric"
                        required
                      />

                      <input
                        type="email"
                        name="email"
                        placeholder={isKA ? "ელფოსტა" : "Email address"}
                        required
                      />

                      <input
                        type="password"
                        name="password"
                        placeholder={
                          isKA
                            ? "პაროლი (მინ. 8 სიმბოლო)"
                            : "Password (min. 8 characters)"
                        }
                        minLength="8"
                        required
                      />

                      <input
                        type="password"
                        name="repeatPassword"
                        placeholder={
                          isKA ? "გაიმეორეთ პაროლი" : "Repeat password"
                        }
                        minLength="8"
                        required
                      />

                      <button type="submit" className="account-submit">
                        {isKA ? "რეგისტრაცია" : "Create account"}
                      </button>
                    </form>

                    <p className="account-switch">
                      {isKA
                        ? "უკვე გაქვთ ანგარიში?"
                        : "Already registered?"}{" "}
                      <button
                        type="button"
                        onClick={() => {
                          setAccountView("signin");
                          setMessage("");
                        }}
                      >
                        {isKA ? "შესვლა" : "Sign in"}
                      </button>
                    </p>
                  </>
                )}

                {message && (
                  <p className="account-message">{message}</p>
                )}

                {!user && (
                  <p className="account-demo-note">
                    {isKA
                      ? "დემო ვერსია: პაროლის შემოწმება არ ხდება."
                      : "Demo version: passwords are not verified."}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Language */}
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

          {/* Mobile menu */}
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
