
// Import the custom hook that provides the selected language translations.
import useLanguage from "../useLanguage";

function AboutPage() {
  const { t } = useLanguage();

  return (
    <main>
      {/* HERO SECTION: displays the About page's main image and introduction. */}
      <section className="hero-about" id="about">
        <div className="hero-media">
          <img
            src="/images/about-hero-image.png"
            alt="A minimalist gallery space with an abstract painting on display"
          />
        </div>

        {/* The title and subtitle are displayed over the hero section. */}
        <div className="hero-content">
          <div className="container">
            <h1>{t.aboutHeroTitle}</h1>
            <p>{t.aboutSubtitle}</p>
          </div>
        </div>
      </section>

      {/* ABOUT TEXT: displays the gallery's introduction and description. */}
      <section className="featured-artworks">
        <div className="container">
          <p className="about-text">
            {t.aboutParagraph1}
            <br />
            <br />
            {t.aboutParagraph2}
          </p>
        </div>
      </section>
    </main>
  );
}

// Export the About page so it can be displayed by App.jsx.
export default AboutPage;
