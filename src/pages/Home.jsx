
import { Link } from "react-router-dom";
import { artists, artworks } from "../data";
import useLanguage from "../useLanguage";
import { getLocalizedText } from "../dataTranslations";

// Return a specified number of randomly selected items from an array.
function getRandomItems(items, count) {
  return [...items]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

// HERO COMPONENT
function Hero({ t }) {
  const imageBase = `${import.meta.env.BASE_URL}images/`;

  return (
    <section className="hero" id="home">
      <div className="hero-media">
        <img
          src={`${imageBase}hero-image.png`}
          alt="A minimalist gallery space with an abstract painting on display"
        />
      </div>

      <div className="hero-content">
        <div className="container">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDescription}</p>

          <Link to="/artworks" className="btn btn-dark">
            {t.exploreArtworks}
          </Link>
        </div>
      </div>
    </section>
  );
}

// FEATURED ARTWORKS COMPONENT
function FeaturedArtworks({ t, language }) {
  const featuredArtworks = getRandomItems(artworks, 4);

  return (
    <section className="featured-artworks">
      <div className="container">
        <div className="section-header">
          <h2>{t.featuredArtworks}</h2>

          <Link to="/artworks" className="view-all">
            {t.viewAll} →
          </Link>
        </div>

        <div id="featured-artworks-container">
          {featuredArtworks.map((artwork) => {
            const artist = artists.find(
              (item) => item.id === artwork.artistId
            );

            const title = getLocalizedText(
              artwork,
              "title",
              language
            );

            const artistName = artist
              ? getLocalizedText(artist, "name", language)
              : artwork.artist || "";

            return (
              <Link
                to="/artworks"
                className="featured-artwork-card"
                key={artwork.id}
              >
                <img
                  src={artwork.image}
                  alt={title}
                  loading="lazy"
                />

                <h3>{title}</h3>
                <p>{artistName}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// FEATURED ARTISTS COMPONENT
function FeaturedArtists({ t, language }) {
  const featuredArtists = getRandomItems(artists, 2);

  return (
    <section className="featured-artists">
      <div className="container">
        <div className="section-header">
          <h2>{t.featuredArtists}</h2>

          <Link to="/artists" className="view-all">
            {t.viewAll} →
          </Link>
        </div>

        <div id="featured-artists-container">
          {featuredArtists.map((artist) => {
            const artistName = getLocalizedText(
              artist,
              "name",
              language
            );

            const initials = artistName
              .trim()
              .split(/\s+/)
              .map((part) => part[0])
              .join("")
              .toUpperCase();

            return (
              <Link
                to="/artists"
                className="featured-artist-card"
                key={artist.id}
              >
                {artist.image ? (
                  <>
                    <img
                      src={artist.image}
                      alt={artistName}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                        event.currentTarget.nextElementSibling.style.display =
                          "flex";
                      }}
                    />

                    <div
                      className="artist-placeholder"
                      style={{ display: "none" }}
                    >
                      {initials}
                    </div>
                  </>
                ) : (
                  <div className="artist-placeholder">
                    {initials}
                  </div>
                )}

                <h3>{artistName}</h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// MAIN HOMEPAGE COMPONENT
function Home() {
  const { t, language } = useLanguage();

  return (
    <main>
      <Hero t={t} />

      <FeaturedArtworks
        t={t}
        language={language}
      />

      <FeaturedArtists
        t={t}
        language={language}
      />
    </main>
  );
}

export default Home;
