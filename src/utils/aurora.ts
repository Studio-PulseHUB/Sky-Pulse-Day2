/*AURORA concert schedule
Skyの基準:America/Los_Angeles
端末のタイムゾーンには依存しない。Dateとして絶対時刻を返し、表示時のみ端末ローカル時間へ変換する。*/

const AURORA_INTERVAL_MS =
  2 * 60 * 60 * 1000;

export const AURORA_DURATION_MS =
  60 * 60 * 1000;


/*Skyの日付開始America/Los_Angeles 00:00*/
function getSkyDayStart(now: Date): Date {
  const dateFormatter =
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  const parts =
    dateFormatter.formatToParts(now);

  const year = Number(
    parts.find(
      (part) => part.type === "year"
    )?.value
  );

  const month = Number(
    parts.find(
      (part) => part.type === "month"
    )?.value
  );

  const day = Number(
    parts.find(
      (part) => part.type === "day"
    )?.value
  );

  const utcMidnight = new Date(
    Date.UTC(
      year,
      month - 1,
      day,
      0,
      0,
      0,
      0
    )
  );

  const offsetFormatter =
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Los_Angeles",
      timeZoneName: "longOffset",
    });

  const offsetParts =
    offsetFormatter.formatToParts(
      utcMidnight
    );

  const zone =
    offsetParts.find(
      (part) =>
        part.type === "timeZoneName"
    )?.value ?? "GMT-08:00";

  const match = zone.match(
    /GMT([+-])(\d{2}):(\d{2})/
  );

  let offsetMinutes = -480;

  if (match) {
    const sign =
      match[1] === "+" ? 1 : -1;

    offsetMinutes =
      sign *
      (Number(match[2]) * 60 +
        Number(match[3]));
  }

  return new Date(
    utcMidnight.getTime() -
      offsetMinutes * 60 * 1000
  );
}


export function getAuroraTimes(
  now: Date
) {
  const skyDayStart =
    getSkyDayStart(now);

  /*前日の候補も作る。すればSky 00:00付近でもLIVE判定を失わない。*/
  const candidates: Date[] = [];

  for (
    let dayOffset = -1;
    dayOffset <= 1;
    dayOffset++
  ) {
    const dayStart =
      skyDayStart.getTime() +
      dayOffset *
        24 *
        60 *
        60 *
        1000;

    for (
      let offset = 0;
      offset < 24 * 60 * 60 * 1000;
      offset += AURORA_INTERVAL_MS
    ) {
      candidates.push(
        new Date(dayStart + offset)
      );
    }
  }

  candidates.sort(
    (a, b) =>
      a.getTime() - b.getTime()
  );

  const current =
    candidates.find((start) => {
      const end =
        start.getTime() +
        AURORA_DURATION_MS;

      return (
        now.getTime() >=
          start.getTime() &&
        now.getTime() < end
      );
    });

  const next =
    candidates.find(
      (start) =>
        start.getTime() >
        now.getTime()
    );

  return {
    current,
    next:
      next ??
      new Date(
        skyDayStart.getTime() +
          24 * 60 * 60 * 1000
      ),
  };
}