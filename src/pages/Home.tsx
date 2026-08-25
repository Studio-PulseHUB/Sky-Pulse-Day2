import { useEffect, useState } from "react";

import EventCard from "../components/cards/EventCard";
import NowCard from "../components/cards/NowCard";
import FireworksWidget from "../components/widgets/FireworksWidget";
import AuroraWidget from "../components/widgets/AuroraWidget";
import EnvironmentWidget from "../components/widgets/EnvironmentWidget";
import ControlBar from "../layouts/ControlBar";
import Logo from "../components/ui/Logo";
import { getTimeTheme } from "../utils/theme";
import { useTheme } from "../themes/ThemeProvider";
import { events } from "../data/events";


export default function Home() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
const { theme } = useTheme();
const timeTheme = getTimeTheme(now);

const backgroundClass =
  theme === "auto"
    ? `time-${timeTheme}`
    : "";
return (
  <>
    <ControlBar />

    <main className={`home ${backgroundClass}`}>


      <Logo />

      <NowCard events={events} now={now} />

      <p className="subtitle">Sky Event Dashboard</p>

      <div className="cards">
        {events
          .filter((event) => event.type !== "fireworks")
          .map((event) => (
            <EventCard
              key={event.id}
              event={event}
              now={now}
            />
          ))}

        {/* スマホではカメの横に表示 */}
        <div className="mobile-aurora">
          <AuroraWidget />
        </div>
      </div>

<div className="special-events-grid">
  <FireworksWidget />

  {/* PCでは花火の横に表示 */}
  <div className="desktop-aurora">
    <AuroraWidget />
  </div>
</div>

<EnvironmentWidget />
    </main>
  </>
);
}
