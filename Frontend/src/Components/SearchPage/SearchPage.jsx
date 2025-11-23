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
      largeDesc:
        "The Cairo Jazz Festival is a multi-day celebration of music, culture, and artistic expression, bringing together world-renowned jazz musicians and rising talents from across the globe. Guests can enjoy an exciting lineup of performances ranging from classic jazz to modern fusion and experimental styles. The festival also features interactive jam sessions, music workshops, and industry talks where artists share insights about their creative journeys. Visitors can explore food stalls, art displays, and themed lounges that create a warm and inviting atmosphere. Whether you're a dedicated jazz fan or simply looking to experience something unique, the Cairo Jazz Festival promises unforgettable evenings filled with rhythm, creativity, and vibrant cultural energy.",
      capacity: 2500,
      indoor: true,
      workingHours: "5:00 PM – 11:30 PM",
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

      largeDesc:
        "The Modern Art Expo is a dynamic cultural exhibition that celebrates contemporary creativity through a wide range of artistic styles and mediums. Visitors can explore themed halls featuring modern paintings, abstract sculptures, digital art pieces, experimental installations, and live artistic demonstrations. The event highlights both emerging Egyptian talents and internationally recognized artists, making it a rich platform for inspiration and creative exchange. Daily guided tours, panel discussions, and live painting sessions provide deeper insight into the artistic process and the stories behind the showcased works. Whether you are a seasoned art enthusiast or simply curious about modern expression, the Modern Art Expo offers an immersive and thought-provoking experience for all attendees.",

      capacity: 1800,
      indoor: true,
      workingHours: "10:00 AM – 8:00 PM",

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
      largeDesc:
        "The AI & Future Tech Summit is the region’s largest gathering for technology professionals, innovators, and enthusiasts seeking to explore the future of artificial intelligence and advanced digital solutions. The event features keynote speeches from global industry leaders, panel discussions covering real-world AI applications, robotics showcases, and hands-on workshops designed to help attendees understand tomorrow’s technology landscape. Startups and tech companies present their latest innovations in a dedicated exhibition area, offering great networking opportunities for investors, developers, and researchers. Whether you're interested in machine learning, automation, cybersecurity, or emerging tech trends, the summit provides a comprehensive and inspiring space to learn, connect, and envision the future.",
      capacity: 3500,
      indoor: true,
      workingHours: "9:00 AM – 7:00 PM",

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
      largeDesc:
        "Nile Marathon 2025 invites runners of all skill levels to participate in an exciting race set along the breathtaking views of the Nile River. The event promotes health, community spirit, and sportsmanship, offering multiple race categories including full marathon, half marathon, and fun runs. Throughout the route, participants will find hydration stations, first aid points, cheering zones, and scenic spots perfect for capturing memorable moments. Professional timing systems ensure accurate results, while post-race lounges provide refreshments and recovery stations. Whether you're a seasoned athlete or a first-time runner, the Nile Marathon offers a safe, energetic, and inspiring environment that brings together thousands of participants from around the world.",

      capacity: 8000,
      indoor: false,
      workingHours: "6:00 AM – 12:00 PM",

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
      largeDesc:
        "Taste of Egypt Festival is a vibrant culinary event that celebrates the diverse flavors, traditions, and cultural richness of Egyptian cuisine, alongside delicious international dishes. Visitors can enjoy food tastings from top restaurants, participate in live cooking competitions, and watch expert chefs prepare signature meals on stage. The festival offers a lively open-space setting filled with music, cultural performances, artisan markets, and family-friendly activities. Whether you’re a passionate food lover or simply exploring new tastes, the festival promises an unforgettable journey through Egypt’s rich culinary heritage. With a warm atmosphere, diverse menus, and interactive experiences, Taste of Egypt is the perfect destination for a fun and flavorful day out.",

      capacity: 5000,
      indoor: false,
      workingHours: "12:00 PM – 11:00 PM",

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
      largeDesc:
        "Red Sea Film Week is an exciting cinematic event that brings together filmmakers, actors, critics, and movie lovers for a full week of screenings and artistic exploration. The festival showcases a wide selection of regional and international films, including feature movies, documentaries, short films, and student projects. Attendees can enjoy director Q&A sessions, filmmaking workshops, acting masterclasses, and industry networking events. The atmosphere is enriched with red carpet premieres, outdoor screenings by the beach, and interactive discussions that give a behind-the-scenes look into the world of filmmaking. Whether you're passionate about cinema or simply curious about storytelling, Red Sea Film Week offers a captivating and memorable experience.",

      capacity: 2200,
      indoor: true,
      workingHours: "3:00 PM – 12:00 AM",

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
      largeDesc:
        "The Career Growth Workshop is designed to help students, young professionals, and job seekers develop essential skills that prepare them for real-world success. The workshop covers a wide range of topics including communication techniques, teamwork strategies, leadership development, résumé building, and interview practice. Attendees participate in interactive group activities, hands-on exercises, and guided mentorship sessions with experienced industry experts. Real case studies and problem-solving tasks help participants understand workplace challenges and how to navigate them effectively. Whether you're starting your career journey or looking to improve your professional skills, this workshop provides a supportive environment and valuable insights to help you grow confidently.",

      capacity: 300,
      indoor: true,
      workingHours: "11:00 AM – 4:00 PM",

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
      largeDesc:
        "EGX Gaming Expo is the ultimate celebration of gaming culture, bringing together players, developers, content creators, and gaming communities for an exciting multi-day event. Attendees can try exclusive demos of upcoming games, compete in esports tournaments, and participate in gaming challenges across various genres. The expo features a massive tech zone showcasing gaming gear, VR experiences, and cutting-edge hardware. Cosplayers display their creativity in competition events, while popular creators host live shows and meet-and-greet sessions. Whether you’re a casual gamer or a competitive enthusiast, EGX offers endless entertainment, networking opportunities, and unforgettable moments in a fun, energetic environment.",

      capacity: 7000,
      indoor: true,
      workingHours: "10:00 AM – 10:00 PM",

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
