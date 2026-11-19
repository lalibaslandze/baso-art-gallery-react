
// Import the contact page stylesheet and the custom language hook.
import "../styles/contact.css";
import useLanguage from "../useLanguage";

// Main component responsible for displaying the Contact page.
function ContactPage() {
  // Get the translated text for the currently selected language.
  const { t } = useLanguage();

  // Handle the contact form submission.
  function handleSubmit(event) {
    // Prevent the browser from reloading the page when the form is submitted.
    event.preventDefault();

    // Collect all form input values using the FormData API.
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Encode the email subject so it can safely be used in a mailto URL.
    const subject = encodeURIComponent("Contact from BASO Art Gallery");

    // Prepare and encode the email body using the values entered in the form.
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    // Open the user's default email application with the recipient, subject, and message filled in.
    window.location.href =
      `mailto:l.baslandze@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <main>
      {/* HERO SECTION: displays the main image, page title, and introduction. */}
      <section className="hero-about" id="contact">
        <div className="hero-media">
          <img
            src="/images/about-hero-image.png"
            alt="BASO Art Gallery"
          />
        </div>

        <div className="hero-content">
          <div className="container">
            {/* Display the translated contact heading and description. */}
            <h1>{t.getInTouch}</h1>
            <p>{t.contactDescription}</p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION: contains contact information and the message form. */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-layout">

            {/* CONTACT INFORMATION: displays the gallery's phone, email, and social links. */}
            <div className="contact-information">
              <div className="contact-item">
                <h3>{t.call}</h3>
                {/* The tel link allows visitors to call the gallery. */}
                <a href="tel:+995593749050">+995 593 749 050</a>
              </div>

              <div className="contact-item">
                <h3>{t.email}</h3>
                {/* The mailto link opens the visitor's default email application. */}
                <a href="mailto:l.baslandze@gmail.com">
                  l.baslandze@gmail.com
                </a>
              </div>

              <div className="contact-item">
                <h3>{t.socialMedia}</h3>
                {/* Open the gallery's social media pages in new browser tabs. */}
                <a
                  href="https://www.instagram.com/l.baslandze/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram ↗
                </a>
                <a
                  href="https://www.facebook.com/lalibaso"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook ↗
                </a>
              </div>
            </div>

            {/* CONTACT FORM: allows visitors to enter their details and send a message. */}
            <div className="contact-form-wrapper">
              <h3>{t.messageUs}</h3>

              {/* Call handleSubmit when the visitor submits the form. */}
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder={t.yourName}
                    aria-label={t.name}
                    required
                  />
                </div>

                <div className="form-field">
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder={t.yourEmail}
                    aria-label={t.email}
                    required
                  />
                </div>

                <div className="form-field">
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder={t.yourMessage}
                    aria-label={t.yourMessage}
                    rows="5"
                    required
                  />
                </div>

                {/* Submit the form and open an email with the entered information. */}
                <button type="submit" className="btn btn-dark">
                  {t.sendMessage}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Export ContactPage so it can be displayed by App.jsx.
export default ContactPage;
