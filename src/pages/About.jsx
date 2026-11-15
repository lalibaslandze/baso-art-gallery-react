
function AboutPage() {
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
            <h1>
              About BASO
              <br />
              Art Gallery
            </h1>

            <p>A space where art and people come together.</p>
          </div>
        </div>
      </section>

      <section className="featured-artworks">
        <div className="container">
          <p className="about-text">
            BASO Art Gallery is a contemporary art space dedicated to
            connecting people with exceptional artworks and inspiring
            creativity.
            <br />
            <br />
            Our mission is to support artists and provide a platform for
            their work to be appreciated by a wider audience. We believe
            that art has the power to transform lives and we strive to
            create an environment where art can thrive.
          </p>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
