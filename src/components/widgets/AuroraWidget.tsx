import { useEffect, useState } from "react";

const isSummerTime = true;

const summerSchedule = [16, 18, 20, 22, 0, 2, 4, 6, 8, 10, 12, 14];
const normalSchedule = [17, 19, 21, 23, 1, 3, 6, 7, 9, 11, 13, 15];

const concertDurationMs = 60 * 60 * 1000;

const particles = Array.from({ length: 28 }, (_, index) => index);

function getAuroraTimes(now: Date) {
  const schedule = isSummerTime ? summerSchedule : normalSchedule;

  const candidates = schedule
    .flatMap((hour) => {
      const today = new Date(now);
      today.setHours(hour, 0, 0, 0);

      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      return [today, tomorrow];
    })
    .sort((a, b) => a.getTime() - b.getTime());

  const current = candidates.find((start) => {
    const end = new Date(start.getTime() + concertDurationMs);
    return now >= start && now < end;
  });

  const next = candidates.find((time) => time > now) ?? candidates[0];

  return { current, next };
}

function formatCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatTime(date: Date) {
  return `${String(date.getHours()).padStart(2, "0")}:00`;
}

export default function AuroraWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { current, next } = getAuroraTimes(now);

  const isLive = Boolean(current);
  const targetTime = isLive
    ? new Date(current!.getTime() + concertDurationMs)
    : next;

  const countdown = formatCountdown(targetTime.getTime() - now.getTime());

  return (
    <div className="aurora-widget special-event-card">
      <div className="special-event-info">
     
      <h2 className="special-title">
  <span className="desktop-title">
        ✨ AURORAコンサート
  </span>

  <span className="mobile-title">
  AURORA
  </span>
</h2>

        <div className="special-badge">
          {isLive ? "✦ LIVE NOW" : "✦ LIVE SHOW"}
        </div>

<div className="special-meta">
  <span>
    {isLive ? "✦ 開催中" : "次回"}
  </span>

  {!isLive && (
    <strong>{formatTime(next)}</strong>
  )}
</div>

        <div className="special-countdown">
          {countdown}
        </div>
      </div>

      <div className="special-event-visual">
        <div className={isLive ? "aurora-orbit aurora-orbit-live" : "aurora-orbit"} aria-hidden="true">
          {particles.map((particle) => (
            <span
              key={particle}
              className="aurora-particle"
              style={{ "--i": particle } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}