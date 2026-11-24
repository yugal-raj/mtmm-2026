import Image from "next/image";

// WHY: Compact phone header (~280px instead of ~520px) so the hero and menu appear without a long scroll;
// keeps the same logos, text and colours as the desktop header, just smaller and tighter.
export default function HeaderLogoMobile(){
    return (
        <div className="min-w-full bg-[#cbe1fc] flex flex-col items-center justify-center gap-3 px-5 py-6">
            <div className="flex flex-row items-center gap-6">
                <Image src="/images/tu_logo.png" alt="TU Logo" width={100} height={100} className="w-16 h-16" priority/>
                <Image src="/images/mtmml7.png" alt="MTMM Logo" width={120} height={100} className="w-[77px] h-16 object-contain" priority/>
            </div>
            <div className="flex flex-col items-center gap-1 text-center" style={{"fontFamily":"ui-rounded"}}>
                <h1 className="text-[22px] leading-tight font-bold text-balance"
                style={{"color": "#854949"}}
                >Modern Trends in Molecular Magnetism (MTMM)</h1>
                <div className="flex flex-col pt-1">
                    <h2 className="text-[16px] leading-snug font-bold"
                    style={{"color": "#175783"}}
                    >Department of Chemical Sciences</h2>
                    <h2 className="text-[16px] leading-snug font-bold"
                    style={{"color": "#175783"}}
                    >Tezpur University, Assam, India</h2>
                </div>
                <h3 className="font-bold text-[15px] leading-snug"
                style={{"color": "#175783"}}
                >2-5 December, 2026</h3>
            </div>
        </div>
    )
}
