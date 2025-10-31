import Results from "../Results/Results";
import SearchBar from "../SearchBar/SearchBar";

const Search = () => {
  return (
    <div className="space-y-10">
      <div className="flex justify-center">
        <SearchBar />
      </div>
      <Results />
    </div>
  );
};

export default Search;
