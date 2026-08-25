import { useEffect, useRef, useState } from "react";
import "./WaveTimeline.css";

const phases = [
  { label: "朝", en: "Morning", start: 0, end: 10 },
  { label: "霧", en: "Fog", start: 10, end: 15 },
  { label: "昼", en: "Day", start: 15, end: 40 },
  { label: "夕方", en: "Evening", start: 40, end: 50 },
  { label: "夜", en: "Night", start: 50, end: 60 },
];

function formatRemaining(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const restSeconds = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(restSeconds).padStart(2, "0")}`;
}

export default function WaveTimeline() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [now, setNow] = useState(new Date());
  const [dot, setDot] = useState({ x: 40, y: 120 });

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minute = now.getMinutes();
  const second = now.getSeconds();
  const progress = (minute * 60 + second) / 3600;

  const currentPhase =
    phases.find((phase) => minute >= phase.start && minute < phase.end) ??
    phases[0];

  const currentIndex = phases.findIndex(
    (phase) => phase.label === currentPhase.label
  );

  const nextPhase = phases[(currentIndex + 1) % phases.length];
  const remainingSeconds = currentPhase.end * 60 - (minute * 60 + second);

  useEffect(() => {
    if (!pathRef.current) return;

    const length = pathRef.current.getTotalLength();
    const point = pathRef.current.getPointAtLength(length * progress);

    setDot({ x: point.x, y: point.y });
  }, [progress]);

  return (
    <div className="wave-timeline">
      <svg
        width="100%"
        height="130"
        viewBox="0 0 1000 150"
        preserveAspectRatio="xMidYMid meet"
      >
        {phases.map((phase) => {
          const x = 40 + (phase.start / 60) * 920;

          return (
            <line
              key={phase.label}
              x1={x}
              y1={34}
              x2={x}
              y2={120}
              stroke="rgba(255,255,255,.1)"
              strokeWidth="2"
            />
          );
        })}

        {phases.map((phase) => {
  const x = 40 + (phase.start / 60) * 920;
  const active = currentPhase.label === phase.label;

  return (
    <g key={phase.label}>
      <text
        x={x}
        y={24}
        textAnchor="middle"
        fontSize="24"
        fontWeight="700"
        fill={
          active
            ? "#ffffff"
            : "rgba(255,255,255,.45)"
        }
      >
        {phase.label}
      </text>

      <text
        x={x}
        y={142}
        textAnchor="middle"
        fontSize="12"
        fontWeight="500"
        fill="rgba(255,255,255,.45)"
      >
        {phase.en}
      </text>
    </g>
  );
})}

        <path
          ref={pathRef}
          d="M 40 120 C 220 120, 300 45, 500 45 C 700 45, 780 120, 960 120"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        <circle
          cx={dot.x}
          cy={dot.y}
          r="12"
          fill="#FFD66B"
          filter="drop-shadow(0 0 10px #FFD66B)"
        />
      </svg>

      <div className="wave-next">
        Next • {nextPhase.label} {formatRemaining(remainingSeconds)}
      </div>
    </div>
  );
}