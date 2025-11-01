import img1 from "../../assets/icons/Wedding_Icon.png";
import img2 from "../../assets/icons/Birthday_Cake_Icon.png";
import img3 from "../../assets/icons/Graduation_Cap_Icon.png";
import img4 from "../../assets/icons/Restaurant_Table_Icon.svg";
import img5 from "../../assets/icons/Diamond_Ring_Icon.png";
import img6 from "../../assets/icons/Two_Tickets_Icon.png";
import img7 from "../../assets/icons/Workshop_Icon.png";
import img8 from "../../assets/icons/Search_More_Icon.png";
import Categorie from "../Categorie/categorie";

function Home(props) {
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
    </>
  );
}

export default Home;
