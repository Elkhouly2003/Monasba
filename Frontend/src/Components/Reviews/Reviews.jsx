import StarRating from "../StarRating/StarRating";

const Reviews = ({ userName, date, rate, comment }) => {
  return (
    <div className="bg-white text-dark-navy p-4 rounded-xl shadow-md">
      <div className="flex justify-between items-center">
        <h3 className="text-3xl font-semibold">{userName}</h3>
        <StarRating rate={rate} />
      </div>
      <p className="text-base font-light mt-1">{date}</p>
      <p className="text-base font-light mt-4">{comment}</p>
    </div>
  );
};

export default Reviews;
