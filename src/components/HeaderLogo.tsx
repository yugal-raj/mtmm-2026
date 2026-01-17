import Image from "next/image";
export default function Logo(){
    return (
        <div className="min-w-full bg-[#cbe1fc] flex items-center justify-center gap-5 p-10">
            <Image src="/images/tu_logo.png" alt="TU Logo" width={100} height={100} className="w-25 h-25" priority/>
            <div className="flex flex-col items-center justify center">
                <h1 className="text-[28px] font-bold text-center"
                style={{"color": "#854949","fontFamily":"ui-rounded"}}
                >Modern Trends in Molecular Magnetism (MTMM)</h1>
                <div className="flex flex-col gap-0">
                    <h2 className="text-[23px]/6 font-bold mt-2 text-center"
                    style={{"color": "#175783","fontFamily":"ui-rounded"}}
                    >Department of Chemical Sciences</h2>
                    <h2 className="text-[23px] font-bold mt-[-2px] text-center"
                    style={{"color": "#175783","fontFamily":"ui-rounded"}}
                    >Tezpur University, Assam, India</h2>
                </div>
                <h3 className="font-bold text-[20px] mt-0 text-center"
                style={{"color": "#175783","fontFamily":"ui-rounded"}}
                >2-5 December, 2026</h3>
            </div>
            <Image src="/images/mtmml7.png" alt="MTMM Logo" width={120} height={100} className="w-30 h-25" priority/>
        </div>
    )
}