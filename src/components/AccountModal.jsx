
import { useState } from "react";
import { createPortal } from "react-dom";
import "../styles/accountmodal.css";

function AccountModal({ user, setUser, isKA, onClose }) {
  const [view, setView] = useState(user ? "profile" : "signin");
  const [message, setMessage] = useState("");

  function handleRegister(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const firstName = form.get("firstName").trim();
    const surname = form.get("surname").trim();
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");
    const repeatPassword = form.get("repeatPassword");

    if (password !== repeatPassword) {
      setMessage(
        isKA ? "პაროლები არ ემთხვევა." : "Passwords do not match."
      );
      return;
    }

    const account = { firstName, surname, email };

    localStorage.setItem("baso-demo-account", JSON.stringify(account));
    localStorage.setItem("baso-demo-session", JSON.stringify(account));

    setUser(account);
    setView("profile");
    setMessage("");
  }

  function handleSignIn(event) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");

    let savedAccount = null;

    try {
      savedAccount = JSON.parse(
        localStorage.getItem("baso-demo-account") || "null"
      );
    } catch {
      savedAccount = null;
    }

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
    setView("profile");
    setMessage("");
  }

  function handleSignOut() {
    localStorage.removeItem("baso-demo-session");
    setUser(null);
    setView("signin");
    setMessage("");
    onClose();
  }

  function switchView(nextView) {
    setView(nextView);
    setMessage("");
  }

  return createPortal(
    <div className="account-modal-overlay" onClick={onClose}>
      <section
        className="account-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="account-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>

        {user && view === "profile" ? (
          <div className="account-modal-content">
            <h2 id="account-modal-title">
              {isKA ? "ანგარიში" : "Account"}
            </h2>

            <div className="account-profile-details">
              <h3>{user.firstName} {user.surname}</h3>
              <p>{user.email}</p>
            </div>

            <button
              type="button"
              className="account-modal-submit"
              onClick={handleSignOut}
            >
              {isKA ? "გასვლა" : "Sign out"}
            </button>
          </div>
        ) : view === "signin" ? (
          <div className="account-modal-content">
            <h2 id="account-modal-title">
              {isKA ? "შესვლა" : "Sign in"}
            </h2>

            <form onSubmit={handleSignIn}>
              <label>
                {isKA ? "ელფოსტა" : "Email"}
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </label>

              <label>
                {isKA ? "პაროლი" : "Password"}
                <input
                  type="password"
                  name="password"
                  placeholder={isKA ? "პაროლი" : "Password"}
                  required
                />
              </label>

              <button type="submit" className="account-modal-submit">
                {isKA ? "შესვლა" : "Sign in"}
              </button>
            </form>

            <p className="account-modal-switch">
              {isKA ? "არ გაქვთ ანგარიში?" : "Don't have an account?"}
              <button type="button" onClick={() => switchView("register")}>
                {isKA ? "რეგისტრაცია" : "Register"}
              </button>
            </p>
          </div>
        ) : (
          <div className="account-modal-content">
            <h2 id="account-modal-title">
              {isKA ? "ანგარიშის შექმნა" : "Create account"}
            </h2>

            <form onSubmit={handleRegister}>
              <label>
                {isKA ? "სახელი" : "First name"}
                <input type="text" name="firstName" required />
              </label>

              <label>
                {isKA ? "გვარი" : "Surname"}
                <input type="text" name="surname" required />
              </label>

              <label>
                {isKA ? "პირადი ნომერი" : "Personal ID"}
                <input
                  type="text"
                  name="personalId"
                  placeholder={isKA ? "11 ციფრი" : "11 digits"}
                  pattern="[0-9]{11}"
                  maxLength="11"
                  inputMode="numeric"
                  required
                />
              </label>

              <label>
                {isKA ? "ელფოსტა" : "Email"}
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  required
                />
              </label>

              <label>
                {isKA ? "პაროლი" : "Password"}
                <input
                  type="password"
                  name="password"
                  minLength="8"
                  required
                />
              </label>

              <label>
                {isKA ? "გაიმეორეთ პაროლი" : "Repeat password"}
                <input
                  type="password"
                  name="repeatPassword"
                  minLength="8"
                  required
                />
              </label>

              <button type="submit" className="account-modal-submit">
                {isKA ? "ანგარიშის შექმნა" : "Create account"}
              </button>
            </form>

            <p className="account-modal-switch">
              {isKA ? "უკვე გაქვთ ანგარიში?" : "Already have an account?"}
              <button type="button" onClick={() => switchView("signin")}>
                {isKA ? "შესვლა" : "Sign in"}
              </button>
            </p>
          </div>
        )}

        {message && (
          <p className="account-modal-message" role="alert">
            {message}
          </p>
        )}
      </section>
    </div>,
    document.body
  );
}

export default AccountModal;
