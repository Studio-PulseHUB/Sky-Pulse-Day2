import { useEffect, useState } from "react";

import ObsOverlay from "./ObsOverlay";
import { events } from "../../data/events";

import {
  getNextEventTime,
  getPreviousEventTime,
  isEventActive,
} from "../../utils/schedule";

import { formatCountdown } from "../../utils/time";

type Props = {
  compact: boolean;
};

function formatEventTime(date: Date) {
  return date.toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NowOverlay({
  compact,
}: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const normalEvents = events.filter(
    (event) =>
      event.type === "geyser" ||
      event.type === "bread" ||
      event.type === "turtle"
  );

  /*
   * 現在開催中
   */
  const activeEvent = normalEvents.find((event) =>
    isEventActive(event, now)
  );

  if (activeEvent) {
    const previousStart =
      getPreviousEventTime(activeEvent, now);

    const endTime = new Date(
      previousStart.getTime() +
        activeEvent.durationMinutes * 60 * 1000
    );

    const remaining =
      endTime.getTime() - now.getTime();

    const progress =
      (now.getTime() - previousStart.getTime()) /
      (activeEvent.durationMinutes * 60 * 1000);

    return (
      <ObsOverlay
        title={activeEvent.title}
        englishTitle={activeEvent.englishTitle}
        icon={activeEvent.icon}
        color={activeEvent.color}
        countdown={formatCountdown(
          Math.max(0, remaining)
        )}
        eventTime={formatEventTime(endTime)}
        progress={progress}
        status="NOW"
        compact={compact}
      />
    );
  }

  /*
   * 次のイベント
   */
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

  const remaining =
    nextEvent.time.getTime() - now.getTime();

  /*
   * 前回の同イベントから次回までを使って
   * リングの進行率を計算
   */
  const previousStart =
    getPreviousEventTime(nextEvent.event, now);

  const previousEnd = new Date(
    previousStart.getTime() +
      nextEvent.event.durationMinutes * 60 * 1000
  );

  const waitingDuration =
    nextEvent.time.getTime() -
    previousEnd.getTime();

  const waitingElapsed =
    now.getTime() -
    previousEnd.getTime();

  const progress =
    waitingDuration > 0
      ? Math.min(
          1,
          Math.max(
            0,
            waitingElapsed / waitingDuration
          )
        )
      : 0;

  return (
    <ObsOverlay
      title={nextEvent.event.title}
      englishTitle={nextEvent.event.englishTitle}
      icon={nextEvent.event.icon}
      color={nextEvent.event.color}
      countdown={formatCountdown(
        Math.max(0, remaining)
      )}
      eventTime={formatEventTime(nextEvent.time)}
      progress={progress}
      status="NEXT"
      compact={compact}
    />
  );
}

/*ニンジン
玉ねぎ
ヨーグルト
茶
酒*/