import AboutCollageHeader from "./CollageHeader"

export default function Accomodation() {
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
            >For Faculty and Scientists</h2>
            <p className="pt-2 text-justify" 
                style={{"color":"black"}}
            >Comfortable accommodation will be provided on a chargeable basis in University Guest
Houses and select hotels located near the Tezpur University campus. Further details
regarding the arrangements will be communicated in due course.</p>
        </div>
      </div>
      <div className="w-full flex items-center justify-center pt-15">
        <div className="w-[80vw]"
            style={{
                maxWidth:"1280px"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >For PhD Students/ PostDocs</h2>
            <p className="pt-2 text-justify" 
                style={{"color":"black"}}
            >(Per day for PhD Students)<br/>(Per day for Postdocs Students)  
            </p>
        </div>
      </div>
    </section>
  );
}