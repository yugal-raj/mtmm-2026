"use client";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin, Mic2, Navigation } from "lucide-react";
import { program, PROGRAM_VENUE } from "@/data/program";
import { daysBetween, getServerNow, readConferenceNow, subscribeClock } from "@/lib/conferenceTime";

const slides = [
  // WHY: position "50% 30%" anchors the crop towards the top so the Himalayan peaks behind the bridge stay in frame
  { src: "/images/koliabhumora.jpg", caption: "Kolia Bhomora Setu over the Brahmaputra, Tezpur", position: "50% 30%" },
  { src: "/images/tu_bird_eye_view.jpg", caption: "Tezpur University campus", position: "50% 50%" },
  { src: "/images/department.png", caption: "Department of Chemical Sciences", position: "50% 50%" },
];

// WHY: 6s gives time to read the hero text before the background changes; 4s (the old value) felt rushed with text on top
const SLIDE_INTERVAL_MS = 6000;
// WHY: After a manual change, wait a full extra interval before auto-play resumes so it doesn't jump straight away
const RESUME_AFTER_MS = 8000;

const FIRST_DAY = program[0].isoDate;
const LAST_DAY = program[program.length - 1].isoDate;

type Status =
  | { kind: "upcoming"; days: number }
  | { kind: "live"; dayNumber: number }
  | { kind: "over" };

function conferenceStatus(nowKey: string): Status {
  const today = nowKey.slice(0, 10);
  const untilStart = daysBetween(today, FIRST_DAY);
  if (untilStart > 0) return { kind: "upcoming", days: untilStart };
  if (daysBetween(today, LAST_DAY) >= 0) return { kind: "live", dayNumber: daysBetween(FIRST_DAY, today) + 1 };
  return { kind: "over" };
}

function StatusPill({ status }: { status: Status | null }) {
  // WHY: Reserves the pill's height before the client clock is known, so the hero text doesn't jump after hydration
  if (!status) return <span className="block h-8" aria-hidden="true" />;
  const label =
    status.kind === "upcoming"
      ? status.days === 1 ? "Starts tomorrow" : `Starts in ${status.days} days`
      : status.kind === "live"
        ? `Live now · Day ${status.dayNumber} of ${program.length}`
        : "Thank you for joining MTMM 2026";
  return (
    <span className="inline-flex h-8 items-center gap-2 rounded-full bg-white/15 px-3.5 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur">
      {status.kind !== "over" && (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          {status.kind === "live" && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75 motion-reduce:animate-none" />
          )}
          <span className={`relative inline-flex h-2 w-2 rounded-full ${status.kind === "live" ? "bg-emerald-300" : "bg-[#b5dcff]"}`} />
        </span>
      )}
      {label}
    </span>
  );
}

export default function HomepageHero() {
  const nowKey = useSyncExternalStore(subscribeClock, readConferenceNow, getServerNow);
  const status = nowKey ? conferenceStatus(nowKey) : null;

  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  // WHY: The hidden slides are only added after the first photo has loaded, so on slow mobile connections the
  // visible photo gets the full bandwidth instead of sharing it with two photos nobody can see yet
  const [firstSlideLoaded, setFirstSlideLoaded] = useState(false);
  const pausedUntil = useRef(0);

  // Auto-advance; paused while hovered, while the tab is hidden, briefly after manual navigation, and for reduced motion
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (hovered || document.hidden || Date.now() < pausedUntil.current) return;
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [hovered]);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
    pausedUntil.current = Date.now() + RESUME_AFTER_MS;
  }, []);

  const primaryCta =
    status?.kind === "live"
      ? { href: "/program", label: "See what's on now" }
      : { href: "/program", label: "View Programme" };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="MTMM 2026 at a glance"
      className="relative w-[92vw] sm:w-[80vw] max-w-[1280px] mx-auto overflow-hidden rounded-2xl shadow-lg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Background slides — crossfade (all stacked, only the current one visible) */}
      {/* WHY: Tall enough (up to 640px / 75% of the screen) to show the mountains and the bridge in the photo, not just a strip of it */}
      <div className="relative h-[480px] sm:h-[540px] lg:h-[min(75vh,640px)] min-h-[460px]">
        {slides.map((slide, index) => (index === 0 || index === current || firstSlideLoaded) && (
          <Image
            key={slide.src}
            src={slide.src}
            alt=""
            fill
            priority={index === 0}
            onLoad={index === 0 ? () => setFirstSlideLoaded(true) : undefined}
            quality={90}
            // WHY: Hero spans 92vw on phones and 80vw (max 1280px) above; lets Next serve a right-sized file instead of the 3000px original
            sizes="(min-width: 1600px) 1280px, (min-width: 640px) 80vw, 92vw"
            style={{ objectPosition: slide.position }}
            className={`object-cover transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* WHY: Shade only the lower part behind the text (fades out by 60% height) plus a light left wash, so the
            photo stays clear and bright while white text remains readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3f]/85 via-[#0b1f3f]/40 via-30% to-transparent to-60%" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1f3f]/30 to-transparent to-55%" aria-hidden="true" />

        {/* Hero content */}
        <div className="absolute inset-x-0 bottom-0 p-5 pb-14 sm:p-8 sm:pb-16 lg:p-12 lg:pb-16">
          <StatusPill status={status} />
          <h2 className="mt-4 text-[26px] leading-tight min-[400px]:text-[30px] sm:text-[40px] lg:text-[48px] font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
            2–5 December 2026
          </h2>
          <p className="mt-2 flex items-start gap-2 text-[15px] sm:text-lg text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <span>{PROGRAM_VENUE}, Assam, India</span>
          </p>

          {/* WHY: On phones the main button spans the row and the two secondary buttons share the next row (compact, clear priority) */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
            <Link
              href={primaryCta.href}
              className="col-span-2 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-[#133f80] shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#eaf3fe] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
            >
              <CalendarDays className="h-5 w-5" aria-hidden="true" />
              {primaryCta.label}
            </Link>
            <Link
              href="/speakers"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-3 sm:px-5 py-2.5 text-[15px] sm:text-base font-semibold text-white ring-1 ring-white/40 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
            >
              <Mic2 className="h-5 w-5" aria-hidden="true" />
              Speakers
            </Link>
            <Link
              href="/contact#venue"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/15 px-3 sm:px-5 py-2.5 text-[15px] sm:text-base font-semibold text-white ring-1 ring-white/40 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/25 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
            >
              <Navigation className="h-5 w-5" aria-hidden="true" />
              {/* WHY: Shorter label on phones so it fits its half-width button on a 360px screen without wrapping */}
              <span className="sm:hidden">Venue</span>
              <span className="hidden sm:inline">Venue &amp; Travel</span>
            </Link>
          </div>
        </div>

        {/* Slide controls: caption + dots bottom-right, small round arrows */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-5 pb-4 sm:px-8 lg:px-12">
          <p className="min-w-0 truncate text-xs text-white/75" aria-live="polite">
            {slides[current].caption}
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Previous photo"
              title="Previous photo"
              className="cursor-pointer hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/30"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-1.5" role="group" aria-label="Choose photo">
              {slides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Photo ${index + 1}: ${slide.caption}`}
                  aria-current={index === current || undefined}
                  // WHY: 24px tap target around a small visible dot (touch-friendly without looking heavy)
                  className="cursor-pointer group inline-flex h-6 items-center justify-center px-0.5"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      index === current ? "w-6 bg-white" : "w-1.5 bg-white/50 group-hover:bg-white/80"
                    }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Next photo"
              title="Next photo"
              className="cursor-pointer hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/30"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
