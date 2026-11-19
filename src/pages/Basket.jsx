
// Import React hooks, artist data, language settings, and the localization helper.
import { useEffect, useState } from "react";
import { artists } from "../data";
import useLanguage from "../useLanguage";
import { getLocalizedText } from "../dataTranslations";

// Main component responsible for displaying and managing the shopping basket.
function BasketPage() {
  // Get the currently selected language and check whether it is Georgian.
  const { language } = useLanguage();
  const isKA = language === "KA";

  // Initialize the basket with the saved items from localStorage.
  const [basket, setBasket] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("baso-basket")) || [];
    } catch {
      // Return an empty array if the saved basket cannot be read.
      return [];
    }
  });

  // Listen for basket changes so the displayed items stay up to date.
  useEffect(() => {
    function updateBasket() {
      try {
        // Read the latest basket contents from localStorage.
        setBasket(JSON.parse(localStorage.getItem("baso-basket")) || []);
      } catch {
        // Reset the basket if the saved data cannot be read.
        setBasket([]);
      }
    }

    // Listen for updates from other components and browser storage changes.
    window.addEventListener("basketUpdated", updateBasket);
    window.addEventListener("storage", updateBasket);

    // Remove event listeners when the component is unmounted.
    return () => {
      window.removeEventListener("basketUpdated", updateBasket);
      window.removeEventListener("storage", updateBasket);
    };
  }, []);

  // Remove an artwork from the basket using its unique ID.
  function removeArtwork(id) {
    // Create a new array containing every artwork except the selected one.
    const updatedBasket = basket.filter(
      (artwork) => artwork.id !== id
    );

    // Save the updated basket in localStorage.
    localStorage.setItem("baso-basket", JSON.stringify(updatedBasket));

    // Update the component state so the page displays the latest basket.
    setBasket(updatedBasket);

    // Notify other components that the basket has changed.
    window.dispatchEvent(new Event("basketUpdated"));
  }

  // Calculate the total price of all artworks in the basket.
  const total = basket.reduce(
    (sum, artwork) => sum + Number(artwork.price || 0),
    0
  );

  // Get the currency from the first artwork, or use an empty string if the basket is empty.
  const currency = basket[0]?.currency || "";

  return (
    <main className="basket-page">
      {/* HERO SECTION: displays the basket page image, title, and introduction. */}
      <section className="hero-artworks basket-hero">
        <div className="hero-media">
          <img
            src="/images/artwork-hero-image.png"
            alt="Artwork displayed in a gallery"
          />
        </div>

        <div className="hero-content">
          <div className="container">
            {/* Display the heading and description in the selected language. */}
            <h1>{isKA ? "თქვენი კალათა" : "Your Basket"}</h1>
            <p>
              {isKA
                ? "კიდევ ერთხელ გადახედეთ თქვენს რჩეულ ნამუშევრებს შეკვეთის დასრულებამდე."
                : "Take another look at your favourites before completing your order."}
            </p>
          </div>
        </div>
      </section>

      {/* BASKET CONTENT: displays either an empty message or the saved artworks. */}
      <div className="container basket-content">
        {basket.length === 0 ? (
          // EMPTY BASKET: shown when there are no artworks in the basket.
          <div className="basket-empty">
            <p>
              {isKA
                ? "თქვენი კალათა ცარიელია."
                : "Your basket is currently empty."}
            </p>

            {/* Provide a link to return to the artworks page. */}
            <a href="/artworks.html" className="btn btn-dark">
              {isKA ? "ნამუშევრების ნახვა" : "Explore artworks"}
            </a>
          </div>
        ) : (
          // BASKET INVOICE: shown when the basket contains artworks.
          <div className="basket-invoice">
            {/* Display the column headings for artwork details and prices. */}
            <div className="basket-table-heading">
              <span>{isKA ? "ნამუშევარი" : "Artwork"}</span>
              <span>{isKA ? "ფასი" : "Price"}</span>
            </div>

            {/* Display each artwork saved in the basket. */}
            <div className="basket-items">
              {basket.map((artwork) => {
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

                // Get the artist's translated name, or an empty string if no artist is found.
                const artistName = artist
                  ? getLocalizedText(artist, "name", language)
                  : "";

                return (
                  <div className="basket-item" key={artwork.id}>
                    {/* Display the artwork image, title, artist, and removal button. */}
                    <div className="basket-artwork">
                      <img
                        src={artwork.image}
                        alt={title}
                        className="basket-item-image"
                      />

                      <div className="basket-item-info">
                        <h2>{title}</h2>
                        <p>{artistName}</p>

                        {/* Remove this artwork from the basket when clicked. */}
                        <button
                          type="button"
                          className="basket-remove"
                          onClick={() => removeArtwork(artwork.id)}
                        >
                          {isKA ? "წაშლა" : "Remove"}
                        </button>
                      </div>
                    </div>

                    {/* Display the individual artwork price and currency. */}
                    <div className="basket-item-price">
                      {artwork.price} {artwork.currency}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* BASKET SUMMARY: displays the number of items and total price. */}
            <div className="basket-summary">
              <div className="basket-total-row">
                <span>
                  {isKA ? "ნამუშევრები" : "Items"} ({basket.length})
                </span>
                <span>{total.toFixed(2)} {currency}</span>
              </div>

              {/* Display the final total. */}
              <div className="basket-total-row basket-grand-total">
                <span>{isKA ? "ჯამი" : "Total"}</span>
                <span>{total.toFixed(2)} {currency}</span>
              </div>
            </div>

            {/* BASKET ACTIONS: provide links to continue shopping or proceed to checkout. */}
            <div className="basket-actions">
              <a href="/artworks.html" className="btn btn-dark">
                {isKA ? "შეძენის გაგრძელება" : "Continue Shopping"}
              </a>

              <a href="/checkout.html" className="btn btn-dark">
                {isKA ? "შეკვეთის გაგრძელება" : "Proceed to Checkout"}
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

// Export BasketPage so it can be displayed by App.jsx.
export default BasketPage;
