import AboutCollageHeader from "@/components/CollageHeader"
import HomepageImporatantDates from "@/components/HomepageComponents/HomepageImportantDates"

export default function Home() {
  return (
  <div className="bg-white pt-1 pb-15">
    <div className="w-full flex items-center justify-center">
        <AboutCollageHeader/>
    </div>
    <div className="w-full flex items-center justify-center pt-15"
    >
        <HomepageImporatantDates/>
    </div>
  </div>
  )
}