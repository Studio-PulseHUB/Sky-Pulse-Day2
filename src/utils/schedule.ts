import type { SkyEvent } from "../data/events";

function isSummerTime(now: Date): boolean {
  const year = now.getFullYear();

  const start = new Date(year, 2, 8, 19, 0, 0, 0);
  const end = new Date(year, 10, 1, 18, 0, 0, 0);

  return now >= start && now < end;
}

function getBaseHour(now: Date): number {
  return isSummerTime(now) ? 16 : 17;
}

function getNextFireworksTime(now: Date): Date {
  const getHours = (date: Date) =>
    isSummerTime(date)
      ? [0, 4, 8, 12, 16, 20]
      : [1, 5, 9, 13, 17, 21];

  let candidate = new Date(now);
  candidate.setDate(1);
  candidate.setMinutes(0, 0, 0);

  for (let i = 0; i < 24; i++) {
    const hours = getHours(candidate);

    for (const hour of hours) {
      const eventTime = new Date(candidate);
      eventTime.setHours(hour, 0, 0, 0);

      if (eventTime > now) {
        return eventTime;
      }
    }

    candidate.setMonth(candidate.getMonth() + 1);
    candidate.setDate(1);
  }

  return candidate;
}

export function getPreviousEventTime(event: SkyEvent, now: Date): Date {
  const previous = new Date(now);

  previous.setHours(getBaseHour(now), event.startMinute, 0, 0);

  while (previous > now) {
    previous.setMinutes(previous.getMinutes() - event.intervalMinutes);
  }

  return previous;
}

export function getNextEventTime(event: SkyEvent, now: Date): Date {
  if (event.type === "fireworks") {
    return getNextFireworksTime(now);
  }

  const next = new Date(now);
  next.setHours(getBaseHour(now), event.startMinute, 0, 0);

  while (next <= now) {
    next.setMinutes(next.getMinutes() + event.intervalMinutes);
  }

  return next;
}

export function getEventProgress(event: SkyEvent, now: Date): number {
  const previous = getPreviousEventTime(event, now);
  const next = getNextEventTime(event, now);

  const total = next.getTime() - previous.getTime();
  const elapsed = now.getTime() - previous.getTime();

  return Math.min(100, Math.max(0, (elapsed / total) * 100));
}

export function isEventActive(event: SkyEvent, now: Date): boolean {
  const previous = getPreviousEventTime(event, now);
  const end = new Date(previous);

  end.setMinutes(end.getMinutes() + event.durationMinutes);

  return now >= previous && now <= end;
}