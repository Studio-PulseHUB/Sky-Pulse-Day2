import { useState } from "react";
import { useTheme } from "../themes/ThemeProvider";
import "../styles/ControlBar.css";

type MenuName = "theme" | "language" | "obs" | null;
type CopyTarget = string | null;

const obsItems = [
    {
    name: "Now",
    full: "/obs/now",
    compact: "/obs/now/compact",
  },
  {
    name: "間欠泉",
    full: "/obs/geyser",
    compact: "/obs/geyser/compact",
  },
  {
    name: "パン焼き",
    full: "/obs/bread",
    compact: "/obs/bread/compact",
  },
  {
    name: "ウミガメ",
    full: "/obs/turtle",
    compact: "/obs/turtle/compact",
  },
  {
    name: "花火",
    full: "/obs/fireworks",
    compact: "/obs/fireworks/compact",
  },
  {
    name: "AURORA",
    full: "/obs/aurora",
    compact: "/obs/aurora/compact",
  },
  {
    name: "花鳥郷",
    full: "/obs/environment",
    compact: "/obs/environment/compact",
  },
];

export default function ControlBar() {
  const [menu, setMenu] = useState<MenuName>(null);
  const [copied, setCopied] = useState<CopyTarget>(null);
  const { theme, setTheme } = useTheme();

  const copyUrl = async (path: string) => {
    const url = `${window.location.origin}${path}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(path);

      window.setTimeout(() => {
        setCopied((current) => (current === path ? null : current));
      }, 900);
    } catch {
      console.error("URLのコピーに失敗しました");
    }
  };

  return (
    <>
      <aside className="control-bar">
        <div className="control-logo">✦</div>

        <button
          className={`control-icon ${menu === "theme" ? "active" : ""}`}
          type="button"
          aria-label="テーマを開く"
          onClick={() => setMenu(menu === "theme" ? null : "theme")}
        >
          ◐
        </button>

        <button
          className={`control-icon ${menu === "language" ? "active" : ""}`}
          type="button"
          aria-label="言語を開く"
          onClick={() => setMenu(menu === "language" ? null : "language")}
        >
          文
        </button>

        <button
          className={`control-icon ${menu === "obs" ? "active" : ""}`}
          type="button"
          aria-label="OBSを開く"
          onClick={() => setMenu(menu === "obs" ? null : "obs")}
        >
          ◫
        </button>
      </aside>

      <div
        className={`side-menu ${menu ? "open" : ""} ${
          menu === "obs" ? "obs-open" : ""
        }`}
      >
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

            <button
              className={theme === "auto" ? "active" : ""}
              type="button"
              onClick={() => setTheme("auto")}
            >
              Auto
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

        {menu === "obs" && (
          <>
            <div className="obs-menu-header">
              <div>
                <p className="obs-menu-label">STREAM TOOLS</p>
                <h3>OBS Overlay</h3>
              </div>

              <button
                className="obs-close-button"
                type="button"
                aria-label="OBSメニューを閉じる"
                onClick={() => setMenu(null)}
              >
                ×
              </button>
            </div>

            <p className="obs-menu-description">
              OBSのブラウザソースへ貼り付けるURLをコピーできます。
            </p>

            <div className="obs-menu-list">
              {obsItems.map((item) => (
                <div className="obs-menu-item" key={item.name}>
                  <div className="obs-menu-item-name">{item.name}</div>

                  <div className="obs-menu-actions">
                    <button
                      className={`obs-copy-button ${
                        copied === item.full ? "copied" : ""
                      }`}
                      type="button"
                      onClick={() => copyUrl(item.full)}
                    >
                      <span className="obs-copy-label">Full</span>
                      <span className="obs-copy-check">✓</span>
                    </button>

                    <button
                      className={`obs-copy-button ${
                        copied === item.compact ? "copied" : ""
                      }`}
                      type="button"
                      onClick={() => copyUrl(item.compact)}
                    >
                      <span className="obs-copy-label">Compact</span>
                      <span className="obs-copy-check">✓</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}