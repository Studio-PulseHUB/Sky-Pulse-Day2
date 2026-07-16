type ProgressBarProps = {
  progress: number;
  color: string;
};

export default function ProgressBar({ progress, color }: ProgressBarProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{
          width: `${safeProgress}%`,
          background: color,
        }}
      />
    </div>
  );
}