import { useState } from "react";
import { NavLink } from "react-router-dom";
import sahdag from "../assets/Images/sahdag_park.webp";
import goygol from "../assets/Images/goygol_park.webp";
import hirkan from "../assets/Images/hirkan_park.webp";
import gizilagac from "../assets/Images/qizilagac-park.jpg";

const parks = [
  {
    id: 1,
    name: "Şahdağ Milli Parkı",
    slug: "sahdag",
    image: sahdag,
  },
  {
    id: 2,
    name: "Göygöl Milli Parkı",
    slug: "goygol",
    image: goygol,
  },
  {
    id: 3,
    name: "Qızılağac Milli Parkı",
    slug: "qizilagac",
    image: gizilagac,
  },
  {
    id: 6,
    name: "Quba Milli Parkı",
    slug: "quba",
    image: hirkan,
  },
];

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Arama fonksiyonu
  const filteredParks = parks.filter((park) =>
    park.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Azərbaycanda yerləşən qoruqlar:</h1>
        
        {/* Arama inputu */}
        <input
          type="text"
          placeholder="Qoruq adını axtarın..."
          className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParks.map((park) => (
            <NavLink
              key={park.id}
              to={`/park/${park.slug}`}
              className="bg-white p-4 shadow rounded hover:bg-gray-50 transition flex flex-col items-center"
            >
              <img
                src={park.image}
                alt={park.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{park.name}</h2>
            </NavLink>
          ))}

          {/* Eğer sonuç bulunamazsa bir mesaj göster */}
          {filteredParks.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">
              Axtarışınıza uyğun qoruq tapılmadı.
            </p>
          )}
        </div>
      </section>
    </main>
  );
};
