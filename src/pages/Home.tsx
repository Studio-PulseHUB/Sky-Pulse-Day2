import { useEffect, useState } from "react";

import EventCard from "../components/cards/EventCard";
import NowCard from "../components/cards/NowCard";
import FireworksWidget from "../components/widgets/FireworksWidget";
import AuroraWidget from "../components/widgets/AuroraWidget";
import EnvironmentWidget from "../components/widgets/EnvironmentWidget";
import ControlBar from "../layouts/ControlBar";
import Logo from "../components/ui/Logo";

import { events } from "../data/events";

export default function Home() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <ControlBar />

      <main className="home">
        <Logo />

        <NowCard events={events} now={now} />

        <p className="subtitle">Sky Event Dashboard</p>

        <div className="cards">
          {events
            .filter((event) => event.type !== "fireworks")
            .map((event) => (
              <EventCard key={event.id} event={event} now={now} />
            ))}
        </div>

        <div className="special-events-grid">
          <FireworksWidget />
          <AuroraWidget />
        </div>

        <EnvironmentWidget />
      </main>
    </>
  );
}