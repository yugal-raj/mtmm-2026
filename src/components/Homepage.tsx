"use client";
import HomepageSlideShow from "@/components/HomepageComponents/HomepageSlideShow"
import HomepageAbout from "@/components/HomepageComponents/HomepageAbout"
import HomepageImportantDates from "@/components/HomepageComponents/HomepageImportantDates"

export default function Homepage() {
  return (
    <section className="relative flex flex-col justify-center">
      <div className="w-full flex items-center justify-center">
        <HomepageSlideShow/>
      </div>
      <div className="w-full flex items-center justify-center pt-15">
        <HomepageAbout/>
      </div>
      <div className="w-full flex items-center justify-center pt-15">
        <HomepageImportantDates/>
      </div>
    </section>
  );
}