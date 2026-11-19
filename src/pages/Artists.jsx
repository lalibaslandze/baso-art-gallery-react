
 // Import artist data, the language hook, and the function for translating artist information.
import { artists } from "../data";
import useLanguage from "../useLanguage";
import { getLocalizedText } from "../dataTranslations";

// Create a placeholder using the artist's initials when no portrait is available.
function ArtistPlaceholder({ name }) {
  // Remove extra spaces, split the name into words, and take the first letter of each word.
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="artist-placeholder"
      // Provide an accessible description of the placeholder.
      aria-label={`Portrait placeholder for ${name}`}
    >
      {initials}
    </div>
  );
}

// Display an individual artist's portrait and name.
function ArtistCard({ artist, language }) {
  // Get the artist's name in the currently selected language.
  const artistName = getLocalizedText(
    artist,
    "name",
    language
  );

  return (
    <article className="artist-card">
      <div className="artist-image-wrapper">
        {/* Display the artist's image if available; otherwise, show their initials. */}
        {artist.image ? (
          <img
            src={artist.image}
            alt={artistName}
            className="artist-portrait"
            // Load the image when it approaches the visible area.
            loading="lazy"
            // Hide the image if the browser cannot load the file.
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <ArtistPlaceholder name={artistName} />
        )}
      </div>

      {/* Display the artist's name in the selected language. */}
      <h2>{artistName}</h2>
    </article>
  );
}

// Main component responsible for displaying the Artists page.
function ArtistsPage() {
  // Get the general translations and the currently selected language.
  const { t, language } = useLanguage();

  return (
    <main>
      {/* HERO SECTION: displays the main image, page title, and introduction. */}
      <section className="hero-artworks" id="artists">
        <div className="hero-media">
          <img
            src="/images/artist-hero-image.png"
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

      {/* ARTISTS SECTION: creates a card for every artist in the data array. */}
      <section className="artists-area container">
        <div className="artists-grid">
          {artists.map((artist) => (
            <ArtistCard
              artist={artist}
              language={language}
              // Give each card a unique key so React can identify it.
              key={artist.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

// Export the Artists page so it can be used in App.jsx.
export default ArtistsPage;
