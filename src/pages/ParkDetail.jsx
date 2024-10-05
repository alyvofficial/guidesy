import { useParams } from "react-router-dom";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet"; // Leaflet bileşenleri
import "leaflet/dist/leaflet.css"; // Leaflet CSS
import L from "leaflet"; // Özel ikonlar için Leaflet
import animalicon from "../assets/Images/AnimalLoc.svg"; // Hayvan ikonu
import restauranticon from "../assets/Images/RestoranLoc.svg"; // Restoran ikonu
import velo from "../assets/Images/VeloLoc.svg"; // Velo
import camping from "../assets/Images/campingLoc.svg"; // Camping

// Özel ikonlar için resim URL'lerini ve boyutlarını ayarlıyoruz
const animalIcon = new L.Icon({
  iconUrl: animalicon,
  iconSize: [32, 32],
});

const restaurantIcon = new L.Icon({
  iconUrl: restauranticon,
  iconSize: [32, 32],
});

const attractionIcon = new L.Icon({
  iconUrl: camping,
  iconSize: [32, 32],
});

const veloIcon = new L.Icon({
  iconUrl: velo,
  iconSize: [32, 32],
});

// Rastgele koordinat sapmaları oluşturmak için fonksiyon
const getRandomOffset = () => (Math.random() - 0.5) * 0.01;

// Parkların ve attraksiyonların bilgileri
const parksData = {
  sahdag: {
    name: "Şahdağ Milli Parkı",
    description:
      "Dağlık bölgede yer alan, zengin flora ve faunaya sahip milli park.",
    location: [41.2181, 48.0072], // Park merkezi
    area: [
      // Park sınırlarını temsil eden çokgen koordinatları
      [41.25, 47.98],
      [41.23, 48.01],
      [41.2, 48.02],
      [41.2181, 48.0072],
    ],
    attractions: [
      {
        name: "Hayvan Alanı 1",
        location: [41.22 + getRandomOffset(), 48.005 + getRandomOffset()],
        icon: animalIcon,
        info: {
          description: "Hayvanların doğal ortamında gözlemlenmesi.",
          reviews: [
            { user: "Ali", comment: "Gözəl bir təcrübə!", rating: 5 },
            { user: "Leyla", comment: "Çox maraqlı!", rating: 4 },
          ],
        },
      },
      {
        name: "Restoran 1",
        location: [41.21 + getRandomOffset(), 48.002 + getRandomOffset()],
        icon: restaurantIcon,
        info: {
          description: "Təbiətdə yerli yeməklərin dadına baxın.",
          menu: ["Qızardılmış Balıq", "Salat", "Çay"],
          reviews: [
            { user: "Elmar", comment: "Çox ləzzətli!", rating: 5 },
            { user: "Sara", comment: "Hizmet biraz gecikdi.", rating: 3 },
          ],
        },
      },
      {
        name: "Atraksiyon 1",
        location: [41.20 + getRandomOffset(), 48.003 + getRandomOffset()],
        icon: attractionIcon,
        info: {
          description: "Çox gözəl təbiət və müxtəlif fəaliyyətlər.",
          reviews: [],
        },
      },
      {
        name: "Velosiped Məkani",
        location: [41.19 + getRandomOffset(), 48.004 + getRandomOffset()],
        icon: veloIcon,
        info: {
          description: "Velosiped sürmək üçün ideal bir yer.",
          reviews: [],
        },
      },
    ],
  },
  // Diğer parkları eklemek istersen buraya ekleyebilirsin
};

export const ParkDetail = () => {
  const { slug } = useParams();
  const park = parksData[slug];
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const handleMarkerClick = (attraction) => {
    setSelectedAttraction(attraction);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{park.name}</h1>
        <p className="mb-4">{park.description}</p>
        
        {/* İkonların mənasını göstərən cədvəl */}
        <table className="min-w-full mb-4">
          <thead>
            <tr>
              <th className="border p-2">İkon</th>
              <th className="border p-2">Məna</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2"><img src={animalicon} alt="Hayvan" width="32" /></td>
              <td className="border p-2">Hayvan Alanı</td>
            </tr>
            <tr>
              <td className="border p-2"><img src={restauranticon} alt="Restoran" width="32" /></td>
              <td className="border p-2">Restoran</td>
            </tr>
            <tr>
              <td className="border p-2"><img src={camping} alt="Atraksiyon" width="32" /></td>
              <td className="border p-2">Atraksiyon</td>
            </tr>
            <tr>
              <td className="border p-2"><img src={velo} alt="Velo" width="32" /></td>
              <td className="border p-2">Velosiped Məkani</td>
            </tr>
          </tbody>
        </table>

        <div className="bg-white p-6 shadow rounded">
          <h2 className="text-2xl font-semibold mb-2">Harita</h2>
          <div className="mb-2">
            <MapContainer
              center={park.location}
              zoom={14}
              style={{ height: "800px", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />

              {/* Parkın sınırlarını çokgen olarak göstermek */}
              <Polygon positions={park.area} color="green" />

              {/* Parka ait işaretçiler */}
              {park.attractions.map((attraction, index) => (
                <Marker
                  key={index}
                  position={attraction.location}
                  icon={attraction.icon}
                  eventHandlers={{
                    click: () => {
                      handleMarkerClick(attraction);
                    },
                  }}
                >
                  <Popup>{attraction.name}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
          
          {/* Seçilmiş attraksiyonun məlumatları */}
          {selectedAttraction && (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <h3 className="text-xl font-semibold">{selectedAttraction.name}</h3>
              <p className="mb-2">{selectedAttraction.info.description}</p>
              
              {selectedAttraction.info.menu && (
                <div className="mb-2">
                  <h4 className="font-semibold">Menyu:</h4>
                  <ul>
                    {selectedAttraction.info.menu.map((item, index) => (
                      <li key={index} className="ml-4">{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedAttraction.info.reviews && (
                <div>
                  <h4 className="font-semibold">Yorumlar:</h4>
                  <ul>
                    {selectedAttraction.info.reviews.map((review, index) => (
                      <li key={index} className="ml-4">{review.user}: {review.comment} (Reytinq: {review.rating})</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
