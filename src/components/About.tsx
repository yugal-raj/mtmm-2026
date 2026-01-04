"use client";
import AboutUniversity from "@/components/AboutComponents/AboutUniversity"
import AboutDepartment from "./AboutComponents/AboutDepartment";
import AboutTezpur from "./AboutComponents/AboutTezpur";
import CollageHeader from "./CollageHeader"
import PlacesToVisit from "./AboutComponents/PlacesToVisit"

export default function Homepage() {
  return (
    <section className="relative flex flex-col justify-center">
    <div className="w-full flex items-center justify-center">
        <CollageHeader/>
      </div>
      <div className="w-full flex items-center justify-center pt-15">
        <AboutUniversity/>
      </div>
      <div className="w-full flex items-center justify-center pt-15">
            <AboutDepartment/>
        </div>
        <div className="w-full flex items-center justify-center pt-15">
            <AboutTezpur/>
        </div>
         <div className="w-full flex items-center justify-center pt-15">
            <PlacesToVisit/>
        </div>
    </section>
  );
}