import { useEffect, useState } from "react";

export function useClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    let timerId: number;

    const tick = () => {
      setNow(new Date());

      const currentTime = Date.now();

      // 次の「秒ぴったり」から少し後に更新する
      const delay = 1000 - (currentTime % 1000) + 50;

      timerId = window.setTimeout(tick, delay);
    };

    tick();

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  return now;
}