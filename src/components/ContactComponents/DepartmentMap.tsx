export default function DepartmentMap(){
    return (
         <div className="w-[80vw]"
         style={{
            maxHeight: "460px",
            maxWidth: "1280px",
            height: "460px"
         }}
         >
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3564.4160243633496!2d92.83158957521658!3d26.699153276775007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3744ebbf6a35e0a5%3A0x5bad8395f216a21c!2sDepartment%20of%20Chemical%20Sciences!5e0!3m2!1sen!2sin!4v1767533016312!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border:"0"}}  
                loading="lazy">
            </iframe>
    </div>
    )
}