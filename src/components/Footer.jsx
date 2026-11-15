function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href="/" className="logo">
            <img src="/images/logo-for-dark.png" alt="BASO Art Gallery" />
          </a>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <a href="/">Home</a>
          <a href="/artists.html">Artists</a>
          <a href="/artworks.html">Artworks</a>
          <a href="/about.html">About Us</a>
          <a href="/contact.html">Contact</a>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <a href="mailto:l.baslandze@gmail.com">
            l.baslandze@gmail.com
          </a>
          <a href="tel:+995000000000">+995 000 000 000</a>
          <p>Tbilisi, Georgia</p>
        </div>

        <div className="footer-column">
          <h3>Follow</h3>
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
          <p>© 2026 BASO Art Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;