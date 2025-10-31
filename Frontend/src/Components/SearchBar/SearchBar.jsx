import Arrow_Down from "../../assets/icons/Arrow_Down.png";
import Search_icon from "../../assets/icons/Search_icon.png";

const SearchBar = () => {
  return (
    <div className="mx-4 sm:mx-8 px-6 sm:px-8 py-8 bg-light-neutral rounded-xl mt-10 sm:mt-20 inner-shadow flex flex-col lg:flex-row lg:items-center flex-wrap items-stretch gap-4 sm:gap-6 max-w-6xl w-full">
      <div className="flex gap-6 sm:flex-row flex-col ">
        <div className="bg-state-blue text-light-neutral px-1 py-1 rounded-xl flex-1 xl:max-w-[180px] flex items-center justify-center">
          <input
            type="date"
            className="bg-transparent border-0 outline-none text-light-neutral text-sm sm:text-base w-full cursor-pointer"
          />
        </div>

        <div className="bg-state-blue text-light-neutral flex items-center justify-between px-4  py-2 rounded-xl gap-2 xl:flex-none flex-1  min-w-[140px] cursor-pointer">
          <span className="text-sm sm:text-base">Country</span>
          <img src={Arrow_Down} alt="arrow_Down icon" className="w-4 sm:w-5" />
        </div>

        <div className="bg-state-blue text-light-neutral flex items-center justify-between px-4  py-2 rounded-xl gap-2 xl:flex-none flex-1  min-w-[140px] cursor-pointer">
          <span className="text-sm sm:text-base">Location</span>
          <img src={Arrow_Down} alt="arrow_Down icon" className="w-4 sm:w-5" />
        </div>
      </div>

      <div className="flex-4 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <img
            src={Search_icon}
            alt="search icon"
            className="w-5 sm:w-6 opacity-60 pt-1"
          />
        </div>
        <input
          className="bg-white border-0 pl-12 pr-4 py-3 h-full rounded-xl w-full outline-none text-sm sm:text-base"
          type="text"
          name="search"
          id="search"
          placeholder="Search for your event"
        />
      </div>
    </div>
  );
};

export default SearchBar;
