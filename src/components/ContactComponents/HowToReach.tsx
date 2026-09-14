const routes = [
    {
        title: "Guwahati International Airport (Lokpriya Gopinath Bordoloi International Airport)",
        paragraphs: [
            "Tezpur University is approximately 190 km away from Guwahati International Airport. Modern highway connectivity is available on this route and this drive usually takes around 4 hours.",
        ],
    },
    {
        title: "Donyi Polo Airport, Itanagar (Hollongi Airport)",
        paragraphs: [
            "The Hollongi Airport at Itanagar, Arunachal Pradesh is well connected to major international airports (Delhi, Mumbai & Kolkata). Hollongi Airport is 110 km away from Tezpur University and due to excellent road condition as well as minimal traffic on this route, this journey usually takes less than 2 hours.",
        ],
        note: "Participants travelling via Donyi Polo Airport should be aware of the Inner Line Permit requirement for entering Arunachal Pradesh, and Non-Indian nationals may not be allowed to travel through this airport.",
    },
    {
        title: "Tezpur Airport, Tezpur",
        paragraphs: [
            "Tezpur Airport has not resumed commercial flight operation so far and participants are advised to travel to other airports located in the region.",
        ],
    },
];

export default function HowToReach(){
    return (
        <div
            style={{
                maxWidth:"800px",
                width:"50vw",
                minWidth:"300px"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >How to Reach</h2>
            {routes.map((route) => (
                <div key={route.title}>
                    <h4 className="text-[20px] pt-3"
                        style={{
                            color:"#8566f6ff"
                        }}
                    >{route.title}</h4>
                    {route.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="pt-1 text-justify"
                            style={{"color":"black"}}
                        >{paragraph}</p>
                    ))}
                    {route.note && (
                        // WHY: Amber left border flags the permit/nationality restriction so travellers don't miss it
                        <p className="mt-2 border-l-4 border-amber-400 bg-amber-50 px-3 py-2 text-justify rounded-r"
                            style={{"color":"black"}}
                        >
                            <span className="font-semibold">Please note: </span>{route.note}
                        </p>
                    )}
                </div>
            ))}
        </div>
    )
}
