import WaveTimeline from "./WaveTimeline";
import timeIcon from "../../assets/icon/time.svg";

export default function EnvironmentWidget() {
  return (
    <div className="environment-widget">
      <h2 className="special-title">
        <img
          src={timeIcon}
          alt=""
          className="special-title-icon"
        />
        <span>花鳥郷環境変化 / Aviary Village</span>
      </h2>

      <WaveTimeline />
    </div>
  );
}