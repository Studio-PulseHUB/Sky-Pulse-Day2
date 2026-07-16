import ObsEventCard from "../../components/cards/ObsEventCard";
import { events } from "../../data/events";
import { useEffect, useState } from "react";

export default function GeyserPage() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const geyser = events.find((e) => e.id === "geyser");

  if (!geyser) return null;

  return (
    <div className="obs-page">
<ObsEventCard event={geyser} now={now} />

    </div>
  );
}