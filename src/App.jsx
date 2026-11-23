
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ArtworksPage from "./pages/Artworks";
import ArtistsPage from "./pages/Artists";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import BasketPage from "./pages/Basket";

function App() {
  return (
    <BrowserRouter
      basename={import.meta.env.BASE_URL.replace(/\/$/, "")}
    >
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/artworks" element={<ArtworksPage />} />
        <Route path="/artists" element={<ArtistsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<Home />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
