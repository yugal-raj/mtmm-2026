export default function ImageStrip() {
  const images = [
          "/collageImages/department_side_view.png",
          "/collageImages/rhino.png",
          "/collageImages/main_gate.jpg",
          "/collageImages/field_sunset.png",
          "/collageImages/department_front_view.png",
        ]

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex gap-2 overflow-hidden justify-center"
      style={{
        maxHeight:"300px",
        height: "40vw"
      }}
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={`/images/${img}`}
            alt={`strip-${idx}`}
            className="h-full object-cover rounded-lg flex-shrink-0"
            style={{
                width:"17vw"
            }}
          />
        ))}
      </div>
    </div>
  );
}
