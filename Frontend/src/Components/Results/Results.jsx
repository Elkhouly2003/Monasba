import Sort_Icon from "../../assets/icons/Sort_Icon.png";
import Filter_Icon from "../../assets/icons/Filter_Icon.png";

const Results = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between items-center">
        <h2 className="text-dark-navy font-bold text-2xl sm:text-3xl">
          Results
        </h2>
        <div className="flex sm:gap-4 gap-2">
          <div className="bg-state-blue text-light-neutral flex gap-2 items-center p-2 rounded-xl cursor-pointer text-sm sm:text-base">
            <img src={Sort_Icon} alt="sort icon" />
            Sort by
          </div>
          <div className="bg-state-blue text-light-neutral flex gap-2 items-center p-2 rounded-xl cursor-pointer text-sm sm:text-base">
            <img src={Filter_Icon} alt="sort icon" />
            Filter
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
