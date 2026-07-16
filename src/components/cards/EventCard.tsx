import type { SkyEvent } from "../../data/events";
import {
  getEventProgress,
  getNextEventTime,
  isEventActive,
} from "../../utils/schedule";
import {
  formatCountdown,
  formatTime,
} from "../../utils/time";

type EventCardProps = {
  event: SkyEvent;
  now: Date;
};

export default function EventCard({
  event,
  now,
}: EventCardProps) {
  const active = isEventActive(event, now);
  const nextTime = getNextEventTime(event, now);
  const diff = nextTime.getTime() - now.getTime();
  const progress = getEventProgress(event, now);

  return (
    <div
      className="event-card"
      style={{
        borderTop: `4px solid ${event.color}`,
      }}
    >
      <div className="event-header">
        <h2>
          <span className="event-icon">
            {event.icon}
          </span>

          <span>{event.title}</span>
        </h2>

        <span className="event-type">
          {event.type}
        </span>
      </div>

      <div className="event-info">
        <div>
          <p className="label">次回開催</p>

          <p className="event-time">
            {formatTime(nextTime)}
          </p>
        </div>

        <div>
          <p className="label">
            カウントダウン
          </p>

          <p className="countdown">
            {active
              ? "開催中"
              : formatCountdown(diff)}
          </p>
        </div>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${progress * 100}%`,
            background: event.color,
          }}
        />
      </div>
    </div>
  );
}