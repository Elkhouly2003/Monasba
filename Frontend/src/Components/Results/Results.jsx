import EventCard from "../EventCard/EventCard";
import Pagination from "../Pagination/Pagination";

const Results = ({ events }) => {
  return (
    <div className="max-w-8xl mx-auto px-2 sm:px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-dark-navy font-bold text-2xl sm:text-3xl">
          Results
        </h2>
      </div>

      <div className="mt-6 mb-8 grid gap-8 grid-cols-1 [@media(min-width:650px)_and_(max-width:764px)]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {events.map((event) => (
          <EventCard key={event.placeId || event.placeName} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Results;
