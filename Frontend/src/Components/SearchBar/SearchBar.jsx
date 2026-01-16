import { useState } from "react";
import Arrow_Down from "../../assets/icons/Arrow_Down.png";
import Search_icon from "../../assets/icons/Search_icon.png";

const SearchBar = ({ onSearch }) => {
  const cityOptions = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Sharm El-Sheikh",
    "Luxor",
  ];
  const locationOptions = {
    Cairo: [
      "Nasr City",
      "Heliopolis",
      "Maadi",
      "Zamalek",
      "New Cairo",
      "Downtown",
    ],
    Alexandria: ["Stanley", "Smouha", "Gleem", "Miami", "Sidi Gaber"],
    Giza: [
      "Dokki",
      "Mohandessin",
      "6th of October City",
      "Haram",
      "Sheikh Zayed",
    ],
    "Sharm El-Sheikh": ["Naama Bay", "Hadaba", "Sharks Bay", "Ras Um Sid"],
    Luxor: ["East Bank", "West Bank", "Karnak", "El Tod"],
  };

  const [showCities, setShowCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState("City");
  const [showLocations, setShowLocations] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Location");
  const [showError, setShowError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const sendDataToParent = (city, loc, term) => {
    onSearch({
      city: city === "City" ? "" : city,
      location: loc === "Location" ? "" : loc,
      term: term,
    });
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setSelectedLocation("Location");
    setShowCities(false);
    sendDataToParent(city, "Location", searchTerm);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setShowLocations(false);
    sendDataToParent(selectedCity, location, searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    sendDataToParent(selectedCity, selectedLocation, e.target.value);
  };

  return (
    <div className="mx-4 sm:mx-8 px-6 sm:px-8 py-8 bg-light-neutral rounded-xl mt-5 sm:mt-10 inner-shadow flex flex-col-reverse lg:flex-row lg:items-center flex-wrap items-stretch gap-4 sm:gap-6 max-w-6xl w-full">
      <div className="flex gap-6 sm:flex-row flex-col ">
        <div
          onClick={() => {
            setShowCities(!showCities);
            setShowLocations(false);
          }}
          className="bg-state-blue text-light-neutral flex items-center justify-between px-4 py-2 rounded-xl gap-2 xl:flex-none flex-1 min-w-[180px] cursor-pointer relative"
        >
          {showCities && (
            <div className="absolute bg-white w-full left-0 top-full text-state-blue z-50 rounded-xl overflow-hidden shadow-md">
              <ul className="flex flex-col gap-2 py-2">
                {cityOptions.map((city) => (
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

        <div
          onClick={() => {
            if (selectedCity !== "City") {
              setShowLocations(!showLocations);
              setShowError(false);
            } else {
              setShowError(true);
            }
          }}
          className="bg-state-blue text-light-neutral flex items-center justify-between px-4 py-2 rounded-xl gap-2 xl:flex-none flex-1 min-w-[180px] cursor-pointer relative"
        >
          {showError && (
            <p className="text-red-600 text-xs absolute -top-5">
              Select city first
            </p>
          )}
          {showLocations && locationOptions[selectedCity] && (
            <div className="absolute bg-white w-full left-0 top-full text-state-blue z-50 rounded-xl overflow-hidden shadow-md">
              <ul className="flex flex-col gap-2 py-2">
                {locationOptions[selectedCity].map((loc) => (
                  <li
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectLocation(loc);
                    }}
                    key={loc}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <span>{selectedLocation}</span>
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
