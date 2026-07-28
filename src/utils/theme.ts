export type TimeTheme =
  | "dawn"
  | "day"
  | "sunset"
  | "night"
  | "deepNight";

export function getTimeTheme(now: Date): TimeTheme {
  const hour = now.getHours();

  if (hour >= 5 && hour < 7) {
    return "dawn";
  }

  if (hour >= 7 && hour < 16) {
    return "day";
  }

  if (hour >= 16 && hour < 19) {
    return "sunset";
  }

  if (hour >= 19 && hour < 24) {
    return "night";
  }

  return "deepNight";
}