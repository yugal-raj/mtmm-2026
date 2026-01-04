import AboutCollageHeader from "./CollageHeader"
import RegistrationTable from "./RegistrationComponents/RegistartionTable"
export default function Registration() {
  return (
    <section className="relative flex flex-col justify-center">
    <div className="w-full flex items-center justify-center">
        <AboutCollageHeader/>
      </div>
      <div className="w-full flex items-center justify-center pt-15">
        <RegistrationTable/>
      </div>
    </section>
  );
}