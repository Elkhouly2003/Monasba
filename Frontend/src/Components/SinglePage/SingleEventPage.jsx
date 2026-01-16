import { useParams } from "react-router-dom";
import ImageSlider from "../Slider/ImageSlider";
import Reviews from "../Reviews/Reviews";
import ReviewForm from "../ReviewForm/ReviewForm";
import StarRating from "../StarRating/StarRating";
import { useState, useEffect, useCallback } from "react";
import Nav from "../Nav/Nav";
import { useUser } from "../../store/useUser";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";

const SingleEventPage = () => {
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [active, setActive] = useState("");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [errors, setErrors] = useState({});
  const [averageRating, setAverageRating] = useState(0);

  const { user } = useUser();

  const bookingSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string()
      .min(10, "Description must be at least 10 characters")
      .required("Description is required"),

    startDate: Yup.string().required("Start date is required"),
    endDate: Yup.string().required("End date is required"),

    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string().required("End time is required"),

    capacity: Yup.number()
      .typeError("Capacity must be a number")
      .positive("Capacity must be greater than 0")
      .required("Capacity is required"),

    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than 0")
      .required("Price is required"),
  });

  const resetBookingForm = () => {
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setCapacity("");
    setPrice("");
    setStartTime("");
    setEndTime("");
  };

  const checkIfSaved = useCallback(async () => {
    if (!user?.userId || !id) return;
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1.0/savedPlaces/${user.userId}`
      );
      if (response.ok) {
        const result = await response.json();
        const savedPlacesList = result.data || [];
        const exists = savedPlacesList.some(
          (p) => String(p.placeId) === String(id)
        );
        setIsSaved(exists);
      }
    } catch (err) {
      console.error("Error checking saved state:", err);
    }
  }, [user?.userId, id]);

  const handleToggleSave = async () => {
    if (!user || !user.userId) return;

    const method = isSaved ? "DELETE" : "POST";
    const url = `http://localhost:8080/api/v1.0/user/${user.userId}/place/${id}`;

    try {
      const response = await fetch(url, { method });

      if (response.ok) {
        setIsSaved(!isSaved);
      } else {
        console.error(`Failed to ${isSaved ? "unsave" : "save"} place`);
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const handleConfirmBooking = async () => {
    try {
      await bookingSchema.validate(
        {
          title,
          description,
          startDate,
          endDate,
          startTime,
          endTime,
          capacity,
          price,
        },
        { abortEarly: false }
      );

      setErrors({});
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      toast.error("booking validation failed");
      return;
    }
    const formattedStartDate = `${startDate}T${startTime}:00`;
    const formattedEndDate = `${endDate}T${endTime}:00`;

    const book = {
      userId: user.userId,
      placeId: id,
      title,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      capacity: Number(capacity),
      price: Number(price),
    };

    try {
      await axios.post("http://localhost:8080/api/v1.0/bookingss", book);
      toast.success("Booking created successfully!");
      resetBookingForm();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1.0/reviews/place/${id}`
      );
      if (response.ok) {
        const result = await response.json();
        const reviewsData = result.data || [];

        const ratings = reviewsData.map((rev) => rev.ratings);
        const avg =
          ratings.length > 0
            ? ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length
            : 0;
        setAverageRating(avg);

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

        await fetchReviews();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlace();
  }, [id, fetchReviews]);

  useEffect(() => {
    if (user?.userId && id) {
      checkIfSaved();
    }
  }, [user?.userId, id, checkIfSaved]);

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
    fetchReviews();
  };

  if (loading)
    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)]">
        <svg
          aria-hidden="true"
          className="w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
        <span className="sr-only">Loading...</span>
      </div>
    );
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
            <button
              onClick={handleToggleSave}
              className={`${
                isSaved ? "text-state-blue" : "text-gray-500"
              } hover:text-state-blue transition-colors duration-300 cursor-pointer outline-none border-none bg-transparent`}
            >
              <i
                className={`${
                  isSaved ? "fa-solid" : "fa-regular"
                } fa-bookmark text-2xl sm:text-3xl`}
              ></i>
            </button>
          </div>

          <div className="mt-8 sm:mt-12 flex flex-col md:flex-row justify-between gap-10">
            <div className="md:max-w-[440px] flex flex-col gap-6 md:pr-8 md:border-r-2 border-state-blue">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-dark-navy">
                  Capacity:
                </h3>
                <p className="text-lg text-state-blue">
                  {event.capacity} people
                </p>
              </div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold text-dark-navy">
                  Rating:
                </h3>
                <StarRating rate={averageRating} />
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
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Al-Lu'lu'a Venue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe your event..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Start date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                {errors.startDate && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End date
                </label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Start time
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
                {errors.startTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.startTime}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
                {errors.endTime && (
                  <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  placeholder="e.g. 200"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                />
                {errors.capacity && (
                  <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Booking Price
                </label>
                <input
                  type="number"
                  placeholder="e.g. 35"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs mt-1">{errors.price}</p>
                )}
              </div>
            </div>

            <div className="flex justify-center mt-6 sm:mt-8">
              <button
                onClick={handleConfirmBooking}
                className="bg-state-blue cursor-pointer w-full sm:w-auto px-10 py-3 rounded-xl text-white font-bold text-sm sm:text-base hover:bg-opacity-90 transition-all"
              >
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
