
// Import artist and artwork data, the language hook, and the localization helper.
import { artists, artworks } from "../data";
import useLanguage from "../useLanguage";
import { getLocalizedText } from "../dataTranslations";

// Return a specified number of randomly selected items from an array.
function getRandomItems(items, count) {
  // Create a copy, shuffle its order, and return only the requested number of items.
  return [...items]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

// HERO COMPONENT: displays the main homepage image, heading, and introduction.
function Hero({ t }) {
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
          {/* Display the translated homepage title and description. */}
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDescription}</p>

          {/* Link visitors to the complete artworks collection. */}
          <a href="/artworks.html" className="btn btn-dark">
            {t.exploreArtworks}
          </a>
        </div>
      </div>
    </section>
  );
}

// FEATURED ARTWORKS COMPONENT: displays four randomly selected artworks.
function FeaturedArtworks({ t, language }) {
  // Select four random artworks from the complete artworks array.
  const featuredArtworks = getRandomItems(artworks, 4);

  return (
    <section className="featured-artworks">
      <div className="container">
        {/* Section heading and link to view the complete collection. */}
        <div className="section-header">
          <h2>{t.featuredArtworks}</h2>
          <a href="/artworks.html" className="view-all">
            {t.viewAll} →
          </a>
        </div>

        {/* Create a card for each selected artwork. */}
        <div id="featured-artworks-container">
          {featuredArtworks.map((artwork) => {
            // Find the artist associated with the current artwork.
            const artist = artists.find(
              (item) => item.id === artwork.artistId
            );

            // Get the artwork title in the selected language.
            const title = getLocalizedText(
              artwork,
              "title",
              language
            );

            // Get the artist's translated name, or use the artwork's artist field as a fallback.
            const artistName = artist
              ? getLocalizedText(artist, "name", language)
              : artwork.artist || "";

            return (
              <a
                href={`/artwork.html?id=${artwork.id}`}
                className="featured-artwork-card"
                key={artwork.id}
              >
                {/* Display the artwork image, title, and artist name. */}
                <img
                  src={artwork.image}
                  alt={title}
                  loading="lazy"
                />
                <h3>{title}</h3>
                <p>{artistName}</p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// FEATURED ARTISTS COMPONENT: displays two randomly selected artists.
function FeaturedArtists({ t, language }) {
  // Select two random artists from the complete artists array.
  const featuredArtists = getRandomItems(artists, 2);

  return (
    <section className="featured-artists">
      <div className="container">
        {/* Section heading and link to view all artists. */}
        <div className="section-header">
          <h2>{t.featuredArtists}</h2>
          <a href="/artists.html" className="view-all">
            {t.viewAll} →
          </a>
        </div>

        {/* Create a card for each selected artist. */}
        <div id="featured-artists-container">
          {featuredArtists.map((artist) => {
            // Get the artist's name in the selected language.
            const artistName = getLocalizedText(
              artist,
              "name",
              language
            );

            // Generate uppercase initials from the artist's name for use as a placeholder.
            const initials = artistName
              .trim()
              .split(/\s+/)
              .map((part) => part[0])
              .join("")
              .toUpperCase();

            return (
              <a
                href={`/artists.html?id=${artist.id}`}
                className="featured-artist-card"
                key={artist.id}
              >
                {/* Display the artist's portrait or initials if the image is unavailable. */}
                {artist.image ? (
                  <>
                    <img
                      src={artist.image}
                      alt={artistName}
                      loading="lazy"
                      // Hide a broken image and display the placeholder next to it.
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
                  // Display initials immediately when no image is provided.
                  <div className="artist-placeholder">
                    {initials}
                  </div>
                )}

                {/* Display the artist's translated name. */}
                <h3>{artistName}</h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// MAIN HOMEPAGE COMPONENT: combines the hero and featured content sections.
function Home() {
  // Get the general translations and currently selected language.
  const { t, language } = useLanguage();

  return (
    <main>
      {/* Display the main homepage introduction. */}
      <Hero t={t} />

      {/* Display selected artworks and pass the required translations and language. */}
      <FeaturedArtworks t={t} language={language} />

      {/* Display selected artists and pass the required translations and language. */}
      <FeaturedArtists t={t} language={language} />
    </main>
  );
}

// Export Home so it can be displayed by App.jsx.
export default Home;
