
import { artists, artworks } from "../data";
import translations from "../translations";

const language = localStorage.getItem("baso-language") || "EN";
const t = translations[language] || translations.EN;

function getRandomItems(items, count) {
  return [...items]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-media">
        <img
          src="/images/hero-image.png"
          alt="A minimalist gallery space with an abstract painting on display"
        />
      </div>

      <div className="hero-content">
        <div className="container">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDescription}</p>
          <a href="/artworks.html" className="btn btn-dark">
            {t.exploreArtworks}
          </a>
        </div>
      </div>
    </section>
  );
}

function FeaturedArtworks() {
  const featuredArtworks = getRandomItems(artworks, 4);

  return (
    <section className="featured-artworks">
      <div className="container">
        <div className="section-header">
          <h2>{t.featuredArtworks}</h2>
          <a href="/artworks.html" className="view-all">
            {t.viewAll} →
          </a>
        </div>

        <div id="featured-artworks-container">
          {featuredArtworks.map((artwork) => {
            const artist = artists.find(
              (item) => item.id === artwork.artistId
            );

            return (
              <a
                href={`/artwork.html?id=${artwork.id}`}
                className="featured-artwork-card"
                key={artwork.id}
              >
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  loading="lazy"
                />
                <h3>{artwork.title}</h3>
                <p>{artist?.name || artwork.artist || ""}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FeaturedArtists() {
  const featuredArtists = getRandomItems(artists, 2);

  return (
    <section className="featured-artists">
      <div className="container">
        <div className="section-header">
          <h2>{t.featuredArtists}</h2>
          <a href="/artists.html" className="view-all">
            {t.viewAll} →
          </a>
        </div>

        <div id="featured-artists-container">
          {featuredArtists.map((artist) => (
            <a
              href={`/artists.html?id=${artist.id}`}
              className="featured-artist-card"
              key={artist.id}
            >
              {artist.image ? (
                <>
                  <img
                    src={artist.image}
                    alt={artist.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                      event.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <div className="artist-placeholder" style={{ display: "none" }}>
                    {artist.name.trim().split(/\s+/).map((part) => part[0]).join("").toUpperCase()}
                  </div>
                </>
              ) : (
                <div className="artist-placeholder">
                  {artist.name.trim().split(/\s+/).map((part) => part[0]).join("").toUpperCase()}
                </div>
              )}

              <h3>{artist.name}</h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      <Hero />
      <FeaturedArtworks />
      <FeaturedArtists />
    </main>
  );
}

export default Home;
