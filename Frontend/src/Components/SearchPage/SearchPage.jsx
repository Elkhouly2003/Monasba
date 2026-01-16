import { useEffect, useState } from "react";
import Results from "../Results/Results";
import SearchBar from "../SearchBar/SearchBar";
import useGet from "../../hooks/useGet";
import Nav from "../Nav/Nav";

const SearchPage = () => {
  const [allPlaces, setAllPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const { data, loading, error } = useGet(
    "http://localhost:8080/api/v1.0/placess"
  );

  useEffect(() => {
    if (data?.data) {
      setAllPlaces(data.data);
      setFilteredPlaces(data.data);
    }
  }, [data]);

  const handleFilter = ({ city, location, term }) => {
    const filtered = allPlaces.filter((place) => {
      const matchesCity =
        !city || place.city?.toLowerCase() === city.toLowerCase();
      const matchesLocation =
        !location || place.location?.toLowerCase() === location.toLowerCase();
      const matchesTerm =
        !term || place.placeName?.toLowerCase().includes(term.toLowerCase());

      return matchesCity && matchesLocation && matchesTerm;
    });

    setFilteredPlaces(filtered);
  };

  return (
    <>
      <Nav />
      <div className="space-y-10">
        <div className="flex justify-center">
          <SearchBar onSearch={handleFilter} />
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && (
          <p className="text-center text-red-500">Error loading events</p>
        )}

        {!loading && !error && <Results events={filteredPlaces} />}
      </div>
    </>
  );
};

export default SearchPage;
