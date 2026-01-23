import img5 from "../../assets//icons/sumatra-weddings.png";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useUser } from "../../store/useUser";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const ProfileAdmin = () => {
  const { user } = useUser();

  const getPlacesAdmins = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/placess/status/false`
    );
    return data;
  };
  const queryClient = useQueryClient();

  const { data: getPlacesAdmin, isLoading } = useQuery({
    queryKey: ["getPlacesAdmin"],
    queryFn: () => getPlacesAdmins(),
  });

  async function deleteBook(placeId) {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/placess/reject/${placeId}`
      );

      queryClient.invalidateQueries({
        queryKey: ["getPlacesAdmin"],
      });
      toast.success("places deleted successfully!");
    } catch (er) {
      console.log(er);
    }
  }

  async function acceptBook(placeId) {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/placess/accept/${placeId}`
      );

      queryClient.invalidateQueries({
        queryKey: ["getPlacesAdmin"],
      });
      toast.success("places accepted successfully!");
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <>
      <Nav />

      {getPlacesAdmin?.data?.length === 0 ? (
        <div className="container mx-auto text-center py-20">
          <p className="text-gray-500 text-lg font-semibold">
           No pending places to review.
          </p>
        </div>
      ) : (
        getPlacesAdmin?.data?.map((place) => (
          <div
            key={place.placeId}
            className="container bg-white rounded-2xl shadow-sm p-6 mb-4"
          >
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-full md:w-40 h-32 rounded-xl overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_API_URL}/imagess/${place.imagesID[0]}`}
                  alt="Event"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xl">{place.placeName}</h3>

                    <p className="text-(--color-state-blue) text-sm mt-1">
                      {place.description}
                    </p>

                    <p className="text-(--color-state-blue) text-sm mt-1">
                      {place.city}, {place.country}
                    </p>

                    <p className="text-(--color-state-blue) text-sm mt-1">
                      <span className="font-bold">{place.price}</span> EGP
                    </p>

                    <p className="text-(--color-state-blue) text-sm mt-1">
                      <span className="font-bold">{place.capacity}</span> guests
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => acceptBook(place.placeId)}
                      className="text-white cursor-pointer bg-green-700 hover:bg-green-800 transition rounded-xl text-sm py-1 px-4"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => deleteBook(place.placeId)}
                      className="text-white cursor-pointer bg-red-600 hover:bg-red-700 transition rounded-xl text-sm py-1 px-4"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default ProfileAdmin;
