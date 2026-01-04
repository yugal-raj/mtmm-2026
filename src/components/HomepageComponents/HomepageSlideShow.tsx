import { useState, useEffect, useRef} from "react";

const images = [
  "images/koliabhumora.jpg",
  "images/tu_bird_eye_view.jpg",
  "images/department.png",
];

export default function HomepageSlideShow(){
  const [current, setCurrent] = useState(0);
  const autoSlide = useRef(true);
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!autoSlide.current) return;

      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const handler = () => setIsDesktop(mq.matches);
    handler(); // initial

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);



  // Pause auto-slide on click and schedule resume
  const pauseAndResume = () => {
    autoSlide.current = false;

    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }

    resumeTimeout.current = setTimeout(() => {
      autoSlide.current = true;
    }, 5000);
  };

  const handleClickPrev = () => {
    setCurrent((current - 1 + images.length) % images.length);
    pauseAndResume();
  };

  const handleClickNext = () => {
    setCurrent((current + 1) % images.length);
    pauseAndResume();
  };

  return (
    <section>
  <div className="relative w-[80vw] mx-auto">
    
    {/* Left Arrow */}
    <button
      onClick={handleClickPrev}
      className="absolute z-20 text-white bg-black"
      style={{
        fontSize: "50px",
        top: "250px",
        left: "0px",
        width: isDesktop? "80px":"50px",
        height: "80px",
        backgroundColor: isDesktop? "rgba(0, 0, 0, 0.3)":"rgba(0, 0, 0, 0.5)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20%", // circular button
        cursor: "pointer",
        backdropFilter: isDesktop? "blur(10px)":"", // frosted glass
        WebkitBackdropFilter: "blur(8px)", // Safari support
        border: "1px solid rgba(255, 255, 255, 0.2)" // optional border for glass effect
      }}
    >
      ‹
    </button>

      {/* Right Arrow */}
    <button
      onClick={handleClickNext}
      className="absolute z-20 text-white bg-black"
      style={{
        fontSize: "50px",
        top: "250px",
        right: "0px",
        width: isDesktop? "80px":"50px",
        height: "80px",
        backgroundColor: isDesktop? "rgba(0, 0, 0, 0.3)":"rgba(0, 0, 0, 0.5)", // semi-transparent black
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20%", // circular button
        cursor: "pointer",
        backdropFilter: isDesktop? "blur(10px)":"", // frosted glass
        WebkitBackdropFilter: "blur(8px)", // Safari support
        border: "1px solid rgba(255, 255, 255, 0.2)" // optional border for glass effect
      }}
    >
      ›
    </button>

    {/* Slider Image */}
    <div className="z-10 text-black bg-blue-important">
      <img
      src={images[current]}
      alt="slide"
      className="w-full h-[580px] object-cover pointer-events-none"
    />
    </div>
  </div>
</section>
  );
}