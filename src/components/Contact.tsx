import ContactMap from "./ContactComponents/ContactMap";
import AboutCollageHeader from "./CollageHeader";
import ContactAddress from "./ContactComponents/ContactAddress";
import ContactVenue from "./ContactComponents/Venue";
import DepartmentMap from "./ContactComponents/DepartmentMap";
import HowToReach from "./ContactComponents/HowToReach";

export default function Contact(){
    return (
         <section className="relative flex flex-col justify-center">
            <div className="w-full flex items-center justify-center">
                <AboutCollageHeader/>
              </div>
              <div className="w-full flex items-center justify-center pt-15">
                <ContactAddress/>
              </div>
              <div className="w-full flex items-center justify-center pt-15">
                <ContactVenue/>
              </div>
              <div className="w-full flex items-center justify-center pt-15">
                <HowToReach/>
              </div>
              <div className="w-full flex items-center justify-center pt-15">
                <ContactMap/>
              </div>
              <div className="w-full flex items-center justify-center pt-15">
                <DepartmentMap/>
              </div>
        </section>
    )
}