import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import "./styles/global.css";
import "./styles/schedule-card.css";
import "./styles/fireworks-widget.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
   <HashRouter basename={import.meta.env.BASE_URL}>
      <App />
    </HashRouter>
  </StrictMode>
);