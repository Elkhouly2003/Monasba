import { useState } from "react";
import Arrow_Down from "../../assets/icons/Arrow_Down.png";
import Search_icon from "../../assets/icons/Search_icon.png";

const SearchBar = () => {
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

  const handleCountryDropdown = () => {
    setShowCities(!showCities);
    setShowLocations(false);
  };

  const handleLocationDropdown = () => {
    if (selectedCity !== "City") {
      setShowLocations(!showLocations);
      setShowCities(false);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setSelectedLocation("Location");
    setShowCities(false);
    setShowError(false);
  };

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
    setShowCities(false);
  };

  return (
    <div className="mx-4 sm:mx-8 px-6 sm:px-8 py-8 bg-light-neutral rounded-xl mt-5 sm:mt-10 inner-shadow flex flex-col-reverse lg:flex-row lg:items-center flex-wrap items-stretch gap-4 sm:gap-6 max-w-6xl w-full">
      <div className="flex gap-6 sm:flex-row flex-col ">
        <div className="bg-state-blue text-light-neutral px-1 py-1 rounded-xl flex-1 xl:max-w-[180px] flex items-center justify-center">
          <input
            type="date"
            className="bg-transparent border-0 outline-none text-light-neutral text-sm sm:text-base w-full cursor-pointer"
          />
        </div>

        <div
          onClick={handleCountryDropdown}
          className="bg-state-blue text-light-neutral flex items-center justify-between px-4  py-2 rounded-xl gap-2 xl:flex-none flex-1  min-w-[180px] cursor-pointer relative"
        >
          {showCities && (
            <div className="absolute bg-white w-full left-0 top-full text-state-blue z-50 rounded-xl overflow-hidden">
              <ul className="flex flex-col gap-2 py-2">
                {cityOptions.map((city) => (
                  <li
                    onClick={() => {
                      handleSelectCity(city);
                    }}
                    key={city}
                    className="px-4 py-2"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <span className="text-sm sm:text-base">{selectedCity}</span>
          <img src={Arrow_Down} alt="arrow_Down icon" className="w-4 sm:w-5" />
        </div>

        <div
          onClick={handleLocationDropdown}
          className="bg-state-blue text-light-neutral flex items-center justify-between px-4  py-2 rounded-xl gap-2 xl:flex-none flex-1  min-w-[180px] cursor-pointer relative"
        >
          {showError && (
            <p className="text-red-600 text-sm absolute -top-5 left-2">
              Select city first
            </p>
          )}
          {showLocations && locationOptions[selectedCity] && (
            <div className="absolute bg-white w-full left-0 top-full text-state-blue z-50 rounded-xl overflow-hidden">
              <ul className="flex flex-col gap-2 py-2">
                {locationOptions[selectedCity].map((location) => (
                  <li
                    onClick={() => {
                      handleSelectLocation(location);
                    }}
                    key={location}
                    className="px-4 py-2"
                  >
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <span className="text-sm sm:text-base">{selectedLocation}</span>
          <img src={Arrow_Down} alt="arrow_Down icon" className="w-4 sm:w-5" />
        </div>
      </div>

      <div className="flex-4 relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
          <img
            src={Search_icon}
            alt="search icon"
            className="w-5 sm:w-6 opacity-60 pt-1"
          />
        </div>
        <input
          className="bg-white border-0 pl-12 pr-4 py-3 h-full rounded-xl w-full outline-none text-sm sm:text-base"
          type="text"
          name="search"
          id="search"
          placeholder="Search for your event"
        />
      </div>
    </div>
  );
};

export default SearchBar;
