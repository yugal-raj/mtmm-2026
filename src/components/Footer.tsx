import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

// Contact details mirror the "Address of Correspondence" on the Contact page (ContactComponents/ContactAddress.tsx)
const CONTACT_EMAIL = "mtmm2026@gmail.com";
const CONTACT_PHONE_DISPLAY = "+91-9401418488";
const CONTACT_PHONE_LINK = "+919401418488";

const quickLinks = [
    { text: "Programme", href: "/program" },
    { text: "Speakers", href: "/speakers" },
    { text: "Registration", href: "/registration" },
    { text: "Accommodation", href: "/accommodation" },
    { text: "Venue & Travel", href: "/contact#venue" },
    { text: "Committees", href: "/committees" },
];

export default function Footer() {
    return (
        <footer className="w-full bg-[#0d0d36] text-[#c7d2fe]">
            <div className="mx-auto grid w-[90vw] sm:w-[80vw] max-w-[1280px] gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr]">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-3">
                        <Image src="/images/mtmml7.png" alt="" width={48} height={40} className="h-10 w-12 object-contain" />
                        <span className="text-lg font-bold text-white">MTMM 2026</span>
                    </div>
                    <p className="mt-3 max-w-sm leading-relaxed">
                        5<sup>th</sup> Modern Trends in Molecular Magnetism · 2–5 December 2026 ·
                        Department of Chemical Sciences, Tezpur University, Assam, India
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h2 className="text-sm font-bold uppercase tracking-wider text-white">Contact</h2>
                    <ul className="mt-4 space-y-3">
                        <li className="flex items-start gap-2.5">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#82b9e7]" aria-hidden="true" />
                            <span>Dr. Nayanmoni Gogoi, Convener, MTMM<br />Department of Chemical Sciences, Tezpur University, Tezpur – 784028, Assam</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Mail className="h-4 w-4 shrink-0 text-[#82b9e7]" aria-hidden="true" />
                            <a href={`mailto:${CONTACT_EMAIL}`} className="underline-offset-4 hover:text-white hover:underline">{CONTACT_EMAIL}</a>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <Phone className="h-4 w-4 shrink-0 text-[#82b9e7]" aria-hidden="true" />
                            <a href={`tel:${CONTACT_PHONE_LINK}`} className="underline-offset-4 hover:text-white hover:underline">{CONTACT_PHONE_DISPLAY}</a>
                        </li>
                    </ul>
                </div>

                {/* Quick links */}
                <nav aria-label="Footer">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-white">Quick links</h2>
                    <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
                        {quickLinks.map((link) => (
                            <li key={link.href}>
                                <Link href={link.href} className="underline-offset-4 hover:text-white hover:underline">{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="border-t border-white/10">
                <p className="mx-auto w-[90vw] sm:w-[80vw] max-w-[1280px] py-5 text-sm text-[#a5b4fc]">
                    © 2026 MTMM, Department of Chemical Sciences, Tezpur University. All rights reserved.
                </p>
            </div>
        </footer>
    )
}
