
// Import React hooks for managing component state and side effects.
import { useState, useEffect } from "react";

// Import text translations for English and Georgian.
import translations from "../translations";

function Header() {
  // Control the visibility of the mobile menu, language menu and account dropdown.
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // Track which account screen is displayed and any messages shown to the user.
  const [accountView, setAccountView] = useState("signin");
  const [message, setMessage] = useState("");

  // Load the logged-in user's session from localStorage when the component starts.
  // If no session exists or the stored data is invalid, the user is set to null.
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("baso-demo-session")) || null;
    } catch {
      return null;
    }
  });

  // Read the number of items currently stored in the shopping basket.
  const getBasketCount = () => {
    try {
      const basket = JSON.parse(localStorage.getItem("baso-basket")) || [];
      return basket.length;
    } catch {
      return 0;
    }
  };

  const [basketCount, setBasketCount] = useState(getBasketCount);

  // Listen for basket changes and update the basket count displayed in the header.
  useEffect(() => {
    function updateBasketCount() {
      setBasketCount(getBasketCount());
    }

    window.addEventListener("basketUpdated", updateBasketCount);
    window.addEventListener("storage", updateBasketCount);

    updateBasketCount();

    // Remove event listeners when the Header component is unmounted.
    return () => {
      window.removeEventListener("basketUpdated", updateBasketCount);
      window.removeEventListener("storage", updateBasketCount);
    };
  }, []);

  // Close the mobile menu and dropdowns when the user presses Escape.
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setAccountOpen(false);
        setLanguageOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Get the selected language and the corresponding translation texts.
  const language = localStorage.getItem("baso-language") || "EN";
  const t = translations[language] || translations.EN;
  const isKA = language === "KA";

  // Close the mobile navigation menu.
  function closeMenu() {
    setMenuOpen(false);
  }

  // Save the selected language and reload the website to apply the translations.
  function changeLanguage(selectedLanguage) {
    localStorage.setItem("baso-language", selectedLanguage);
    window.location.reload();
  }

  // Handle account registration.
  function handleRegister(event) {
    event.preventDefault();

    // Collect the values entered in the registration form.
    const form = new FormData(event.currentTarget);

    const firstName = form.get("firstName").trim();
    const surname = form.get("surname").trim();
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");
    const repeatPassword = form.get("repeatPassword");

    // Check whether both password fields match.
    if (password !== repeatPassword) {
      setMessage(isKA ? "პაროლები არ ემთხვევა." : "Passwords do not match.");
      return;
    }

    // Create an account object containing the user's basic information.
    const account = {
      firstName,
      surname,
      email,
    };

    // Save the account and active session in the browser's localStorage.
    localStorage.setItem("baso-demo-account", JSON.stringify(account));
    localStorage.setItem("baso-demo-session", JSON.stringify(account));

    setUser(account);
    setAccountOpen(false);
    setAccountView("signin");
    setMessage("");
  }

  // Handle account sign-in.
  function handleSignIn(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");

    // Retrieve the previously registered account.
    const savedAccount = JSON.parse(
      localStorage.getItem("baso-demo-account") || "null"
    );

    // Check that an account exists, the email matches and a password was entered.
    if (!savedAccount || savedAccount.email !== email || !password) {
      setMessage(
        isKA
          ? "ანგარიში ვერ მოიძებნა. გთხოვთ, დარეგისტრირდეთ."
          : "Account not found. Please register first."
      );
      return;
    }

    // Save the active session and update the interface.
    localStorage.setItem("baso-demo-session", JSON.stringify(savedAccount));
    setUser(savedAccount);
    setAccountOpen(false);
    setMessage("");
  }

  // Sign out by removing the active session from localStorage.
  function handleSignOut() {
    localStorage.removeItem("baso-demo-session");
    setUser(null);
    setAccountOpen(false);
    setAccountView("signin");
    setMessage("");
  }

  // Generate the user's initials for the account icon when signed in.
  const initials = user
    ? `${user.firstName[0]}${user.surname[0]}`.toUpperCase()
    : null;

  return (
    <header className="site-header">
      <div className="header-inner">

        {/* LOGO */}
        <a href="/" className="logo" onClick={closeMenu}>
          <img src="/images/logo-for-light.png" alt="BASO Art Gallery" />
        </a>

        {/* MAIN NAVIGATION */}
        <nav
          className={`main-nav ${menuOpen ? "is-open" : ""}`}
          id="main-nav"
          aria-label="Main navigation"
        >
          <a href="/" onClick={closeMenu}>{t.home}</a>
          <a href="/artists.html" onClick={closeMenu}>{t.artists}</a>
          <a href="/artworks.html" onClick={closeMenu}>{t.artworks}</a>
          <a href="/about.html" onClick={closeMenu}>{t.about}</a>
          <a href="/contact.html" onClick={closeMenu}>{t.contact}</a>
        </nav>

        {/* HEADER ACTIONS */}
        <div className="header-actions">

          {/* BASKET: displays the shopping bag and item count when the basket is not empty. */}
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

          {/* ACCOUNT: displays the sign-in, registration or user profile interface. */}
          <div className="account-area">
            <button
              className={`icon-btn account ${user ? "has-initials" : ""}`}
              type="button"
              aria-label={t.viewAccount}
              aria-expanded={accountOpen}
              onClick={() => {
                setAccountOpen(!accountOpen);
                setLanguageOpen(false);
                setMenuOpen(false);
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

                {/* Show the profile when a user is signed in. */}
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
                    {/* Show the sign-in form when the account view is "signin". */}
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
                    {/* Display the registration form when the user selects "Sign up". */}
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

                {/* Display validation or account messages when available. */}
                {message && (
                  <p className="account-message">{message}</p>
                )}

                {/* Explain that account authentication is simulated in this demo. */}
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

          {/* LANGUAGE: allows the visitor to switch between English and Georgian. */}
          <div className="language-selector">
            <button
              className="language-toggle"
              type="button"
              aria-label={t.chooseLanguage}
              aria-expanded={languageOpen}
              onClick={() => {
                setLanguageOpen(!languageOpen);
                setAccountOpen(false);
                setMenuOpen(false);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="26"
                height="26"
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
                  aria-label="English"
                  title="English"
                  onClick={() => changeLanguage("EN")}
                >
                  🇬🇧
                </button>

                <button
                  type="button"
                  className={language === "KA" ? "active" : ""}
                  aria-label="Georgian"
                  title="Georgian"
                  onClick={() => changeLanguage("KA")}
                >
                  🇬🇪
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU: opens or closes the navigation on smaller screens. */}
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
              setLanguageOpen(false);
            }}
          >
            <img src="/images/toggle.svg" alt="" />
          </button>

        </div>
      </div>
    </header>
  );
}

// Export Header so it can be used in App.jsx.
export default Header;
