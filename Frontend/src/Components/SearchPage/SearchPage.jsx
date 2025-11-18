import Results from "../Results/Results";
import SearchBar from "../SearchBar/SearchBar";

const Search = () => {
  const events = [
    {
      id: 1,
      category: "Music",
      img: "https://picsum.photos/300/200?random=1",
      eventName: "Cairo Jazz Festival",
      rate: 4.7,
      desc: "Experience live jazz performances from global artists.",
      date: "2025-11-25",
      location: "Cairo",
    },
    {
      id: 2,
      category: "Art",
      img: "https://picsum.photos/300/200?random=2",
      eventName: "Modern Art Expo",
      rate: 4.5,
      desc: "Discover inspiring modern art and creative exhibitions.",
      date: "2025-12-02",
      location: "Alexandria",
    },
    {
      id: 3,
      category: "Tech",
      img: "https://picsum.photos/300/200?random=3",
      eventName: "AI & Future Tech Summit",
      rate: 4.9,
      desc: "Join innovators discussing AI, robotics, and the future.",
      date: "2025-11-20",
      location: "Cairo",
    },
    {
      id: 4,
      category: "Sports",
      img: "https://picsum.photos/300/200?random=4",
      eventName: "Nile Marathon 2025",
      rate: 4.3,
      desc: "Run along the Nile with athletes from around the world.",
      date: "2025-12-10",
      location: "Giza",
    },
    {
      id: 5,
      category: "Food",
      img: "https://picsum.photos/300/200?random=5",
      eventName: "Taste of Egypt Festival",
      rate: 4.8,
      desc: "Savor authentic Egyptian and international cuisines.",
      date: "2025-12-15",
      location: "Cairo",
    },
    {
      id: 6,
      category: "Film",
      img: "https://picsum.photos/300/200?random=6",
      eventName: "Red Sea Film Week",
      rate: 4.6,
      desc: "Celebrate cinema with screenings and filmmaker panels.",
      date: "2025-11-28",
      location: "Hurghada",
    },
    {
      id: 7,
      category: "Education",
      img: "https://picsum.photos/300/200?random=7",
      eventName: "Career Growth Workshop",
      rate: 4.4,
      desc: "Learn essential career skills from industry experts.",
      date: "2025-12-05",
      location: "Cairo",
    },
    {
      id: 8,
      category: "Gaming",
      img: "https://picsum.photos/300/200?random=8",
      eventName: "EGX Gaming Expo",
      rate: 4.9,
      desc: "Play the latest games and meet your favorite creators.",
      date: "2025-12-20",
      location: "Cairo",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex justify-center">
        <SearchBar />
      </div>
      <Results events={events} />
    </div>
  );
};

export default Search;
