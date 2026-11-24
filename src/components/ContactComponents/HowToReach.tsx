import { Clock, ExternalLink, Plane, Route, TriangleAlert } from "lucide-react";

type TravelRoute = {
    name: string;
    /** Official / alternative name shown under the main name */
    altName?: string;
    distance?: string;
    duration?: string;
    /** Shown as a badge instead of distance/time when the airport can't be used */
    status?: string;
    description: string;
    note?: string;
    /** Origin for the "Route to venue" Google Maps link (omitted for airports without flights) */
    mapsOrigin?: string;
};

// WHY: Same destination text as the venue map's "Get directions" button (ContactComponents/Venue.tsx)
const VENUE_DESTINATION = "Council Hall, Tezpur University, Tezpur, Assam";

// Google's documented Maps URL (api=1): opens a driving route in the Maps app on phones, or in the browser
const routeUrl = (origin: string) =>
    `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(VENUE_DESTINATION)}&travelmode=driving`;

// Facts (distances, times, permit note) are taken unchanged from the original How to Reach text
const routes: TravelRoute[] = [
    {
        name: "Guwahati International Airport",
        altName: "Lokpriya Gopinath Bordoloi International Airport",
        distance: "≈ 190 km",
        duration: "≈ 4 hours by road",
        mapsOrigin: "Lokpriya Gopinath Bordoloi International Airport, Guwahati",
        description: "Tezpur University is approximately 190 km away from Guwahati International Airport. Modern highway connectivity is available on this route and this drive usually takes around 4 hours.",
    },
    {
        name: "Donyi Polo Airport, Itanagar",
        altName: "Hollongi Airport",
        distance: "110 km",
        duration: "Under 2 hours by road",
        mapsOrigin: "Donyi Polo Airport, Hollongi, Itanagar",
        description: "The Hollongi Airport at Itanagar, Arunachal Pradesh is well connected to major international airports (Delhi, Mumbai & Kolkata). Due to excellent road condition as well as minimal traffic on this route, the journey to Tezpur University usually takes less than 2 hours.",
        note: "Participants travelling via Donyi Polo Airport should be aware of the Inner Line Permit requirement for entering Arunachal Pradesh, and Non-Indian nationals may not be allowed to travel through this airport.",
    },
    {
        name: "Tezpur Airport, Tezpur",
        status: "No commercial flights",
        description: "Tezpur Airport has not resumed commercial flight operation so far and participants are advised to travel to other airports located in the region.",
    },
];

export default function HowToReach(){
    return (
        // WHY: Same width as the maps (80vw, max 1280px) so the page's sections line up
        <div className="w-[80vw] max-w-[1280px]">
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >How to Reach</h2>

            {/* Route cards — distance and travel time pulled out as chips so they can be compared at a glance */}
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
                {routes.map((route) => (
                    <article
                        key={route.name}
                        className={`flex flex-col rounded-2xl border p-5 shadow-sm ${
                            route.status ? "border-gray-200 bg-gray-50" : "border-[#dcebfd] bg-white"
                        }`}
                    >
                        <div className="flex items-start gap-3">
                            <span
                                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                    route.status ? "bg-gray-200 text-gray-500" : "bg-[#eaf3fe] text-[#2364b7]"
                                }`}
                                aria-hidden="true"
                            >
                                <Plane className="h-5 w-5" />
                            </span>
                            <div className="min-w-0">
                                <h3 className="text-[18px] font-bold leading-snug" style={{ color: route.status ? "#4b5563" : "#133f80" }}>
                                    {route.name}
                                </h3>
                                {route.altName && <p className="text-sm text-gray-600">{route.altName}</p>}
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {route.distance && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf3fe] px-3 py-1 text-sm font-semibold text-[#133f80]">
                                    <Route className="h-4 w-4" aria-hidden="true" />
                                    {route.distance}
                                </span>
                            )}
                            {route.duration && (
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf3fe] px-3 py-1 text-sm font-semibold text-[#133f80]">
                                    <Clock className="h-4 w-4" aria-hidden="true" />
                                    {route.duration}
                                </span>
                            )}
                            {route.status && (
                                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700">
                                    {route.status}
                                </span>
                            )}
                        </div>

                        <p className="mt-4 leading-relaxed text-gray-800">{route.description}</p>

                        {route.note && (
                            // WHY: Amber callout flags the permit/nationality restriction so travellers don't miss it
                            <p className="mt-4 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm leading-relaxed text-gray-900">
                                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />
                                <span><span className="font-semibold">Please note: </span>{route.note}</span>
                            </p>
                        )}

                        {/* WHY: After the permit note (so it is read first) and pushed to the card bottom (mt-auto) so buttons line up across cards */}
                        {route.mapsOrigin && (
                            <div className="mt-auto pt-5">
                                <a
                                    href={routeUrl(route.mapsOrigin)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Route from ${route.name} to the venue on Google Maps (opens in a new tab)`}
                                    className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-[#2364b7] bg-white px-4 py-1.5 text-sm font-semibold text-[#2364b7] transition-colors hover:bg-[#eaf3fe] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#82b9e7]"
                                >
                                    Route to venue
                                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                </a>
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </div>
    )
}
