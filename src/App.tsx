import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import GeyserPage from "./pages/obs/GeyserPage";
import { ThemeProvider } from "./themes/ThemeProvider";
import ObsHome from "./pages/obs/ObsHome";

import "./styles/global.css";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/obs/geyser" element={<GeyserPage />} />
        <Route path="/obs" element={<ObsHome />} />
      </Routes>
    </ThemeProvider>
  );
}