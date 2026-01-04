import AboutCollageHeader from "./CollageHeader"
import ComingSoon from "./ComingSoon"
export default function Sponsors() {
  return (
    <section className="relative flex flex-col justify-center">
    <div className="w-full flex items-center justify-center">
        <AboutCollageHeader/>
      </div>
      <div className="w-full flex items-center justify-center pt-15">
        <ComingSoon/>
      </div>
    </section>
  );
}