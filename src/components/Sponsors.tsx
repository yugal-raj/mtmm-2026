import Image from "next/image";
import AboutCollageHeader from "./CollageHeader"

const sponsors = [
  {
    name: "Anusandhan National Research Foundation (ANRF)",
    logo: "/images/sponsors/anrf-logo.png",
    website: "https://www.anrfonline.in",
    // WHY: Intrinsic pixel size of the logo file, so next/image reserves the right aspect ratio and avoids layout shift
    width: 1106,
    height: 495,
  },
  {
    name: "Micropoint Computers Private Limited",
    logo: "/images/sponsors/micropoint-logo.png",
    website: "https://mpcl.in",
    // WHY: Client asked for this sponsor to be listed directly after ANRF (24 Nov 2026 email)
    width: 1400,
    height: 361,
  },
  {
    name: "Royal Society of Chemistry (RSC)",
    logo: "/images/sponsors/rsc-logo.jpeg",
    website: "https://www.rsc.org",
    width: 935,
    height: 305,
  },
  {
    name: "Quantum Design India",
    logo: "/images/sponsors/quantum-design-logo.png",
    website: "https://qd-india.com",
    width: 800,
    height: 185,
  },
  {
    name: "Labindia Analytical",
    logo: "/images/sponsors/labindia-logo.png",
    website: "https://labindia-analytical.com/",
    width: 759,
    height: 216,
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

          {/* WHY: Flex-wrap + justify-center (instead of CSS grid) so an incomplete last row is centred
              rather than leaving a lone card at the left edge (5 sponsors = 3 + 2 on desktop, 2 + 2 + 1 on tablet) */}
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8 pt-8">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit the ${sponsor.name} website`}
                // WHY: Widths subtract the gap share (gap-6 = 1.5rem, gap-8 = 2rem) so 2 / 3 cards fit per row exactly
                className="group flex w-full flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-[#82b9e7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2364b7] focus-visible:ring-offset-2 md:w-[calc(50%-0.75rem)] lg:w-[calc((100%-4rem)/3)]"
              >
                {/* WHY: A fixed, modest logo box keeps every logo at a similar visual size — very wide
                    logos are capped by width and squarer ones by height, so no sponsor dominates by accident */}
                <div className="flex h-20 md:h-24 w-full items-center justify-center">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={sponsor.width}
                    height={sponsor.height}
                    // WHY: Logo box is at most ~280px wide in the 3-column layout and ~85vw on phones; without this,
                    // high-density phones fetched the 3840px-wide variant
                    sizes="(min-width: 1024px) 300px, (min-width: 768px) 45vw, 85vw"
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
