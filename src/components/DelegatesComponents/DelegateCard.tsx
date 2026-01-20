import Image from "next/image";

interface DelegateCardProps {
    designation: string, 
    name: string;
    institution: string;
    website: string;
    photo: string;
    /** Controls face focus: e.g. "50% 25%", "50% 35%" */
    position?: string;
    /** Optional zoom level on hover (default: 1.05) */
    zoom?: number;
}

export default function DelegateCard({
    designation,
    name,
    institution,
    website,
    photo,
    position = "50% 35%", // default: face slightly higher
    zoom = 1.05,
}: DelegateCardProps) {
    const handleClick = () => {
    if (website) {
      window.open(website, "_blank", "noopener,noreferrer");
    }
  };
  return (
    <div
        onClick={handleClick}
        className={`bg-white hover:bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition text-center pt-30 pb-6 px-6 ${website? "cursor-pointer": "cursor-default"}`}
    >
      {/* Portrait */}
      <div className="flex justify-center -mt-20 mb-6">
        <div
          className="w-40 h-48 rounded-[999px] overflow-hidden border-4 border-white shadow-md bg-white"
        >
          <Image
            src={photo}
            alt={name}
            width={160}
            height={192}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{
              objectPosition: position,
              transform: `scale(${zoom})`,
            }}
          />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-lg font-semibold leading-tight"
        style={{color:"lab(17 5 -39.16)"}}
      >
        {designation} {name}
      </h3>
      <p className="text-sm mt-1 leading-snug"
        style={{color:"lab(49 -5.8 -59.63)"}}
      >
        {institution}
      </p>
    </div>
  );
}