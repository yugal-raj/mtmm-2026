import Link from "next/link"

export default function ContactAddress(){
    return (
        <div className="w-[80vw]"
            style={{
                maxWidth:"1280px"
            }}
        >
            <h2 className="text-[30px] font-bold text-center"
                style={{"color":"#2364b7"}}
            >Address of Correspondence</h2>
            <h3 className="font-bold text-center"
                style={{"color":"black", fontSize: "25px"}}
            >
               Dr. Nayanmoni Gogoi 
            </h3>
            <h4 className="text-[20px] font-bold text-center"
                style={{"color":"#854949"}}
            >
                Convener, MTMM
            </h4>
            <p className="pt-2 text-center" 
                style={{"color":"black"}}
            >Department of Chemical Sciences, Tezpur University<br/>Tezpur- 784028 Assam, India
            <br/>Email: <a href="mailto:mtmm2026@gmail.com"
                style={{color:"#3737ff"}}
            >mtmm2026@gmail.com</a> 
            <br/>Phone:+91-9401418488
</p>
        </div>
    )
}