import { useParams } from "react-router-dom";
import ImageSlider from "../Slider/ImageSlider";
import Reviews from "../Reviews/Reviews";
import ReviewForm from "../ReviewForm/ReviewForm";
import StarRating from "../StarRating/StarRating";
import { useState, useEffect } from "react";

const SingleEventPage = () => {
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [active, setActive] = useState("");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:8080/api/v1.0/placess/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch event details");
        const result = await response.json();
        setEvent(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-20 text-2xl">Loading event details...</div>
    );
  if (error)
    return (
      <div className="text-center mt-20 text-red-500 text-2xl">
        Error: {error}
      </div>
    );
  if (!event) return <div className="text-center mt-20">No event found.</div>;

  const overviewDesc = event.description
    ? event.description.split(/\n\s*\n/)
    : [];

  return (
    <div className="max-w-8xl px-2 sm:px-4 mx-auto">
      <div className="mt-6 sm:mt-10">
        <ImageSlider />
      </div>

      <div className="mt-8 sm:mt-12">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-navy">
            {event.placeName}
          </h2>

          <button>
            <i className="fa-regular fa-bookmark text-2xl sm:text-3xl"></i>
          </button>
        </div>

        <div className="mt-8 sm:mt-12 flex flex-col md:flex-row justify-between gap-10 md:gap-8">
          <div className="md:max-w-[440px] flex flex-col gap-6 sm:gap-8 md:pr-8 md:border-r-2 border-state-blue">
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                Capacity:
              </h3>
              <p className="text-lg text-state-blue">{event.capacity} people</p>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                Rating:
              </h3>
              <StarRating rate={4.5} />{" "}
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                Categories:
              </h3>
              <p className="text-lg text-state-blue">
                {event.categories?.join(", ")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                Working Hours:
              </h3>
              <p className="text-lg text-state-blue">
                {event.openTime} – {event.closeTime}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                Location:
              </h3>
              <p className="text-lg text-state-blue">
                {event.city}, {event.country}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                Price:
              </h3>
              <p className="text-lg text-state-blue">
                {event.price - (event.discount || 0)} EGP
              </p>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl md:text-4xl font-semibold text-dark-navy">
              Overview
            </h3>

            <div className="space-y-6 sm:space-y-8 mt-4 sm:mt-6">
              {overviewDesc.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg sm:text-xl leading-relaxed text-gray-700"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5 mt-16">
          <button
            onClick={() => setActive("Request")}
            className="bg-state-blue px-12 py-3 text-white font-bold text-base md:text-xl rounded-2xl cursor-pointer"
          >
            Request Booking
          </button>
          <button className="bg-white border-2 border-state-blue px-12 py-3 text-state-blue font-bold text-base md:text-xl rounded-2xl">
            Ask Question
          </button>
        </div>
      </div>

      {active === "Request" && (
        <div className="container bg-white p-4 sm:p-6 rounded-2xl shadow-sm mt-6 sm:mt-10 pb-8 sm:pb-10">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="font-bold text-xl sm:text-2xl">Booking Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-medium mb-1">
                Select Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-medium mb-1">
                Number of Tickets
              </label>
              <input
                type="number"
                placeholder="1"
                className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-medium mb-1">
                Select Time Slot
              </label>
              <select className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2 bg-gray-100 text-sm">
                <option>
                  {event.openTime} - {event.closeTime}
                </option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-medium mb-1">
                Special Requests (Optional)
              </label>
              <textarea
                rows="3"
                placeholder="e.g Wheelchair access, Parking, etc"
                className="w-full border border-gray-300 rounded-xl px-3 sm:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center mt-6 sm:mt-8">
            <button className="bg-state-blue w-full sm:w-auto px-6 py-2 rounded-xl text-white text-sm sm:text-base">
              Booking Now
            </button>
          </div>
        </div>
      )}

      <div className="mt-10">
        <div className="flex justify-between items-center">
          <h2 className="text-dark-navy font-bold text-2xl sm:text-3xl">
            Reviews
          </h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-3 py-2 bg-state-blue text-white rounded-xl text-sm"
          >
            {showReviewForm ? "Cancel" : "Write Review"}
          </button>
        </div>
        <div>{showReviewForm && <ReviewForm />}</div>
        <div className="mt-8 space-y-6 mb-16">
          <Reviews />
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default SingleEventPage;
