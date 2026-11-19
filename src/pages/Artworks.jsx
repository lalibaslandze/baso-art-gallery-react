
// Import React state, artwork and artist data, language translations, and localization helper.
import { useState } from "react";
import { artists, artworks } from "../data";
import useLanguage from "../useLanguage";
import { getLocalizedText } from "../dataTranslations";

// Create a reusable filter group with checkbox options.
function FilterGroup({ title, options, selected, onChange }) {
  return (
    <div className="filter-group">
      <h3>{title}</h3>
      <div>
        {/* Display each filter option as a checkbox. */}
        {options.map((option) => {
          // Support both simple text options and objects with separate values and labels.
          const value =
            typeof option === "object" ? option.value : String(option);
          const label =
            typeof option === "object" ? option.label : String(option);

          return (
            <label key={value}>
              <input
                type="checkbox"
                value={value}
                // Check the box if its value exists in the selected filters.
                checked={selected.includes(value)}
                // Notify the parent component when the checkbox is changed.
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

// Display an artwork's information and provide the option to add it to the basket.
function ArtworkCard({ artwork, t, language }) {
  // Check whether this artwork is already in the basket when the component loads.
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

  // Get the artwork title and medium in the selected language.
  const title = getLocalizedText(artwork, "title", language);
  const medium = getLocalizedText(artwork, "medium", language);

  // Find the artist whose ID matches the artwork's artistId.
  const artist = artists.find(
    (item) => item.id === artwork.artistId
  );

  // Get the artist's translated name, or use an empty string if no artist is found.
  const artistName = artist
    ? getLocalizedText(artist, "name", language)
    : "";

  // Add the selected artwork to the basket.
  function addToBasket() {
    try {
      // Read the current basket from localStorage.
      const basket = JSON.parse(
        localStorage.getItem("baso-basket") || "[]"
      );

      // Prevent the same artwork from being added more than once.
      const alreadyAdded = basket.some(
        (item) => item.id === artwork.id
      );

      if (alreadyAdded) {
        setIsAdded(true);
        return;
      }

      // Create a new basket array containing the existing items and the selected artwork.
      const updatedBasket = [...basket, artwork];

      // Save the updated basket in localStorage as a JSON string.
      localStorage.setItem(
        "baso-basket",
        JSON.stringify(updatedBasket)
      );

      // Notify other components that the basket has been updated.
      window.dispatchEvent(new Event("basketUpdated"));

      // Update the button to show that the artwork has been added.
      setIsAdded(true);
    } catch (error) {
      // Display an error in the console if the artwork cannot be added.
      console.error("Could not add artwork to basket:", error);
    }
  }

  return (
    <div className="artwork-card">
      {/* Display the artwork image. */}
      <img src={artwork.image} alt={title} loading="lazy" />

      {/* Display the artwork's details. */}
      <h2>{title}</h2>
      <p>{artistName}</p>
      <p>{artwork.year}</p>
      <p>{medium}</p>

      {/* Display the artwork dimensions and measurement unit. */}
      <p>
        {artwork.width} × {artwork.height} {artwork.unit}
      </p>

      {/* Display the artwork price and currency. */}
      <p>
        {artwork.price} {artwork.currency}
      </p>

      {/* Add the artwork to the basket or show that it has already been added. */}
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

// Main component responsible for displaying and filtering the artworks page.
function ArtworksPage() {
  // Get the website translations and the currently selected language.
  const { t, language } = useLanguage();

  // Define the available price ranges using translated labels.
  const priceRanges = [
    { label: t.under300, min: 0, max: 299 },
    { label: t.range300to499, min: 300, max: 499 },
    { label: t.range500to999, min: 500, max: 999 },
    { label: t.over1000, min: 1000, max: Infinity },
  ];

  // Store the selected filter values for each filter category.
  const [selectedFilters, setSelectedFilters] = useState({
    artists: [],
    years: [],
    mediums: [],
    sizes: [],
    prices: [],
  });

  // Create a list of unique artwork years for the year filter.
  const years = [
    ...new Set(artworks.map((artwork) => String(artwork.year))),
  ];

  // Create a list of unique translated mediums for the medium filter.
  const mediums = [
    ...new Set(
      artworks.map((artwork) =>
        getLocalizedText(artwork, "medium", language)
      )
    ),
  ];

  // Create a list of unique artwork dimensions for the size filter.
  const sizes = [
    ...new Set(
      artworks.map(
        (artwork) =>
          `${artwork.width} × ${artwork.height} ${artwork.unit}`
      )
    ),
  ];

  // Add or remove a selected value from the chosen filter category.
  function toggleFilter(category, value) {
    setSelectedFilters((previous) => {
      // Get the currently selected values for this category.
      const current = previous[category];

      // Remove the value if already selected; otherwise, add it.
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      // Return a new filter object while keeping the other categories unchanged.
      return { ...previous, [category]: updated };
    });
  }

  // Display only artworks that match all selected filter categories.
  const filteredArtworks = artworks.filter((artwork) => {
    // Check whether the artwork matches a selected artist.
    const artistMatch =
      selectedFilters.artists.length === 0 ||
      selectedFilters.artists.includes(String(artwork.artistId));

    // Check whether the artwork matches a selected year.
    const yearMatch =
      selectedFilters.years.length === 0 ||
      selectedFilters.years.includes(String(artwork.year));

    // Check whether the artwork matches a selected medium.
    const mediumMatch =
      selectedFilters.mediums.length === 0 ||
      selectedFilters.mediums.includes(
        getLocalizedText(artwork, "medium", language)
      );

    // Create the artwork's size string for comparison with selected sizes.
    const size = `${artwork.width} × ${artwork.height} ${artwork.unit}`;

    // Check whether the artwork matches a selected size.
    const sizeMatch =
      selectedFilters.sizes.length === 0 ||
      selectedFilters.sizes.includes(size);

    // Check whether the artwork's price falls within any selected price range.
    const priceMatch =
      selectedFilters.prices.length === 0 ||
      selectedFilters.prices.some((selectedPrice) => {
        // Find the selected price range and its minimum and maximum values.
        const range = priceRanges.find(
          (item) => item.label === selectedPrice
        );

        return (
          range &&
          artwork.price >= range.min &&
          artwork.price <= range.max
        );
      });

    // An artwork must match every filter category to be displayed.
    return (
      artistMatch &&
      yearMatch &&
      mediumMatch &&
      sizeMatch &&
      priceMatch
    );
  });

  // Create three empty arrays to distribute the filtered artworks into columns.
  const columns = [[], [], []];

  // Distribute artworks between the three columns in sequence.
  filteredArtworks.forEach((artwork, index) => {
    columns[index % 3].push(artwork);
  });

  return (
    <main>
      {/* HERO SECTION: displays the main image, page title, and introduction. */}
      <section className="hero-artworks" id="artworks">
        <div className="hero-media">
          <img
            src="/images/artwork-hero-image.png"
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

      {/* GALLERY LAYOUT: places the filters beside the artwork collection. */}
      <div className="gallery-layout">

        {/* FILTER SIDEBAR: provides options for narrowing down the artworks. */}
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

        {/* ARTWORK COLLECTION: displays the filtered artworks in three columns. */}
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

          {/* Display a message when no artworks match the selected filters. */}
          {filteredArtworks.length === 0 && (
            <p className="no-artworks">{t.noArtworks}</p>
          )}
        </section>
      </div>
    </main>
  );
}

// Export the Artworks page so it can be displayed by App.jsx.
export default ArtworksPage;
