import { Mail, MapPin, Phone } from "lucide-react";

// Same details as the site footer (components/Footer.tsx) — keep both in sync if they change
const CONTACT_EMAIL = "mtmm2026@gmail.com";
const CONTACT_PHONE_DISPLAY = "+91-9401418488";
const CONTACT_PHONE_LINK = "+919401418488";

export default function ContactAddress(){
    return (
        <div className="w-[80vw] max-w-[1280px]">
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >Address of Correspondence</h2>

            {/* Contact card: who to contact, with icon rows and one-tap email/call buttons */}
            <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-[#dcebfd] bg-white p-6 shadow-sm sm:p-8">
                <div className="text-center">
                    <h3 className="text-[24px] font-bold text-gray-900">Dr. Nayanmoni Gogoi</h3>
                    <p className="text-[18px] font-bold" style={{"color":"#854949"}}>Convener, MTMM</p>
                </div>

                <ul className="mt-6 space-y-3 text-gray-800">
                    <li className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf3fe] text-[#2364b7]" aria-hidden="true">
                            <MapPin className="h-4 w-4" />
                        </span>
                        <span className="leading-relaxed">Department of Chemical Sciences, Tezpur University<br/>Tezpur – 784028, Assam, India</span>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf3fe] text-[#2364b7]" aria-hidden="true">
                            <Mail className="h-4 w-4" />
                        </span>
                        <a href={`mailto:${CONTACT_EMAIL}`} className="break-all font-semibold text-[#2364b7] underline-offset-4 hover:underline">{CONTACT_EMAIL}</a>
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eaf3fe] text-[#2364b7]" aria-hidden="true">
                            <Phone className="h-4 w-4" />
                        </span>
                        <a href={`tel:${CONTACT_PHONE_LINK}`} className="font-semibold text-[#2364b7] underline-offset-4 hover:underline">{CONTACT_PHONE_DISPLAY}</a>
                    </li>
                </ul>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2364b7] px-4 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-[#1b4f91] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#82b9e7]"
                    >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        Email
                    </a>
                    <a
                        href={`tel:${CONTACT_PHONE_LINK}`}
                        className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#2364b7] bg-white px-4 py-2 font-semibold text-[#2364b7] transition-colors hover:bg-[#eaf3fe] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#82b9e7]"
                    >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        Call
                    </a>
                </div>
            </div>
        </div>
    )
}
