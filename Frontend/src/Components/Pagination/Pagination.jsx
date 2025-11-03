import { useState } from "react";

const Pagination = ({ pagesNum }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="flex gap-3 justify-center items-center mt-6">
      {[...Array(pagesNum)].map((_, i) => {
        const page = i + 1;
        const isActive = page === currentPage;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-5 py-3 font-bold text-xl text-light-neutral rounded-xl cursor-pointer
              ${isActive ? "bg-dark-navy " : "bg-state-blue  "}`}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
