const StarRating = ({ rate }) => {
  const fullStars = Math.floor(rate);
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex gap-1 text-yellow-500 text-sm">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <i key={`full${i}`} className="fa-solid fa-star"></i>
        ))}

      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <i key={`empty${i}`} className="fa-regular fa-star"></i>
        ))}
    </div>
  );
};

export default StarRating;
