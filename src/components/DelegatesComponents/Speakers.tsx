"use client";
import { useEffect, useMemo, useState } from "react";
import { ArrowUp, Search, X } from "lucide-react";
import DelegateCard from "@/components/DelegatesComponents/DelegateCard";
import { speakers } from "@/data/speakers";

// WHY: Accent-insensitive matching so "clerac" finds "Clérac" and "chorazy" finds "Chorąży"
const normalize = (text: string) => text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

// WHY: Search-only alternate names so visitors can type either the abbreviation or the full form
// (e.g. "Indian Institute of Technology" finds "IIT Bombay", "TIFR" finds "Tata Institute of Fundamental Research").
// Keys are matched as whole words against the institution shown on the card; the card text itself is unchanged.
const INSTITUTION_ALIASES: Record<string, string> = {
    "IIT": "Indian Institute of Technology",
    "IISc": "Indian Institute of Science",
    "IISER": "Indian Institute of Science Education and Research",
    "INST": "Institute of Nano Science and Technology",
    "JNCASR": "Jawaharlal Nehru Centre for Advanced Scientific Research",
    "BARC": "Bhabha Atomic Research Centre",
    "UGC-DAE CSR": "UGC-DAE Consortium for Scientific Research University Grants Commission Department of Atomic Energy",
    "SRM": "SRM Institute of Science and Technology",
    "AP": "Andhra Pradesh Amaravati",
    "TU Wien": "Technische Universität Wien Vienna University of Technology",
    "CNRS": "Centre National de la Recherche Scientifique French National Centre for Scientific Research",
    "Tata Institute of Fundamental Research": "TIFR",
    "Karlsruhe Institute of Technology": "KIT",
    "Chitose Institute of Science and Technology": "CIST",
    "Aragón Materials Science Institute": "INMA ICMA Instituto de Nanociencia y Materiales de Aragón",
    "University College Dublin": "UCD",
    "Trinity College Dublin": "TCD",
    "University of Wisconsin-Madison": "UW-Madison",
    "San Jose State University": "SJSU",
    "Friedrich-Schiller-Universität Jena": "Friedrich Schiller University Jena FSU",
    "Sorbonne Université": "Sorbonne University",
    "Université de Bordeaux": "University of Bordeaux",
    "University of Bordeaux": "Université de Bordeaux",
    "University of Florence": "Università degli Studi di Firenze UNIFI",
    "University of Valencia": "Universitat de València",
    "Paris-Saclay University": "Université Paris-Saclay",
    "University of Toulouse": "Université de Toulouse",
    "Heidelberg University": "Universität Heidelberg Ruprecht-Karls-Universität",
    "Bombay": "Mumbai",
    "Bangalore": "Bengaluru",
    "Calcutta": "Kolkata",
};

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Builds the text a speaker is searched against: name + institution + any alternate institution names
function searchText(name: string, institution: string) {
    const extras = Object.entries(INSTITUTION_ALIASES)
        .filter(([key]) => new RegExp(`(^|[^\\p{L}])${escapeRegExp(key)}($|[^\\p{L}])`, "u").test(institution))
        .map(([, alt]) => alt);
    return normalize([name, institution, ...extras].join(" "));
}

export default function Speakers(){
    const [showButton, setShowButton] = useState(false);
    const [query, setQuery] = useState("");

    const sortedSpeakers = useMemo(
        () => [...speakers].sort((a, b) => a.name.localeCompare(b.name)),
        []
    );

    const visibleSpeakers = useMemo(() => {
        // WHY: Match every typed word anywhere (not one exact phrase) so "Indian Institute of Technology Bombay" finds "IIT Bombay"
        const words = normalize(query).split(/[\s,]+/).filter((w) => w && w !== "of" && w !== "the");
        if (words.length === 0) return sortedSpeakers;
        return sortedSpeakers.filter((s) => {
            const text = searchText(s.name, s.institution);
            return words.every((w) => text.includes(w));
        });
    }, [sortedSpeakers, query]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="w-[90vw] sm:w-[80vw] pb-10"
            style={{
                maxWidth:"1150px"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >Speakers</h2>

            {/* Search */}
            <div className="relative mx-auto mt-8 max-w-md">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#71a6f0]" aria-hidden="true" />
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name or institution"
                    aria-label="Search speakers by name or institution"
                    className="w-full rounded-full border-2 border-[#b5dcff] bg-white py-3 pl-12 pr-11 text-gray-800 placeholder:text-gray-400 focus:border-[#2364b7] focus:outline-none transition-colors [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        aria-label="Clear search"
                        title="Clear search"
                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-[#eaf3fe] hover:text-[#2364b7]"
                    >
                        <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                )}
            </div>

            {/* Grid */}
            <p className="sr-only" aria-live="polite">
                Showing {visibleSpeakers.length} of {speakers.length} speakers
            </p>
            {visibleSpeakers.length > 0 ? (
                <div className="grid gap-6 lg:gap-8 pt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {visibleSpeakers.map((speaker) => (
                      <DelegateCard
                        key={speaker.name}
                        designation={speaker.designation}
                        name={speaker.name}
                        institution={speaker.institution}
                        website={speaker.website}
                        photo={speaker.photo}
                        position={speaker.position}
                        zoom={speaker.zoom}
                      />
                    ))}
                </div>
            ) : (
                <div className="mt-10 rounded-2xl border border-dashed border-[#b5dcff] bg-[#f5f9ff] py-14 text-center">
                    <p className="font-semibold text-[#2364b7]">No speakers match your search.</p>
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="cursor-pointer mt-3 text-sm font-medium text-[#71a6f0] underline underline-offset-4 hover:text-[#2364b7]"
                    >
                        Clear search
                    </button>
                </div>
            )}

            {/* Back to Top Button */}
            {showButton && (
                <button
                onClick={scrollToTop}
                aria-label="Back to top"
                title="Back to top"
                className={`fixed bottom-8 right-8 z-20 flex items-center justify-center
                border-2 border-[#71a6f0] text-[#71a6f0] rounded-full shadow-lg bg-white
                hover:bg-[#71a6f0] hover:text-white hover:-translate-y-1
                transition-all duration-300 cursor-pointer
                ${showButton ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                style={{ fontSize: "30px", width: "65px", height: "65px" }}
                >
                <ArrowUp size={28} />
                </button>
            )}
        </div>
    )
}
