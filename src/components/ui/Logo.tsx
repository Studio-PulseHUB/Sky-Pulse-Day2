import { useTheme } from "../../themes/ThemeProvider";

import cloudLogo from "../../assets/logos/cloud.svg";
import nightLogo from "../../assets/logos/night.svg";
import starryLogo from "../../assets/logos/starry.svg";

export default function Logo() {
  const { theme } = useTheme();

  const logoMap = {
    cloud: cloudLogo,
    night: nightLogo,
    starry: starryLogo,
  };

  return (
    <img
      className={`site-logo site-logo-${theme}`}
      src={logoMap[theme]}
      alt="Sky Pulse"
    />
  );
}