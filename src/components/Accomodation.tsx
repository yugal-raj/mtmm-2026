import AboutCollageHeader from "./CollageHeader"

type Contact = { label: string; tel: string };

const linkStyle = { color: "#3737ff" };

const hotelData: { name: string; website?: string; contacts: Contact[] }[] = [
    { name: "The Greenwood Hotel, Tezpur", website: "https://www.thegreenwoodhotels.com", contacts: [] },
    { name: "Cygnett Inn Imperial, Tezpur", website: "https://www.cygnetthotels.com/cygnett-inn-imperial-tezpur/unit-overview", contacts: [] },
    { name: "KRC Hotel, Tezpur", website: "http://www.krchotels.com", contacts: [] },
    { name: "Heritage Tezpur", contacts: [{ label: "+91 84860 34951", tel: "+918486034951" }] },
    { name: "Mannat", website: "https://mannattezpur.com", contacts: [{ label: "+91 69013 56677", tel: "+916901356677" }] },
];

const homestayData: { name: string; note?: string; contacts: Contact[] }[] = [
    {
        name: "Apun Ghar",
        note: "Only for female students/postdocs",
        contacts: [
            { label: "9706952945", tel: "+919706952945" },
            { label: "9436652062", tel: "+919436652062" },
        ],
    },
    { name: "Sahu Homestay", contacts: [{ label: "9395450983", tel: "+919395450983" }] },
];

// WHY: px-2 on small screens so the Contact column fits in 80vw at phone width; px-6 restores the original desktop spacing
const thClass = "px-2 md:px-6 py-3 text-center text-sm font-semibold text-gray-700 whitespace-nowrap";
const tdClass = "px-2 md:px-6 py-4 text-gray-800";

function ContactLinks({ contacts }: { contacts: Contact[] }) {
    if (contacts.length === 0) return <>–</>;
    return (
        <>
            {/* WHY: One number per line so rows with two numbers (e.g. Apun Ghar) don't overflow at phone width */}
            {contacts.map((contact) => (
                <span key={contact.tel} className="block whitespace-nowrap">
                    <a href={`tel:${contact.tel}`} style={linkStyle}>{contact.label}</a>
                </span>
            ))}
        </>
    );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h3 className="pt-8 text-[22px] font-semibold" style={{ color: "#2364b7" }}>
            {children}
        </h3>
    );
}

export default function Accomodation() {
  return (
    <section className="relative flex flex-col justify-center">
    <div className="w-full flex items-center justify-center">
        <AboutCollageHeader/>
      </div>
      <div className="w-full flex items-center justify-center pt-15">
        <div className="w-[80vw]"
            style={{
                maxWidth:"1280px",
                color: "black"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >Accommodation</h2>

            <SectionHeading>For Faculty and Scientists</SectionHeading>
            <p className="pt-2 text-justify">
                A limited number of comfortable accommodations is available on a chargeable basis in
                Tezpur University Guest House and will be allotted on a first-come, first serve basis.
            </p>
            <p className="pt-4 text-justify">
                Following hotels located in Tezpur are recommended:
            </p>
            <div className="overflow-x-auto pt-3">
              <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead style={{backgroundColor: "#b5dcff"}}>
                        <tr>
                            <th className={thClass}>Sl No.</th>
                            <th className={thClass}>Hotel Name</th>
                            {/* WHY: Long URLs overflow narrow screens, so the Website column is desktop-only; the hotel name links to the site instead */}
                            <th className={`${thClass} hidden md:table-cell`}>Website</th>
                            <th className={thClass}>Contact</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-center">
                    {hotelData.map((hotel, index) => (
                        <tr key={hotel.name} className="hover:bg-gray-50">
                        <td className={tdClass}>{index+1}</td>
                        <td className={tdClass}>
                            {hotel.website
                                ? <a href={hotel.website} style={linkStyle} className="md:!text-gray-800 md:pointer-events-none">{hotel.name}</a>
                                : hotel.name}
                        </td>
                        <td className="px-2 md:px-6 py-4 text-gray-600 hidden md:table-cell break-all">
                            {hotel.website
                                ? <a href={hotel.website} style={linkStyle}>{hotel.website}</a>
                                : "–"}
                        </td>
                        <td className={tdClass}><ContactLinks contacts={hotel.contacts} /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <SectionHeading>For PhD Students / Postdocs</SectionHeading>
            <p className="pt-2 text-justify">
                Limited free accommodation is available for student participants in Tezpur University
                hostels and guest house. These will be provided on a first come, first serve basis
                (kindly write to <a href="mailto:mtmm26@gmail.com" style={linkStyle}>mtmm26@gmail.com</a>).
            </p>
            <p className="pt-4 text-justify">
                Interested participants may avail accommodation facility in the following homestay
                facilities located near the university campus:
            </p>
            <div className="overflow-x-auto pt-3">
              <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead style={{backgroundColor: "#b5dcff"}}>
                        <tr>
                            <th className={thClass}>Sl No.</th>
                            <th className={thClass}>Homestay Name</th>
                            <th className={thClass}>Contact</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-center">
                    {homestayData.map((homestay, index) => (
                        <tr key={homestay.name} className="hover:bg-gray-50">
                        <td className={tdClass}>{index+1}</td>
                        <td className={tdClass}>
                            {homestay.name}
                            {homestay.note && (
                                <span className="block text-sm text-gray-600">({homestay.note})</span>
                            )}
                        </td>
                        <td className={tdClass}><ContactLinks contacts={homestay.contacts} /></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <p className="pt-4 text-justify">
                <span className="font-semibold">Please note:</span> Due to limited financial resources,
                the organizing committee will not be able to bear accommodation charges for student
                participants staying in homestay facilities.
            </p>
        </div>
      </div>
    </section>
  );
}
