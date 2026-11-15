
import { artists } from "../data";

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

function ArtistCard({ artist }) {
  return (
    <article className="artist-card">
      <div className="artist-image-wrapper">
        {artist.image ? (
          <img
            src={artist.image}
            alt={artist.name}
            className="artist-portrait"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <ArtistPlaceholder name={artist.name} />
        )}
      </div>

      <h2>{artist.name}</h2>
    </article>
  );
}

function ArtistsPage() {
  return (
    <main>
      <section className="hero-artworks" id="artists">
        <div className="hero-media">
          <img
            src="/images/artist-hero-image.png"
            alt="BASO Art Gallery artists"
          />
        </div>

        <div className="hero-content">
          <div className="container">
            <h1>Artists</h1>

            <p>
              Meet the creative minds behind our collection
              of contemporary artworks.
            </p>
          </div>
        </div>
      </section>

      <section className="artists-area container">
        <div className="artists-grid">
          {artists.map((artist) => (
            <ArtistCard artist={artist} key={artist.id} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default ArtistsPage;
