import StarRating from "../StarRating/StarRating";

const Reviews = () => {
  const rate = 3.3;
  return (
    <div className="bg-white text-dark-navy p-4 rounded-xl shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-semibold">Ali Gado</h3>
        <StarRating rate={rate} />
      </div>
      <p className="text-base font-light mt-1">Nov 2025</p>
      <p className="text-base font-light mt-4">
        Beautiful venue and great service. Highly recommend!
      </p>
    </div>
  );
};

export default Reviews;
