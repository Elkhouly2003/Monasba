import img5 from "../../assets//icons/sumatra-weddings.png";
import Nav from "../Nav/Nav";

const ProfileAdmin = () => {
  return (
    <>
    <Nav />
      <div className="w-full mb-6 mt-5">
        <div className="container mx-auto mb-6 pl-5">
          <h2 className="font-bold text-2xl">My Bookings</h2>
        </div>

        <div className="container bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-40 h-32 rounded-xl overflow-hidden">
              <img
                src={img5}
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl">
                    Wedding at Cairo Hall
                  </h3>

                  <p className="text-(--color-state-blue) text-sm mt-1">
                    📅 12 Oct 2025 • 7:00 PM
                  </p>

                  <p className="text-(--color-state-blue) text-sm mt-1">
                    📍 Cairo, Egypt
                  </p>

                  <div className="flex items-center gap-1 mt-2">
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-regular fa-star text-gray-300 text-sm"></i>
                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="text-white bg-green-700 hover:bg-green-800 transition rounded-xl text-sm py-1 px-4">
                    Accept
                  </button>
                  <button className="text-white bg-red-600 hover:bg-red-700 transition rounded-xl text-sm py-1 px-4">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
             <div className="container bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-40 h-32 rounded-xl overflow-hidden">
              <img
                src={img5}
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl">
                    Wedding at Cairo Hall
                  </h3>

                  <p className="text-(--color-state-blue) text-sm mt-1">
                    📅 12 Oct 2025 • 7:00 PM
                  </p>

                  <p className="text-(--color-state-blue) text-sm mt-1">
                    📍 Cairo, Egypt
                  </p>

                  <div className="flex items-center gap-1 mt-2">
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-regular fa-star text-gray-300 text-sm"></i>
                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="text-white bg-green-700 hover:bg-green-800 transition rounded-xl text-sm py-1 px-4">
                    Accept
                  </button>
                  <button className="text-white bg-red-600 hover:bg-red-700 transition rounded-xl text-sm py-1 px-4">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>     <div className="container bg-white rounded-2xl shadow-sm p-6 mb-4">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-40 h-32 rounded-xl overflow-hidden">
              <img
                src={img5}
                alt="Event"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl">
                    Wedding at Cairo Hall
                  </h3>

                  <p className="text-(--color-state-blue) text-sm mt-1">
                    📅 12 Oct 2025 • 7:00 PM
                  </p>

                  <p className="text-(--color-state-blue) text-sm mt-1">
                    📍 Cairo, Egypt
                  </p>

                  <div className="flex items-center gap-1 mt-2">
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-solid fa-star text-yellow-400 text-sm"></i>
                    <i className="fa-regular fa-star text-gray-300 text-sm"></i>
                    <span className="text-xs text-gray-500 ml-1">(4.0)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="text-white bg-green-700 hover:bg-green-800 transition rounded-xl text-sm py-1 px-4">
                    Accept
                  </button>
                  <button className="text-white bg-red-600 hover:bg-red-700 transition rounded-xl text-sm py-1 px-4">
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileAdmin;
