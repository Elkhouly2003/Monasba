import { useState } from "react";
const ReviewForm = (id) => {
  const [rate, setRate] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    if (rate === 0 || comment.trim() === "") {
      alert("Please add rating and comment");
      return;
    }
    const formData = new FormData();
    formData.append("rating", rate);
    formData.append("comment", comment);

    try {
      await fetch(
        `http://localhost:8080/api/v1.0/reviews?placeId=${2}&userId=${2}`,
        {
          method: "POST",
          body: formData,
        }
      );
      setRate(0);
      setComment("");
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <div className="mt-8 p-4 bg-white rounded-2xl shadow-xl">
      <div className="flex gap-3 items-center mb-4">
        <p>Rating:</p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <i
              key={star}
              className={`text-yellow-500 text-xl cursor-pointer ${
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
        <p className="mb-1">Comment:</p>
        <textarea
          className="w-full resize-none p-2 rounded-xl text-dark-navy border border-cool-gray focus:ring-0 focus:outline-0"
          rows="4"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-state-blue text-white rounded-xl font-semibold"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
