import { getNextEventTime } from "../../utils/schedule";
import { events } from "../../data/events";
import { formatEventTime, formatLongCountdown } from "../../utils/time";


export default function FireworksWidget() {
  const now = new Date();
  const fireworks = events.find((event) => event.type === "fireworks");

  if (!fireworks) {
    return <div>fireworks not found</div>;
  }

  const nextTime = getNextEventTime(fireworks, now);
  const diff = nextTime.getTime() - now.getTime();
  const today = now.getDate();

  return (
    <div className="fireworks-widget special-event-card">
      <div className="special-event-info">
<h2 className="special-title">
  <span className="desktop-title">
    <img
      src={fireworks.icon}
      alt=""
      className="special-title-icon"
    />
    <span>花鳥郷花火ショー / Fireworks</span>
  </span>

  <span className="mobile-title">
    <img
      src={fireworks.icon}
      alt=""
      className="special-title-icon"
    />
    <span>花火 / Fireworks</span>
  </span>
</h2>

        <div className="special-meta">
          <span className="label">次回開催 / NEXT EVENT</span>
          <strong>{formatEventTime(nextTime, now)}</strong>
        </div>

        <div className="special-countdown">
          {formatFireworksCountdown(diff)}
        </div>
      </div>

      <div className="special-event-visual">
        <div className="fireworks-grid">
          {Array.from({ length: 31 }, (_, index) => {
            const day = index + 1;

            const dotClass =
              day < today
                ? "firework-dot firework-dot-past"
                : day === today
                ? "firework-dot firework-dot-today"
                : "firework-dot firework-dot-future";

            return <span key={day} className={dotClass} />;
          })}
        </div>
      </div>
    </div>
  );
}
function formatFireworksCountdown(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);

  if (days > 0) {
    return (
      <>
        <span>{days}日 {hours}時間</span>
        <span className="countdown-en">
          {days}D {hours}H
        </span>
      </>
    );
  }

  return formatLongCountdown(ms);
}