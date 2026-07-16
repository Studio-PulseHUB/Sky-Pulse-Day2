export type EventType = "geyser" | "bread" | "turtle" | "fireworks";

export type SkyEvent = {
  id: string;
  title: string;
  type: EventType;
  icon: string;
  color: string;
  intervalMinutes: number;
  startHour?: number;
  startMinute: number;
  durationMinutes: number;
};

/*そのうちアイコンをsvgに変更する*/

export const events: SkyEvent[] = [
  {
    id: "geyser",
    title: "ウニ間欠泉",
    type: "geyser",
    icon: "🌋",
    color: "#42d9ff",
    intervalMinutes: 120,
    startHour: 0,
    startMinute: 0,
    durationMinutes: 15,
  },
  {
    id: "bread",
    title: "パン焼き",
    type: "bread",
    icon: "🍞",
    color: "#ffb86b",
    intervalMinutes: 120,
    startHour: 0,
    startMinute: 30,
    durationMinutes: 15,
  },
  {
    id: "turtle",
    title: "ウミガメ",
    type: "turtle",
    icon: "🐢",
    color: "#76f7b2",
    intervalMinutes: 120,
    startHour: 0,
    startMinute: 50,
    durationMinutes: 15,
  },
  {
    id: "fireworks",
    title: "花鳥郷花火ショー",
    type: "fireworks",
    icon: "🎆",
    color: "#ff6ad5",
    intervalMinutes: 240,
    startMinute: 0,
    durationMinutes: 15,
  },
];