"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import AboutCollageHeader from "./CollageHeader";
import { program, PROGRAM_PDF_URL, PROGRAM_VENUE, isTalk, type ProgramItem } from "@/data/program";
import { getServerNow, readConferenceNow, subscribeClock } from "@/lib/conferenceTime";
import { speakers } from "@/data/speakers";

// WHY: Same brand blue used by every section heading on the site
const BRAND_BLUE = "#2364b7";

// WHY: The year is already in the page heading, so day labels drop it to stay on one line
const dateWithoutYear = (date: string) => date.replace(/\s\d{4}$/, "");
// WHY: "Wednesday, 2 December 2026" → "Wed, 2 Dec" so the phone dropdown fits next to the "Now" button on a 360px screen
const shortDate = (date: string) => dateWithoutYear(date).replace(/^(\w{3})\w*/, "$1").replace(/(\d+ \w{3})\w*$/, "$1");

type Speaker = (typeof speakers)[number];

// WHY: Lower-case, accent-free, no dots/spaces so "Prof. S. Ramasesha" matches "S. Ramasesha" and "Clérac" matches "Clerac"
const nameKey = (name: string) =>
  name.replace(/^(Prof|Dr)\.\s*/, "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().replace(/[.\s]/g, "");

// WHY: The schedule PDF spells these names differently from the Speakers page (middle initials vs full names)
const NAME_ALIASES: Record<string, string> = {
  "Grace G. Morgan": "Grace Morgan",
  "David J. R. Brook": "David Brook",
  "Sandeep K. Gupta": "Sandeep Kumar Gupta",
  "Pradip K. Chakraborty": "Pradip Kumar Chakraborty",
};

const speakerByKey = new Map(speakers.map((s) => [nameKey(s.name), s]));

function findSpeaker(programName: string): Speaker | undefined {
  const bare = programName.replace(/^(Prof|Dr)\.\s*/, "");
  return speakerByKey.get(nameKey(NAME_ALIASES[bare] ?? bare));
}

const initials = (name: string) =>
  name.replace(/^(Prof|Dr)\.\s*/, "").split(/\s+/).filter((w) => /^[A-Z]/.test(w) && !w.endsWith(".")).map((w) => w[0]).slice(0, 2).join("");

// WHY: 0.35 shrinks the Speakers page's 160x192 portrait frame to 56x67; scaling the whole frame (not re-cropping) keeps every speaker's hand-tuned position/zoom
const AVATAR_SCALE = 0.35;

function SpeakerAvatar({ name }: { name: string }) {
  const speaker = findSpeaker(name);
  const frameStyle = { width: 160 * AVATAR_SCALE, height: 192 * AVATAR_SCALE };

  if (!speaker) {
    return (
      <div
        className="shrink-0 rounded-full bg-[#cbe1fc] ring-2 ring-[#dcebfd] flex items-center justify-center font-bold text-[#2364b7]"
        style={frameStyle}
        aria-hidden="true"
      >
        {initials(name)}
      </div>
    );
  }

  return (
    <div className="shrink-0 rounded-full overflow-hidden bg-white ring-2 ring-[#cbe1fc] shadow-sm" style={frameStyle}>
      <div className="w-40 h-48 origin-top-left" style={{ transform: `scale(${AVATAR_SCALE})` }}>
        <Image
          src={speaker.photo}
          alt={`Portrait of ${speaker.name}`}
          width={160}
          height={192}
          className="w-full h-full object-cover"
          style={{ objectPosition: speaker.position ?? "50% 35%", transform: `scale(${speaker.zoom ?? 1.05})` }}
        />
      </div>
    </div>
  );
}

/* ---------- Live "now" support ---------- */

// WHY: "20:00 onwards" (dinner) has no end time; treat open-ended items as lasting 2 hours
const OPEN_ENDED_MINUTES = 120;

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

function itemRange(time: string) {
  const match = time.match(/(\d{1,2}:\d{2})\s*(?:[–-]\s*(\d{1,2}:\d{2}))?/);
  if (!match) return null;
  const start = toMinutes(match[1]);
  return { start, end: match[2] ? toMinutes(match[2]) : start + OPEN_ENDED_MINUTES };
}

type LiveStatus = "now" | "next";
type LiveItem = { sessionIndex: number; itemIndex: number; status: LiveStatus };

/** The item happening right now on the given day, or else the next one to start (null once the day is over). */
function findLiveItem(dayIndex: number, minutesNow: number): LiveItem | null {
  let next: LiveItem | null = null;
  let nextStart = Infinity;
  program[dayIndex].sessions.forEach((session, sessionIndex) =>
    session.items.forEach((item, itemIndex) => {
      const range = itemRange(item.time);
      if (!range) return;
      if (range.start <= minutesNow && minutesNow < range.end && (!next || next.status !== "now")) {
        next = { sessionIndex, itemIndex, status: "now" };
        nextStart = -Infinity;
      } else if (range.start > minutesNow && range.start < nextStart) {
        next = { sessionIndex, itemIndex, status: "next" };
        nextStart = range.start;
      }
    })
  );
  return next;
}

const itemDomId = (dayIndex: number, sessionIndex: number, itemIndex: number) =>
  `program-item-${dayIndex}-${sessionIndex}-${itemIndex}`;

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ItemRow({ item, id, live }: { item: ProgramItem; id: string; live?: LiveStatus }) {
  // WHY: All speaker rows share one white background; only breaks and events are tinted — the live row overrides both
  const rowClass =
    live === "now" ? "bg-[#eaf3fe]" : item.kind === "break" ? "bg-gray-100" : item.kind === "event" ? "bg-blue-50" : "bg-white";
  // WHY: Accent bar drawn as an inset shadow on whichever cell is first visible (time cell on desktop, content cell on phones).
  // Class names are written out in full because Tailwind cannot see classes assembled from variables.
  const isNow = live === "now";

  return (
    <tr
      id={id}
      className={`${rowClass} border-t border-gray-200 align-top`}
      // WHY: Keeps "Jump to now" targets clear of the sticky navbar + day switcher
      style={{ scrollMarginTop: "calc(var(--nav-h, 0px) + var(--day-switcher-h, 0px) + 12px)" }}
    >
      {/* WHY: On phones the time moves into the content cell (below) so photo + talk text get the full row width */}
      <td className={`hidden sm:table-cell px-4 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap ${isNow ? "sm:shadow-[inset_4px_0_0_#2364b7]" : ""}`}>
        {item.time}
        {live && <LiveBadge status={live} className="mt-1.5" />}
      </td>
      <td className={`px-3 sm:px-4 py-3 text-sm text-gray-800 ${isNow ? "max-sm:shadow-[inset_4px_0_0_#2364b7]" : ""}`}>
        <p className="sm:hidden pb-1.5 text-xs font-bold tracking-wide text-[#2364b7] flex items-center gap-2">
          {item.time}
          {live && <LiveBadge status={live} />}
        </p>
        {isTalk(item) ? (
          <div className="flex items-start gap-3 sm:gap-4">
            <SpeakerAvatar name={item.speaker} />
            <div className="min-w-0">
              <p className="font-semibold text-gray-900">{item.speaker}</p>
              <p className="text-gray-600">{item.affiliation}</p>
              <p className="italic pt-1" style={{ color: BRAND_BLUE }}>{item.title}</p>
            </div>
          </div>
        ) : (
          <p className="font-semibold text-gray-800">
            {item.label}
            {item.note && <span className="font-normal text-gray-600"> ({item.note})</span>}
          </p>
        )}
      </td>
    </tr>
  );
}

function LiveBadge({ status, className = "" }: { status: LiveStatus; className?: string }) {
  if (status === "now") {
    return (
      <span className={`flex w-fit items-center gap-1.5 rounded-full bg-[#2364b7] px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white ${className}`}>
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        Now
      </span>
    );
  }
  return (
    <span className={`flex w-fit items-center rounded-full border border-[#2364b7] bg-white px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-[#2364b7] ${className}`}>
      Up next
    </span>
  );
}

export default function Program() {
  const nowKey = useSyncExternalStore(subscribeClock, readConferenceNow, getServerNow);
  const todayIndex = nowKey ? program.findIndex((d) => d.isoDate === nowKey.slice(0, 10)) : -1;
  const minutesNow = nowKey ? toMinutes(nowKey.slice(11, 16)) : 0;

  // WHY: null = "not chosen yet" — during the conference the page then opens on today's tab, otherwise on Day 1
  const [chosenDay, setChosenDay] = useState<number | null>(null);
  const activeDay = chosenDay ?? (todayIndex >= 0 ? todayIndex : 0);
  const day = program[activeDay];
  const liveItem = todayIndex >= 0 ? findLiveItem(todayIndex, minutesNow) : null;

  // Sticky day switcher: measure its height for scroll offsets, and tint it once it is pinned
  const sectionRef = useRef<HTMLDivElement>(null);
  const switcherRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const switcher = switcherRef.current;
    const section = sectionRef.current;
    if (!switcher || !section) return;
    const publish = () => section.style.setProperty("--day-switcher-h", `${switcher.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(switcher);
    const onScroll = () => {
      const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
      setStuck(switcher.getBoundingClientRect().top <= navHeight + 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // A "Jump to now" on another day's tab waits for that tab to render before scrolling
  const pendingJump = useRef<string | null>(null);
  useEffect(() => {
    if (!pendingJump.current) return;
    document.getElementById(pendingJump.current)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    pendingJump.current = null;
  }, [activeDay]);

  const selectDay = (index: number) => {
    setChosenDay(index);
    // WHY: If the reader has scrolled into the schedule, bring them back to the top of the newly selected day
    const panel = panelRef.current;
    const switcher = switcherRef.current;
    if (!panel || !switcher) return;
    const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 0;
    const target = panel.getBoundingClientRect().top + window.scrollY - navHeight - switcher.offsetHeight - 12;
    if (window.scrollY > target) {
      window.scrollTo({ top: target, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };

  const jumpToNow = () => {
    if (!liveItem || todayIndex < 0) return;
    const id = itemDomId(todayIndex, liveItem.sessionIndex, liveItem.itemIndex);
    if (activeDay !== todayIndex) {
      pendingJump.current = id;
      setChosenDay(todayIndex);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
  };

  const liveLabel = liveItem
    ? liveItem.status === "now"
      ? "Jump to now"
      : `Up next · ${program[todayIndex].sessions[liveItem.sessionIndex].items[liveItem.itemIndex].time.slice(0, 5)}`
    : null;

  const jumpButton = liveLabel && (
    <button
      type="button"
      onClick={jumpToNow}
      title="Scroll to the session happening now"
      className="cursor-pointer inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#2364b7] px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1b4f91]"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      {liveLabel}
    </button>
  );

  return (
    <section className="relative flex flex-col justify-center">
      <div className="w-full flex items-center justify-center">
        <AboutCollageHeader />
      </div>
      <div className="w-full flex items-center justify-center pt-15">
        <div ref={sectionRef} className="w-[90vw] sm:w-[80vw] pb-10" style={{ maxWidth: "1280px" }}>
          <h2 className="text-[30px] font-bold text-center" style={{ color: BRAND_BLUE }}>
            Programme Schedule
          </h2>
          <p className="text-center text-gray-700 pt-2">
            2–5 December 2026 · Venue: {PROGRAM_VENUE}
          </p>

          <div className="flex justify-center pt-5">
            <a
              href={PROGRAM_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full border-2 text-[15px] sm:text-base whitespace-nowrap font-semibold bg-white hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5"
              style={{ color: BRAND_BLUE, borderColor: BRAND_BLUE }}
            >
              <svg aria-hidden="true" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14" />
              </svg>
              Download Programme (PDF)
            </a>
          </div>

          {/* Day switcher — WHY: sticky under the navbar so the day can be changed from anywhere in a long schedule */}
          <div
            ref={switcherRef}
            className={`sticky z-30 mt-8 -mx-2 px-2 py-3 transition-[background-color,box-shadow] duration-300 ${
              stuck ? "bg-white/95 backdrop-blur shadow-[0_6px_12px_-8px_rgba(15,23,42,0.25)]" : "bg-transparent"
            }`}
            style={{ top: "var(--nav-h, 0px)" }}
          >
            {/* WHY: On phones a dropdown replaces the 2x2 tab grid, which pushed the schedule far down the screen */}
            <div className="sm:hidden flex items-center gap-2">
              <div className="relative flex-1 min-w-0">
                <select
                  id="program-day-select"
                  aria-label="Select day"
                  value={activeDay}
                  onChange={(e) => selectDay(Number(e.target.value))}
                  className="w-full cursor-pointer appearance-none rounded-lg border-2 bg-white px-3 py-2.5 pr-9 text-[15px] font-semibold"
                  style={{ borderColor: BRAND_BLUE, color: BRAND_BLUE }}
                >
                  {program.map((d, index) => (
                    <option key={d.day} value={index}>
                      {d.day} · {shortDate(d.date)}{index === todayIndex ? " · Today" : ""}
                    </option>
                  ))}
                </select>
                <svg aria-hidden="true" className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5" fill="none" stroke={BRAND_BLUE} strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                </svg>
              </div>
              {liveItem && (
                <button
                  type="button"
                  onClick={jumpToNow}
                  aria-label={liveLabel ?? undefined}
                  title={liveLabel ?? undefined}
                  // WHY: Icon-only on phones so the day dropdown keeps room for "Day 3 · Fri, 4 Dec · Today" on a 360px screen
                  className="cursor-pointer inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2364b7] text-white shadow-sm"
                >
                  {liveItem.status === "now" ? (
                    <span className="relative flex h-3 w-3" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
                    </span>
                  ) : (
                    <Clock className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-3">
              <div role="tablist" aria-label="Conference days" className="grid flex-1 grid-cols-4 gap-2">
                {program.map((d, index) => {
                  const selected = index === activeDay;
                  return (
                    <button
                      key={d.day}
                      role="tab"
                      id={`program-tab-${index}`}
                      aria-selected={selected}
                      aria-controls="program-panel"
                      onClick={() => selectDay(index)}
                      className="cursor-pointer rounded-lg border-2 px-3 py-2 text-center transition-colors"
                      style={
                        selected
                          ? { backgroundColor: BRAND_BLUE, borderColor: BRAND_BLUE, color: "white" }
                          : { borderColor: BRAND_BLUE, color: BRAND_BLUE, backgroundColor: "white" }
                      }
                    >
                      <span className="flex items-center justify-center gap-1.5 font-bold">
                        {d.day}
                        {index === todayIndex && (
                          <span className={`rounded-full px-1.5 py-px text-[10px] font-bold uppercase tracking-wide ${selected ? "bg-white text-[#2364b7]" : "bg-[#2364b7] text-white"}`}>
                            Today
                          </span>
                        )}
                      </span>
                      <span className="block text-xs">{dateWithoutYear(d.date)}</span>
                    </button>
                  );
                })}
              </div>
              {jumpButton}
            </div>
          </div>

          <div ref={panelRef} id="program-panel" role="tabpanel" aria-labelledby={`program-tab-${activeDay}`} className="pt-4 flex flex-col gap-6">
            {day.sessions.map((session, sessionIndex) => (
              <div key={session.name} className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                <table className="w-full sm:table-fixed">
                  {/* WHY: Fixed time-column width keeps speaker names aligned across every session table */}
                  <colgroup>
                    <col className="hidden sm:table-column w-[9rem]" />
                    <col />
                  </colgroup>
                  <thead style={{ backgroundColor: "#b5dcff" }}>
                    <tr>
                      <th colSpan={2} className="px-4 py-2.5 text-center text-sm font-bold uppercase tracking-wide text-gray-800">
                        {session.name}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {session.items.map((item, i) => (
                      <ItemRow
                        key={`${item.time}-${i}`}
                        item={item}
                        id={itemDomId(activeDay, sessionIndex, i)}
                        live={
                          activeDay === todayIndex && liveItem?.sessionIndex === sessionIndex && liveItem.itemIndex === i
                            ? liveItem.status
                            : undefined
                        }
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
