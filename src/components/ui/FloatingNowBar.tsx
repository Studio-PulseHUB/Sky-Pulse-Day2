import type { SkyEvent } from "../../data/events";
import {
  getNextEventTime,
  getPreviousEventTime,
  isEventActive,
} from "../../utils/schedule";
import { formatCountdown } from "../../utils/time";

import "../../styles/floating-now-bar.css";

type FloatingNowBarProps = {
  events: SkyEvent[];
  now: Date;
  visible: boolean;
};

export default function FloatingNowBar({
  events,
  now,
  visible,
}: FloatingNowBarProps) {
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
    const startTime = getPreviousEventTime(activeEvent, now);

    const endTime = new Date(
      startTime.getTime() +
        activeEvent.durationMinutes * 60 * 1000
    );

    const remaining =
      endTime.getTime() - now.getTime();

    return (
      <div
        className={`floating-now-bar ${
          visible ? "visible" : ""
        }`}
        aria-hidden={!visible}
      >
        <span className="floating-now-status now">
          NOW
        </span>

        <img
          src={activeEvent.icon}
          alt=""
          className="floating-now-icon"
        />

        <span className="floating-now-time">
          {formatCountdown(remaining)}
        </span>
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

  if (!nextEvent) return null;

  const remaining =
    nextEvent.time.getTime() - now.getTime();

  return (
    <div
      className={`floating-now-bar ${
        visible ? "visible" : ""
      }`}
      aria-hidden={!visible}
    >
      <span className="floating-now-status">
        NEXT
      </span>

      <img
        src={nextEvent.event.icon}
        alt=""
        className="floating-now-icon"
      />

      <span className="floating-now-time">
        {formatCountdown(remaining)}
      </span>
    </div>
  );
}