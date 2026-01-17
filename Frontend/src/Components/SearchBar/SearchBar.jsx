import { useState } from "react";
import Arrow_Down from "../../assets/icons/Arrow_Down.png";
import Search_icon from "../../assets/icons/Search_icon.png";

const SearchBar = ({ onSearch }) => {
  const countryOptions = ["Egypt", "Saudi Arabia", "UAE"];

  const cityOptions = {
    Egypt: ["Cairo", "Alexandria", "Giza", "Sharm El-Sheikh", "Luxor"],
    "Saudi Arabia": ["Riyadh", "Jeddah", "Dammam", "Mecca", "Medina"],
    UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
  };

  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [showCities, setShowCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState("City");
  const [showError, setShowError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const sendDataToParent = (country, city, term) => {
    onSearch({
      country: country === "Country" ? "" : country,
      city: city === "City" ? "" : city,
      term: term,
    });
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setSelectedCity("City");
    setShowCountries(false);
    sendDataToParent(country, "City", searchTerm);
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setShowCities(false);
    sendDataToParent(selectedCountry, city, searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    sendDataToParent(selectedCountry, selectedCity, e.target.value);
  };

  return (
    <div className="mx-4 sm:mx-8 px-6 sm:px-8 py-8 bg-light-neutral rounded-xl mt-5 sm:mt-10 inner-shadow flex flex-col-reverse lg:flex-row lg:items-center flex-wrap items-stretch gap-4 sm:gap-6 max-w-6xl w-full">
      <div className="flex gap-6 sm:flex-row flex-col ">
        <div
          onClick={() => {
            setShowCountries(!showCountries);
            setShowCities(false);
          }}
          className="bg-state-blue text-light-neutral flex items-center justify-between px-4 py-2 rounded-xl gap-2 xl:flex-none flex-1 min-w-[180px] cursor-pointer relative"
        >
          {showCountries && (
            <div className="absolute bg-white w-full left-0 top-full text-state-blue z-50 rounded-xl overflow-hidden shadow-md">
              <ul className="flex flex-col gap-2 py-2">
                {countryOptions.map((country) => (
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCountry(country);
                    }}
                    key={country}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    {country}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <span>{selectedCountry}</span>
          <img src={Arrow_Down} alt="arrow" className="w-4" />
        </div>

        <div
          onClick={() => {
            if (selectedCountry !== "Country") {
              setShowCities(!showCities);
              setShowError(false);
            } else {
              setShowError(true);
            }
          }}
          className="bg-state-blue text-light-neutral flex items-center justify-between px-4 py-2 rounded-xl gap-2 xl:flex-none flex-1 min-w-[180px] cursor-pointer relative"
        >
          {showError && (
            <p className="text-red-600 text-xs absolute -top-5">
              Select country first
            </p>
          )}
          {showCities && cityOptions[selectedCountry] && (
            <div className="absolute bg-white w-full left-0 top-full text-state-blue z-50 rounded-xl overflow-hidden shadow-md">
              <ul className="flex flex-col gap-2 py-2">
                {cityOptions[selectedCountry].map((city) => (
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCity(city);
                    }}
                    key={city}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <span>{selectedCity}</span>
          <img src={Arrow_Down} alt="arrow" className="w-4" />
        </div>
      </div>

      <div className="flex-4 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <img src={Search_icon} alt="search" className="w-5 opacity-60" />
        </div>
        <input
          className="bg-white border-0 pl-12 pr-4 py-3 h-full rounded-xl w-full outline-none"
          type="text"
          placeholder="Search for your event"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
