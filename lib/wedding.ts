import { wedding } from "../config/wedding.ts";

type Event = (typeof wedding.events)[number];
const pad = (n: number) => String(n).padStart(2, "0");

export function eventDate(event: Event, year: number = wedding.year) {
  const day = `${String(year).padStart(4, "0")}-${pad(event.month)}-${pad(event.day)}`;
  const wallTime = Date.parse(`${day}T${event.time}:00Z`);
  if (!Number.isFinite(wallTime) || new Date(wallTime).toISOString() !== `${day}T${event.time}:00.000Z`) return NaN;
  try {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: wedding.timezone, timeZoneName: "longOffset",
    });
    const offsetAt = (timestamp: number) => {
      const zone = formatter.formatToParts(timestamp).find((part) => part.type === "timeZoneName")?.value;
      if (zone === "GMT") return 0;
      const offset = /^GMT([+-])(\d{2}):(\d{2})$/.exec(zone ?? "");
      return offset ? (Number(offset[2]) * 60 + Number(offset[3])) * 60_000 * (offset[1] === "-" ? -1 : 1) : NaN;
    };
    const instant = wallTime - offsetAt(wallTime);
    const corrected = wallTime - offsetAt(instant);
    return corrected + offsetAt(corrected) === wallTime ? corrected : NaN;
  } catch {
    return NaN;
  }
}

export const events = [...wedding.events].sort((a, b) => eventDate(a) - eventDate(b));
export const ceremony = wedding.events.find((event) => event.id === wedding.ceremonyId)!;
export const ceremonyDate = eventDate(ceremony);

export function dateLabel(event: Event, weekday = false, year: number = wedding.year) {
  const timestamp = eventDate(event, year);
  if (!Number.isFinite(timestamp)) {
    const month = new Date(Date.UTC(2000, event.month - 1, 1)).toLocaleString("en-GB", { month: "long", timeZone: "UTC" });
    return `${event.day} ${month} ${year}`;
  }
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: wedding.timezone, day: "numeric", month: "long", year: "numeric",
    ...(weekday ? { weekday: "long" } : {}),
  }).format(timestamp);
}

export function timeLabel(event: Event) {
  const [h, m] = event.time.split(":").map(Number);
  return `${h % 12 || 12}:${pad(m)} ${h < 12 ? "AM" : "PM"} ${wedding.timezoneLabel}`;
}

export function countdown(target: number, now: number) {
  if (!Number.isFinite(target)) return null;
  const remaining = Math.max(0, target - now);
  const seconds = Math.ceil(remaining / 1000);
  return {
    ended: remaining === 0,
    units: [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24,
      Math.floor(seconds / 60) % 60, seconds % 60],
  };
}

const calendarEscape = (text: string) => text.replaceAll("\\", "\\\\").replaceAll("\n", "\\n")
  .replaceAll(";", "\\;").replaceAll(",", "\\,");
const utcStamp = (time: number) => new Date(time).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
const calendarStamp = utcStamp(Date.now());
function fold(line: string) {
  const encoder = new TextEncoder();
  let result = "", size = 0;
  for (const char of line) {
    const bytes = encoder.encode(char).length;
    if (size + bytes > 75) { result += "\r\n "; size = 1; }
    result += char;
    size += bytes;
  }
  return result;
}

export function calendar(event: Event, year: number = wedding.year) {
  const target = eventDate(event, year);
  if (!Number.isFinite(target)) return null;
  const venue = wedding.venues[event.venue];
  const location = [...new Set([venue.name, venue.address, venue.locality].filter(Boolean))].join(", ");
  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//A and H//Wedding Invitation//EN", "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT", `UID:${event.id}-${year}@abhilash-harsha.invalid`,
    `DTSTAMP:${calendarStamp}`, `DTSTART:${utcStamp(target)}`,
    `SUMMARY:${calendarEscape(event.name + " — " + wedding.names.join(" weds "))}`,
    `LOCATION:${calendarEscape(location)}`, `URL:${venue.directions}`, "END:VEVENT", "END:VCALENDAR", "",
  ].map(fold).join("\r\n");
}
