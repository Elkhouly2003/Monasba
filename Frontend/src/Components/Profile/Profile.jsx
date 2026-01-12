import React from "react";
import img1 from "../../assets/icons/booking.png";
import img2 from "../../assets/icons/bookmark.png";
import img3 from "../../assets/icons/star.png";
import img4 from "../../assets/icons/bell.png";
import img5 from "../../assets//icons/sumatra-weddings.png";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getNotifications = async (userId) => {
  const { data } = await axios.get(
    `http://localhost:8080/api/v1.0/notifications/user/${userId}`
  );
  return data;
};

export default function Profile({ userId }) {
  const [active, setActive] = useState("My Bookings");

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getNotifications(userId),
    enabled: !!userId,
  });

  return (
    <>
      <div className="w-full bg-(--color-dark-navy)">
        <div className=" container pt-10 pb-10">
          <form className="max-w-sm mx-auto space-y-4">
            <div>
              <label
                htmlFor="visitors"
                className="block mb-2.5 text-sm text-(--color-light-neutral) font-medium text-heading"
              >
                Full Name
              </label>
              <input
                type="text"
                id="visitors"
                className="bg-(--color-steel-blue) rounded-xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2.5 text-sm text-(--color-light-neutral) font-medium text-heading"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-(--color-steel-blue) rounded-xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="tel"
                className="block mb-2.5 text-sm text-(--color-light-neutral) font-medium text-heading"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="tel"
                className="bg-(--color-steel-blue) rounded-xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="password1"
                className="block mb-2.5 text-sm text-(--color-light-neutral) font-medium text-heading"
              >
                Current Password
              </label>
              <input
                type="password"
                id="password1"
                className="bg-(--color-steel-blue) rounded-xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2.5 text-sm text-(--color-light-neutral) font-medium text-heading"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-(--color-steel-blue) rounded-xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder=""
                required
              />
            </div>
            <button
              type="submit"
              className=" cursor-pointer text-white bg-cyan-900 rounded-2xl box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Save
            </button>
          </form>
        </div>
      </div>

      <div className="w-full">
        <div
          className=" container p-6 
      grid 
      gap-6 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4"
        >
          <div
            onClick={() => setActive("My Bookings")}
            className="flex justify-center items-center cursor-pointer p-4 sm:p-6 md:p-8"
          >
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
              <img
                src={img1}
                alt=""
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
                My Bookings
              </h3>
            </div>
          </div>
          <div
            onClick={() => setActive("Saved Events")}
            className="flex justify-center items-center cursor-pointer p-4 sm:p-6 md:p-8"
          >
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
              <img
                src={img2}
                alt=""
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
                Saved Events
              </h3>
            </div>
          </div>
          <div
            onClick={() => setActive("Reviews")}
            className="flex justify-center items-center cursor-pointer p-4 sm:p-6 md:p-8"
          >
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
              <img
                src={img3}
                alt=""
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
                Reviews
              </h3>
            </div>
          </div>
          <div
            onClick={() => setActive("Notifications")}
            className="flex justify-center items-center cursor-pointer p-4 sm:p-6 md:p-8"
          >
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
              <img
                src={img4}
                alt=""
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
                Notifications
              </h3>
            </div>
          </div>
        </div>
      </div>

      {active === "My Bookings" && (
        <div className="w-full mb-6">
          <div className="container mx-auto mb-6 pl-5">
            <h2 className="font-bold text-2xl">My Bookings</h2>
          </div>

          <div className="container bg-white rounded-xl shadow-sm p-6 space-y-4">
            <div className="pb-4 border-b border-gray-200 mx-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xl">
                    Wedding at Cairo Hall
                  </h3>
                  <span className="text-(--color-state-blue) text-sm">
                    12 Oct 2025
                  </span>
                </div>

                <div className="flex gap-2">
                  <button className="text-white bg-neutral-800 rounded-xl text-sm py-1 px-3">
                    View Invitation
                  </button>
                  <button className="text-white bg-green-700 rounded-xl text-sm py-1 px-3">
                    Confirmed
                  </button>
                </div>
              </div>
            </div>

            <div className="pb-4 border-b border-gray-200 mx-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xl">
                    Wedding at Cairo Hall
                  </h3>
                  <span className="text-(--color-state-blue) text-sm">
                    12 Oct 2025
                  </span>
                </div>

                <div className="flex gap-2">
                  <button className="text-white bg-amber-300 rounded-xl text-sm py-1 px-3">
                    Pending
                  </button>
                  <button className="text-white bg-red-600 rounded-xl text-sm py-1 px-3">
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <div className="mx-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xl">
                    Wedding at Cairo Hall
                  </h3>
                  <span className="text-(--color-state-blue) text-sm">
                    12 Oct 2025
                  </span>
                </div>

                <div className="flex gap-2">
                  <button className="text-white bg-red-300 rounded-xl text-sm py-1 px-3">
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {active === "Saved Events" && (
        <div className="w-full mb-6">
          <div className="container mx-auto mb-6 pl-5">
            <h2 className="font-bold text-2xl">Saved Events</h2>
          </div>
          <div>
            <div className="max-w-8xl mx-auto px-2 sm:px-4">
              <div className="mt-6 mb-8 grid gap-8 grid-cols-1 [@media(min-width:650px)_and_(max-width:764px)]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="bg-white text-steel-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group">
                  <div className="absolute top-3 left-3 z-20 bg-state-blue text-light-neutral px-3 py-1 text-sm font-medium rounded-full opacity-90 backdrop-blur-sm">
                    Wedding
                  </div>

                  <div className="overflow-hidden">
                    <img
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      src={img5}
                      alt=""
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl line-clamp-1">
                        Al-Lu’lu’a Venue
                      </h1>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span className="font-medium">4.5</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      Elegant venue for wedding and celebrations.
                    </p>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <i className="fa-regular fa-calendar"></i>
                        <span>Jan 9, 2004</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>cairo</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <button className="bg-state-blue text-light-neutral font-semibold px-6 py-2 rounded-xl transition-colors duration-300 cursor-pointer">
                        Book Now
                      </button>

                      <button className="text-gray-500 hover:text-state-blue transition-colors duration-300">
                        <i class="fa-solid fa-bookmark text-2xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white text-steel-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group">
                  <div className="absolute top-3 left-3 z-20 bg-state-blue text-light-neutral px-3 py-1 text-sm font-medium rounded-full opacity-90 backdrop-blur-sm">
                    Wedding
                  </div>

                  <div className="overflow-hidden">
                    <img
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      src={img5}
                      alt=""
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl line-clamp-1">
                        Al-Lu’lu’a Venue
                      </h1>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span className="font-medium">4.5</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      Elegant venue for wedding and celebrations.
                    </p>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <i className="fa-regular fa-calendar"></i>
                        <span>Jan 9, 2004</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>cairo</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <button className="bg-state-blue text-light-neutral font-semibold px-6 py-2 rounded-xl transition-colors duration-300 cursor-pointer">
                        Book Now
                      </button>

                      <button className="text-gray-500 hover:text-state-blue transition-colors duration-300">
                        <i class="fa-solid fa-bookmark text-2xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white text-steel-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group">
                  <div className="absolute top-3 left-3 z-20 bg-state-blue text-light-neutral px-3 py-1 text-sm font-medium rounded-full opacity-90 backdrop-blur-sm">
                    Wedding
                  </div>

                  <div className="overflow-hidden">
                    <img
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      src={img5}
                      alt=""
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl line-clamp-1">
                        Al-Lu’lu’a Venue
                      </h1>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span className="font-medium">4.5</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      Elegant venue for wedding and celebrations.
                    </p>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <i className="fa-regular fa-calendar"></i>
                        <span>Jan 9, 2004</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>cairo</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <button className="bg-state-blue text-light-neutral font-semibold px-6 py-2 rounded-xl transition-colors duration-300 cursor-pointer">
                        Book Now
                      </button>

                      <button className="text-gray-500 hover:text-state-blue transition-colors duration-300">
                        <i class="fa-solid fa-bookmark text-2xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white text-steel-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group">
                  <div className="absolute top-3 left-3 z-20 bg-state-blue text-light-neutral px-3 py-1 text-sm font-medium rounded-full opacity-90 backdrop-blur-sm">
                    Wedding
                  </div>

                  <div className="overflow-hidden">
                    <img
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      src={img5}
                      alt=""
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl line-clamp-1">
                        Al-Lu’lu’a Venue
                      </h1>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span className="font-medium">4.5</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      Elegant venue for wedding and celebrations.
                    </p>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <i className="fa-regular fa-calendar"></i>
                        <span>Jan 9, 2004</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>cairo</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <button className="bg-state-blue text-light-neutral font-semibold px-6 py-2 rounded-xl transition-colors duration-300 cursor-pointer">
                        Book Now
                      </button>

                      <button className="text-gray-500 hover:text-state-blue transition-colors duration-300">
                        <i class="fa-solid fa-bookmark text-2xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {active === "Reviews" && (
        <div className="w-full mb-6">
          <div className="container mx-auto mb-6 pl-5">
            <h2 className="font-bold text-2xl">My Reviews</h2>
          </div>
          <div>
            <div className="container bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300 ">
              <div className=" mx-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl">Al-Lu’lu’a Venue</h3>
                  </div>
                  <div class="flex items-center space-x-1">
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-fg-disabled"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  </div>
                </div>
                <div className=" container">
                  <span className="text-(--color-state-blue) text-xs">
                    Cairo, Egypt
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-(--color-state-blue) text-lg">
                      “Venue was good and the view was very beautiful”
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-heading text-(--color-state-blue) cursor-pointer bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
                    >
                      <i className="fa-solid fa-pen px-1"></i>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-heading text-(--color-state-blue) cursor-pointer bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
                    >
                      <i className="fa-solid fa-trash-arrow-up px-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="container bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300 ">
              <div className=" mx-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl">Al-Lu’lu’a Venue</h3>
                  </div>
                  <div class="flex items-center space-x-1">
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-fg-disabled"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  </div>
                </div>
                <div className=" container">
                  <span className="text-(--color-state-blue) text-xs">
                    Cairo, Egypt
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-(--color-state-blue) text-lg">
                      “Venue was good and the view was very beautiful”
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-heading text-(--color-state-blue) cursor-pointer bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
                    >
                      <i className="fa-solid fa-pen px-1"></i>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-heading text-(--color-state-blue) cursor-pointer bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
                    >
                      <i className="fa-solid fa-trash-arrow-up px-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="container bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300 ">
              <div className=" mx-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl">Al-Lu’lu’a Venue</h3>
                  </div>
                  <div class="flex items-center space-x-1">
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-fg-disabled"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  </div>
                </div>
                <div className=" container">
                  <span className="text-(--color-state-blue) text-xs">
                    Cairo, Egypt
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-(--color-state-blue) text-lg">
                      “Venue was good and the view was very beautiful”
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-heading text-(--color-state-blue) cursor-pointer bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
                    >
                      <i className="fa-solid fa-pen px-1"></i>
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-heading text-(--color-state-blue) cursor-pointer bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none"
                    >
                      <i className="fa-solid fa-trash-arrow-up px-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {active === "Notifications" && (
        <div className="w-full mb-6">
          <div className="container mx-auto mb-6 pl-5 flex items-center justify-between">
            <h2 className="font-bold text-2xl">Notifications</h2>
            <button className="text-white bg-neutral-800 rounded-xl text-sm py-1 px-3 mr-5">
              Mark all as read
            </button>
          </div>

          {isLoading && <p className="text-center">Loading...</p>}
          {error && (
            <p className="text-center text-red-500">
              Error loading notifications
            </p>
          )}

          {data?.length === 0 && !isLoading && (
            <p className="text-center text-gray-500">No notifications</p>
          )}

          <div className="container bg-white rounded-xl shadow-sm p-6 space-y-4 border border-gray-300">
            {data?.map((notif) => (
              <div
                key={notif.id}
                className="flex justify-between items-center border-b border-gray-200 pb-2"
              >
                <div>
                  <p className="font-semibold">{notif.message}</p>
                  <span className="text-gray-500 text-sm">
                    {new Date(notif.createdAt).toLocaleString()}
                  </span>
                </div>
                <button className="text-sm text-blue-600">View</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
