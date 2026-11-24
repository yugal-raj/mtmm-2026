import { ExternalLink, Navigation } from "lucide-react";

type MapEmbedProps = {
    /** Heading shown above the map and used as the iframe title for screen readers */
    title: string;
    /** Short line under the heading, e.g. what the place is */
    subtitle?: string;
    /** Google Maps embed URL (from Share → Embed a map) */
    embedSrc: string;
    /** Destination text for Google Maps directions, e.g. "Council Hall, Tezpur University" */
    destination: string;
};

/** A labelled Google Map with a "Get directions" button, used on the Contact page. */
export default function MapEmbed({ title, subtitle, embedSrc, destination }: MapEmbedProps) {
    // WHY: Google's documented Maps URL (api=1) opens directions from the visitor's location in the app or browser
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
    const searchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;

    return (
        <div className="w-[80vw] max-w-[1280px]">
            <div className="flex flex-col gap-3 pb-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h3 className="text-[22px] font-bold" style={{ color: "#2364b7" }}>{title}</h3>
                    {subtitle && <p className="text-gray-600">{subtitle}</p>}
                </div>
                <div className="flex flex-wrap gap-2">
                    <a
                        href={directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#2364b7] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1b4f91] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#82b9e7]"
                    >
                        <Navigation className="h-4 w-4" aria-hidden="true" />
                        Get directions
                    </a>
                    <a
                        href={searchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border-2 border-[#2364b7] bg-white px-4 py-1.5 text-sm font-semibold text-[#2364b7] transition-colors hover:bg-[#eaf3fe] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#82b9e7]"
                    >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        Open in Google Maps
                    </a>
                </div>
            </div>
            {/* WHY: 300px on phones (was 460px) so two maps don't add ~920px of scrolling; full 460px from tablets up */}
            <div className="h-[300px] sm:h-[460px] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <iframe
                    src={embedSrc}
                    title={`Map: ${title}`}
                    width="100%"
                    height="100%"
                    style={{ border: "0" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </div>
    );
}
