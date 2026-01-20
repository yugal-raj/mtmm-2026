"use client";
import Speakers from "@/components/DelegatesComponents/Speakers"
import CollageHeader from "./CollageHeader"
export default function Delegates() {
  return (
    <section className="relative flex flex-col justify-center">
      <div className="w-full flex items-center justify-center">
          <CollageHeader/>
      </div>
      <div className="w-full flex items-center justify-center pt-15">
        <Speakers/>
      </div>
    </section>
  );
}