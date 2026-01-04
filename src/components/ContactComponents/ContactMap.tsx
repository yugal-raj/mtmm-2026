export default function ContactMap(){
    return (
         <div className="w-[80vw]"
         style={{
            maxHeight: "460px",
            maxWidth: "1280px",
            height: "460px"
         }}
         >
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5417.614468905529!2d92.83156173551845!3d26.698549716006145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3744ebbf80096795%3A0x9c5303f81c770c3d!2sCouncil%20Hall!5e0!3m2!1sen!2sin!4v1767531903929!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border:"0"}}  
                loading="lazy">
            </iframe>
    </div>
    )
}