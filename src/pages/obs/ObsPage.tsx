import { useClock } from "../../hooks/useClock";
import { useLocation, useParams } from "react-router-dom";

import ObsOverlay from "../../components/obs/ObsOverlay";
import { events } from "../../data/events";

import {
  getNextEventTime,
  getPreviousEventTime,
  isEventActive,
} from "../../utils/schedule";

import { formatCountdown } from "../../utils/time";

const auroraSummerSchedule = [
  16, 18, 20, 22, 0, 2, 4, 6, 8, 10, 12, 14,
];

const auroraNormalSchedule = [
  17, 19, 21, 23, 1, 3, 6, 7, 9, 11, 13, 15,
];

const auroraDurationMs = 60 * 60 * 1000;

/*
  現在のAuroraWidgetと同じ仮設定。
  DST自動判定は後で共通化する。
*/
const isSummerTime = true;

const environmentPhases = [
  { label: "朝", start: 0, end: 10 },
  { label: "霧", start: 10, end: 15 },
  { label: "昼", start: 15, end: 40 },
  { label: "夕方", start: 40, end: 50 },
  { label: "夜", start: 50, end: 60 },
];

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function TimedEventOverlay({
  eventId,
  compact,
}: {
  eventId: string;
  compact: boolean;
}) {
  const now = useClock();
  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return <ObsNotFound />;
  }

  const active = isEventActive(event, now);
  const previousStart = getPreviousEventTime(event, now);
  const nextStart = getNextEventTime(event, now);

  const eventEnd = new Date(
    previousStart.getTime() + event.durationMinutes * 60 * 1000
  );

  const targetTime = active ? eventEnd : nextStart;
  const countdown = formatCountdown(
    Math.max(0, targetTime.getTime() - now.getTime())
  );

  let progress = 0;

  if (active) {
    const durationMs = event.durationMinutes * 60 * 1000;
    const elapsedMs = now.getTime() - previousStart.getTime();

    progress = clamp(elapsedMs / durationMs);
  } else {
    const previousEnd = new Date(
      previousStart.getTime() + event.durationMinutes * 60 * 1000
    );

    const waitingDuration =
      nextStart.getTime() - previousEnd.getTime();

    const waitingElapsed =
      now.getTime() - previousEnd.getTime();

    progress =
      waitingDuration > 0
        ? clamp(waitingElapsed / waitingDuration)
        : 0;
  }

  return (
    <ObsOverlay
      title={event.title}
      icon={event.icon}
      color={event.color}
      countdown={countdown}
      progress={progress}
      compact={compact}
    />
  );
}

function AuroraOverlay({ compact }: { compact: boolean }) {
  const now = useClock();

  const schedule = isSummerTime
    ? auroraSummerSchedule
    : auroraNormalSchedule;

  const candidates = [-1, 0, 1, 2]
    .flatMap((dayOffset) =>
      schedule.map((hour) => {
        const date = new Date(now);

        date.setDate(date.getDate() + dayOffset);
        date.setHours(hour, 0, 0, 0);

        return date;
      })
    )
    .sort((a, b) => a.getTime() - b.getTime());

  const currentStart = candidates.find((start) => {
    const end = start.getTime() + auroraDurationMs;

    return (
      now.getTime() >= start.getTime() &&
      now.getTime() < end
    );
  });

  const nextStart =
    candidates.find((start) => start.getTime() > now.getTime()) ??
    candidates[0];

  let targetTime: Date;
  let progress = 0;

  if (currentStart) {
    targetTime = new Date(
      currentStart.getTime() + auroraDurationMs
    );

    progress = clamp(
      (now.getTime() - currentStart.getTime()) /
        auroraDurationMs
    );
  } else {
    targetTime = nextStart;

    const previousStart = [...candidates]
      .reverse()
      .find((start) => start.getTime() < now.getTime());

    const previousEnd = previousStart
      ? previousStart.getTime() + auroraDurationMs
      : now.getTime();

    const waitingDuration =
      nextStart.getTime() - previousEnd;

    const waitingElapsed =
      now.getTime() - previousEnd;

    progress =
      waitingDuration > 0
        ? clamp(waitingElapsed / waitingDuration)
        : 0;
  }

  return (
    <ObsOverlay
      title="AURORA帰還コンサート"
      icon="✨"
      color="#ffd66b"
      countdown={formatCountdown(
        Math.max(0, targetTime.getTime() - now.getTime())
      )}
      progress={progress}
      compact={compact}
    />
  );
}

function EnvironmentOverlay({
  compact,
}: {
  compact: boolean;
}) {
  const now = useClock();

  const minute = now.getMinutes();
  const second = now.getSeconds();
  const elapsedSeconds = minute * 60 + second;

  const currentPhase =
    environmentPhases.find(
      (phase) =>
        minute >= phase.start && minute < phase.end
    ) ?? environmentPhases[0];

  const remainingSeconds =
    currentPhase.end * 60 - elapsedSeconds;

const targetTime = new Date(
  now.getTime() + remainingSeconds * 1000
);

const countdown = formatCountdown(
  targetTime.getTime() - now.getTime()
);
  return (
    <ObsOverlay
      title={`花鳥郷環境変化・${currentPhase.label}`}
      icon="🌸"
      color="#ffd66b"
      countdown={countdown}
      progress={elapsedSeconds / 3600}
      compact={compact}
    />
  );
}

function ObsNotFound() {
  return (
    <main className="obs-page">
      <div className="obs-overlay-countdown">
        Overlay not found
      </div>
    </main>
  );
}

export default function ObsPage() {
  const { overlayId } = useParams();
  const location = useLocation();

  const compact =
    location.pathname.endsWith("/compact");

  if (!overlayId) {
    return <ObsNotFound />;
  }

  if (
    overlayId === "geyser" ||
    overlayId === "bread" ||
    overlayId === "turtle" ||
    overlayId === "fireworks"
  ) {
    return (
      <TimedEventOverlay
        eventId={overlayId}
        compact={compact}
      />
    );
  }

  if (overlayId === "aurora") {
    return <AuroraOverlay compact={compact} />;
  }

  if (overlayId === "environment") {
    return <EnvironmentOverlay compact={compact} />;
  }

  return <ObsNotFound />;
}