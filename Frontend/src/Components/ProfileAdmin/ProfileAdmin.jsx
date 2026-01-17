import img5 from "../../assets//icons/sumatra-weddings.png";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useUser } from "../../store/useUser";
import { useQuery } from "@tanstack/react-query";

const ProfileAdmin = () => {
  const { user } = useUser();

  const getPlacesAdmins = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1.0/placess/status/false`
    );
    return data;
  };

  const { data: getPlacesAdmin, isLoading } = useQuery({
    queryKey: ["getPlacesAdmin"],
    queryFn: () => getPlacesAdmins(),
  });

  return (
    <>
      <Nav />

      {isLoading ? (
        <div
          role="status"
          className=" fixed top-0 start-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)]"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="w-full mb-6 mt-5">
          <div className="container mx-auto mb-6 pl-5">
            <h2 className="font-bold text-2xl">My Bookings</h2>
          </div>
          {getPlacesAdmin?.data?.map((place) => (
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
                        {place.placeName}
                      </h3>

                      <p className="text-(--color-state-blue) text-sm mt-1">
                        {place.description}
                      </p>

                      <p className="text-(--color-state-blue) text-sm mt-1">
                         {place.city}, {place.country}
                      </p>
                       <p className="text-(--color-state-blue) text-sm mt-1">
                         <span className="font-bold"> {place.price}</span> EGP
                      </p>
                       <p className="text-(--color-state-blue) text-sm mt-1">
                        <span className="font-bold"> {place.capacity}</span> guests
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <button className="text-white cursor-pointer bg-green-700 hover:bg-green-800 transition rounded-xl text-sm py-1 px-4">
                        Accept
                      </button>
                      <button className="text-white cursor-pointer bg-red-600 hover:bg-red-700 transition rounded-xl text-sm py-1 px-4">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileAdmin;
