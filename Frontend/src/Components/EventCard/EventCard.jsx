import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../../store/useUser";

const EventCard = ({ event }) => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1.0/users/${event.ownerID}`
        );
        if (response.ok) {
          const result = await response.json();
          setUserData(result.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1.0/reviews/place/${event.placeId}`
        );
        if (response.ok) {
          const result = await response.json();

          const ratings = result.data.map((rev) => rev.ratings);
          const averageRating =
            ratings.length > 0
              ? ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length
              : 0;
          setAverageRating(averageRating);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchImage = async () => {
      if (event.imagesID && event.imagesID.length > 0) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/v1.0/imagess/${event.imagesID[0]}`
          );
          if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setImageSrc(url);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    const checkIfSaved = async () => {
      if (!user?.userId) return;
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1.0/savedPlaces/${user.userId}`
        );
        if (response.ok) {
          const result = await response.json();
          const savedPlacesList = result.data || [];
          const exists = savedPlacesList.some(
            (p) => p.placeId === event.placeId
          );
          setIsSaved(exists);
        }
      } catch (err) {
        console.error("Error checking saved state:", err);
      }
    };

    fetchUser();
    fetchImage();
    checkIfSaved();
    fetchReviews();

    return () => {
      if (imageSrc) URL.revokeObjectURL(imageSrc);
    };
  }, [event.ownerID, event.imagesID, event.placeId, user?.userId]);

  const handleToggleSave = async () => {
    if (!user || !user.userId) return;

    const method = isSaved ? "DELETE" : "POST";
    const url = `http://localhost:8080/api/v1.0/user/${user.userId}/place/${event.placeId}`;

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

  return (
    <div className="bg-white text-steel-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group">
      <div className="absolute top-3 left-3 z-20 bg-state-blue text-light-neutral px-3 py-1 text-sm font-medium rounded-full opacity-90 backdrop-blur-sm">
        {event.categories?.[0]}
      </div>

      <Link to={`/place/${event.placeId}`}>
        <div className="overflow-hidden bg-gray-200 h-56 flex items-center justify-center">
          {imageSrc ? (
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={imageSrc}
              alt={event.placeName}
            />
          ) : (
            <i className="fa-regular fa-image text-4xl text-gray-400"></i>
          )}
        </div>
      </Link>

      <div className="p-5">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl line-clamp-1">
            {event.placeName}
          </h1>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-star text-yellow-400"></i>
            <span className="font-medium">{averageRating}</span>
          </div>
        </div>

        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {event.description}
        </p>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            {userData && <span>{userData.name}</span>}
          </div>
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-location-dot"></i>
            <span>
              {event.country}, {event.city}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <Link to={`/place/${event.placeId}`}>
            <button className="bg-state-blue text-light-neutral font-semibold px-6 py-2 rounded-xl transition-colors duration-300 cursor-pointer">
              Book Now
            </button>
          </Link>
          <button
            onClick={handleToggleSave}
            className={`${
              isSaved ? "text-state-blue" : "text-gray-500"
            } hover:text-state-blue transition-colors duration-300 cursor-pointer outline-none border-none bg-transparent`}
          >
            <i
              className={`${
                isSaved ? "fa-solid" : "fa-regular"
              } fa-bookmark fa-lg`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
