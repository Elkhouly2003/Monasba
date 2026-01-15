import { useParams } from "react-router-dom";
import ImageSlider from "../Slider/ImageSlider";
import Reviews from "../Reviews/Reviews";
import ReviewForm from "../ReviewForm/ReviewForm";
import StarRating from "../StarRating/StarRating";
import { useState, useEffect, useCallback } from "react";
import Nav from "../Nav/Nav";

const SingleEventPage = () => {
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [active, setActive] = useState("");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1.0/reviews/place/${id}`
      );
      if (response.ok) {
        const result = await response.json();
        const reviewsData = result.data || [];

        const reviewsWithNames = await Promise.all(
          reviewsData.map(async (rev) => {
            try {
              const userRes = await fetch(
                `http://localhost:8080/api/v1.0/users/${rev.userId}`
              );
              if (userRes.ok) {
                const userResult = await userRes.json();
                return { ...rev, userName: userResult.data.name };
              }
            } catch (err) {
              console.error("Error fetching user", err);
            }
            return { ...rev, userName: "Anonymous" };
          })
        );

        setReviews(reviewsWithNames);
      }
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  }, [id]);

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

        if (result.data.imagesID?.length > 0) {
          const formattedImages = result.data.imagesID.map(
            (imgId) => `http://localhost:8080/api/v1.0/imagess/${imgId}`
          );
          setImages(formattedImages);
        }

        fetchReviews();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id, fetchReviews]);

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    fetchReviews();
  };

  if (loading)
    return <div className="text-center mt-20 text-2xl">Loading...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!event) return null;

  const overviewDesc = event.description
    ? event.description.split(/\n\s*\n/)
    : [];

  return (
   <>
   <Nav />
    <div className="max-w-8xl px-2 sm:px-4 mx-auto pb-20">
      <div className="mt-6 sm:mt-10">
        <ImageSlider images={images} />
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

        <div className="mt-8 sm:mt-12 flex flex-col md:flex-row justify-between gap-10">
          <div className="md:max-w-[440px] flex flex-col gap-6 md:pr-8 md:border-r-2 border-state-blue">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-dark-navy">
                Capacity:
              </h3>
              <p className="text-lg text-state-blue">{event.capacity} people</p>
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-dark-navy">Rating:</h3>
              <StarRating rate={4.5} />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-dark-navy">
                Location:
              </h3>
              <p className="text-lg text-state-blue">
                {event.city}, {event.country}
              </p>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl md:text-4xl font-semibold text-dark-navy">
              Overview
            </h3>
            <div className="space-y-6 mt-4">
              {overviewDesc.map((paragraph, i) => (
                <p key={i} className="text-lg leading-relaxed text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5 mt-16">
          <button
            onClick={() => setActive(active === "Request" ? "" : "Request")}
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
        <div className="container bg-white p-4 sm:p-6 rounded-2xl shadow-sm mt-6 sm:mt-10 pb-8 sm:pb-10 border border-gray-100">
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
            <button className="bg-state-blue w-full sm:w-auto px-10 py-3 rounded-xl text-white font-bold text-sm sm:text-base hover:bg-opacity-90 transition-all">
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      <div className="mt-20">
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-dark-navy font-bold text-2xl sm:text-3xl">
            Reviews
          </h2>
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-6 py-2 bg-state-blue text-white rounded-xl font-bold"
          >
            {showReviewForm ? "Cancel" : "Write Review"}
          </button>
        </div>

        {showReviewForm && (
          <ReviewForm placeId={id} onReviewSubmitted={handleReviewSuccess} />
        )}

        <div className="mt-8 space-y-6">
          {reviews.length > 0 ? (
            reviews.map((rev) => (
              <Reviews
                key={rev.reviewId}
                userId={rev.userId || "Anonymous User"}
                date={
                  rev.createdAt
                    ? new Date(rev.createdAt).toLocaleDateString()
                    : "Recent Review"
                }
                rate={rev.ratings}
                comment={rev.comment}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">
              No reviews yet. Be the first to review!
            </p>
          )}
        </div>
      </div>
    </div>
   </>
  );
};

export default SingleEventPage;
