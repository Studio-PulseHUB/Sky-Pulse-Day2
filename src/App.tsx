import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import ObsPage from "./pages/obs/ObsPage";
import { ThemeProvider } from "./themes/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/obs/:overlayId"
          element={<ObsPage />}
        />

        <Route
          path="/obs/:overlayId/compact"
          element={<ObsPage />}
        />
      </Routes>
    </ThemeProvider>
  );
}