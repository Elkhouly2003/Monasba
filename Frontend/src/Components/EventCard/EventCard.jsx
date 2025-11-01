import sumatra_weddings from "../../assets/icons/sumatra-weddings.png";

const EventCard = () => {
  return (
    <div className="bg-white text-steel-blue rounded-2xl overflow-hidden relative shadow">
      <div className="absolute z-20 bg-state-blue text-light-neutral px-4 py-2 top-2 left-2 rounded-2xl opacity-90">
        Wedding
      </div>
      <img className="rounded-2xl w-full" src={sumatra_weddings} alt="img" />
      <div className="flex justify-between items-center px-4 mt-4">
        <h1 className="font-semibold text-2xl">Al-Lu’lu’a Venue</h1>
        <div className="flex gap-1 items-center">
          <i className="fa-solid fa-star text-yellow-200 w-5 h-5"></i>
          <span>4.5</span>
        </div>
      </div>
      <p className="px-4 mt-2 ">Elegant venue for wedding and celebrations.</p>

      <div className="flex justify-between items-center px-4 mt-2">
        <div className="flex gap-2 items-center">
          <i className="fa-regular fa-calendar"></i>
          <span className="text-sm">Jan 9, 2004</span>
        </div>
        <div className="flex gap-2 items-center">
          <i className="fa-solid fa-location-dot"></i>
          <span className="text-sm">Cairo</span>
        </div>
      </div>
      <div className="flex justify-between items-center px-4 mt-5 mb-4">
        <button className="bg-state-blue text-light-neutral font-semibold px-9 py-3 rounded-2xl">
          Book Now
        </button>
        <button>
          <i className="fa-regular fa-bookmark fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default EventCard;
