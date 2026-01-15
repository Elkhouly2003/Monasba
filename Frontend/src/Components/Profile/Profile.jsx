import React, { useCallback, useEffect } from "react";
import img1 from "../../assets/icons/booking.png";
import img2 from "../../assets/icons/bookmark.png";
import img3 from "../../assets/icons/star.png";
import img4 from "../../assets/icons/bell.png";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../store/useUser";
import Nav from "../Nav/Nav";
import StarRating from "../StarRating/StarRating";
import EventCard from "../EventCard/EventCard";

const getNotifications = async (userId) => {
  const { data } = await axios.get(
    `http://localhost:8080/api/v1.0/notifications/user/${userId}`
  );
  return data;
};

export default function Profile({ userId }) {
  const { user } = useUser();
  const [reviews, setReviews] = useState([]);
  const [active, setActive] = useState("My Bookings");
  const [editingReview, setEditingReview] = useState(null);
  const [editComment, setEditComment] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [savedPlaces, setSavedPlaces] = useState([]);

  const fetchReviews = useCallback(async () => {
    if (!user?.userId) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1.0/reviews/user/${user.userId}`
      );
      if (response.ok) {
        const result = await response.json();
        const reviewsData = result.data || [];

        const enrichedReviews = await Promise.all(
          reviewsData.map(async (rev) => {
            let userName = "Anonymous";
            let placeName = "Unknown Venue";
            let city = "N/A";

            try {
              const [userRes, placeRes] = await Promise.all([
                fetch(`http://localhost:8080/api/v1.0/users/${rev.userId}`),
                fetch(`http://localhost:8080/api/v1.0/placess/${rev.placeId}`),
              ]);

              if (userRes.ok) {
                const userData = await userRes.json();
                userName = userData.data.name;
              }

              if (placeRes.ok) {
                const placeData = await placeRes.json();
                placeName = placeData.data.placeName;
                city = placeData.data.city;
              }
            } catch (err) {
              console.error("Error enrichment", err);
            }

            return { ...rev, userName, placeName, city };
          })
        );
        setReviews(enrichedReviews);
      }
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  }, [user?.userId]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getNotifications(userId),
    enabled: !!userId,
  });

  const fetchSavedPlaces = useCallback(async () => {
    if (!user?.userId) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1.0/savedPlaces/${user.userId}`
      );
      if (response.ok) {
        const result = await response.json();
        setSavedPlaces(result.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch saved places", err);
    }
  }, [user?.userId]);

  useEffect(() => {
    if (active === "Reviews") fetchReviews();
    if (active === "Saved Events") fetchSavedPlaces();
  }, [active, fetchReviews, fetchSavedPlaces, savedPlaces]);

  const handleDelete = async (rev) => {
    try {
      const formData = new FormData();
      formData.append("userId", user.userId);
      formData.append("placeId", rev.placeId);

      const response = await fetch(`http://localhost:8080/api/v1.0/reviews`, {
        method: "DELETE",
        body: formData,
      });

      if (response.ok) {
        fetchReviews();
      } else {
        console.error("Failed to delete review");
      }
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("comment", editComment);
      formData.append("ratings", editRating);
      formData.append("userId", user.userId);
      formData.append("placeId", editingReview.placeId);
      const response = await fetch(`http://localhost:8080/api/v1.0/reviews`, {
        method: "PUT",
        body: formData,
      });
      if (response.ok) {
        setEditingReview(null);
        fetchReviews();
      }
    } catch (err) {
      console.error("Error updating review:", err);
    }
  };

  const startEditing = (rev) => {
    setEditingReview(rev);
    setEditComment(rev.comment);
    setEditRating(rev.ratings);
    setHoverRating(0);
  };
  return (
    <>
      <Nav />
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
                placeholder={user?.name || ""}
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
                placeholder={user?.email || ""}
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
          <div className="container mx-auto px-4">
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {savedPlaces.length > 0 ? (
                savedPlaces.map((place) => (
                  <EventCard key={place.placeId} event={place} />
                ))
              ) : (
                <p className="text-center col-span-full text-gray-500">
                  You haven't saved any places yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {active === "Reviews" && (
        <div className="w-full mb-6">
          <div className="container mx-auto mb-6 pl-5">
            <h2 className="font-bold text-2xl">Reviews</h2>
          </div>
          <div className="container space-y-4">
            {reviews.length > 0 ? (
              reviews.map((rev) => (
                <div
                  key={rev.reviewId}
                  className="bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300"
                >
                  <div className="mx-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-xl">
                          {rev.placeName}
                        </h3>
                        <div className="flex flex-col">
                          <span className="text-xs text-(--color-state-blue)">
                            {rev.city}
                          </span>
                          <span className="text-sm text-gray-500">
                            By: {rev.userName}
                          </span>
                        </div>
                      </div>
                      {editingReview?.reviewId !== rev.reviewId && (
                        <StarRating rate={rev.ratings} />
                      )}
                    </div>

                    {editingReview?.reviewId === rev.reviewId ? (
                      <div className="mt-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                        <div className="flex gap-3 items-center mb-4">
                          <p className="font-semibold">Your Rating:</p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i
                                key={star}
                                className={`text-yellow-500 text-2xl cursor-pointer transition-transform hover:scale-110 ${
                                  star <= (hoverRating || editRating)
                                    ? "fa-solid fa-star"
                                    : "fa-regular fa-star"
                                }`}
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={() => setEditRating(star)}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <div className="mb-4">
                          <textarea
                            className="w-full resize-none p-4 rounded-xl text-dark-navy border border-cool-gray focus:ring-2 focus:ring-state-blue focus:outline-0 transition-all bg-white"
                            rows="4"
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end gap-3">
                          <button
                            onClick={() => setEditingReview(null)}
                            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleEditSubmit}
                            className="px-6 py-2 bg-cyan-900 text-white rounded-xl font-bold hover:bg-opacity-90 transition-colors cursor-pointer"
                          >
                            Update Review
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="pt-2">
                          <p className="text-(--color-state-blue) text-lg">
                            “{rev.comment}”
                          </p>
                        </div>
                        {rev.userId === user?.userId && (
                          <div className="flex justify-end gap-2 mt-4">
                            <button
                              onClick={() => startEditing(rev)}
                              className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full text-sm flex items-center cursor-pointer"
                            >
                              <i className="fa-solid fa-pen px-1"></i> Edit
                            </button>
                            <button
                              onClick={() => handleDelete(rev)}
                              className="text-red-600 hover:bg-red-50 px-4 py-2 rounded-full text-sm flex items-center cursor-pointer"
                            >
                              <i className="fa-solid fa-trash px-1"></i> Delete
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No reviews found.</p>
            )}
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
