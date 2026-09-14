"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import HeaderLogo from "@/components/HeaderLogo"
import HeaderLogoMobile from "@/components/HeaderLogoMobile"
import { usePathname, useRouter} from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isDesktopHeader, setIsDesktopHeader] = useState(false);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1020px)");
    const mqHeader = window.matchMedia("(min-width: 768px)");

    const handler = () => {
        setIsDesktop(mq.matches);
        setIsDesktopHeader(mqHeader.matches);
        if (mq.matches) setOpen(false);
    };
    handler(); // initial

    mq.addEventListener("change", handler);
    mqHeader.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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

  return (
    <section>
        {isDesktopHeader ? <HeaderLogo /> : <HeaderLogoMobile />}
    <nav className="bg-[#82b9e7]">
      {isDesktop && <div className="max-w-7xl mx-auto px-4 xl:px-6 py-5 flex items-center justify-center">

        {/* Desktop Menu */}
        {/* WHY: 18px links need tighter spacing (gap-x-4, px-4) below 1280px so all 10 fit on one row at the 1020px breakpoint; flex-wrap is a safety net against overflow */}
        <div className="flex flex-wrap justify-center gap-x-4 xl:gap-x-6 gap-y-2">
          {navBarArray.map((nav) => {
            const isActive = pathName === nav.route;
            return (<Link
              key={nav.text}
              href={nav.route}
              prefetch
              onMouseEnter={() => router.prefetch(nav.route)}
              className={`text-[18px] font-medium transition ${isActive? "text-[#1e2ac0]" : "text-[#1e2ac0] hover:text-white"}`}
              style={{
                 textDecoration: isActive ? "underline" : "none"
                }}
            >
              {nav.text}
            </Link>)
        })}
        </div>
      </div>
      }
    
      {/* Mobile Menu Button */}
      {!isDesktop && <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <button
          className="text-[#1e2ac0]"
          onClick={() => setOpen(!open)}
          style={{
            fontSize:"30px"
          }}
        >
          ☰
        </button>
    </div>}
      {/* Mobile Dropdown */}
      {!isDesktop && open && (
        <div className="flex flex-col bg-[#82b9e7] px-6 pb-6 gap-4">
          {navBarArray.map((nav) => {
            const isActive = pathName === nav.route;
            return (<Link
              key={nav.text}
              href={nav.route}
              onClick={() => setOpen(false)}
              className={`text-[18px] font-medium ${isActive? "text-[#1e2ac0]" : "text-[#1e2ac0] hover:text-white"}`}
              style={{
                 textDecoration: isActive ? "underline" : "none"
                }}
            >
              {nav.text}
            </Link>)
          })}
        </div>
      )}
    </nav>
    </section>
  );
}
