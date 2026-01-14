import { useState } from "react";

const ImageSlider = ({ images = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full mx-auto group">
      <div className="w-full aspect-video sm:aspect-[3/2] lg:aspect-[1102/569] relative overflow-hidden rounded-3xl shadow-lg">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex}`}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform scale-100 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/30 backdrop-blur-md hover:bg-white/90 text-dark-navy rounded-full shadow-lg z-10 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/30 backdrop-blur-md hover:bg-white/90 text-dark-navy rounded-full shadow-lg z-10 transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </>
        )}
      </div>

      <div className="mt-4 flex space-x-2 justify-center">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              currentImageIndex === index
                ? "w-8 h-2 bg-state-blue"
                : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
