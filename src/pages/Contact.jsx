
import "../styles/contact.css";

function ContactPage() {
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
            <h1>Get in touch</h1>
            <p>We would love to hear from you.</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-information">
              <div className="contact-item">
                <h3>Call</h3>
                <a href="tel:593749050">593749050</a>
              </div>

              <div className="contact-item">
                <h3>Email</h3>
                <a href="mailto:l.baslandze@gmail.com">
                  l.baslandze@gmail.com
                </a>
              </div>

              <div className="contact-item">
                <h3>Social media</h3>
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
              <h3>Message us</h3>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Name"
                    aria-label="Name"
                    required
                  />
                </div>

                <div className="form-field">
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="Email"
                    aria-label="Email"
                    required
                  />
                </div>

                <div className="form-field">
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Your message..."
                    aria-label="Message"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-dark">
                  Send message
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
