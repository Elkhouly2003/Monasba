import { useState } from "react";
import eventImage from "../../assets/icons/sumatra-weddings.png";

const ImageSlider = () => {
  const images = [{ src: eventImage, alt: "Event Image" }];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <div className="relative w-full max-w-[1320px] mx-auto rounded-2xl overflow-hidden ">
      <div className="w-full aspect-video sm:aspect-3/2 lg:aspect-1102/569 relative">
        <img
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 rounded-2xl"
        />

        <button className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 px-2 py-1 sm:px-4 sm:py-3 sm:text-xl bg-white/50 hover:bg-white/80 rounded-full shadow-md z-10 transition duration-300 ease-in-out">
          <i className="fa-solid fa-arrow-left"></i>
        </button>

        <button className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 px-2 py-1 sm:px-4 sm:py-3 sm:text-xl bg-white/50 hover:bg-white/80 rounded-full shadow-md z-10 transition duration-300 ease-in-out">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
      <div className="p-2 flex space-x-2 justify-center">
        {images.map((img, index) => (
          <span
            key={index}
            className={`sm:w-4 sm:h-4 w-3 h-3 rounded-full bg-dark-navy `}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
