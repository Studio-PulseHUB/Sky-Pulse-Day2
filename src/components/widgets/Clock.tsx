import { useEffect, useState } from "react";

export default function Clock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <p>
      {now.toLocaleTimeString("ja-JP")}
    </p>
  );
}