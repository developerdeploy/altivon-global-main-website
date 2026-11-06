import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";
import "./local-fonts.css";
import "./index.css";
import "./motion-design.css";
import "./altivon-palette.css";
import "./themes.css";
import "./scene-backgrounds.css";
import "./catalogue.css";

const rootElement = document.getElementById("root")!;

const appNode = (
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);

if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, appNode);
} else {
  ReactDOM.createRoot(rootElement).render(appNode);
}
