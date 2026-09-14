"use client";
import HomepageSlideShow from "@/components/HomepageComponents/HomepageSlideShow"
import HomepageAbout from "@/components/HomepageComponents/HomepageAbout"
import HomepageImportantDates from "@/components/HomepageComponents/HomepageImportantDates"
import NotificationBar from "@/components/NotificationBar"

export default function Homepage() {
  return (
    <section className="relative flex flex-col justify-center">
      {/* WHY: pb-1 mirrors the pt-1 gap between the nav bar and this strip (set in app/page.tsx) */}
      <div className="w-full pb-1">
        <NotificationBar/>
      </div>
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