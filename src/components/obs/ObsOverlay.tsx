import { useEffect } from "react";
import "./ObsOverlay.css";

type ObsOverlayProps = {
  title: string;
  icon: string;
  color: string;
  countdown: string;
  progress: number;
  compact?: boolean;
};

export default function ObsOverlay({
  title,
  icon,
  color,
  countdown,
  progress,
  compact = false,
}: ObsOverlayProps) {
  useEffect(() => {
    document.body.classList.add("obs-mode");

    return () => {
      document.body.classList.remove("obs-mode");
    };
  }, []);

  const safeProgress = Math.min(1, Math.max(0, progress));

  return (
    <main className={`obs-page ${compact ? "obs-page-compact" : ""}`}>
      <div className={`obs-overlay ${compact ? "compact" : "full"}`}>
        {!compact && (
          <div className="obs-overlay-header">
            <span className="obs-overlay-icon">{icon}</span>
            <span className="obs-overlay-title">{title}</span>
          </div>
        )}

        <div className="obs-overlay-countdown">{countdown}</div>

        <div className="obs-overlay-progress">
          <div
            className="obs-overlay-progress-fill"
            style={{
              width: `${safeProgress * 100}%`,
              backgroundColor: color,
              boxShadow: `0 0 14px ${color}`,
            }}
          />
        </div>
      </div>
    </main>
  );
}