
// Import shared website components.
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import page components.
import Home from "./pages/Home";
import ArtworksPage from "./pages/Artworks";
import ArtistsPage from "./pages/Artists";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BasketPage from "./pages/Basket";

function App() {
  // Get the current URL to determine which page should be displayed.
  const currentPath = window.location.pathname;

  // Select the page component based on the current URL.
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
    // Display the Home page if no other URL matches.
    currentPage = <Home />;
  }

  return (
    <>
      {/* Shared layout: header, selected page, and footer. */}
      <Header />
      {currentPage}
      <Footer />
    </>
  );
}

// Export App so it can be rendered in main.jsx.
export default App;
