import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Available_projects = () => {
  const navigate = useNavigate();

  const cards = [
    { title: "House From Us", image: assets.house, link: "/house" },
    { title: "Apartment From Us", image: assets.apartment, link: "/apartment" },
    { title: "PG From Us", image: assets.pg, link: "/pg" },
    { title: "Co-Living From Us", image: assets.coliving, link: "/coliving" },
  ];

  const handleclick = (link) => {
    let token = localStorage.getItem("userToken");
    if (token) {
      navigate(link);
    } else {
      alert("please login to view");
    }
  };

  return (
    <div className="mt-10" id="available_projects">
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Rentals
        <span className="underline underline-offset-2 decoration-1 font-light pl-3">
          From Us
        </span>
      </h1>

      <p className="text-gray-500 max-w-80 text-center mb-8 mx-auto">
        Crafting Spaces, Building Legacies—Explore Our Portfolio
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative h-75 w-full rounded-xl overflow-hidden shadow-lg group cursor-pointer"
            style={{
              backgroundImage: `url(${card.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all"></div>

            <div className="absolute bottom-5 left-5 text-white">
              <h2 className="text-2xl font-semibold mb-3">{card.title}</h2>

              <button
                onClick={() => handleclick(card.link)}
                className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Available_projects;
