export default function Logo(){
    return (
        <div className="min-w-full bg-[#cbe1fc] flex items-center justify-center gap-5 p-10">
            <img src="/images/tu_logo.png" className="w-25 h-25"></img>
            <div className="flex flex-col items-center justify center">
                <h1 className="text-[28px] font-bold text-center"
                style={{"color": "#854949","fontFamily":"ui-rounded"}}
                >Modern Trends in Molecular Magetism (MTMM)</h1>
                <div className="flex flex-col gap-0">
                    <h3 className="text-[23px]/6 font-bold mt-2 text-center"
                    style={{"color": "#175783","fontFamily":"ui-rounded"}}
                    >Department of Chemical Sciences</h3>
                    <h3 className="text-[23px] font-bold mt-[-2px] text-center"
                    style={{"color": "#175783","fontFamily":"ui-rounded"}}
                    >Tezpur University, Assam, India</h3>
                </div>
                <h4 className="font-bold text-[20px] mt-0 text-center"
                style={{"color": "#175783","fontFamily":"ui-rounded"}}
                >2-5 December, 2026</h4>
            </div>
            <img src="/images/mtmml7.png" className="w-30 h-25"></img>
        </div>
    )
}