import React, { useEffect, useState } from "react";
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
import SearchBar from "../SearchBar/SearchBar";
import Nav from "../Nav/Nav";
import { Link } from "react-router-dom";

function Home() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const baseUrl = "http://localhost:8080/api/v1.0/categories";
        const url = `${baseUrl}?page=0&size=20`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const responseJson = await response.json();
        const responseData = responseJson._embedded?.categories || [];
        const loaded = responseData.map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description || "",
          href: c._links?.self?.href,
        }));

        setCategories(loaded);
      } catch (err) {
        setHttpError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  function getImageForCategory(name, index) {
    if (!name) return images[index] ?? images[0];
    const n = name.toLowerCase();
    if (n.includes("wedding")) return img1;
    if (n.includes("birthday")) return img2;
    if (n.includes("graduation")) return img3;
    if (n.includes("dinner")) return img4;
    if (n.includes("engagement")) return img5;
    if (n.includes("day")) return img6;
    if (n.includes("workshop")) return img7;
    if (n.includes("explore")) return img8;
    return images[index] ?? images[0];
  }

  return (
    <>
      <Nav />
      <div className="w-full py-10">
        <div className="container mx-auto mb-6 pl-5">
          <h2 className="font-bold text-2xl">Recommended for You</h2>
        </div>

        <div className="container mx-auto px-4 md:px-20">
          <div
            id="default-carousel"
            className="relative w-full"
            data-carousel="slide"
          >
            <div className="relative h-72 md:h-[500px] overflow-hidden rounded-3xl">
              <div
                className="hidden duration-700 ease-in-out"
                data-carousel-item
              >
                <img
                  src={img15}
                  className="block w-full h-full object-cover rounded-3xl"
                  alt="Event"
                />
              </div>

              <div
                className="hidden duration-700 ease-in-out"
                data-carousel-item
              >
                <img
                  src={img15}
                  className="block w-full h-full object-cover rounded-3xl"
                  alt="Event"
                />
              </div>

              <div
                className="hidden duration-700 ease-in-out"
                data-carousel-item
              >
                <img
                  src={img15}
                  className="block w-full h-full object-cover rounded-3xl"
                  alt="Event"
                />
              </div>
            </div>

            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
              <button
                className="w-3 h-3 rounded-full bg-gray-300"
                data-carousel-slide-to="0"
              ></button>
              <button
                className="w-3 h-3 rounded-full bg-gray-300"
                data-carousel-slide-to="1"
              ></button>
              <button
                className="w-3 h-3 rounded-full bg-gray-300"
                data-carousel-slide-to="2"
              ></button>
            </div>

            <button
              type="button"
              className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
              data-carousel-prev
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md group-hover:scale-110 transition">
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
              type="button"
              className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group"
              data-carousel-next
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-md group-hover:scale-110 transition">
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
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <SearchBar />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-3xl pt-6 px-3 font-bold text-gray-900"
          id="categories"
        >
          Categories
        </h1>

        <div
          className="
      p-6 
      grid 
      gap-6 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
    "
        >
          {isLoading ? (
            <div className="container m-5">
              <p>Loading categories...</p>
            </div>
          ) : httpError ? (
            <div className="container m-5">
              <p>{httpError}</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="container m-5">
              <p>No categories to display.</p>
            </div>
          ) : (
            categories.map((cat, index) => (
              <Categorie
                key={cat.id ?? index}
                title={cat.name}
                image={getImageForCategory(cat.name, index)}
                text={cat.description ?? ""}
              />
            ))
          )}
        </div>
      </div>

      <div id="about" className="w-full bg-(--color-steel-blue) py-16">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 text-white p-5">
          <div className="flex flex-col justify-center pr-0 lg:pr-24">
            <h3 className="text-3xl font-bold mb-4">
              Making Every Event Memorable
            </h3>

            <p className="text-xs text-(--color-light-neutral) text-neutral-secondary-light mb-8 leading-7">
              We connect you with the perfect venues for weddings, birthdays,
              day use, and more. Our platform is built to make booking simple,
              transparent, and stress-free.
            </p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-white bg-(--color-state-blue) border border-[#2C3E50] hover:bg-[#1B2E4F] shadow-md font-medium rounded-2xl text-sm px-5 py-3 text-center"
              >
                <span className="font-bold">100+</span>
                <br />
                Events
              </button>

              <button
                type="button"
                className="text-white bg-(--color-state-blue) border border-[#2C3E50] hover:bg-[#1B2E4F] shadow-md font-medium rounded-2xl text-sm px-5 py-3 text-center"
              >
                <div className="flex justify-center items-center gap-1">
                  <span className="font-bold">4.8</span>
                  <img src={img14} alt="star" className="w-4 h-4" />
                </div>
                Avg Rating
              </button>

              <button
                type="button"
                className="text-white bg-(--color-state-blue) border border-[#2C3E50] hover:bg-[#1B2E4F] shadow-md font-medium rounded-2xl text-sm px-5 py-3 text-center"
              >
                <span className="font-bold">24/7</span>
                <br />
                Support
              </button>
            </div>
          </div>

          <div className="bg-(--color-dark-navy) rounded-2xl p-10 relative shadow-lg">
            <div
              id="default-carousel"
              className="relative w-full"
              data-carousel="slide"
            >
              <div className="relative h-40 md:h-56 overflow-hidden">
                <div
                  className="duration-700 ease-in-out"
                  data-carousel-item="active"
                >
                  <div className="absolute inset-0 flex flex-col justify-center  ">
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

                <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
                >
                  <div className="absolute inset-0 flex flex-col justify-center  ">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      What People Say
                    </h3>
                    <p className="text-neutral-secondary-light mb-1">
                      “Amazing service! Booking was super easy”
                    </p>
                    <span className="text-neutral-secondary-light text-sm">
                      Mariam
                    </span>
                  </div>
                </div>

                <div
                  className="hidden duration-700 ease-in-out"
                  data-carousel-item
                >
                  <div className="absolute inset-0 flex flex-col justify-center  ">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      What People Say
                    </h3>
                    <p className="text-neutral-secondary-light mb-1">
                      “Perfect for finding unique venues”
                    </p>
                    <span className="text-neutral-secondary-light text-sm">
                      Khaled
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute z-30 flex -translate-x-1/2 bottom-3 left-1/2 space-x-2">
                <button
                  className="w-2.5 h-2.5 rounded-full bg-white/40"
                  data-carousel-slide-to="0"
                ></button>
                <button
                  className="w-2.5 h-2.5 rounded-full bg-white/40"
                  data-carousel-slide-to="1"
                ></button>
                <button
                  className="w-2.5 h-2.5 rounded-full bg-white/40"
                  data-carousel-slide-to="2"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row justify-center items-stretch gap-10 md:gap-12 py-10">
        <div className="bg-white flex-1 p-6 shadow-md rounded-2xl">
          <div className="flex items-center pb-3 pt-3">
            <img src={img9} className="h-8" alt="Confetti_Icon" />
            <h3 className="font-bold text-2xl px-2">Post Your Event</h3>
          </div>

          <p className="text-(--color-state-blue) text-sm pb-5 leading-relaxed">
            Reach thousands of customers searching for the perfect <br />
            location. Expand your business with Monasba.
          </p>

          <div className="pb-5 space-y-2">
            {[
              "Showcase your venue with photos & details",
              "Get more bookings with verified reviews",
              "Manage availability & reservations easily",
              "Promote special offers or packages",
            ].map((text, index) => (
              <div key={index} className="flex items-center">
                <i className="fa-solid fa-check pr-2"></i>
                <span className="text-sm text-(--color-state-blue)">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="bg-(--color-state-blue) w-full border border-gray-300 focus:outline-none hover:opacity-90 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 text-white dark:border-gray-600"
          >
            Join As Event
          </button>
        </div>

        <div className="bg-white flex-1 p-6 shadow-md rounded-2xl ">
          <div className="flex items-center pb-3 pt-3">
            <img src={img10} className="h-8" alt="Confetti_Icon" />
            <h3 className="font-bold text-2xl px-2">Find Your Perfect Event</h3>
          </div>

          <p className="text-(--color-state-blue) text-sm pb-5 leading-relaxed">
            Discover thousands of curated event spaces for weddings, <br />
            parties, or corporate use. Booking made simple.
          </p>

          <div className="pb-5 space-y-2">
            {[
              "Browse hundreds of verified events",
              "Filter by location, budget, and type",
              "Read trusted reviews before booking",
              "Save favorites & book instantly",
            ].map((text, index) => (
              <div key={index} className="flex items-center">
                <i className="fa-solid fa-check pr-2"></i>
                <span className="text-sm text-(--color-state-blue)">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="bg-(--color-state-blue) w-full border border-gray-300 focus:outline-none hover:opacity-90 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 text-white dark:border-gray-600"
          >
            Join As Event
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="container text-center mt-3 mb-3">
          <h2 className="text-3xl font-extrabold">
            How Monasba Makes Booking Easy
          </h2>
          <p className="p-2 text-(--color-state-blue)">
            Simple, transparent, and stress-free event management in three
            steps.
          </p>
        </div>

        <div className="w-full flex justify-center py-14">
          <div
            className="
        w-full max-w-[1200px] 
        grid 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
        gap-12 sm:gap-10 lg:gap-14 
        px-6 relative
      "
          >
            <div className="absolute top-10 left-0 right-0 -z-10 mx-auto h-[3px] bg-gray-400 w-full hidden lg:block"></div>

            <div className="flex flex-col items-center text-center max-w-[260px] mx-auto">
              <img src={img11} alt="" />
              <h3 className="text-base font-bold pt-2">
                1. Discover & Compare
              </h3>
              <p className="text-(--color-state-blue) text-sm pt-2.5">
                Browse verified venues, filter by category, date, and budget.
                View photos, details, and reviews instantly
              </p>
            </div>

            <div className="flex flex-col items-center text-center max-w-[260px] mx-auto">
              <img src={img12} alt="" />
              <h3 className="text-base font-bold pt-2">
                2. Secure Your Booking
              </h3>
              <p className="text-(--color-state-blue) text-sm pt-2.5">
                Contact venues directly or book instantly with our secure,
                transparent reservation system and payment processing.
              </p>
            </div>

            <div className="flex flex-col items-center text-center max-w-[260px] mx-auto">
              <img src={img13} alt="" />
              <h3 className="text-base font-bold pt-2">3. Relax & Celebrate</h3>
              <p className="text-(--color-state-blue) text-sm pt-2.5">
                With all the details sorted, you can focus on enjoying your
                event. We handle the management, you handle the fun!
              </p>
            </div>
          </div>
        </div>

        <div className="container flex justify-center mb-7">
          <Link to="/search">
            <button
              className="
      bg-(--color-state-blue) 
      border border-gray-300 
      hover:opacity-90 
      font-medium rounded-full 
      text-sm px-5 py-2.5 text-white
      cursor-pointer
    "
            >
              Start Browsing Venues Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
