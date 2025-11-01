import img1 from "../../assets/icons/redbow_icon.png";
import img2 from "../../assets/icons/spoon.png";
import img3 from "../../assets/icons/idea.png";
import img4 from "../../assets/icons/fork.png";
import img5 from "../../assets/icons/sun.png";
import img6 from "../../assets/icons/moon.png";
import img7 from "../../assets/icons/Arrow_Right.png";
import img8 from "../../assets/icons/Rose1.png";
import img9 from "../../assets/icons/Rose2.png";
import img10 from "../../assets/icons/Rose3.png";
import img11 from "../../assets/icons/medal1.png";
import img12 from "../../assets/icons/medal2.png";
import img13 from "../../assets/icons/balloon1.png";
import img14 from "../../assets/icons/balloon2.png";
import img15 from "../../assets/icons/balloon3.png";

export default function Categorie({ title, image, text }) {
  return (
    <div className="flex justify-center items-center p-4 sm:p-6 md:p-8">
      <div
        className="
          relative
          bg-white 
          rounded-xl 
          shadow-lg 
          p-4 sm:p-6 
          text-center 
          border border-gray-200 
          w-52 sm:w-64 md:w-72 lg:w-80 
          transition-transform 
          hover:scale-105 
          duration-300
          group
          z-10
        "
      >
        {title.toLowerCase() === "wedding" && (
          <img
            src={img1}
            alt="Ribbon"
            className="
              absolute 
              top-0
              right-1 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
          />
        )}
        {title.toLowerCase() === "workshops" && (
          <>
            <img
              src={img3}
              alt="Idea"
              className="
              absolute 
              top-2 
              right-2 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
            <img
              src={img3}
              alt="Idea"
              className="
              absolute 
              top-2 
              left-2 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
          </>
        )}
        {title.toLowerCase() === "dinner" && (
          <>
            <img
              src={img2}
              alt="Idea"
              className="
              absolute 
              top-2 
              left-2 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
            <img
              src={img4}
              alt="Idea"
              className="
              absolute 
              top-2 
              right-2 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
          </>
        )}
        {title.toLowerCase() === "day use" && (
          <>
            <img
              src={img5}
              alt="Idea"
              className="
              absolute 
              top-2 
              left-2 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
            <img
              src={img6}
              alt="Idea"
              className="
              absolute 
              top-2 
              right-2 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
          </>
        )}
        {title.toLowerCase() === "explore all" && (
          <img
            src={img7}
            alt="Idea"
            className="
              absolute 
              top-2 
              right-2 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
          />
        )}
        {title.toLowerCase() === "engagement" && (
          <>
            <img
              src={img8}
              alt="Idea"
              className="
              absolute 
              top-0
              left-5 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
            <img
              src={img10}
              alt="Idea"
              className="
              absolute 
              top-7 
              right-0 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
            <img
              src={img9}
              alt="Idea"
              className="
              absolute 
              top-20
              left-0
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
          </>
        )}
        {title.toLowerCase() === "graduation party" && (
          <>
            <img
              src={img11}
              alt="Idea"
              className="
              absolute 
              top-0 
              right-1
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
            <img
              src={img12}
              alt="Idea"
              className="
              absolute 
              top-0 
              right-10 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
            <img
              src={img11}
              alt="Idea"
              className="
              absolute 
              top-0 
              left-3 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
            <img
              src={img12}
              alt="Idea"
              className="
              absolute 
              top-0 
              left-12 
              w-5 sm:w-7 md:w-9 lg:w-11
              opacity-0 
              group-hover:opacity-100 
              transition-opacity 
              duration-300
            "
            />
          </>
        )}
        {title.toLowerCase() === "birthday" && (
          <>
            <img
              src={img13}
              alt="Balloon 1"
              className="
        absolute 
        -top-8 
        left-4 
        w-5 sm:w-7 md:w-9 lg:w-11
        opacity-0 
        translate-y-6
        group-hover:opacity-100 
        group-hover:translate-y-0
        transition-all 
        duration-700
        ease-out
      "
            />
            <img
              src={img14}
              alt="Balloon 2"
              className="
        absolute 
        -top-10 
        left-1/2 
        transform 
        -translate-x-1/2
        w-5 sm:w-7 md:w-9 lg:w-11
        opacity-0 
        translate-y-6
        group-hover:opacity-100 
        group-hover:translate-y-0
        transition-all 
        duration-700 
        ease-out
        delay-100
      "
            />
            <img
              src={img15}
              alt="Balloon 3"
              className="
        absolute 
        -top-8 
        right-4 
        w-5 sm:w-7 md:w-9 lg:w-11
        opacity-0 
        translate-y-6
        group-hover:opacity-100 
        group-hover:translate-y-0
        transition-all 
        duration-700 
        ease-out
        delay-200
      "
            />
          </>
        )}

        <img
          src={image}
          alt={title}
          className="mx-auto mb-4 sm:mb-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
        />
        <h3
          className="
            text-base sm:text-lg md:text-xl 
            font-semibold 
            text-gray-900 
            mb-2 sm:mb-3
          "
        >
          {title}
        </h3>
        <p
          className="
            italic 
            text-gray-500 
            text-xs sm:text-sm md:text-base 
            px-2
          "
        >
          {text}
        </p>
      </div>
    </div>
  );
}
