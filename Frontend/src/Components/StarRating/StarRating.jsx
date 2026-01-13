const StarRating = ({ rate = 0 }) => {
  const normalizedRate = Math.max(0, Math.min(5, rate));
  const fullStars = Math.floor(normalizedRate);
  const hasHalfStar = normalizedRate % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex gap-1 text-yellow-500 text-sm">
      {Array(fullStars)
        .fill(0)
        .map((_, i) => (
          <i key={`full-${i}`} className="fa-solid fa-star"></i>
        ))}

      {hasHalfStar && <i className="fa-solid fa-star-half-stroke"></i>}

      {Array(Math.max(0, emptyStars))
        .fill(0)
        .map((_, i) => (
          <i key={`empty-${i}`} className="fa-regular fa-star"></i>
        ))}
    </div>
  );
};

export default StarRating;
