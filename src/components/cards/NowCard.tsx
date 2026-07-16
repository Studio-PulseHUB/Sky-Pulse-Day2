import type { SkyEvent } from "../../data/events";
import { getNextEventTime, isEventActive } from "../../utils/schedule";
import { formatCountdown } from "../../utils/time";

type NowCardProps = {
  events: SkyEvent[];
  now: Date;
};

export default function NowCard({ events, now }: NowCardProps) {
  const activeEvent = events.find((event) =>
    isEventActive(event, now)
  );

  if (activeEvent) {

    const nextTime = getNextEventTime(activeEvent, now);
    const diff = nextTime.getTime() - now.getTime();

    return (
      <div className="now-card">
        <p className="now-title">NOW</p>

<h2>
  {activeEvent.icon} {activeEvent.title}
</h2>

        <p className="now-time">
          {formatCountdown(diff)}
        </p>
      </div>
    );
  }

  const nextEvent = [...events]
    .filter(
      (event) =>
        event.type === "geyser" ||
        event.type === "bread" ||
        event.type === "turtle"
    )
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
<h2>
  {nextEvent.event.icon} {nextEvent.event.title}
</h2>
      <p className="now-time">
        {formatCountdown(
          nextEvent.time.getTime() - now.getTime()
        )}
      </p>
    </div>
  );
}