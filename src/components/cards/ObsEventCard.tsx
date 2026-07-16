import type { SkyEvent } from "../../data/events";
import {
  getEventProgress,
  getNextEventTime,
  isEventActive,
} from "../../utils/schedule";
import {
  formatCountdown,
} from "../../utils/time";

type ObsEventCardProps = {
  event: SkyEvent;
  now: Date;
};

export default function ObsEventCard({
  event,
  now,
}: ObsEventCardProps) {
  const active = isEventActive(event, now);
  const nextTime = getNextEventTime(event, now);
  const diff = nextTime.getTime() - now.getTime();
  const progress = getEventProgress(event, now);

  return (
    <div className="obs-card">
      <div className="obs-header">
        <span className="obs-icon">{event.icon}</span>
        <span className="obs-title">{event.title}</span>
      </div>

      <div className="obs-countdown">
        {active ? "開催中" : formatCountdown(diff)}
      </div>

      <div className="obs-progress">
        <div
          className="obs-progress-fill"
          style={{
            width: `${progress * 100}%`,
            backgroundColor: event.color,
          }}
        />
      </div>
    </div>
  );
}