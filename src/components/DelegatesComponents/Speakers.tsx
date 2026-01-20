import DelegateCard from "@/components/DelegatesComponents/DelegateCard";
import { speakers } from "@/data/speakers";
export default function Speakers(){
    const sortedSpeakers = [...speakers].sort((a, b) =>
        a.name.localeCompare(b.name)
    );
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
                        photo={speaker.photo}
                        position={speaker.position}
                        zoom={speaker.zoom}
                      />
                    ))}
            </div>
        </div>
    )
}