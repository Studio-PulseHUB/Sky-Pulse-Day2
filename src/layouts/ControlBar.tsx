import { useState } from "react";
import { useTheme } from "../themes/ThemeProvider";
import "../styles/ControlBar.css";

type MenuName = "theme" | "language" | null;

export default function ControlBar() {
  const [menu, setMenu] = useState<MenuName>(null);
  const { theme, setTheme } = useTheme();

  return (
    <>
      <aside className="control-bar">
        <div className="control-logo">✦</div>

        <button
          className="control-icon"
          type="button"
          aria-label="テーマを開く"
          onClick={() => setMenu(menu === "theme" ? null : "theme")}
        >
          ◐
        </button>

        <button
          className="control-icon"
          type="button"
          aria-label="言語を開く"
          onClick={() => setMenu(menu === "language" ? null : "language")}
        >
          文
        </button>
      </aside>

      <div className={`side-menu ${menu ? "open" : ""}`}>
        {menu === "theme" && (
          <>
            <h3>Theme</h3>

            <button
              className={theme === "cloud" ? "active" : ""}
              type="button"
              onClick={() => setTheme("cloud")}
            >
              Cloud
            </button>

            <button
              className={theme === "night" ? "active" : ""}
              type="button"
              onClick={() => setTheme("night")}
            >
              Night
            </button>

            <button
              className={theme === "starry" ? "active" : ""}
              type="button"
              onClick={() => setTheme("starry")}
            >
              Starry
            </button>
          </>
        )}

        {menu === "language" && (
          <>
            <h3>Language</h3>
            <button type="button">日本語 / JST</button>
            <button type="button">English / PT</button>
          </>
        )}
      </div>
    </>
  );
}