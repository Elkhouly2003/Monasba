import { useState } from "react";

const ReviewForm = () => {
  const [rate, setRate] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

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
        <button className="px-4 py-2 bg-state-blue text-white rounded-xl font-semibold">
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
