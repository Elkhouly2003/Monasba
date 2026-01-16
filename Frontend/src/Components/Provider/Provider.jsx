import img1 from "../../assets/icons/booking.png";
import img2 from "../../assets/icons/overView.png";
import img3 from "../../assets/icons/star.png";
import img4 from "../../assets/icons/bell.png";
import { useState } from "react";
import { useUser } from "../../store/useUser";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useQuery, useQueryClient, useQueries } from "@tanstack/react-query";
import * as Yup from "yup";

export default function Provider() {
  const [active, setActive] = useState("overview");
  const [activeTab, setActiveTab] = useState("All");
  const [active2, setActive2] = useState("");
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
  const [isEdit, setIsEdit] = useState(false);
  const [placeId, setPlaceId] = useState(null);
  const resetForm = () => {
    setPlaceName("");
    setDescription("");
    setCountry("");
    setCity("");
    setAddress("");
    setPrice("");
    setCapacity("");
    setPhone("");
    setOpeningTime("");
    setCloseTime("");
    setCategories([]);
    setImages([]);
    setIsEdit(false);
    setPlaceId(null);
  };
  const [errors, setErrors] = useState({});

  const placeSchema = Yup.object().shape({
    placeName: Yup.string()
      .required("Place name is required")
      .min(3, "Place name must be at least 3 characters"),

    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),

    country: Yup.string().required("Country is required"),

    city: Yup.string().required("City is required"),

    address: Yup.string().required("Address is required"),

    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be positive")
      .required("Price is required"),

    capacity: Yup.number()
      .typeError("Capacity must be a number")
      .positive("Capacity must be positive")
      .integer("Capacity must be an integer")
      .required("Capacity is required"),

    phone: Yup.string().required("Phone is required"),

    openTime: Yup.string().required("Opening time is required"),

    closeTime: Yup.string().required("Closing time is required"),

    categories: Yup.array().min(1, "At least one category is required"),
  });

  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || (!user.userId && !user.id)) {
      return;
    }
    try {
      await placeSchema.validate(
        {
          placeName,
          description,
          country,
          city,
          address,
          price,
          capacity,
          phone,
          openTime: openingTime,
          closeTime,
          categories,
        },
        { abortEarly: false }
      );
      setErrors({});
    } catch (validationError) {
      const newErrors = {};

      validationError.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
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
    formData.append("openTime", openingTime);
    formData.append("closeTime", closeTime);

    categories.forEach((cat) => {
      formData.append("categories", cat);
    });

    if (!isEdit) {
      images.forEach((img) => {
        formData.append("images", img);
      });
    }

    const url = isEdit
      ? `http://localhost:8080/api/v1.0/placess/${placeId}`
      : `http://localhost:8080/api/v1.0/placess?ownerId=${userId}`;

    const method = isEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) throw new Error("Place data update failed");

      const placeResult = await response.json();
      console.log(placeResult);

      if (isEdit && images.length > 0) {
        const currentPlace = placeByOwner?.data?.find(
          (p) => p.placeId === placeId
        );

        if (currentPlace && currentPlace.imagesID) {
          const deletePromises = currentPlace.imagesID.map((imgId) =>
            axios.delete(`http://localhost:8080/api/v1.0/imagess/${imgId}`)
          );
          await Promise.all(deletePromises);
        }

        const imageFormData = new FormData();
        imageFormData.append("placeId", placeId);

        images.forEach((img) => {
          imageFormData.append("files", img);
        });

        const imgResponse = await fetch(
          `http://localhost:8080/api/v1.0/imagess`,
          {
            method: "POST",
            body: imageFormData,
          }
        );

        if (!imgResponse.ok) throw new Error("Image upload failed");
      }

      queryClient.invalidateQueries({
        queryKey: ["placesByOwner", user.userId],
      });

      resetForm();
      setActive2("");
      setIsEdit(false);
      setPlaceId(null);
    } catch (err) {
      console.error(err);
    }
  };
  const queryClient = useQueryClient();

  const getPlacesByOwner = async (userId) => {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1.0/placess/owner/${userId}`
    );
    return data;
  };

  const { data: placeByOwner } = useQuery({
    queryKey: ["placesByOwner", user?.userId],
    queryFn: () => getPlacesByOwner(user.userId),
    enabled: !!user?.userId,
  });

  async function deleteItem(userId, placeId) {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1.0/placess/place/${placeId}/user/${userId}`
      );

      queryClient.invalidateQueries({
        queryKey: ["placesByOwner", user.userId],
      });
    } catch (er) {
      console.log(er);
    }
  }

  const getBookingByOwnerId = async (userId) => {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1.0/bookingss/owner/${userId}`
    );
    return data;
  };

  const { data: bookByOwner } = useQuery({
    queryKey: ["bookByOwner", user?.userId],
    queryFn: () => getBookingByOwnerId(user.userId),
    enabled: !!user?.userId,
  });

  async function deleteBook(bookingId) {
    try {
      await axios.patch(
        `http://localhost:8080/api/v1.0/bookingss/cancel/${bookingId}`
      );

      queryClient.invalidateQueries({
        queryKey: ["bookByOwner", user.userId],
      });
    } catch (er) {
      console.log(er);
    }
  }

  async function acceptBook(bookingId) {
    try {
      await axios.patch(
        `http://localhost:8080/api/v1.0/bookingss/accept/${bookingId}`
      );

      queryClient.invalidateQueries({
        queryKey: ["bookByOwner", user.userId],
      });
    } catch (er) {
      console.log(er);
    }
  }

  const getNotificartionProvider = async (userId) => {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1.0/notificationss/owner/${userId}`
    );
    return data;
  };

  const { data: notifByOwner } = useQuery({
    queryKey: ["notifByOwner", user?.userId],
    queryFn: () => getNotificartionProvider(user.userId),
    enabled: !!user?.userId,
  });

  async function deleteNotif(notificationId) {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1.0/notificationss/${notificationId}`
      );

      queryClient.invalidateQueries({
        queryKey: ["notifByOwner", user.userId],
      });
    } catch (er) {
      console.log(er);
    }
  }

  const getPlaceById = async (placeId) => {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1.0/placess/${placeId}`
    );
    return data;
  };

  const placeQueries = useQueries({
    queries:
      notifByOwner?.data?.map((notif) => ({
        queryKey: ["place", notif.placeId],
        queryFn: () => getPlaceById(notif.placeId),
        enabled: !!notif.placeId,
      })) || [],
  });

  return (
    <>
      <Nav />
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
            <button
              onClick={() => setActive2("overview2")}
              className=" bg-(--color-steel-blue) text-white font-semibold px-6 mr-5 py-2 rounded-xl transition-colors duration-300 cursor-pointer"
            >
              + Add new venue
            </button>
          </div>

          {active2 == "overview2" && (
            <>
              <div className="container bg-white p-6 rounded-2xl shadow-sm ">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-2xl">Add New Event</h2>
                  <i
                    onClick={() => setActive2("")}
                    className="fa-solid fa-x cursor-pointer text-gray-500"
                  ></i>
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
                    {errors.placeName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.placeName}
                      </p>
                    )}
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
                      {errors.categories && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.categories}
                        </p>
                      )}
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
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.description}
                      </p>
                    )}
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
                    {errors.country && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Cairo"
                      className="w-full border border-gray-300 rounded-xl px-4 py-2"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                    )}
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
                    {errors.address && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
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
                    {errors.price && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.price}
                      </p>
                    )}
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
                    {errors.capacity && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.capacity}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 011111111"
                      className="w-full border border-gray-300 rounded-xl px-4 py-2"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
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
                    {errors.openTime && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.openTime}
                      </p>
                    )}
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
                    {errors.closeTime && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.closeTime}
                      </p>
                    )}
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
                    onClick={handleSubmit}
                    className={`px-5 py-2 rounded-xl text-white cursor-pointer ${
                      isEdit ? "bg-green-600" : "bg-(--color-dark-navy)"
                    }`}
                  >
                    {isEdit ? "Update Event" : "Publish Event"}
                  </button>
                </div>
              </div>
            </>
          )}

          <div className=" container">
            <div className="max-w-8xl mx-auto px-2 sm:px-4">
              <div className="mt-6 mb-8 grid gap-8 grid-cols-1 [@media(min-width:650px)_and_(max-width:764px)]:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {placeByOwner?.data?.map((place) => (
                  <div
                    key={place.placeId}
                    className="bg-white text-steel-blue rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 relative group"
                  >
                    <div className="absolute top-3 left-3 z-20 bg-state-blue text-light-neutral px-3 py-1 text-sm font-medium rounded-full opacity-90 backdrop-blur-sm">
                      {place.categories[0]}
                    </div>

                    <div className="overflow-hidden">
                      <img
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                        src={`http://localhost:8080/api/v1.0/imagess/${place.imagesID[0]}`}
                        alt=""
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-xl line-clamp-1">
                          {place.placeName}
                        </h1>
                        <div className="flex items-center gap-1">
                          <i className="fa-solid fa-star text-yellow-400"></i>
                          <span className="font-medium">4.5</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                        {place.description}
                      </p>

                      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <i className="fa-regular fa-calendar"></i>
                          <span>{place.openTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-location-dot"></i>
                          <span>
                            {place.address} {place.city}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-6">
                        <button
                          onClick={() => {
                            setIsEdit(true);
                            setPlaceId(place.placeId);
                            setPlaceName(place.placeName);
                            setDescription(place.description);
                            setCountry(place.country);
                            setCity(place.city);
                            setAddress(place.address);
                            setPrice(place.price);
                            setCapacity(place.capacity);
                            setPhone(place.phone);
                            setOpeningTime(place.openTime);
                            setCloseTime(place.closeTime);
                            setCategories(place.categories || []);
                            setActive2("overview2");
                          }}
                          className="bg-state-blue text-light-neutral font-semibold px-5 rounded-xl cursor-pointer"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteItem(user.userId, place.placeId)}
                          className="text-white bg-red-600 rounded-3xl px-5 cursor-pointer "
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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
            <ul className="flex flex-wrap gap-2 text-sm font-medium text-center">
              {["All", "Pending", "Confirmed", "Cancelled"].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 rounded-2xl transition
                ${
                  activeTab === tab
                    ? "bg-(--color-dark-navy) text-white cursor-pointer"
                    : "bg-(--color-cool-gray) text-white cursor-pointer"
                }
              `}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {bookByOwner?.data
            ?.filter((booking) => {
              if (activeTab === "All") return true;
              if (activeTab === "Pending") return booking.status === "pending";
              if (activeTab === "Confirmed")
                return booking.status === "accepted";
              if (activeTab === "Cancelled")
                return booking.status === "cancelled";
              return false;
            })
            .map((booking) => (
              <div
                key={booking.bookingId}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {booking.title}
                    </h3>

                    <p className="text-sm text-gray-600">
                      {booking.description}
                    </p>

                    <div className="text-sm text-gray-500 space-y-1">
                      <p>📅 Start: {booking.startDate}</p>
                      <p>📅 End: {booking.endDate}</p>
                    </div>

                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium
                  ${
                    booking.status === "accepted"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }
                `}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                    {booking.status === "cancelled" && (
                      <button className="bg-red-300 text-white text-sm px-4 py-1.5 rounded-lg">
                        Cancelled
                      </button>
                    )}

                    {booking.status === "pending" && (
                      <>
                        <button className="bg-amber-500 text-white text-sm px-4 py-1.5 rounded-lg">
                          Pending
                        </button>

                        <button
                          onClick={() => deleteBook(booking.bookingId)}
                          className="text-white bg-red-600 rounded-xl text-sm py-1 px-3"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() => acceptBook(booking.bookingId)}
                          className="text-white bg-green-700 rounded-xl text-sm py-1 px-3"
                        >
                          Approve
                        </button>
                      </>
                    )}

                    {booking.status === "accepted" && (
                      <button className="bg-green-600 text-white text-sm px-4 py-1.5 rounded-lg">
                        Confirmed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
          </div>
          {notifByOwner?.data?.map((notification, index) => {
            const placeData = placeQueries[index]?.data;
            return (
              <div
                key={notification.notificationId}
                className="container bg-white rounded-2xl shadow-sm p-6 space-y-4 mb-3 border border-gray-300 "
              >
                <div className=" mx-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-xl">
                        {notification.notificationMessage}
                      </h3>
                    </div>
                    <div>
                      <i
                        onClick={() => deleteNotif(notification.notificationId)}
                        className="fa-solid fa-x cursor-pointer text-gray-500"
                      ></i>
                    </div>
                  </div>
                  <div className=" container pt-2">
                    <span className="text-(--color-steel-blue)">
                      placeName:{" "}
                      <span className="font-bold">
                        {placeData?.data?.placeName}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
