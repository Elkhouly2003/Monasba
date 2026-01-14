import { useState } from "react";
import { useUser } from "../../store/useUser";

const ReviewForm = ({ placeId, onReviewSubmitted }) => {
  const [rate, setRate] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (rate === 0 || comment.trim() === "") return;
    setErrorMessage("");

    const formData = new FormData();
    formData.append("ratings", rate);
    formData.append("comment", comment);
    formData.append("userId", user.userId);
    formData.append("placeId", placeId);

    try {
      const response = await fetch(`http://localhost:8080/api/v1.0/reviews`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setRate(0);
        setComment("");
        onReviewSubmitted();
      } else {
        setErrorMessage("You have already added a review for this place.");
      }
    } catch (err) {
      console.error("Error:", err);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mt-8 p-4 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="flex gap-3 items-center mb-4">
        <p className="font-semibold">Your Rating:</p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`text-yellow-500 text-2xl cursor-pointer transition-transform hover:scale-110 ${
                star <= (hover || rate)
                  ? "fa-solid fa-star"
                  : "fa-regular fa-star"
              }`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRate(star)}
            ></i>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2 font-semibold">Share your experience:</p>
        <textarea
          className="w-full resize-none p-4 rounded-xl text-dark-navy border border-cool-gray focus:ring-2 focus:ring-state-blue focus:outline-0 transition-all"
          rows="4"
          placeholder="What did you like or dislike?"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          {errorMessage && (
            <p className="text-red-500 text-sm font-medium bg-red-50 p-2 rounded-lg border border-red-100">
              <i className="fa-solid fa-circle-exclamation mr-2"></i>
              {errorMessage}
            </p>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="px-8 py-2 bg-state-blue text-white rounded-xl font-bold hover:bg-opacity-90 transition-colors whitespace-nowrap"
        >
          Post Review
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
