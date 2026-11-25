"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, CheckCircle2, MapPin, Trees } from "lucide-react";
import { PROGRAM_VENUE } from "@/data/program";

type DateEntry = {
    month: string;
    day: string;
    weekday: string;
    title: string;
    detail?: string;
    Icon?: typeof MapPin;
    link: { href: string; label: string } | null;
    closed?: boolean;
};

// WHY: The deadlines that share a date are merged into one card each (abstracts and registration opened and closed on
// the same days), so the full timeline stays four tidy cards instead of six near-duplicate rows
const pastDates: DateEntry[] = [
    {
        month: "Sep",
        day: "14",
        weekday: "Monday",
        title: "Abstract submission and registration opened",
        link: null,
        closed: true,
    },
    {
        month: "Nov",
        day: "1",
        weekday: "Sunday",
        title: "Abstract submission and registration closed",
        link: null,
        closed: true,
    },
];

const upcomingDates: DateEntry[] = [
    {
        month: "Dec",
        day: "2–5",
        weekday: "Wed – Sat",
        title: "MTMM 2026 Conference",
        detail: `${PROGRAM_VENUE}, Assam`,
        Icon: MapPin,
        link: { href: "/program", label: "View programme" },
    },
    {
        month: "Dec",
        day: "6",
        weekday: "Sunday",
        title: "Excursion to Kaziranga National Park",
        detail: "For participants of MTMM 2026",
        Icon: Trees,
        link: null,
    },
];

export default function HomepageImporatantDates() {
    const pathName = usePathname();
    const isImportantDates = pathName === "/importantDates";
    // WHY: The home page shows only what's coming, so visitors see when and where to be first; the Important Dates
    // page keeps the full timeline (past deadlines marked Closed) for reference
    const dates = isImportantDates ? [...pastDates, ...upcomingDates] : upcomingDates;

    return (
        <div className="w-[80vw]"
            style={{
                maxWidth: isImportantDates? "1280px" : "1150px"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >Important Dates</h2>
            <ul className="grid gap-4 md:gap-6 pt-6 md:grid-cols-2">
                {dates.map(({ month, day, weekday, title, detail, Icon, link, closed }) => (
                    <li
                        key={title}
                        className={`flex items-center gap-5 rounded-xl border p-5 ${
                            closed ? "border-gray-200 bg-gray-50" : "border-gray-200 bg-white shadow-sm"
                        }`}
                    >
                        {/* Calendar-style date badge, in the site's header blues (muted grey once the date has passed) */}
                        <div className={`flex w-24 shrink-0 flex-col items-center overflow-hidden rounded-lg border bg-white text-center ${
                            closed ? "border-gray-300" : "border-[#b5dcff]"
                        }`}>
                            <span className={`w-full py-1 text-xs font-semibold uppercase tracking-wider text-white ${
                                closed ? "bg-gray-500" : "bg-[#2364b7]"
                            }`}>
                                {month} 2026
                            </span>
                            <span className={`pt-1.5 text-2xl font-bold leading-none ${closed ? "text-gray-600" : "text-[#0d2a5c]"}`}>{day}</span>
                            <span className={`pb-1.5 pt-1 text-xs ${closed ? "text-gray-600" : "text-[#2364b7]"}`}>{weekday}</span>
                        </div>
                        <div className="min-w-0">
                            {closed && (
                                <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700">
                                    <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                                    Closed
                                </span>
                            )}
                            <h3 className={`text-lg font-semibold leading-snug ${closed ? "text-gray-700" : "text-[#0d2a5c]"}`}>{title}</h3>
                            {detail && (
                                <p className="mt-1 flex items-start gap-1.5 text-sm text-gray-600">
                                    {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#2364b7]" aria-hidden="true" />}
                                    {detail}
                                </p>
                            )}
                            {link && (
                                <Link
                                    href={link.href}
                                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#2364b7] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2364b7] focus-visible:ring-offset-2 rounded"
                                >
                                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                                    {link.label}
                                </Link>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
