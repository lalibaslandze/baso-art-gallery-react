
import { Link } from "react-router-dom";
import useLanguage from "../useLanguage";

function Footer() {
  const { t } = useLanguage();

  const imageBase = `${import.meta.env.BASE_URL}images/`;

  return (
    <footer className="site-footer">
      <div className="container footer-inner">

        {/* FOOTER LOGO */}
        <div className="footer-brand">
          <Link to="/" className="logo">
            <img
              src={`${imageBase}logo-for-dark.png`}
              alt="BASO Art Gallery"
            />
          </Link>
        </div>

        {/* EXPLORE */}
        <div className="footer-column">
          <h3>{t.explore}</h3>
          <Link to="/">{t.home}</Link>
          <Link to="/artists">{t.artists}</Link>
          <Link to="/artworks">{t.artworks}</Link>
          <Link to="/about">{t.about}</Link>
          <Link to="/contact">{t.contact}</Link>
        </div>

        {/* CONTACT */}
        <div className="footer-column">
          <h3>{t.contact}</h3>

          <a href="mailto:l.baslandze@gmail.com">
            l.baslandze@gmail.com
          </a>

          <a href="tel:+995593749050">
            +995 593 749 050
          </a>
        </div>

        {/* SOCIAL MEDIA */}
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

      {/* COPYRIGHT */}
      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 BASO Art Gallery. {t.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
