import { useEffect, useState } from "react";
import Results from "../Results/Results";
import SearchBar from "../SearchBar/SearchBar";
import useGet from "../../hooks/useGet";
import Nav from "../Nav/Nav";

const Search = () => {
  const [places, setPlaces] = useState([]);

  const { data, loading, error } = useGet(
    "http://localhost:8080/api/v1.0/placess"
  );

  useEffect(() => {
    if (data) {
      setPlaces(data.data);
    }
  }, [data]);

  return (
    <>
      <Nav />
      <div className="space-y-10">
        <div className="flex justify-center">
          <SearchBar />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error </p>}
        {data && <Results events={places} />}
      </div>
    </>
  );
};

export default Search;
