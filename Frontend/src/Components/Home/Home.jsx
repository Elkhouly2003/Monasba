import React, { useState } from "react";
import img1 from "../../assets/icons/Wedding_Icon.png";
import img2 from "../../assets/icons/Birthday_Cake_Icon.png";
import img3 from "../../assets/icons/Graduation_Cap_Icon.png";
import img4 from "../../assets/icons/Restaurant_Table_Icon.svg";
import img5 from "../../assets/icons/Diamond_Ring_Icon.png";
import img6 from "../../assets/icons/Two_Tickets_Icon.png";
import img7 from "../../assets/icons/Workshop_Icon.png";
import img8 from "../../assets/icons/Search_More_Icon.png";
import img9 from "../../assets/icons/Confetti_Icon.png";
import img10 from "../../assets/icons/User_Icon.png";
import img11 from "../../assets/icons/Discover_Icon.png";
import img12 from "../../assets/icons/Secure_Booking_Icon.png";
import img13 from "../../assets/icons/Relax_Icon.png";
import img14 from "../../assets/icons/Star_Filled_Icon.png";
import img15 from "../../assets/icons/sumatra-weddings.png";
import Categorie from "../Categorie/Categorie";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const STATIC_CATEGORIES = [
  { id: 1, name: "Wedding", description: "Make your big day unforgettable." },
  { id: 2, name: "Birthday", description: "Celebrate another year of joy." },
  { id: 3, name: "Graduation Party", description: "Honor your achievement." },
  { id: 4, name: "Dinner", description: "Perfect settings for fine dining." },
  { id: 5, name: "Engagement", description: "Start your journey together." },
  { id: 6, name: "Day Use", description: "Relax and recharge for a day." },
  { id: 7, name: "Workshops", description: "Learn and grow in great spaces." },
  { id: 8, name: "Explore All", description: "Find exactly what you need." },
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  function getImageForCategory(name) {
    const n = name.toLowerCase();
    if (n.includes("wedding")) return img1;
    if (n.includes("birthday")) return img2;
    if (n.includes("graduation")) return img3;
    if (n.includes("dinner")) return img4;
    if (n.includes("engagement")) return img5;
    if (n.includes("day")) return img6;
    if (n.includes("workshop")) return img7;
    if (n.includes("explore")) return img8;
    return img8;
  }

  const getBookingByUser = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/v1.0/placess`);
    return data;
  };

  const { data: places, isLoading: loading } = useQuery({
    queryKey: ["places"],
    queryFn: () => getBookingByUser(),
  });

  const slides = places?.data?.slice(0, 3) || [];
  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <>
      <Nav />
      {loading ? (
        <div
          role="status"
          className="fixed top-0 start-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-50"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div id="home" className="w-full py-10">
          <div className="container mx-auto mb-6 pl-5">
            <h2 className="font-bold text-2xl">Recommended for You</h2>
          </div>

          <div className="container mx-auto px-4 md:px-20">
            <div className="relative w-full">
              <div className="relative h-72 md:h-[500px] overflow-hidden rounded-3xl">
                {slides.map((place, index) => {
                  const imageId = place.imagesID?.[0];
                  return (
                    <div
                      key={place.placeId}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentSlide
                          ? "opacity-100"
                          : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <img
                        src={
                          imageId
                            ? `http://localhost:8080/api/v1.0/imagess/${imageId}`
                            : img15
                        }
                        className="w-full h-full object-cover rounded-3xl"
                        alt={place.placeName}
                      />
                    </div>
                  );
                })}
              </div>

              {totalSlides > 0 && (
                <>
                  <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`w-3 h-3 rounded-full transition cursor-pointer ${
                          currentSlide === i ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={prevSlide}
                    className="absolute top-0 left-0 z-30 flex items-center justify-center h-full cursor-pointer px-4"
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:scale-110 transition">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M15 19l-7-7 7-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute top-0 right-0 z-30 flex items-center justify-center h-full cursor-pointer px-4"
                  >
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:scale-110 transition">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl pt-6 px-3 font-bold text-gray-900"
          id="categories"
        >
          Categories
        </h1>

        <div className="p-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {STATIC_CATEGORIES.map((cat) => (
            <Categorie
              key={cat.id}
              title={cat.name}
              image={getImageForCategory(cat.name)}
              text={cat.description}
            />
          ))}
        </div>
      </div>

      <div id="about" className="w-full bg-(--color-steel-blue) py-16">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 text-white p-5">
          <div className="flex flex-col justify-center pr-0 lg:pr-24">
            <h3 className="text-3xl font-bold mb-4">
              Making Every Event Memorable
            </h3>
            <p className="text-xs text-(--color-light-neutral) mb-8 leading-7">
              We connect you with the perfect venues for weddings, birthdays,
              day use, and more. Our platform is built to make booking simple,
              transparent, and stress-free.
            </p>

            <div className="flex items-center gap-4">
              <button className="text-white bg-(--color-state-blue) border border-[#2C3E50] hover:bg-[#1B2E4F] shadow-md font-medium rounded-2xl text-sm px-5 py-3 text-center">
                <span className="font-bold">100+</span>
                <br />
                Events
              </button>
              <button className="text-white bg-(--color-state-blue) border border-[#2C3E50] hover:bg-[#1B2E4F] shadow-md font-medium rounded-2xl text-sm px-5 py-3 text-center">
                <div className="flex justify-center items-center gap-1">
                  <span className="font-bold">4.8</span>
                  <img src={img14} alt="star" className="w-4 h-4" />
                </div>
                Avg Rating
              </button>
              <button className="text-white bg-(--color-state-blue) border border-[#2C3E50] hover:bg-[#1B2E4F] shadow-md font-medium rounded-2xl text-sm px-5 py-3 text-center">
                <span className="font-bold">24/7</span>
                <br />
                Support
              </button>
            </div>
          </div>

          <div className="bg-(--color-dark-navy) rounded-2xl p-10 relative shadow-lg">
            <div className="relative w-full">
              <div className="relative h-40 md:h-56 overflow-hidden">
                <div className="absolute inset-0 flex flex-col justify-center">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    What People Say
                  </h3>
                  <p className="text-neutral-secondary-light mb-1">
                    “Great experience, I found the best venue for my birthday”
                  </p>
                  <span className="text-neutral-secondary-light text-sm">
                    Ali Gado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ... Remaining components like Post Your Event section ... */}
    </>
  );
}

export default Home;
