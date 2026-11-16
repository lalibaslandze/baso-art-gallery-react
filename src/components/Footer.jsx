
import useLanguage from "../useLanguage";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="/" className="logo">
            <img src="/images/logo-for-dark.png" alt="BASO Art Gallery" />
          </a>
        </div>

        <div className="footer-column">
          <h3>{t.explore}</h3>
          <a href="/">{t.home}</a>
          <a href="/artists.html">{t.artists}</a>
          <a href="/artworks.html">{t.artworks}</a>
          <a href="/about.html">{t.about}</a>
          <a href="/contact.html">{t.contact}</a>
        </div>

        <div className="footer-column">
          <h3>{t.contact}</h3>
          <a href="mailto:l.baslandze@gmail.com">
            l.baslandze@gmail.com
          </a>
          <a href="tel:+995593749050">+995 593 749 050</a>
        </div>

        <div className="footer-column">
          <h3>{t.follow}</h3>
          <a
            href="https://www.instagram.com/l.baslandze"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/lalibaso"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 BASO Art Gallery. {t.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
