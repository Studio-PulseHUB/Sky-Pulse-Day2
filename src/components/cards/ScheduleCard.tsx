import FireworksWidget from "../widgets/FireworksWidget";
import EnvironmentWidget from "../widgets/EnvironmentWidget";
import AuroraWidget from "../widgets/AuroraWidget";

export default function ScheduleCard() {
  return (
    <>
      <div className="schedule-card">
        <h2>🎆 花鳥郷花火ショー</h2>
        <FireworksWidget />
      </div>

      <div className="schedule-card">
        <h2>🌇 花鳥郷環境変化</h2>
        <EnvironmentWidget />
      </div>

      <div className="schedule-card">
        <h2>✨ AURORA帰還コンサート</h2>
        <AuroraWidget />
      </div>
      
    </>
  );
}