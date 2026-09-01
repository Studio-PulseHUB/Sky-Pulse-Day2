import { useEffect } from "react";
import "./ObsOverlay.css";

type ObsStatus = "NEXT" | "NOW" | null;

type ObsOverlayProps = {
  title: string;
  englishTitle?: string;
  icon: string;
  color: string;
  countdown: string;
  eventTime?: string;
  progress: number;
  status?: ObsStatus;
  compact?: boolean;
};

export default function ObsOverlay({
  title,
  englishTitle,
  icon,
  color,
  countdown,
  eventTime,
  progress,
  status = null,
  compact = false,
}: ObsOverlayProps) {
  useEffect(() => {
    document.body.classList.add("obs-mode");

    return () => {
      document.body.classList.remove("obs-mode");
    };
  }, []);

  const safeProgress = Math.min(
    1,
    Math.max(0, progress)
  );

  /*
   * 円周の残量
   * progress 0 → 円100%
   * progress 1 → 円0%
   */
  const radius = 17;
  const circumference = 2 * Math.PI * radius;

  const dashOffset =
    circumference * safeProgress;

  /*
   * AURORA / Environment は現在emojiなので
   * 画像URLかどうかを判定する
   */
  const isImageIcon =
    icon.startsWith("/") ||
    icon.startsWith("data:") ||
    icon.startsWith("http");

  return (
    <main
      className={`obs-page ${
        compact ? "obs-page-compact" : ""
      }`}
    >
      {compact ? (
        /*
         * ============================
         * COMPACT
         * ============================
         */
        <div className="obs-overlay compact">
          {isImageIcon ? (
            <img
              src={icon}
              alt=""
              className="obs-compact-icon"
            />
          ) : (
            <span className="obs-compact-emoji">
              {icon}
            </span>
          )}

          <div className="obs-compact-countdown">
            {countdown}
          </div>
        </div>
      ) : (
        /*
         * ============================
         * FULL
         * ============================
         */
        <div className="obs-overlay full">
          <div className="obs-full-header">
            {status && (
              <span className="obs-full-status">
                {status} →
              </span>
            )}

            <span className="obs-full-title">
              {title}
            </span>

            {englishTitle && (
              <span className="obs-full-title-en">
                {englishTitle}
              </span>
            )}
          </div>

          <div
            className="obs-full-divider"
            style={{ backgroundColor: color }}
          />

          <div className="obs-full-info">
            <div className="obs-full-info-block">
              <span className="obs-full-label">
                {status === "NOW" ? "ends" : "next"}
              </span>

              <span className="obs-full-value">
                {eventTime ?? "--:--"}
              </span>
            </div>

            <div className="obs-full-countdown-area">
              <div className="obs-full-info-block obs-full-countdown-block">
                <span className="obs-full-label">
                  countdown
                </span>

                <span className="obs-full-countdown">
                  {countdown}
                </span>
              </div>

              <svg
                className="obs-countdown-ring"
                viewBox="0 0 40 40"
                aria-hidden="true"
              >
                <circle
                  className="obs-countdown-ring-bg"
                  cx="20"
                  cy="20"
                  r={radius}
                />

                <circle
                  className="obs-countdown-ring-value"
                  cx="20"
                  cy="20"
                  r={radius}
                  style={{
                    stroke: color,
                    strokeDasharray: circumference,
                    strokeDashoffset: dashOffset,
                  }}
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}