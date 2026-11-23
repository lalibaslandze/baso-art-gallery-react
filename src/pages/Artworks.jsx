
import { useState } from "react";
import { artists, artworks } from "../data";
import useLanguage from "../useLanguage";
import { getLocalizedText } from "../dataTranslations";

// Reusable filter group.
function FilterGroup({ title, options, selected, onChange }) {
  return (
    <div className="filter-group">
      <h3>{title}</h3>

      <div>
        {options.map((option) => {
          const value =
            typeof option === "object" ? option.value : String(option);

          const label =
            typeof option === "object" ? option.label : String(option);

          return (
            <label key={value}>
              <input
                type="checkbox"
                value={value}
                checked={selected.includes(value)}
                onChange={() => onChange(value)}
              />
              {label}
            </label>
          );
        })}
      </div>
    </div>
  );
}

// Individual artwork card.
function ArtworkCard({ artwork, t, language }) {
  const [isAdded, setIsAdded] = useState(() => {
    try {
      const basket = JSON.parse(
        localStorage.getItem("baso-basket") || "[]"
      );

      return basket.some((item) => item.id === artwork.id);
    } catch {
      return false;
    }
  });

  const title = getLocalizedText(artwork, "title", language);
  const medium = getLocalizedText(artwork, "medium", language);

  const artist = artists.find(
    (item) => item.id === artwork.artistId
  );

  const artistName = artist
    ? getLocalizedText(artist, "name", language)
    : "";

  // Add artwork to basket.
  function addToBasket() {
    try {
      const basket = JSON.parse(
        localStorage.getItem("baso-basket") || "[]"
      );

      const alreadyAdded = basket.some(
        (item) => item.id === artwork.id
      );

      if (alreadyAdded) {
        setIsAdded(true);
        return;
      }

      const updatedBasket = [...basket, artwork];

      localStorage.setItem(
        "baso-basket",
        JSON.stringify(updatedBasket)
      );

      window.dispatchEvent(new Event("basketUpdated"));

      setIsAdded(true);
    } catch (error) {
      console.error("Could not add artwork to basket:", error);
    }
  }

  return (
    <div className="artwork-card">
      <img src={artwork.image} alt={title} loading="lazy" />

      <h2>{title}</h2>
      <p>{artistName}</p>
      <p>{artwork.year}</p>
      <p>{medium}</p>

      <p>
        {artwork.width} × {artwork.height} {artwork.unit}
      </p>

      <p>
        {artwork.price} {artwork.currency}
      </p>

      <button
        type="button"
        className="add-to-basket-btn"
        onClick={addToBasket}
        disabled={isAdded}
      >
        {isAdded ? t.addedToBasket : t.addToBasket}
      </button>
    </div>
  );
}

// Main Artworks page.
function ArtworksPage() {
  const { t, language } = useLanguage();

  // GitHub Pages-compatible image path.
  const imageBase = `${import.meta.env.BASE_URL}images/`;

  const priceRanges = [
    { label: t.under300, min: 0, max: 299 },
    { label: t.range300to499, min: 300, max: 499 },
    { label: t.range500to999, min: 500, max: 999 },
    { label: t.over1000, min: 1000, max: Infinity },
  ];

  const [selectedFilters, setSelectedFilters] = useState({
    artists: [],
    years: [],
    mediums: [],
    sizes: [],
    prices: [],
  });

  const years = [
    ...new Set(artworks.map((artwork) => String(artwork.year))),
  ];

  const mediums = [
    ...new Set(
      artworks.map((artwork) =>
        getLocalizedText(artwork, "medium", language)
      )
    ),
  ];

  const sizes = [
    ...new Set(
      artworks.map(
        (artwork) =>
          `${artwork.width} × ${artwork.height} ${artwork.unit}`
      )
    ),
  ];

  // Update selected filters.
  function toggleFilter(category, value) {
    setSelectedFilters((previous) => {
      const current = previous[category];

      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      return { ...previous, [category]: updated };
    });
  }

  // Filter artworks according to selected options.
  const filteredArtworks = artworks.filter((artwork) => {
    const artistMatch =
      selectedFilters.artists.length === 0 ||
      selectedFilters.artists.includes(String(artwork.artistId));

    const yearMatch =
      selectedFilters.years.length === 0 ||
      selectedFilters.years.includes(String(artwork.year));

    const mediumMatch =
      selectedFilters.mediums.length === 0 ||
      selectedFilters.mediums.includes(
        getLocalizedText(artwork, "medium", language)
      );

    const size = `${artwork.width} × ${artwork.height} ${artwork.unit}`;

    const sizeMatch =
      selectedFilters.sizes.length === 0 ||
      selectedFilters.sizes.includes(size);

    const priceMatch =
      selectedFilters.prices.length === 0 ||
      selectedFilters.prices.some((selectedPrice) => {
        const range = priceRanges.find(
          (item) => item.label === selectedPrice
        );

        return (
          range &&
          artwork.price >= range.min &&
          artwork.price <= range.max
        );
      });

    return (
      artistMatch &&
      yearMatch &&
      mediumMatch &&
      sizeMatch &&
      priceMatch
    );
  });

  // Distribute artworks into three columns.
  const columns = [[], [], []];

  filteredArtworks.forEach((artwork, index) => {
    columns[index % 3].push(artwork);
  });

  return (
    <main>
      {/* ARTWORKS HERO SECTION */}
      <section className="hero-artworks" id="artworks">
        <div className="hero-media">
          <img
            src={`${imageBase}artwork-hero-image.png`}
            alt="A minimalist gallery space with an abstract painting on display"
          />
        </div>

        <div className="hero-content">
          <div className="container">
            <h1>{t.artworks}</h1>
            <p>{t.artworksDescription}</p>
          </div>
        </div>
      </section>

      {/* GALLERY LAYOUT */}
      <div className="gallery-layout">

        {/* FILTER SIDEBAR */}
        <aside className="filters">
          <FilterGroup
            title={t.artist}
            options={artists.map((artist) => ({
              value: String(artist.id),
              label: getLocalizedText(artist, "name", language),
            }))}
            selected={selectedFilters.artists}
            onChange={(value) => toggleFilter("artists", value)}
          />

          <FilterGroup
            title={t.year}
            options={years}
            selected={selectedFilters.years}
            onChange={(value) => toggleFilter("years", value)}
          />

          <FilterGroup
            title={t.medium}
            options={mediums}
            selected={selectedFilters.mediums}
            onChange={(value) => toggleFilter("mediums", value)}
          />

          <FilterGroup
            title={t.size}
            options={sizes}
            selected={selectedFilters.sizes}
            onChange={(value) => toggleFilter("sizes", value)}
          />

          <FilterGroup
            title={t.price}
            options={priceRanges}
            selected={selectedFilters.prices}
            onChange={(value) => toggleFilter("prices", value)}
          />
        </aside>

        {/* ARTWORK COLLECTION */}
        <section className="artworks-area">
          <div id="artworks-container">
            {columns.map((column, index) => (
              <div className="artworks-column" key={index}>
                {column.map((artwork) => (
                  <ArtworkCard
                    artwork={artwork}
                    t={t}
                    language={language}
                    key={artwork.id}
                  />
                ))}
              </div>
            ))}
          </div>

          {filteredArtworks.length === 0 && (
            <p className="no-artworks">{t.noArtworks}</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default ArtworksPage;
