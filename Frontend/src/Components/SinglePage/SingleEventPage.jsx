import { data, useParams } from "react-router-dom";
import ImageSlider from "../Slider/ImageSlider";
import Reviews from "../Reviews/Reviews";
import ReviewForm from "../ReviewForm/ReviewForm";
import { useEffect, useState } from "react";
import useGet from "../../hooks/useGet";

const SingleEventPage = () => {
  const { id } = useParams();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [overviewDesc, setOverviewDesc] = useState([]);

  const {
    data: event,
    loading,
    error,
  } = useGet(`http://localhost:8080/api/v1.0/places/${id}`);

  console.log(id);

  // const event = {
  //   id: 1,
  //   category: "Music",
  //   img: "https://picsum.photos/300/200?random=1",
  //   eventName: "Cairo Jazz Festival",
  //   rate: 4.7,
  //   desc: "Experience live jazz performances from global artists.",
  //   largeDesc:
  //     "The Cairo Jazz Festival is a multi-day celebration of music, culture, and artistic expression, bringing together world-renowned jazz musicians and rising talents from across the globe.\n\nThe festival also features interactive jam sessions, music workshops, and industry talks where artists share insights about their creative journeys.\n\nWhether you're a dedicated jazz fan or simply looking to experience something unique, the Cairo Jazz Festival promises unforgettable evenings filled with rhythm, creativity, and vibrant cultural energy.",
  //   capacity: 2500,
  //   indoor: true,
  //   workingHours: "5:00 PM – 11:30 PM",
  //   date: "2025-11-25",
  //   location: "Cairo",
  // };

  useEffect(() => {
    if (event?.description) {
      setOverviewDesc(event.description.split(/\n\s*\n/));
    }
  }, [event]);

  return (
    <>
      {loading && <p>loading...</p>}
      {error && <p>error...</p>}
      {event && (
        <div className="max-w-8xl px-2 sm:px-4 mx-auto">
          <div className="mt-6 sm:mt-10">
            <ImageSlider />
          </div>

          <div className="mt-8 sm:mt-12">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-navy">
                {event.placeName}
              </h2>

              <button>
                <i className="fa-regular fa-bookmark text-2xl sm:text-3xl"></i>
              </button>
            </div>

            <div className="mt-8 sm:mt-12 flex flex-col md:flex-row justify-between gap-10 md:gap-8">
              <div className="md:max-w-[440px] flex flex-col gap-6 sm:gap-8 md:pr-8 md:border-r-2 border-state-blue">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                    Capacity:
                  </h3>
                  <p className="text-lg text-state-blue">{event.capacity}</p>
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                    Indoor / Outdoor:
                  </h3>
                  <p className="text-lg text-state-blue">
                    {event.indoor ? "indoor" : "outdoor"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                    Rating:
                  </h3>
                  <p className="text-lg text-state-blue">{event.rate || 4}</p>
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                    Categories:
                  </h3>
                  <p className="text-lg text-state-blue">
                    {event.category || "category"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                    Working Hours:
                  </h3>
                  <p className="text-lg text-state-blue">
                    {event.openTime} - {event.closeTime}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-semibold text-dark-navy">
                    Location:
                  </h3>
                  <p className="text-lg text-state-blue">{event.address}</p>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl md:text-4xl font-semibold text-dark-navy">
                  Overview
                </h3>

                <div className="space-y-6 sm:space-y-8 mt-4 sm:mt-6">
                  {overviewDesc.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-lg sm:text-xl leading-relaxed text-gray-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center gap-5 mt-16">
              <button className="bg-state-blue px-12 py-3 text-white font-bold text-base md:text-xl rounded-2xl">
                Request Booking
              </button>
              <button className="bg-white border-2 border-state-blue px-12 py-3 text-state-blue font-bold text-base md:text-xl rounded-2xl">
                Ask Question
              </button>
            </div>
            <div className="hidden">Hidden Booking</div>
          </div>
          <div className="mt-10">
            <div className="flex justify-between items-center">
              <h2 className="text-dark-navy font-bold text-2xl sm:text-3xl">
                Reviews
              </h2>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-3 py-2 bg-state-blue text-white rounded-xl text-sm"
              >
                {showReviewForm ? "Cancel" : "Write Review"}
              </button>
            </div>
            <div>{showReviewForm && <ReviewForm />}</div>
            <div className="mt-8 space-y-6 mb-16">
              <Reviews />
              <Reviews />
              <Reviews />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleEventPage;
