import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

interface DelegateCardProps {
    designation: string,
    name: string;
    institution: string;
    website: string;
    photo: string;
    /** Controls face focus: e.g. "50% 25%", "50% 35%" */
    position?: string;
    /** Photo scale inside the portrait frame (default: 1.05) */
    zoom?: number;
}

// WHY: Country is the text after the last comma ("IIT Bombay, India" → "India"); every entry in speakers.tsx follows this format
function splitInstitution(institution: string) {
    const lastComma = institution.lastIndexOf(",");
    if (lastComma === -1) return { place: institution, country: "" };
    return { place: institution.slice(0, lastComma).trim(), country: institution.slice(lastComma + 1).trim() };
}

export default function DelegateCard({
    designation,
    name,
    institution,
    website,
    photo,
    position = "50% 35%", // default: face slightly higher
    zoom = 1.05,
}: DelegateCardProps) {
    const { place, country } = splitInstitution(institution);

    const content = (
        <>
            {/* Theme-coloured band behind the portrait (same blues as the site header and navbar) */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-br from-[#cbe1fc] via-[#dcebfd] to-[#b5dcff]" aria-hidden="true" />

            {/* Portrait — WHY: 160x192 frame is kept identical to the old card so every speaker's tuned position/zoom still lines up */}
            <div className="relative mt-8 rounded-full p-[3px] bg-[#cbe1fc] shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                <div className="w-40 h-48 rounded-full overflow-hidden border-4 border-white bg-white">
                    <Image
                        src={photo}
                        alt={`Portrait of ${name}`}
                        width={160}
                        height={192}
                        className="w-full h-full object-cover"
                        style={{
                            objectPosition: position,
                            transform: `scale(${zoom})`,
                        }}
                    />
                </div>
            </div>

            {/* Text */}
            <div className="relative flex flex-1 flex-col items-center px-5 pt-5">
                <h3 className="text-lg font-semibold leading-tight text-[#0d2a5c]">
                    {designation} {name}
                </h3>
                <p className="text-sm mt-1.5 leading-snug text-[#2364b7]">
                    {place}
                </p>
                {country && (
                    <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#eaf3fe] px-3 py-1 text-xs font-medium text-[#2364b7]">
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                        {country}
                    </span>
                )}
                {website && (
                    <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#71a6f0] transition-colors group-hover:text-[#2364b7]">
                        View profile
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </span>
                )}
            </div>
        </>
    );

    const cardClass =
        "group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-[#dcebfd] bg-white pb-6 text-center shadow-sm transition-all duration-300";

    // WHY: A real link (not onClick + window.open) so middle-click, "open in new tab" and keyboard navigation work
    if (website) {
        return (
            <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${name}, ${institution} — view profile (opens in a new tab)`}
                className={`${cardClass} hover:-translate-y-1.5 hover:shadow-xl hover:border-[#b5dcff] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#82b9e7]`}
            >
                {content}
            </a>
        );
    }

    return <div className={cardClass}>{content}</div>;
}
