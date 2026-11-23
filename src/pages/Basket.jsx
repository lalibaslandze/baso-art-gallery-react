
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { artists } from "../data";
import useLanguage from "../useLanguage";
import { getLocalizedText } from "../dataTranslations";

function BasketPage() {
  const { language } = useLanguage();
  const isKA = language === "KA";

  // GitHub Pages-compatible image path.
  const imageBase = `${import.meta.env.BASE_URL}images/`;

  // Initialize basket from localStorage.
  const [basket, setBasket] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("baso-basket")) || [];
    } catch {
      return [];
    }
  });

  // Listen for basket updates.
  useEffect(() => {
    function updateBasket() {
      try {
        setBasket(JSON.parse(localStorage.getItem("baso-basket")) || []);
      } catch {
        setBasket([]);
      }
    }

    window.addEventListener("basketUpdated", updateBasket);
    window.addEventListener("storage", updateBasket);

    return () => {
      window.removeEventListener("basketUpdated", updateBasket);
      window.removeEventListener("storage", updateBasket);
    };
  }, []);

  // Remove artwork from basket.
  function removeArtwork(id) {
    const updatedBasket = basket.filter(
      (artwork) => artwork.id !== id
    );

    localStorage.setItem("baso-basket", JSON.stringify(updatedBasket));

    setBasket(updatedBasket);

    window.dispatchEvent(new Event("basketUpdated"));
  }

  // Calculate basket total.
  const total = basket.reduce(
    (sum, artwork) => sum + Number(artwork.price || 0),
    0
  );

  const currency = basket[0]?.currency || "";

  return (
    <main className="basket-page">

      {/* BASKET HERO SECTION */}
      <section className="hero-artworks basket-hero">
        <div className="hero-media">
          <img
            src={`${imageBase}artwork-hero-image.png`}
            alt="Artwork displayed in a gallery"
          />
        </div>

        <div className="hero-content">
          <div className="container">
            <h1>
              {isKA ? "თქვენი კალათა" : "Your Basket"}
            </h1>

            <p>
              {isKA
                ? "კიდევ ერთხელ გადახედეთ თქვენს რჩეულ ნამუშევრებს შეკვეთის დასრულებამდე."
                : "Take another look at your favourites before completing your order."}
            </p>
          </div>
        </div>
      </section>

      {/* BASKET CONTENT */}
      <div className="container basket-content">

        {basket.length === 0 ? (

          /* EMPTY BASKET */
          <div className="basket-empty">
            <p>
              {isKA
                ? "თქვენი კალათა ცარიელია."
                : "Your basket is currently empty."}
            </p>

            <Link to="/artworks" className="btn btn-dark">
              {isKA ? "ნამუშევრების ნახვა" : "Explore artworks"}
            </Link>
          </div>

        ) : (

          /* BASKET INVOICE */
          <div className="basket-invoice">

            <div className="basket-table-heading">
              <span>{isKA ? "ნამუშევარი" : "Artwork"}</span>
              <span>{isKA ? "ფასი" : "Price"}</span>
            </div>

            {/* BASKET ITEMS */}
            <div className="basket-items">
              {basket.map((artwork) => {
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
                  : "";

                return (
                  <div className="basket-item" key={artwork.id}>

                    <div className="basket-artwork">
                      <img
                        src={artwork.image}
                        alt={title}
                        className="basket-item-image"
                      />

                      <div className="basket-item-info">
                        <h2>{title}</h2>
                        <p>{artistName}</p>

                        <button
                          type="button"
                          className="basket-remove"
                          onClick={() => removeArtwork(artwork.id)}
                        >
                          {isKA ? "წაშლა" : "Remove"}
                        </button>
                      </div>
                    </div>

                    <div className="basket-item-price">
                      {artwork.price} {artwork.currency}
                    </div>

                  </div>
                );
              })}
            </div>

            {/* BASKET SUMMARY */}
            <div className="basket-summary">

              <div className="basket-total-row">
                <span>
                  {isKA ? "ნამუშევრები" : "Items"} ({basket.length})
                </span>

                <span>
                  {total.toFixed(2)} {currency}
                </span>
              </div>

              <div className="basket-total-row basket-grand-total">
                <span>{isKA ? "ჯამი" : "Total"}</span>

                <span>
                  {total.toFixed(2)} {currency}
                </span>
              </div>

            </div>

            {/* BASKET ACTIONS */}
            <div className="basket-actions">

              <Link to="/artworks" className="btn btn-dark">
                {isKA ? "შეძენის გაგრძელება" : "Continue Shopping"}
              </Link>

              <Link to="/checkout" className="btn btn-dark">
                {isKA ? "შეკვეთის გაგრძელება" : "Proceed to Checkout"}
              </Link>

            </div>

          </div>
        )}
      </div>
    </main>
  );
}

export default BasketPage;
