import MapEmbed from "./MapEmbed";

// WHY: Google Maps embed for Council Hall (moved here from ContactMap.tsx so the venue address and its map sit together)
const COUNCIL_HALL_EMBED =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5417.614468905529!2d92.83156173551845!3d26.698549716006145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3744ebbf80096795%3A0x9c5303f81c770c3d!2sCouncil%20Hall!5e0!3m2!1sen!2sin!4v1767531903929!5m2!1sen!2sin";

export default function ContactVenue(){
    return (
        // WHY: id="venue" is the target of the home hero and footer "Venue & Travel" links; scroll margin keeps it clear of the sticky navbar
        <div id="venue" className="w-[80vw] max-w-[1280px]"
            style={{ scrollMarginTop: "calc(var(--nav-h, 0px) + 16px)" }}
        >
            <h2 className="text-[30px] font-bold text-center pb-6"
                style={{"color":"#2364b7"}}
            >Conference Venue</h2>
            <MapEmbed
                title="Council Hall, Tezpur University"
                subtitle="Tezpur – 784028, Assam, India"
                destination="Council Hall, Tezpur University, Tezpur, Assam"
                embedSrc={COUNCIL_HALL_EMBED}
            />
        </div>
    )
}
