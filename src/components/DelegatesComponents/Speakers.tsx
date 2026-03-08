"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import DelegateCard from "@/components/DelegatesComponents/DelegateCard";
import { speakers } from "@/data/speakers";
export default function Speakers(){
    const [showButton, setShowButton] = useState(false);
    const sortedSpeakers = [...speakers].sort((a, b) =>
        a.name.localeCompare(b.name)
    );
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
        <div className="w-[80vw]"
            style={{
                maxWidth:"1150px"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >Speakers</h2>
            
            <div className="grid gap-x-10 gap-y-30 pt-30  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {sortedSpeakers.map((speaker, index) => (
                      <DelegateCard
                        key={index}
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
            {/* Back to Top Button */}
            {showButton && (
                <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 flex items-center justify-center 
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