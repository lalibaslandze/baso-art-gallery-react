
import { artists } from "../data";
import useLanguage from "../useLanguage";
import { getLocalizedText } from "../dataTranslations";

// Placeholder displayed when an artist portrait is unavailable.
function ArtistPlaceholder({ name }) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="artist-placeholder"
      aria-label={`Portrait placeholder for ${name}`}
    >
      {initials}
    </div>
  );
}

// Individual artist card.
function ArtistCard({ artist, language }) {
  const artistName = getLocalizedText(
    artist,
    "name",
    language
  );

  return (
    <article className="artist-card">
      <div className="artist-image-wrapper">
        {artist.image ? (
          <img
            src={artist.image}
            alt={artistName}
            className="artist-portrait"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <ArtistPlaceholder name={artistName} />
        )}
      </div>

      <h2>{artistName}</h2>
    </article>
  );
}

// Main Artists page.
function ArtistsPage() {
  const { t, language } = useLanguage();

  const imageBase = `${import.meta.env.BASE_URL}images/`;

  return (
    <main>
      {/* ARTISTS HERO SECTION */}
      <section className="hero-artworks" id="artists">
        <div className="hero-media">
          <img
            src={`${imageBase}artist-hero-image.png`}
            alt="BASO Art Gallery artists"
          />
        </div>

        <div className="hero-content">
          <div className="container">
            <h1>{t.artists}</h1>
            <p>{t.artistsDescription}</p>
          </div>
        </div>
      </section>

      {/* ARTISTS GRID */}
      <section className="artists-area container">
        <div className="artists-grid">
          {artists.map((artist) => (
            <ArtistCard
              artist={artist}
              language={language}
              key={artist.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ArtistsPage;
