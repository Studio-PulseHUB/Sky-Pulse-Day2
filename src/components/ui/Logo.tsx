import { useTheme } from "../../themes/ThemeProvider";
import cloudLogo from "../../assets/logos/cloud.svg";
import nightLogo from "../../assets/logos/night.svg";
import starryLogo from "../../assets/logos/starry.svg";
import { getTimeTheme } from "../../utils/theme";

export default function Logo() {
  const { theme } = useTheme();

  const timeTheme = getTimeTheme(new Date());

  const autoLogo =
    timeTheme === "dawn" || timeTheme === "day"
      ? cloudLogo
      : timeTheme === "sunset"
        ? starryLogo
        : nightLogo;

  const logoMap = {
    cloud: cloudLogo,
    night: nightLogo,
    starry: starryLogo,
    auto: autoLogo,
  };

  return (
    <img
      className={`site-logo site-logo-${theme}`}
      src={logoMap[theme]}
      alt="Sky Pulse"
    />
  );
}