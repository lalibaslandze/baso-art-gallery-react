import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/variables.css";
import "./styles/global.css";
import "./styles/header.css";
import "./styles/hero.css";
import "./styles/home.css";
import "./styles/artworks.css";
import "./styles/artists.css";
import "./styles/footer.css";
import "./styles/basket.css";
import "./styles/responsive.css";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);