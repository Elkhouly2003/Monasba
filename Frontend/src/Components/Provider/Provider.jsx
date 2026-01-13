import img1 from "../../assets/icons/booking.png";
import img2 from "../../assets/icons/overView.png";
import img3 from "../../assets/icons/star.png";
import img4 from "../../assets/icons/bell.png";
import img5 from "../../assets//icons/sumatra-weddings.png";
import usePost from "../../hooks/usePost";
import { useState } from "react";
import { useUser } from "../../store/useUser";
export default function Provider() {
  const [active, setActive] = useState("overview");
  const [activeTab, setActiveTab] = useState("All");

  const [placeName, setPlaceName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState();
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [openingTime, setOpeningTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [images, setImages] = useState([]);

  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || (!user.userId && !user.id)) {
      alert("User session not found.");
      return;
    }

    const userId = user.userId || user.id;
    const formData = new FormData();

    formData.append("placeName", placeName);
    formData.append("description", description);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("address", address);
    formData.append("price", price);
    formData.append("capacity", capacity);
    formData.append("phone", phone);

    const formatTime = (timeStr) => {
      if (!timeStr) return "00:00";
      return timeStr.includes(":") ? timeStr : `${timeStr}:00`;
    };

    formData.append("openTime", formatTime(openingTime));
    formData.append("closeTime", formatTime(closeTime));

    categories.forEach((cat) => {
      formData.append("categories", cat);
    });

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1.0/placess?ownerId=${userId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        const errorData = await response.json();
        console.error(errorData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="w-full bg-(--color-dark-navy)">
        <div className=" container pt-10 pb-10">
          <form className="max-w-sm mx-auto space-y-4">
            <div>
              <label
                htmlFor="visitors"
                className="block mb-2.5 text-sm text-(--color-light-neutral) font-medium text-heading"
              >
                Business Name
              </label>
              <input
                type="text"
                id="visitors"
                className="bg-(--color-steel-blue) rounded-xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2.5 text-sm text-(--color-light-neutral) font-medium text-heading"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-(--color-steel-blue) rounded-xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="tel"
                className="block mb-2.5 text-sm text-(--color-light-neutral) font-medium text-heading"
              >
                Support Number
              </label>
              <input
                type="tel"
                id="tel"
                className="bg-(--color-steel-blue) rounded-xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="password1"
                className="block mb-2.5 text-sm text-(--color-light-neutral) font-medium text-heading"
              >
                Current Password
              </label>
              <input
                type="password"
                id="password1"
                className="bg-(--color-steel-blue) rounded-xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder=""
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2.5 text-sm text-(--color-light-neutral) font-medium text-heading"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-(--color-steel-blue) rounded-xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
                placeholder=""
                required
              />
            </div>
            <button
              type="submit"
              className=" cursor-pointer text-white bg-cyan-900 rounded-2xl box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Save
            </button>
          </form>
        </div>
      </div>

      <div className="w-full">
        <div
          className=" container p-6 
              grid 
              gap-6 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4"
        >
          <div
            onClick={() => setActive("overview")}
            className="flex justify-center items-center cursor-pointer p-4 sm:p-6 md:p-8"
          >
            <div
              className="
                            relative
                            bg-white 
                            rounded-xl 
                            shadow-lg 
                            p-4 sm:p-6 
                            text-center 
                            border border-gray-200 
                            w-52 sm:w-64 md:w-72 lg:w-80 
                            transition-transform 
                            hover:scale-105 
                            duration-300
                            group
                            z-10
                          "
            >
              <img
                src={img2}
                alt=""
                className="mx-auto mb-4 sm:mb-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
              <h3
                className="
                              text-base sm:text-lg md:text-xl 
                              font-semibold 
                              text-gray-900 
                              mb-2 sm:mb-3
                            "
              >
                Overview
              </h3>
            </div>
          </div>
          <div
            onClick={() => setActive("My Bookings")}
            className="flex justify-center items-center cursor-pointer p-4 sm:p-6 md:p-8"
          >
            <div
              className="
                            relative
                            bg-white 
                            rounded-xl 
                            shadow-lg 
                            p-4 sm:p-6 
                            text-center 
                            border border-gray-200 
                            w-52 sm:w-64 md:w-72 lg:w-80 
                            transition-transform 
                            hover:scale-105 
                            duration-300
                            group
                            z-10
                          "
            >
              <img
                src={img1}
                alt=""
                className="mx-auto mb-4 sm:mb-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
              <h3
                className="
                              text-base sm:text-lg md:text-xl 
                              font-semibold 
                              text-gray-900 
                              mb-2 sm:mb-3
                            "
              >
                My Bookings
              </h3>
            </div>
          </div>

          <div
            onClick={() => setActive("Reviews")}
            className="flex justify-center items-center cursor-pointer p-4 sm:p-6 md:p-8"
          >
            <div
              className="
                            relative
                            bg-white 
                            rounded-xl 
                            shadow-lg 
                            p-4 sm:p-6 
                            text-center 
                            border border-gray-200 
                            w-52 sm:w-64 md:w-72 lg:w-80 
                            transition-transform 
                            hover:scale-105 
                            duration-300
                            group
                            z-10
                          "
            >
              <img
                src={img3}
                alt=""
                className="mx-auto mb-4 sm:mb-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
              <h3
                className="
                              text-base sm:text-lg md:text-xl 
                              font-semibold 
                              text-gray-900 
                              mb-2 sm:mb-3
                            "
              >
                Reviews
              </h3>
            </div>
          </div>
          <div
            onClick={() => setActive("Notifications")}
            className="flex justify-center items-center cursor-pointer p-4 sm:p-6 md:p-8"
          >
            <div
              className="
                            relative
                            bg-white 
                            rounded-xl 
                            shadow-lg 
                            p-4 sm:p-6 
                            text-center 
                            border border-gray-200 
                            w-52 sm:w-64 md:w-72 lg:w-80 
                            transition-transform 
                            hover:scale-105 
                            duration-300
                            group
                            z-10
                          "
            >
              <img
                src={img4}
                alt=""
                className="mx-auto mb-4 sm:mb-5 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
              />
              <h3
                className="
                              text-base sm:text-lg md:text-xl 
                              font-semibold 
                              text-gray-900 
                              mb-2 sm:mb-3
                            "
              >
                Notifications
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mb-5">
        <div className="p-5">
          <h3
            className="
                              text-2xl 
                              font-bold 
                              text-gray-900 
                              mb-2 sm:mb-3
                            "
          >
            Overview
          </h3>
        </div>
        <div className="p-1">
          <div className=" flex justify-center gap-10 px-2.5">
            <div
              className="relative  bg-(--color-state-blue) rounded-xl shadow-lg p-4 sm:p-6 text-center border border-gray-200 w-52 sm:w-64 md:w-72 lg:w-80 transition-transform hover:scale-105 
                            duration-300
                            group
                            z-10
                            
                          "
            >
              <span className="text-3xl text-white">12</span>
              <h3
                className="
                              text-sm
                              font-semibold 
                              text-(--color-light-neutral) 
                              mb-2 sm:mb-3
                            "
              >
                Events Posted
              </h3>
            </div>
            <div
              className="relative  bg-(--color-state-blue) rounded-xl shadow-lg p-4 sm:p-6 text-center border border-gray-200 w-52 sm:w-64 md:w-72 lg:w-80 transition-transform hover:scale-105 
                            duration-300
                            group
                            z-10
                            
                          "
            >
              <span className="text-3xl text-white">8</span>
              <h3
                className="
                              text-sm
                              font-semibold 
                              text-(--color-light-neutral) 
                              mb-2 sm:mb-3
                            "
              >
                Upcoming Bookings
              </h3>
            </div>
            <div
              className="relative  bg-(--color-state-blue) rounded-xl shadow-lg p-4 sm:p-6 text-center border border-gray-200 w-52 sm:w-64 md:w-72 lg:w-80 transition-transform hover:scale-105 
                            duration-300
                            group
                            z-10
                            
                          "
            >
              <span className="text-3xl text-white">$2,450</span>
              <h3
                className="
                              text-sm
                              font-semibold 
                              text-(--color-light-neutral) 
                              mb-2 sm:mb-3
                            "
              >
                Total Revenue
              </h3>
            </div>
            <div
              className="relative  bg-(--color-state-blue) rounded-xl shadow-lg p-4 sm:p-6 text-center border border-gray-200 w-52 sm:w-64 md:w-72 lg:w-80 transition-transform hover:scale-105 
                            duration-300
                            group
                            z-10
                            
                          "
            >
              <span className="text-3xl text-white">2</span>
              <h3
                className="
                              text-sm
                              font-semibold 
                              text-(--color-light-neutral) 
                              mb-2 sm:mb-3
                            "
              >
                Pending Approvals
              </h3>
            </div>
            <div
              className="relative  bg-(--color-state-blue) rounded-xl shadow-lg p-4 sm:p-6 text-center border border-gray-200 w-52 sm:w-64 md:w-72 lg:w-80 transition-transform hover:scale-105 
                            duration-300
                            group
                            z-10
                            
                          "
            >
              <span className="text-3xl text-white">24</span>
              <h3
                className="
                              text-sm
                              font-semibold 
                              text-(--color-light-neutral) 
                              mb-2 sm:mb-3
                            "
              >
                Reviews Received
              </h3>
            </div>
          </div>
        </div>
      </div>

      {active == "overview" && (
        <div className="w-full mb-6 mt-6">
          <div className="container mx-auto mb-6 pl-5 flex justify-between">
            <h2 className="font-bold text-2xl">Saved Events</h2>
            <button className=" bg-(--color-steel-blue) text-white font-semibold px-6 mr-5 py-2 rounded-xl transition-colors duration-300 cursor-pointer">
              + Add new venue
            </button>
          </div>

          <div className="container bg-white p-6 rounded-2xl shadow-sm ">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-bold text-2xl">Add New Event</h2>
              <i className="fa-solid fa-x cursor-pointer text-gray-500"></i>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Al-Lu'lu'a Venue"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                />
              </div>

              <div className="md:col-span-1">
                <label className="block text-sm font-medium mb-1">
                  Categories
                </label>
                <div className="flex flex-wrap gap-3 p-2 border border-gray-300 rounded-xl bg-gray-50">
                  {["Wedding", "Birthday", "Party"].map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-cyan-900 focus:ring-cyan-900"
                        checked={categories.includes(cat)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCategories([...categories, cat]);
                          } else {
                            setCategories(
                              categories.filter((item) => item !== cat)
                            );
                          }
                        }}
                      />
                      <span className="text-sm">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  rows="4"
                  placeholder="Describe your event..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <input
                  type="text"
                  placeholder="e.g. Egypt"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  placeholder="e.g. Cairo"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cairo"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Booking Price
                </label>
                <input
                  type="number"
                  placeholder="e.g. 35"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  placeholder="e.g. 200"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="number"
                  placeholder="e.g. 011111111"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Opening Time
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={openingTime}
                  onChange={(e) => setOpeningTime(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Closing Time
                </label>
                <input
                  type="time"
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  value={closeTime}
                  onChange={(e) => setCloseTime(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Upload Gallery
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => setImages([...e.target.files])}
                  className="w-full border border-dashed border-gray-400 rounded-xl px-4 py-6 bg-gray-50"
                />
                {images.length > 0 && (
                  <p className="text-xs mt-2 text-gray-500">
                    {images.length} images selected
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button className="px-5 py-2 rounded-xl bg-gray-500 text-white">
                Preview Event
              </button>
              <button
                onClick={(e) => handleSubmit(e)}
                className="px-5 py-2 rounded-xl bg-(--color-dark-navy) text-white"
              >
                Publish Event
              </button>
            </div>
          </div>

          <div className=" container">
            <div className="max-w-8xl mx-auto px-2 sm:px-4">
              <div className="mt-6 mb-8 grid gap-8 grid-cols-1 [@media(min-width:650px)_and_(max-width:764px)]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div className="bg-white text-steel-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group">
                  <div className="absolute top-3 left-3 z-20 bg-state-blue text-light-neutral px-3 py-1 text-sm font-medium rounded-full opacity-90 backdrop-blur-sm">
                    Wedding
                  </div>

                  <div className="overflow-hidden">
                    <img
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      src={img5}
                      alt=""
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl line-clamp-1">
                        Al-Lu’lu’a Venue
                      </h1>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span className="font-medium">4.5</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      Elegant venue for wedding and celebrations.
                    </p>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <i className="fa-regular fa-calendar"></i>
                        <span>Jan 9, 2004</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>cairo</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <button className="bg-state-blue text-light-neutral font-semibold px-5 rounded-xl transition-colors duration-300 cursor-pointer">
                        Edit
                      </button>

                      <button className="text-white bg-red-600 rounded-3xl px-5 cursor-pointer ">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white text-steel-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group">
                  <div className="absolute top-3 left-3 z-20 bg-state-blue text-light-neutral px-3 py-1 text-sm font-medium rounded-full opacity-90 backdrop-blur-sm">
                    Wedding
                  </div>

                  <div className="overflow-hidden">
                    <img
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      src={img5}
                      alt=""
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl line-clamp-1">
                        Al-Lu’lu’a Venue
                      </h1>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span className="font-medium">4.5</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      Elegant venue for wedding and celebrations.
                    </p>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <i className="fa-regular fa-calendar"></i>
                        <span>Jan 9, 2004</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>cairo</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <button className="bg-state-blue text-light-neutral font-semibold px-5 rounded-xl transition-colors duration-300 cursor-pointer">
                        Edit
                      </button>

                      <button className="text-white bg-red-600 rounded-3xl px-5 cursor-pointer ">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white text-steel-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group">
                  <div className="absolute top-3 left-3 z-20 bg-state-blue text-light-neutral px-3 py-1 text-sm font-medium rounded-full opacity-90 backdrop-blur-sm">
                    Wedding
                  </div>

                  <div className="overflow-hidden">
                    <img
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      src={img5}
                      alt=""
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl line-clamp-1">
                        Al-Lu’lu’a Venue
                      </h1>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span className="font-medium">4.5</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      Elegant venue for wedding and celebrations.
                    </p>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <i className="fa-regular fa-calendar"></i>
                        <span>Jan 9, 2004</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>cairo</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <button className="bg-state-blue text-light-neutral font-semibold px-5 rounded-xl transition-colors duration-300 cursor-pointer">
                        Edit
                      </button>

                      <button className="text-white bg-red-600 rounded-3xl px-5 cursor-pointer ">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-white text-steel-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group">
                  <div className="absolute top-3 left-3 z-20 bg-state-blue text-light-neutral px-3 py-1 text-sm font-medium rounded-full opacity-90 backdrop-blur-sm">
                    Wedding
                  </div>

                  <div className="overflow-hidden">
                    <img
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      src={img5}
                      alt=""
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-center">
                      <h1 className="font-semibold text-xl line-clamp-1">
                        Al-Lu’lu’a Venue
                      </h1>
                      <div className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span className="font-medium">4.5</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      Elegant venue for wedding and celebrations.
                    </p>

                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <i className="fa-regular fa-calendar"></i>
                        <span>Jan 9, 2004</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>cairo</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <button className="bg-state-blue text-light-neutral font-semibold px-5 rounded-xl transition-colors duration-300 cursor-pointer">
                        Edit
                      </button>

                      <button className="text-white bg-red-600 rounded-3xl px-5 cursor-pointer ">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {active === "My Bookings" && (
        <div className="w-full mb-6">
          <div className="container mx-auto mb-6 pl-5">
            <h2 className="font-bold text-2xl">My Bookings</h2>
          </div>
          <div className="flex justify-center m-3">
            <ul className="flex flex-wrap gap-2 text-sm font-medium text-center text-body">
              <li>
                <button
                  onClick={() => setActiveTab("All")}
                  className={`px-4 py-2.5 rounded-2xl cursor-pointer transition
          ${
            activeTab === "All"
              ? "bg-(--color-dark-navy) text-white hover:bg-neutral-secondary-soft"
              : "bg-(--color-cool-gray) text-white hover:bg-neutral-secondary-soft"
          }
        `}
                >
                  All
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("Pending")}
                  className={`px-4 py-2.5 rounded-2xl cursor-pointer transition
          ${
            activeTab === "Pending"
              ? "bg-(--color-dark-navy) text-white hover:bg-neutral-secondary-soft"
              : "bg-(--color-cool-gray) text-white hover:bg-neutral-secondary-soft"
          }
        `}
                >
                  Pending
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("Completed")}
                  className={`px-4 py-2.5 rounded-2xl cursor-pointer transition
          ${
            activeTab === "Completed"
              ? "bg-(--color-dark-navy) text-white hover:bg-neutral-secondary-soft"
              : "bg-(--color-cool-gray) text-white hover:bg-neutral-secondary-soft"
          }
        `}
                >
                  Completed
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("Confirmed")}
                  className={`px-4 py-2.5 rounded-2xl cursor-pointer transition
          ${
            activeTab === "Confirmed"
              ? "bg-(--color-dark-navy) text-white hover:bg-neutral-secondary-soft"
              : "bg-(--color-cool-gray) text-white hover:bg-neutral-secondary-soft"
          }
        `}
                >
                  Confirmed
                </button>
              </li>

              <li>
                <button
                  onClick={() => setActiveTab("Cancelled")}
                  className={`px-4 py-2.5 rounded-2xl cursor-pointer transition
          ${
            activeTab === "Cancelled"
              ? "bg-(--color-dark-navy) text-white hover:bg-neutral-secondary-soft"
              : "bg-(--color-cool-gray) text-white hover:bg-neutral-secondary-soft"
          }
        `}
                >
                  Cancelled
                </button>
              </li>
            </ul>
          </div>

          <div className="container mx-auto bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300">
            <div>
              <h3 className="font-semibold text-xl mb-3">Ali Gado</h3>

              <span className="text-(--color-state-blue) text-xs block">
                Event: Elegant Wedding Night
              </span>

              <div className="flex items-center">
                <span className="text-(--color-state-blue) text-xs">
                  Date: Oct 20, 2025 • 7:00 PM
                </span>

                <div className="flex gap-2 ml-auto">
                  <button className="text-white bg-yellow-400 rounded-xl text-sm py-1 px-3">
                    Pending
                  </button>
                  <button className="text-white bg-green-700 rounded-xl text-sm py-1 px-3">
                    Approve
                  </button>
                  <button className="text-white bg-red-600 rounded-xl text-sm py-1 px-3">
                    Reject
                  </button>
                </div>
              </div>
              <div className=" container">
                <span className="text-(--color-state-blue) text-xs">
                  Tickets: 3 • Total: $105
                </span>
              </div>
            </div>
          </div>
          <div className="container mx-auto bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300">
            <div>
              <h3 className="font-semibold text-xl mb-3">Ali Gado</h3>

              <span className="text-(--color-state-blue) text-xs block">
                Event: Elegant Wedding Night
              </span>

              <div className="flex items-center">
                <span className="text-(--color-state-blue) text-xs">
                  Date: Oct 20, 2025 • 7:00 PM
                </span>

                <div className="flex gap-2 ml-auto">
                  <button className="text-white bg-yellow-400 rounded-xl text-sm py-1 px-3">
                    Pending
                  </button>
                  <button className="text-white bg-green-700 rounded-xl text-sm py-1 px-3">
                    Approve
                  </button>
                  <button className="text-white bg-red-600 rounded-xl text-sm py-1 px-3">
                    Reject
                  </button>
                </div>
              </div>
              <div className=" container">
                <span className="text-(--color-state-blue) text-xs">
                  Tickets: 3 • Total: $105
                </span>
              </div>
            </div>
          </div>
          <div className="container mx-auto bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300">
            <div>
              <h3 className="font-semibold text-xl mb-3">Ali Gado</h3>

              <span className="text-(--color-state-blue) text-xs block">
                Event: Elegant Wedding Night
              </span>

              <div className="flex items-center">
                <span className="text-(--color-state-blue) text-xs">
                  Date: Oct 20, 2025 • 7:00 PM
                </span>

                <div className="flex gap-2 ml-auto">
                  <button className="text-white bg-yellow-400 rounded-xl text-sm py-1 px-3">
                    Pending
                  </button>
                  <button className="text-white bg-green-700 rounded-xl text-sm py-1 px-3">
                    Approve
                  </button>
                  <button className="text-white bg-red-600 rounded-xl text-sm py-1 px-3">
                    Reject
                  </button>
                </div>
              </div>
              <div className=" container">
                <span className="text-(--color-state-blue) text-xs">
                  Tickets: 3 • Total: $105
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {active === "Reviews" && (
        <div className="w-full mb-6">
          <div className="container mx-auto mb-6 pl-5">
            <h2 className="font-bold text-2xl">My Reviews</h2>
          </div>
          <div>
            <div className="container bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300 ">
              <div className=" mx-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl">Al-Lu’lu’a Venue</h3>
                  </div>
                  <div class="flex items-center space-x-1">
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-fg-disabled"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  </div>
                </div>
                <div className=" container">
                  <span className="text-(--color-state-blue) text-xs">
                    Cairo, Egypt
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-(--color-state-blue) text-lg">
                      <span className=" text-(--color-steel-blue) font-bold">
                        Ali Gado :
                      </span>{" "}
                      “Venue was good and the view was very beautiful”
                    </p>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="container bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300 ">
              <div className=" mx-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl">Al-Lu’lu’a Venue</h3>
                  </div>
                  <div class="flex items-center space-x-1">
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-fg-disabled"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  </div>
                </div>
                <div className=" container">
                  <span className="text-(--color-state-blue) text-xs">
                    Cairo, Egypt
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-(--color-state-blue) text-lg">
                      <span className=" text-(--color-steel-blue) font-bold">
                        Ali Gado :
                      </span>{" "}
                      “Venue was good and the view was very beautiful”
                    </p>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="container bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300 ">
              <div className=" mx-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-xl">Al-Lu’lu’a Venue</h3>
                  </div>
                  <div class="flex items-center space-x-1">
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                    <svg
                      className="w-5 h-5 text-fg-disabled"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                    </svg>
                  </div>
                </div>
                <div className=" container">
                  <span className="text-(--color-state-blue) text-xs">
                    Cairo, Egypt
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-(--color-state-blue) text-lg">
                      <span className=" text-(--color-steel-blue) font-bold">
                        Ali Gado :
                      </span>{" "}
                      “Venue was good and the view was very beautiful”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {active === "Notifications" && (
        <div className="w-full mb-6">
          <div className="container mx-auto mb-6 pl-5 flex items-center justify-between">
            <h2 className="font-bold text-2xl">Notifications</h2>
            <button className="text-white bg-neutral-800 rounded-xl text-sm py-1 px-3 mr-5">
              Mark all as read
            </button>
          </div>
          <div className="container bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300 ">
            <div className=" mx-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xl">
                    You have a new booking for Wedding at Cairo Garden Hall on
                    Oct 12
                  </h3>
                </div>
              </div>
              <div className=" container pt-2">
                <span className="text-(--color-steel-blue)">
                  6:00 PM – 10:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <div>
                  <p className="text-(--color-state-blue) text-xs">Oct 20</p>
                </div>
                <div>
                  <button className="text-white bg-neutral-800 rounded-xl text-sm py-1 px-3">
                    View Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="container bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300 ">
            <div className=" mx-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xl">
                    You have a new booking for Wedding at Cairo Garden Hall on
                    Oct 12
                  </h3>
                </div>
              </div>
              <div className=" container pt-2">
                <span className="text-(--color-steel-blue)">
                  6:00 PM – 10:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <div>
                  <p className="text-(--color-state-blue) text-xs">Oct 20</p>
                </div>
                <div>
                  <button className="text-white bg-neutral-800 rounded-xl text-sm py-1 px-3">
                    View Booking
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
          <div className="container bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300 ">
            <div className=" mx-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-xl">
                    You have a new booking for Wedding at Cairo Garden Hall on
                    Oct 12
                  </h3>
                </div>
              </div>
              <div className=" container pt-2">
                <span className="text-(--color-steel-blue)">
                  6:00 PM – 10:00 PM
                </span>
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <div>
                  <p className="text-(--color-state-blue) text-xs">Oct 20</p>
                </div>
                <div>
                  <button className="text-white bg-neutral-800 rounded-xl text-sm py-1 px-3">
                    View Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
