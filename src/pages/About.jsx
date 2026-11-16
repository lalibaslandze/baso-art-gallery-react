
import useLanguage from "../useLanguage";

function AboutPage() {
  const { t } = useLanguage();

  return (
    <main>
      <section className="hero-about" id="about">
        <div className="hero-media">
          <img
            src="/images/about-hero-image.png"
            alt="A minimalist gallery space with an abstract painting on display"
          />
        </div>

        <div className="hero-content">
          <div className="container">
            <h1>{t.aboutHeroTitle}</h1>
            <p>{t.aboutSubtitle}</p>
          </div>
        </div>
      </section>

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

export default AboutPage;
