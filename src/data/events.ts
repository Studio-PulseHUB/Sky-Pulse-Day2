import geyserIcon from "../assets/icon/geyser.svg";
import breadIcon from "../assets/icon/bread.svg";
import turtleIcon from "../assets/icon/turtle.svg";
import fireworksIcon from "../assets/icon/fireworks.svg";

export type EventType =
  | "geyser"
  | "bread"
  | "turtle"
  | "fireworks";

export type SkyEvent = {
  id: string;
  title: string;
  englishTitle: string;
  shortTitle: string;
  englishShortTitle: string;
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
    englishTitle: "Sanctuary Geyser",
    shortTitle: "間欠泉",
    englishShortTitle: "Geyser",
    type: "geyser",
    icon: geyserIcon,
    color: "#42d9ff",
    intervalMinutes: 120,
    startHour: 0,
    startMinute: 0,
    durationMinutes: 15,
  },

  {
    id: "bread",
    title: "パン焼き",
    englishTitle: "Grandma's Dinner",
    shortTitle: "パン",
    englishShortTitle: "Grandma",
    type: "bread",
    icon: breadIcon,
    color: "#ffb86b",
    intervalMinutes: 120,
    startHour: 0,
    startMinute: 30,
    durationMinutes: 15,
  },
  {
    id: "turtle",
    title: "ウミガメ",
    englishTitle: "Sunset Turtle",
    shortTitle: "カメ",
    englishShortTitle: "Turtle",
    type: "turtle",
    icon: turtleIcon,
    color: "#76f7b2",
    intervalMinutes: 120,
    startHour: 0,
    startMinute: 50,
    durationMinutes: 15,
  },
  {
    id: "fireworks",
    title: "花鳥郷花火ショー",
    englishTitle: "Aviary Fireworks Show",
    shortTitle: "花火",
    englishShortTitle: "Fireworks",
    type: "fireworks",
    icon: fireworksIcon,
    color: "#ff6ad5",
    intervalMinutes: 240,
    startMinute: 0,
    durationMinutes: 15,
  },
];