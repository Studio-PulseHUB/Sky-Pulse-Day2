import { Link } from "react-router-dom";

const pages = [
  { name: "⭐ Now", path: "/obs/now" },
  { name: "🌋 間欠泉", path: "/obs/geyser" },
  { name: "🍞 パン焼き", path: "/obs/bread" },
  { name: "🐢 ウミガメ", path: "/obs/turtle" },
  { name: "🎆 花火", path: "/obs/fireworks" },
  { name: "🎤 AURORA", path: "/obs/aurora" },
  { name: "🌅 花鳥郷", path: "/obs/environment" },
];

export default function ObsHome() {
const copy = async (url: string) => {
  const obsUrl =
    `${window.location.origin}${import.meta.env.BASE_URL}#${url}`;

  await navigator.clipboard.writeText(obsUrl);

  alert("URLをコピーしました!");
};
  return (
    <div className="obs-home">
      <h1>OBS Overlay</h1>

      {pages.map((page) => (
        <div className="obs-item" key={page.path}>
          <span>{page.name}</span>

          <div>
            <Link to={page.path}>
              Preview
            </Link>

            <button
              onClick={() => copy(page.path)}
            >
              Copy URL
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}