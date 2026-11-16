
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ArtworksPage from "./pages/Artworks";
import ArtistsPage from "./pages/Artists";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BasketPage from "./pages/Basket";

function App() {
  const currentPath = window.location.pathname;

  let currentPage;

  if (currentPath.endsWith("/basket.html")) {
    currentPage = <BasketPage />;
  } else if (currentPath.endsWith("/artworks.html")) {
    currentPage = <ArtworksPage />;
  } else if (currentPath.endsWith("/artists.html")) {
    currentPage = <ArtistsPage />;
  } else if (currentPath.endsWith("/about.html")) {
    currentPage = <AboutPage />;
  } else if (currentPath.endsWith("/contact.html")) {
    currentPage = <ContactPage />;
  } else {
    currentPage = <Home />;
  }

  return (
    <>
      <Header />
      {currentPage}
      <Footer />
    </>
  );
}

export default App;
