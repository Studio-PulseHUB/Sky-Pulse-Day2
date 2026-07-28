import NowCard from "../cards/NowCard";
import { events } from "../../data/events";
import { useEffect, useState } from "react";

type Props = {
  compact: boolean;
};

export default function NowOverlay({
  compact,
}: Props) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(
      () => setNow(new Date()),
      1000
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <NowCard
      events={events}
      now={now}
      compact={compact}
      obs
    />
  );
}