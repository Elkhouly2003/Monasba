import EventCard from "../EventCard/EventCard";
const Results = () => {
  return (
    <div className="max-w-8xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-dark-navy font-bold text-2xl sm:text-3xl">
          Results
        </h2>
        <div className="flex sm:gap-4 gap-2">
          <div className="bg-state-blue text-light-neutral flex gap-2 items-center p-2 rounded-xl cursor-pointer text-sm sm:text-base">
            <i className="fa-solid fa-arrow-up-wide-short"></i>
            Sort by
          </div>
          <div className="bg-state-blue text-light-neutral flex gap-2 items-center p-2 rounded-xl cursor-pointer text-sm sm:text-base">
            <i className="fa-solid fa-filter"></i>
            Filter
          </div>
        </div>
      </div>
      <div className="mt-6 mb-8 grid gap-8 grid-cols-1 [@media(min-width:650px)_and_(max-width:764px)]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default Results;
