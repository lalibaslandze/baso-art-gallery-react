
import "../styles/contact.css";
import useLanguage from "../useLanguage";

function ContactPage() {
  const { t } = useLanguage();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    const subject = encodeURIComponent("Contact from BASO Art Gallery");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href =
      `mailto:l.baslandze@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <main>
      <section className="hero-about" id="contact">
        <div className="hero-media">
          <img
            src="/images/about-hero-image.png"
            alt="BASO Art Gallery"
          />
        </div>

        <div className="hero-content">
          <div className="container">
            <h1>{t.getInTouch}</h1>
            <p>{t.contactDescription}</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-information">
              <div className="contact-item">
                <h3>{t.call}</h3>
                <a href="tel:+995593749050">+995 593 749 050</a>
              </div>

              <div className="contact-item">
                <h3>{t.email}</h3>
                <a href="mailto:l.baslandze@gmail.com">
                  l.baslandze@gmail.com
                </a>
              </div>

              <div className="contact-item">
                <h3>{t.socialMedia}</h3>
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

            <div className="contact-form-wrapper">
              <h3>{t.messageUs}</h3>

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

export default ContactPage;
