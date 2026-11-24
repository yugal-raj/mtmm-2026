// Shared "what time is it at the conference?" helpers, used by the Program page (live session) and the home hero (countdown).
import { PROGRAM_TIME_ZONE } from "@/data/program";

// WHY: Re-check the clock every 30s — fine-grained enough for 15+ minute sessions and a day countdown without wasted work
const NOW_TICK_MS = 30_000;

// WHY: Lets organisers preview live views before the conference, e.g. ?previewTime=2026-12-04T11:40 (India time)
export const PREVIEW_PARAM = "previewTime";

/** Subscribe function for useSyncExternalStore: ticks every NOW_TICK_MS. */
export const subscribeClock = (onChange: () => void) => {
  const id = setInterval(onChange, NOW_TICK_MS);
  return () => clearInterval(id);
};

/** Current conference-local time as "YYYY-MM-DDTHH:MM" (a string, so the snapshot only changes once a minute). */
export function readConferenceNow(): string {
  const preview = new URLSearchParams(window.location.search).get(PREVIEW_PARAM);
  if (preview && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(preview)) return preview;
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: PROGRAM_TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return `${part("year")}-${part("month")}-${part("day")}T${part("hour")}:${part("minute")}`;
}

// WHY: null on the server so static HTML never depends on the build machine's clock; the client fills it in after hydration
export const getServerNow = (): string | null => null;

/** Whole days from one "YYYY-MM-DD" date to another (calendar days, no time-of-day or DST effects). */
export function daysBetween(fromIsoDate: string, toIsoDate: string): number {
  // WHY: Date.UTC on both sides keeps this a pure calendar difference regardless of the viewer's own timezone
  const toUtc = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((toUtc(toIsoDate) - toUtc(fromIsoDate)) / 86_400_000);
}
