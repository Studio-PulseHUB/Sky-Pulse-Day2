import type { SkyEvent } from "../../data/events";
import {
  getNextEventTime,
  getPreviousEventTime,
  isEventActive,
} from "../../utils/schedule";
import { formatCountdown } from "../../utils/time";

type NowCardProps = {
  events: SkyEvent[];
  now: Date;
  compact?: boolean;
  obs?: boolean;
};


export default function NowCard({
  events,
  now,
  compact = false,
  obs = false,
}: NowCardProps) {
  const normalEvents = events.filter(
    (event) =>
      event.type === "geyser" ||
      event.type === "bread" ||
      event.type === "turtle"
  );

  const activeEvent = normalEvents.find((event) =>
    isEventActive(event, now)
  );

  if (activeEvent) {
    const startTime = getPreviousEventTime(
      activeEvent,
      now
    );

    const endTime = new Date(
      startTime.getTime() +
        activeEvent.durationMinutes * 60 * 1000
    );

    const remaining =
      endTime.getTime() - now.getTime();

    return (
<div
  className={
    obs
      ? `obs-now-overlay ${
          compact ? "compact" : ""
        }`
      : "now-card"
  }
>
        <p className="now-title">開催中！</p>

        <h2 className="now-event-title">
  <span className="now-title-ja">
  <img
    src={activeEvent.icon}
    alt=""
    className="now-event-icon"
  />
  {activeEvent.title}
</span>

  <span className="now-title-en">
    {activeEvent.englishTitle}
  </span>
</h2>

        <p className="now-time">
          {formatCountdown(remaining)}
        </p>
      </div>
    );
  }

  const nextEvent = normalEvents
    .map((event) => ({
      event,
      time: getNextEventTime(event, now),
    }))
    .sort(
      (a, b) =>
        a.time.getTime() - b.time.getTime()
    )[0];

  if (!nextEvent) {
    return null;
  }

  return (
    <div className="now-card">
  <p className="now-title">NEXT</p>

  <div className="now-mobile-title-wrap">
  <img
    src={nextEvent.event.icon}
    alt=""
    className="now-event-icon"
  />

  <div className="now-title-ja">
    {nextEvent.event.title}
  </div>

  <div className="now-title-en">
    {nextEvent.event.englishTitle}
  </div>
</div>

  <p className="now-time">
    {formatCountdown(
      nextEvent.time.getTime() - now.getTime()
    )}
    </p>
  </div>

  );
}