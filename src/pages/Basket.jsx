
import { useEffect, useState } from "react";
import { artists } from "../data";
import useLanguage from "../useLanguage";
import { getLocalizedText } from "../dataTranslations";

function BasketPage() {
  const { language } = useLanguage();
  const isKA = language === "KA";

  const [basket, setBasket] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("baso-basket")) || [];
    } catch {
      return [];
    }
  });

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

  function removeArtwork(id) {
    const updatedBasket = basket.filter(
      (artwork) => artwork.id !== id
    );

    localStorage.setItem("baso-basket", JSON.stringify(updatedBasket));
    setBasket(updatedBasket);
    window.dispatchEvent(new Event("basketUpdated"));
  }

  const total = basket.reduce(
    (sum, artwork) => sum + Number(artwork.price || 0),
    0
  );

  const currency = basket[0]?.currency || "";

  return (
    <main className="basket-page">
      <section className="hero-artworks basket-hero">
        <div className="hero-media">
          <img
            src="/images/artwork-hero-image.png"
            alt="Artwork displayed in a gallery"
          />
        </div>

        <div className="hero-content">
          <div className="container">
            <h1>{isKA ? "თქვენი კალათა" : "Your Basket"}</h1>
            <p>
              {isKA
                ? "კიდევ ერთხელ გადახედეთ თქვენს რჩეულ ნამუშევრებს შეკვეთის დასრულებამდე."
                : "Take another look at your favourites before completing your order."}
            </p>
          </div>
        </div>
      </section>

      <div className="container basket-content">
        {basket.length === 0 ? (
          <div className="basket-empty">
            <p>
              {isKA
                ? "თქვენი კალათა ცარიელია."
                : "Your basket is currently empty."}
            </p>

            <a href="/artworks.html" className="btn btn-dark">
              {isKA ? "ნამუშევრების ნახვა" : "Explore artworks"}
            </a>
          </div>
        ) : (
          <div className="basket-invoice">
            <div className="basket-table-heading">
              <span>{isKA ? "ნამუშევარი" : "Artwork"}</span>
              <span>{isKA ? "ფასი" : "Price"}</span>
            </div>

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

            <div className="basket-summary">
              <div className="basket-total-row">
                <span>
                  {isKA ? "ნამუშევრები" : "Items"} ({basket.length})
                </span>
                <span>{total.toFixed(2)} {currency}</span>
              </div>

              <div className="basket-total-row basket-grand-total">
                <span>{isKA ? "ჯამი" : "Total"}</span>
                <span>{total.toFixed(2)} {currency}</span>
              </div>
            </div>

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

export default BasketPage;
