import type { SkyEvent } from "../data/events";
import { getSkyDayStart } from "./skyTime";


/*花火*/

function getNextFireworksTime(now: Date): Date {
  const skyStart = getSkyDayStart(now);

  const intervalMs =
    4 * 60 * 60 * 1000;

  let candidate =
    skyStart.getTime();

  while (candidate <= now.getTime()) {
    candidate += intervalMs;
  }

  return new Date(candidate);
}


/*イベント*/

export function getPreviousEventTime(
  event: SkyEvent,
  now: Date
): Date {
  if (event.type === "fireworks") {
    const next =
      getNextFireworksTime(now);

    return new Date(
      next.getTime() -
        event.intervalMinutes *
          60 *
          1000
    );
  }

  const skyStart =
    getSkyDayStart(now);

  /*
   Sky 00:00 を基準にイベント開始時刻を作る
   
    例:
   
    geyser
    startMinute = 0
   
    bread
    startMinute = 30
   
    turtle
    startMinute = 50
   */
  const firstEvent =
    skyStart.getTime() +
    event.startMinute *
      60 *
      1000;

  const intervalMs =
    event.intervalMinutes *
    60 *
    1000;

  const elapsed =
    now.getTime() -
    firstEvent;

  const cycles =
    Math.floor(
      elapsed / intervalMs
    );

  return new Date(
    firstEvent +
      cycles * intervalMs
  );
}


/*NEXT EVENT*/

export function getNextEventTime(
  event: SkyEvent,
  now: Date
): Date {
  if (event.type === "fireworks") {
    return getNextFireworksTime(now);
  }

  const previous =
    getPreviousEventTime(
      event,
      now
    );

  return new Date(
    previous.getTime() +
      event.intervalMinutes *
        60 *
        1000
  );
}


/*EVENT PROGRESS */

export function getEventProgress(
  event: SkyEvent,
  now: Date
): number {
  const previous =
    getPreviousEventTime(
      event,
      now
    );

  const next =
    getNextEventTime(
      event,
      now
    );

  const total =
    next.getTime() -
    previous.getTime();

  const elapsed =
    now.getTime() -
    previous.getTime();

  return Math.min(
    100,
    Math.max(
      0,
      (elapsed / total) * 100
    )
  );
}


/*ACTIVE*/

export function isEventActive(
  event: SkyEvent,
  now: Date
): boolean {
  const previous =
    getPreviousEventTime(
      event,
      now
    );

  const end =
    previous.getTime() +
    event.durationMinutes *
      60 *
      1000;

  return (
    now.getTime() >=
      previous.getTime() &&
    now.getTime() < end
  );
}


/*EVENT END*/

export function getEventEndTime(
  event: SkyEvent,
  now: Date
): Date {
  const previous =
    getPreviousEventTime(
      event,
      now
    );

  return new Date(
    previous.getTime() +
      event.durationMinutes *
        60 *
        1000
  );
}