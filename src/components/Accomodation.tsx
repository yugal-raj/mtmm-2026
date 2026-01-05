"use client"
import AboutCollageHeader from "./CollageHeader"
import { useEffect, useState } from "react";

export default function Accomodation() {
  const [isDesktop, setIsDesktop] = useState(false);

   useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const handler = () => {
        setIsDesktop(mq.matches);
    };
    handler(); // initial

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const hotelData = [
        { 
            name: "The Greenwood Hotel, Tezpur", 
            website: (<a href="https://www.thegreenwoodhotels.com" 
            style={{color:"#3737ff"}}>
              https://www.thegreenwoodhotels.com
            </a>),
            mobileWebsite: (<a href="https://www.thegreenwoodhotels.com" 
            style={{color:"#3737ff"}}>
              The Greenwood Hotel, Tezpur
            </a>)
        },
        { 
            name: "Cygnett Inn Imperial, Tezpur",
            website: (<a href="https://www.cygnetthotels.com/cygnett-inn-imperial-tezpur/unit-overview" 
            style={{color:"#3737ff"}}>
              https://www.cygnetthotels.com/cygnett-inn-imperial-tezpur/unit-overview
            </a>),
            mobileWebsite: (<a href="https://www.cygnetthotels.com/cygnett-inn-imperial-tezpur/unit-overview" 
            style={{color:"#3737ff"}}>
              Cygnett Inn Imperial, Tezpur
            </a>)
        },
        { 
            name: "KRC Hotel, Tezpur", 
             website: (<a href="http://www.krchotels.com" 
            style={{color:"#3737ff"}}>
              http://www.krchotels.com
            </a>),
            mobileWebsite: (<a href="http://www.krchotels.com" 
            style={{color:"#3737ff"}}>
              KRC Hotel, Tezpur
            </a>)
        },
        { name: "Heritage Tezpur", website: "", mobileWebsite: "Heritage Tezpur" }
    ];
  return (
    <section className="relative flex flex-col justify-center">
    <div className="w-full flex items-center justify-center">
        <AboutCollageHeader/>
      </div>
      <div className="w-full flex items-center justify-center pt-15">
        <div className="w-[80vw]"
            style={{
                maxWidth:"1280px"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >Accommodation</h2>
            <p className="pt-2 text-justify" 
                style={{"color":"black"}}
            >A limited number of comfortable accommodations is available on a chargeable basis in
Tezpur University Guest House and will be allotted on a first-come, first serve basis.</p>
             <p className="pt-4 text-justify" 
                style={{"color":"black"}}>
                  Following hotels located in Tezpur are recommended:
                </p>
        </div>
      </div>
      {isDesktop && <div className="w-full flex items-center justify-center pt-3">
        <div className="w-[80vw]"
            style={{
                maxWidth:"1280px"
            }}
        >
              <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead
                    style={{backgroundColor: "#b5dcff"}}
                    >
                        <tr>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                            Sl No.
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                            Hotel Name
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                            Website
                            </th>
                        </tr>
                    </thead>
                                    <tbody className="divide-y divide-gray-200 text-center">
                    {hotelData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-800">
                            {index+1}
                        </td>
                        <td className="px-6 py-4 text-gray-800">
                            {item.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                            <>{item.website}</>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
      </div>}
      {!isDesktop && <div className="w-full flex items-center justify-center pt-3">
        <div className="w-[80vw]"
            style={{
                maxWidth:"1280px"
            }}
        >
              <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead
                    style={{backgroundColor: "#b5dcff"}}
                    >
                        <tr>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                            Sl No.
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                            Hotel Name
                            </th>
                        </tr>
                    </thead>
                                    <tbody className="divide-y divide-gray-200 text-center">
                    {hotelData.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-800">
                            {index+1}
                        </td>
                        <td className="px-6 py-4 text-gray-800">
                            {item.mobileWebsite}
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
        </div>
      </div>}
    </section>
  );
}