import Image from "next/image";
import AboutCollageHeader from "./CollageHeader"

const sponsors = [
  {
    name: "Anusandhan National Research Foundation (ANRF)",
    logo: "/images/sponsors/anrf-logo.jpeg",
    website: "https://www.anrfonline.in",
    // WHY: Intrinsic pixel size of the logo file, so next/image reserves the right aspect ratio and avoids layout shift
    width: 1165,
    height: 553,
  },
  {
    name: "Royal Society of Chemistry (RSC)",
    logo: "/images/sponsors/rsc-logo.jpeg",
    website: "https://www.rsc.org",
    width: 935,
    height: 305,
  },
];

export default function Sponsors() {
  return (
    <section className="relative flex flex-col justify-center">
    <div className="w-full flex items-center justify-center">
        <AboutCollageHeader/>
      </div>
      <div className="w-full flex items-center justify-center pt-15">
        <div className="w-[80vw]" style={{ maxWidth: "1280px" }}>
          <h2 className="text-[30px] font-bold text-center"
              style={{"color":"#2364b7"}}
          >Our Sponsors</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 pt-8">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit the ${sponsor.name} website`}
                className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-[#82b9e7]"
              >
                <div className="flex h-44 md:h-52 w-full items-center justify-center">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={sponsor.width}
                    height={sponsor.height}
                    className="max-h-full max-w-full w-auto h-auto object-contain"
                  />
                </div>
                <p className="pt-4 text-center font-medium text-gray-800 group-hover:text-[#2364b7]">
                  {sponsor.name}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
