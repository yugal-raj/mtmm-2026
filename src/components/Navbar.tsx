"use client";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import HeaderLogo from "@/components/HeaderLogo"
import HeaderLogoMobile from "@/components/HeaderLogoMobile"
import { usePathname, useRouter} from "next/navigation";

const navBarArray = [
  { text: "Home", route: "/" },
  { text: "About", route: "/about" },
  { text: "Important Dates", route: "/importantDates" },
  { text: "Registration", route: "/registration" },
  { text: "Accommodation", route: "/accommodation" },
  { text: "Speakers", route: "/speakers" },
  { text: "Sponsors", route: "/sponsors" },
  { text: "Committees", route: "/committees" },
  { text: "Program", route: "/program" },
  { text: "Contact", route: "/contact" }
];

const BRAND_LOGO = "/images/mtmml7.png";
const BRAND_NAME = "MTMM 2026";

// WHY: Inactive text is neutral slate (#1e293b), not blue — dark blue on the blue bar "vibrates" and tires the eyes;
// slate is ~7:1 on #82b9e7. Only the active tab keeps the deep blue so it stands out.
const NAV_TEXT = "text-[#1e293b]";

// WHY: #133f80 is a deeper shade of the brand blue — #2364b7 itself is only ~2.7:1 on the #82b9e7 bar, #133f80 is ~4.9:1 (WCAG AA)
const ACTIVE_BLUE = "#133f80";

// WHY: 1024px (Tailwind `lg`) is the narrowest width where all 10 links fit on one row once text/padding shrink
// (15px text, 4px padding below 1180px). Must match the `lg:` classes below.
const DESKTOP_MIN_WIDTH = 1024;

// WHY: Gap needed between the pinned brand and the first link before the brand is shown (keeps it from crowding the links)
const BRAND_CLEARANCE = 16;

// Mobile menu links — in a vertical list a highlighted row reads better than an underline, so the active page gets a white background
const linkClass = (isActive: boolean) =>
  `rounded-xl px-4 py-2.5 text-[17px] transition-colors duration-200 ${
    isActive
      ? "font-bold bg-white text-[#2364b7] shadow-sm"
      : `font-medium ${NAV_TEXT} hover:bg-white/40`
  }`;

// Desktop links: the active underline comes from the sliding indicator below; the active label is bold.
// WHY: The ::after holds an invisible bold copy of the label (from data-text) so every link is always as wide as its
// bold version — switching tabs makes text bold without nudging the neighbouring links sideways.
// WHY: Three size steps (1024 / 1180 / 1280px) so the full menu fits from small laptops and iPad landscape upwards.
const desktopLinkClass = (isActive: boolean) =>
  `relative inline-flex flex-col items-center py-2 transition-colors duration-300 ` +
  `text-[15px] px-1 min-[1180px]:text-[16px] min-[1180px]:px-2 xl:px-2.5 ` +
  `after:content-[attr(data-text)] after:h-0 after:overflow-hidden after:invisible after:select-none after:font-bold ` +
  (isActive
    ? "font-bold text-[#133f80]"
    : `font-medium ${NAV_TEXT} hover:text-[#133f80] ` +
      // Faint hover underline (inactive tabs only): same position/thickness as the active bar, grows from the centre.
      // Insets mirror the link padding at each size step so it spans the text like the active underline.
      "before:content-[''] before:absolute before:bottom-0 before:left-1 before:right-1 " +
      "min-[1180px]:before:left-2 min-[1180px]:before:right-2 xl:before:left-2.5 xl:before:right-2.5 " +
      "before:h-[3px] before:rounded-full before:bg-[#133f80]/30 before:scale-x-0 before:transition-transform before:duration-300 " +
      "hover:before:scale-x-100 focus-visible:before:scale-x-100 motion-reduce:before:transition-none");

type BrandMode = "full" | "icon" | "none";

export default function Navbar() {
  const [isDesktopHeader, setIsDesktopHeader] = useState(false);
  const [pinned, setPinned] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  // WHY: The menu is "open for a path" — navigating anywhere (link, browser Back/Forward) closes it automatically
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathName;
  const closeMenu = useCallback(() => setOpenForPath(null), []);

  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  // WHY: Publishes the sticky navbar's live height as --nav-h so other sticky bars (e.g. the Program day switcher)
  // can sit directly beneath it; the height differs between desktop/mobile and when the mobile menu is open.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const publish = () => document.documentElement.style.setProperty("--nav-h", `${nav.offsetHeight}px`);
    publish();
    const observer = new ResizeObserver(publish);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  // Sliding active-tab underline (desktop)
  // WHY: The underline's position is written straight to the DOM via a ref (not React state) — it's pure layout
  // measurement, so this avoids extra re-renders on every resize/navigation.
  const linksRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const linkEls = useRef(new Map<string, HTMLAnchorElement>());

  const placeIndicator = useCallback((animate: boolean) => {
    const bar = indicatorRef.current;
    const el = linkEls.current.get(pathName);
    if (!bar) return;
    if (!el || el.offsetWidth === 0) {
      bar.style.opacity = "0"; // no matching tab (e.g. 404) or desktop menu hidden
      return;
    }
    // WHY: Resizes snap instead of animating so the underline never lags behind wrapping links
    bar.style.transitionDuration = animate ? "" : "0ms";
    // Inset by the link's own horizontal padding so the underline spans the text, not the padding
    const padLeft = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const padRight = parseFloat(getComputedStyle(el).paddingRight) || 0;
    bar.style.left = `${el.offsetLeft + padLeft}px`;
    bar.style.width = `${el.offsetWidth - padLeft - padRight}px`;
    // Sits on the bottom edge of the link (inside its bottom padding), so it follows links onto a second row if they wrap
    bar.style.top = `${el.offsetTop + el.offsetHeight - 3}px`;
    bar.style.opacity = "1";
  }, [pathName]);

  // WHY: Layout effect so the underline moves before paint. First placement (page load) snaps; later route changes slide.
  const hasPlaced = useRef(false);
  useLayoutEffect(() => {
    placeIndicator(hasPlaced.current);
    hasPlaced.current = true;
  }, [placeIndicator]);

  // Desktop brand: shown only in the free space left of the links, so it can never overlap them
  const brandFullRef = useRef<HTMLSpanElement>(null);
  const [brandMode, setBrandMode] = useState<BrandMode>("none");

  // Re-measure when the link row or the bar changes size (window resize, font load, wrapping)
  useEffect(() => {
    const container = linksRef.current;
    const nav = navRef.current;
    if (!container || !nav) return;
    const measure = () => {
      placeIndicator(false);
      const freeLeft = container.getBoundingClientRect().left - nav.getBoundingClientRect().left;
      const fullWidth = brandFullRef.current?.scrollWidth ?? 0;
      // WHY: 16px page gutter + logo (40px) is the minimum for the icon-only brand
      const iconWidth = 16 + 40;
      setBrandMode(
        freeLeft >= 16 + fullWidth + BRAND_CLEARANCE ? "full" : freeLeft >= iconWidth + BRAND_CLEARANCE ? "icon" : "none"
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [placeIndicator]);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    const mqHeader = window.matchMedia("(min-width: 768px)");

    const handler = () => {
        setIsDesktopHeader(mqHeader.matches);
        if (mq.matches) setOpenForPath(null);
    };
    handler(); // initial

    mq.addEventListener("change", handler);
    mqHeader.addEventListener("change", handler);
    return () => {
      mq.removeEventListener("change", handler);
      mqHeader.removeEventListener("change", handler);
    };
  }, []);

  // "Pinned" = the header has scrolled away and the bar is stuck to the top of the screen
  useEffect(() => {
    const onScroll = () => {
      const nav = navRef.current;
      setPinned(!!nav && window.scrollY > 0 && nav.getBoundingClientRect().top <= 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Mobile menu behaviour: keep the collapsed menu out of the tab order, move focus in on open,
  // close on Escape (focus back to the button) and on any tap/click outside the navbar.
  useEffect(() => {
    // WHY: Set via the DOM because the project's React 18 type definitions don't include the `inert` attribute
    if (mobileMenuRef.current) mobileMenuRef.current.inert = !open;
    if (!open) return;

    firstMobileLinkRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, closeMenu]);

  const pageName = navBarArray.find((nav) => nav.route === pathName)?.text ?? "Menu";
  const showDesktopBrand = pinned && brandMode !== "none";
  // WHY: Below ~1366px there is no free space beside the links, so once pinned the "Home" tab itself becomes the logo.
  // The Home link always reserves the width of its bold label (wider than the 29px logo), so swapping never resizes the row.
  const logoAsHome = pinned && brandMode === "none";

  return (
    <>
      {isDesktopHeader ? <HeaderLogo /> : <HeaderLogoMobile />}
      {/* WHY: Rendered as a sibling of the header (fragment, not a wrapper) so `sticky` can follow the whole page scroll */}
      <nav
        ref={navRef}
        aria-label="Main"
        className={`sticky top-0 z-40 bg-[#82b9e7]/95 backdrop-blur border-b border-white/40 transition-shadow duration-300 ${
          pinned ? "shadow-md" : ""
        }`}
      >
        {/* Desktop brand — fades in once the header has scrolled away (only where there is room beside the links) */}
        <Link
          href="/"
          aria-label={`${BRAND_NAME} home`}
          aria-hidden={!showDesktopBrand || undefined}
          tabIndex={showDesktopBrand ? undefined : -1}
          className={`hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 items-center gap-2 transition-all duration-300 motion-reduce:transition-none ${
            showDesktopBrand ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"
          }`}
        >
          <Image src={BRAND_LOGO} alt="" width={40} height={33} className="h-[33px] w-10 object-contain" />
          <span
            ref={brandFullRef}
            className={`whitespace-nowrap text-[15px] font-bold tracking-wide text-[#133f80] ${brandMode === "full" ? "" : "invisible absolute"}`}
          >
            {BRAND_NAME}
          </span>
        </Link>

        {/* Desktop Menu — WHY: CSS breakpoint (not JS) so the right menu renders on first paint without a flash */}
        <div className="hidden lg:flex max-w-7xl mx-auto px-4 xl:px-6 py-3 items-center justify-center">
          <div ref={linksRef} className="relative flex flex-wrap justify-center gap-x-0.5 min-[1180px]:gap-x-1 xl:gap-x-2 gap-y-2">
            {/* Sliding underline under the active tab — WHY: 400ms with a slight overshoot gives a gentle settle without feeling slow */}
            <span
              ref={indicatorRef}
              aria-hidden="true"
              className="pointer-events-none absolute h-[3px] rounded-full opacity-0 transition-[left,top,width,opacity] duration-[400ms] ease-[cubic-bezier(0.34,1.3,0.64,1)] motion-reduce:transition-none"
              style={{ backgroundColor: ACTIVE_BLUE }}
            />
            {navBarArray.map((nav) => {
              const isActive = pathName === nav.route;
              return (
                <Link
                  key={nav.text}
                  ref={(el) => {
                    if (el) linkEls.current.set(nav.route, el);
                    else linkEls.current.delete(nav.route);
                  }}
                  href={nav.route}
                  prefetch
                  onMouseEnter={() => router.prefetch(nav.route)}
                  aria-current={isActive ? "page" : undefined}
                  data-text={nav.text}
                  title={nav.route === "/" && logoAsHome ? `${BRAND_NAME} — Home` : undefined}
                  className={desktopLinkClass(isActive)}
                >
                  {nav.route === "/" && logoAsHome ? (
                    <>
                      {/* WHY: 1.5em = exactly one line of link text at every size step, so the bar height doesn't change on pin */}
                      <Image src={BRAND_LOGO} alt="" width={29} height={24} className="h-[1.5em] w-auto object-contain" />
                      <span className="sr-only">Home</span>
                    </>
                  ) : (
                    nav.text
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile bar: brand fades in above the page name once pinned; menu button on the right */}
        <div className="lg:hidden max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${BRAND_NAME} home — current page: ${pageName}`}>
            <Image
              src={BRAND_LOGO}
              alt=""
              width={40}
              height={33}
              className={`h-[33px] object-contain transition-all duration-300 motion-reduce:transition-none ${
                pinned ? "w-10 opacity-100" : "w-0 opacity-0"
              }`}
            />
            {/* WHY: Fixed 40px-tall stack so the bar height (and --nav-h) doesn't change when the brand line appears */}
            <span className="flex h-10 min-w-0 flex-col justify-center">
              <span
                className={`overflow-hidden text-[11px] font-bold uppercase leading-4 tracking-wider text-[#133f80] transition-all duration-300 motion-reduce:transition-none ${
                  pinned ? "max-h-4 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {BRAND_NAME}
              </span>
              <span className={`truncate text-[17px] font-semibold leading-6 ${NAV_TEXT}`}>{pageName}</span>
            </span>
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpenForPath(open ? null : pathName)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            title={open ? "Close menu" : "Open menu"}
            className="cursor-pointer inline-flex shrink-0 items-center justify-center rounded-full bg-white/60 p-2 text-[#2364b7] shadow-sm transition-colors hover:bg-white"
          >
            {open ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Dropdown — WHY: always rendered and animated with grid rows (0fr ↔ 1fr) so it slides open/closed */}
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className={`max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-white/40 px-4 pt-3 pb-4 transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {navBarArray.map((nav, index) => {
                  const isActive = pathName === nav.route;
                  return (
                    <Link
                      key={nav.text}
                      ref={index === 0 ? firstMobileLinkRef : undefined}
                      href={nav.route}
                      onClick={closeMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={linkClass(isActive)}
                    >
                      {nav.text}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
