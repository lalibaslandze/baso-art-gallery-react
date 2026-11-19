
// Import React and ReactDOM to start and render the application.
import React from "react";
import ReactDOM from "react-dom/client";

// Import all global and component-specific stylesheets.
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

// Import the main application component.
import App from "./App.jsx";

// Create the React root inside the HTML element with the ID "root",
// then render the App component.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
