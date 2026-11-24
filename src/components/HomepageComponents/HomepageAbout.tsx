import { Check, Mail } from "lucide-react";

// WHY: "Molecular Qubits" was listed twice (also part of the first topic), so the standalone duplicate was removed
const topics = [
    "Single Molecule Magnets and Molecular Qubits",
    "Switchable Magnetic Materials",
    "Electronic Structure, Modelling, and Theory",
    "Spectroscopic Techniques and Advanced Experimental Methods",
    "Molecular Spintronics and Magnetic Devices",
    "Multifunctional Magnetic Materials",
    "Magnetic Nanoparticles and Their Applications",
];

export default function HomepageAbout(){
    return (
        // WHY: Same width as the home hero (92vw / 80vw, max 1280px) so the sections line up
        <div className="w-[92vw] sm:w-[80vw] max-w-[1280px]">
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >About the Conference</h2>

            {/* WHY: Left-aligned (not justified) — justified lines left large word gaps on phones */}
            <div className="pt-4 space-y-4 text-[17px] leading-relaxed text-gray-800">
                <p>
                    Since the inception of “Modern Trends in Molecular Magnetism (MTMM)” at IIT Bombay in 2016, this
                    international conference has evolved into a flagship biennial conclave of internationally acclaimed
                    researchers, academicians, and industry experts to discuss recent advances, emerging trends, and future
                    directions in the field of molecular magnetism. Subsequent editions of MTMM were successfully organized
                    at IISER Bhopal (2019), IIT Kharagpur (2022) and IISc Bangalore (2024).
                </p>
                <p>
                    The Department of Chemical Sciences, Tezpur University, Assam will be organizing
                    the 5<sup>th</sup> edition of Modern Trends in Molecular Magnetism (MTMM) from 2–5 December 2026. The
                    present edition of the conference will feature Keynote Lectures, Invited Lectures, Oral Presentations,
                    Poster Presentations and will provide a vibrant platform for sharing cutting-edge research, fostering
                    interdisciplinary dialogue and building meaningful collaborations that advance scientific inquiry and
                    global knowledge exchange in emerging aspects of molecular magnetism.
                </p>
            </div>

            {/* Topics as a two-column checklist instead of a long plain bullet list */}
            <div className="pt-8">
                <h3 className="text-[19px] font-bold" style={{ color: "#133f80" }}>Scientific topics</h3>
                <p className="pt-1 text-gray-600">The scientific program will cover a broad range of topics, including (but not limited to):</p>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-3 rounded-xl border border-[#dcebfd] bg-[#f5f9ff] px-4 py-3 text-gray-800">
                            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2364b7] text-white" aria-hidden="true">
                                <Check className="h-3.5 w-3.5" strokeWidth={3} />
                            </span>
                            <span className="leading-snug">{topic}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Invitation + contact */}
            <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-gradient-to-br from-[#eaf3fe] to-[#dcebfd] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <p className="leading-relaxed text-gray-800">
                    We cordially invite you to participate in this conference, thereby making it a grand success.
                    Any queries regarding the conference will be communicated through email.
                </p>
                <a
                    href="mailto:mtmm2026@gmail.com"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#2364b7] px-5 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-[#1b4f91] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#82b9e7]"
                >
                    <Mail className="h-5 w-5" aria-hidden="true" />
                    mtmm2026@gmail.com
                </a>
            </div>
        </div>
    )
}
