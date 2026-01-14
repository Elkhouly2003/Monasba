import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";

const Reviews = ({ userId, date, rate, comment }) => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUserByID = async () => {
      const res = await fetch(`http://localhost:8080/api/v1.0/users/${userId}`);
      const jsonRes = await res.json();
      setUserName(jsonRes.data.name);
    };
    fetchUserByID();
  }, [userId]);

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
