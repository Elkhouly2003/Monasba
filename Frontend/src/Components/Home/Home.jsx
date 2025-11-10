import img1 from "../../assets/icons/Wedding_Icon.png";
import img2 from "../../assets/icons/Birthday_Cake_Icon.png";
import img3 from "../../assets/icons/Graduation_Cap_Icon.png";
import img4 from "../../assets/icons/Restaurant_Table_Icon.svg";
import img5 from "../../assets/icons/Diamond_Ring_Icon.png";
import img6 from "../../assets/icons/Two_Tickets_Icon.png";
import img7 from "../../assets/icons/Workshop_Icon.png";
import img8 from "../../assets/icons/Search_More_Icon.png";
import img9 from "../../assets/icons/Confetti_Icon.png";
import img10 from "../../assets/icons/User_Icon.png";
import Categorie from "../Categorie/categorie";
import SearchBar from "../SearchBar/SearchBar";

function Home() {
  const texts = [
    "“Celebrate love in style”",
    "“Your special day.”",
    "“Celebrate your success.”",
    "“Every dinner is special.”",
    "“A new chapter begins.”,",
    '"Relax for a day."',
    '"Discover new skills."',
    '"See every event."',
  ];
  const titles = [
    "wedding",
    "Birthday",
    "Graduation party",
    "Dinner",
    "Engagement",
    "Day Use",
    "Workshops",
    "Explore All",
  ];
  const images = [img1, img2, img3, img4, img5, img6, img7, img8];

  return (
    <>
      <div className="flex justify-center items-center">
        <SearchBar />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl pt-6 px-3 font-bold text-gray-900">
          Categories
        </h1>

        <div
          className="
      p-6 
      grid 
      gap-6 
      grid-cols-1 
      sm:grid-cols-2 
      md:grid-cols-3 
      lg:grid-cols-4
    "
        >
          {titles.map((title, index) => (
            <Categorie
              key={index}
              title={title}
              image={images[index]}
              text={texts[index]}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 lg:px-6 flex flex-col md:flex-row justify-center items-stretch gap-10 md:gap-12 py-10">
        <div className="bg-white flex-1 p-6 shadow-md rounded-2xl">
          <div className="flex items-center pb-3 pt-3">
            <img src={img9} className="h-8" alt="Confetti_Icon" />
            <h3 className="font-bold text-2xl px-2">Post Your Event</h3>
          </div>

          <p className="text-(--color-state-blue) text-sm pb-5 leading-relaxed">
            Reach thousands of customers searching for the perfect <br />
            location. Expand your business with Monasba.
          </p>

          <div className="pb-5 space-y-2">
            {[
              "Showcase your venue with photos & details",
              "Get more bookings with verified reviews",
              "Manage availability & reservations easily",
              "Promote special offers or packages",
            ].map((text, index) => (
              <div key={index} className="flex items-center">
                <i className="fa-solid fa-check pr-2"></i>
                <span className="text-sm text-(--color-state-blue)">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="bg-(--color-state-blue) w-full border border-gray-300 focus:outline-none hover:opacity-90 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 text-white dark:border-gray-600"
          >
            Join As Event
          </button>
        </div>

        <div className="bg-white flex-1 p-6 shadow-md rounded-2xl ة">
          <div className="flex items-center pb-3 pt-3">
            <img src={img10} className="h-8" alt="Confetti_Icon" />
            <h3 className="font-bold text-2xl px-2">Find Your Perfect Event</h3>
          </div>

          <p className="text-(--color-state-blue) text-sm pb-5 leading-relaxed">
            Discover thousands of curated event spaces for weddings, <br />
            parties, or corporate use. Booking made simple.
          </p>

          <div className="pb-5 space-y-2">
            {[
              "Browse hundreds of verified events",
              "Filter by location, budget, and type",
              "Read trusted reviews before booking",
              "Save favorites & book instantly",
            ].map((text, index) => (
              <div key={index} className="flex items-center">
                <i className="fa-solid fa-check pr-2"></i>
                <span className="text-sm text-(--color-state-blue)">
                  {text}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="bg-(--color-state-blue) w-full border border-gray-300 focus:outline-none hover:opacity-90 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 text-white dark:border-gray-600"
          >
            Join As Event
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;
