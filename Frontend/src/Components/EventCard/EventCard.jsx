import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white text-steel-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group">
      <div className="absolute top-3 left-3 z-20 bg-state-blue text-light-neutral px-3 py-1 text-sm font-medium rounded-full opacity-90 backdrop-blur-sm">
        {"category"}
      </div>

      <Link to={`/place/${event.placeId}`}>
        <div className="overflow-hidden">
          <img
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
            src={event.img || "https://picsum.photos/300/200?random=1"}
            alt={event.placeName}
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl line-clamp-1">
            {event.placeName}
          </h1>
          <div className="flex items-center gap-1">
            <i className="fa-solid fa-star text-yellow-400"></i>
            <span className="font-medium">{4}</span>
          </div>
        </div>

        <p className="text-gray-600 mt-2 text-sm line-clamp-2">
          {event.description}
        </p>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <i className="fa-regular fa-calendar"></i>
            <span>{event.date}</span>
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
          <button className="text-gray-500 hover:text-state-blue transition-colors duration-300">
            <i className="fa-regular fa-bookmark fa-lg"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
