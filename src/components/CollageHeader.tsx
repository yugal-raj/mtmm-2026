import Image from "next/image";

export default function ImageStrip() {
  const images = [
    "/collageImages/department_side_view.png",
    "/collageImages/rhino2.png",
    "/collageImages/main_gate.jpg",
    "/collageImages/field_sunset.png",
    "/collageImages/department_front_view.png",
  ];

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <div
        className="flex gap-2 overflow-hidden justify-center"
        style={{
          maxHeight: "300px",
          height: "40vw",
        }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 relative"
            style={{ width: "17vw", maxWidth: "245px", height: "100%" }}
          >
            <Image
              src={`/images${img}`} // remove double slash
              alt={`strip-${idx}`}
              fill
              className="object-cover rounded-lg pointer-events-none"
              sizes="(max-width: 768px) 90vw, 17vw"
              priority={idx === 1} // Only rhino.png gets priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}