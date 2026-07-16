import Home from "./pages/Home";
import { ThemeProvider } from "./themes/ThemeProvider";

import "./styles/global.css";

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}