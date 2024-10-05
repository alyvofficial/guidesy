import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet"; 
import "leaflet/dist/leaflet.css"; 
import L from "leaflet"; 
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import animalicon from "../assets/Images/AnimalLoc.svg"; 
import restauranticon from "../assets/Images/RestoranLoc.svg"; 
import velo from "../assets/Images/VeloLoc.svg"; 
import camping from "../assets/Images/campingLoc.svg"; 
import PropTypes from "prop-types";
import "leaflet-routing-machine";

// Define custom icons
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

// Generate random offset for coordinates
const getRandomOffset = () => (Math.random() - 0.5) * 0.01;

// Park and attraction data
const parksData = {
  sahdag: {
    name: "Şahdağ Milli Parkı",
    description: "Dağlık bölgede yer alan, zengin flora ve faunaya sahip milli park.",
    location: [41.2181, 48.0072],
    area: [
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
          reviews: [],
        },
      },
      {
        name: "Restoran 1",
        location: [41.21 + getRandomOffset(), 48.002 + getRandomOffset()],
        icon: restaurantIcon,
        info: {
          description: "Təbiətdə yerli yeməklərin dadına baxın.",
          reviews: [],
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
};

const LocationMarker = ({ setUserLocation }) => {
  const map = useMap();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserLocation(userLocation);
        },
        () => {}
      );
    }
  }, [map, setUserLocation]);

  return null;
};

LocationMarker.propTypes = {
  setUserLocation: PropTypes.func.isRequired,
};

export const ParkDetail = () => {
  const { slug } = useParams();
  const park = parksData[slug];
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [map, setMap] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [transportMode, setTransportMode] = useState("DRIVING"); // Default to driving

  const handleMarkerClick = (attraction) => {
    setSelectedAttraction(attraction);
  };

  useEffect(() => {
    if (map && selectedAttraction && userLocation) {
      if (routingControl) {
        map.removeControl(routingControl);
      }

      const newRoutingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),
          L.latLng(selectedAttraction.location[0], selectedAttraction.location[1]),
        ],
        routeWhileDragging: true,
        createMarker: () => null,
        router: L.Routing.mapbox("YOUR_MAPBOX_ACCESS_TOKEN", {
          profile: transportMode === "WALKING" ? "walking" : "driving",
        }),
      }).addTo(map);

      setRoutingControl(newRoutingControl);

      return () => {
        map.removeControl(newRoutingControl);
      };
    }
  }, [map, selectedAttraction, userLocation, routingControl, transportMode]);

  const handleRouteChange = (mode) => {
    setTransportMode(mode);
    // If a route is already set, we need to recreate it with the new mode
    if (selectedAttraction && userLocation) {
      if (routingControl) {
        map.removeControl(routingControl);
      }

      const newRoutingControl = L.Routing.control({
        waypoints: [
          L.latLng(userLocation[0], userLocation[1]),
          L.latLng(selectedAttraction.location[0], selectedAttraction.location[1]),
        ],
        routeWhileDragging: true,
        createMarker: () => null,
        router: L.Routing.mapbox("YOUR_MAPBOX_ACCESS_TOKEN", {
          profile: mode === "WALKING" ? "walking" : "driving",
        }),
      }).addTo(map);

      setRoutingControl(newRoutingControl);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <section className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">{park.name}</h1>
        <p className="mb-4">{park.description}</p>

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
              whenCreated={setMap}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Polygon positions={park.area} color="green" />
              {userLocation && (
                <Marker position={userLocation} icon={new L.Icon({ iconUrl: velo, iconSize: [32, 32] })}>
                  <Popup>Sizin konumunuz.</Popup>
                </Marker>
              )}
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
              <LocationMarker setUserLocation={setUserLocation} />
            </MapContainer>
          </div>

          {selectedAttraction && (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <h3 className="text-xl font-semibold">{selectedAttraction.name}</h3>
              <p className="mb-2">{selectedAttraction.info.description}</p>
              {userLocation && (
                <div className="mt-4">
                  <h4 className="font-semibold">Yönlendirme:</h4>
                  <p>
                    Hedef: {selectedAttraction.name}. 
                    <br />
                    Kullanıcı konumunuza {selectedAttraction.location[0].toFixed(4)}, {selectedAttraction.location[1].toFixed(4)} koordinatlarına gidin.
                  </p>
                  <button onClick={() => handleRouteChange("DRIVING")}>Araba ile Git</button>
                  <button onClick={() => handleRouteChange("WALKING")}>Yaya Olarak Git</button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};
