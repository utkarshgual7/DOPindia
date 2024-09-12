import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "leaflet-routing-machine";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icon issues in Leaflet with React
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const NavigationPage = () => {
  const [trackingId, setTrackingId] = useState("");
  const [receiverLocation, setReceiverLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [directions, setDirections] = useState([]);

  const fetchLocation = async () => {
    setLoading(true);
    setError("");
    setDirections([]);

    try {
      const response = await axios.get(
        `/api/location/fetchlocation/${trackingId}`
      );
      setReceiverLocation(response.data);

      // Fetch route directions from backend
      const routeResponse = await axios.post("/api/location/directions", {
        origin: { lat: 28.6139, lng: 77.209 }, // Example origin coordinates
        destination: response.data,
      });
      setDirections(routeResponse.data.steps); // Adjust according to the API response
    } catch (error) {
      setError("Error fetching location.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:w-1/3 lg:pr-4 p-4">
        <h2 className="text-2xl font-bold mb-4">
          Fetch Receiver's Location and Route
        </h2>
        <div className="mb-6">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID"
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={fetchLocation}
            disabled={loading}
            className={`ml-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Loading..." : "Get Location"}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="bg-gray-100 p-4 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Directions</h3>
          <ul className="list-disc list-inside">
            {directions.length > 0 ? (
              directions.map((step, index) => (
                <li key={index} className="mb-2">
                  {step}
                </li>
              ))
            ) : (
              <p>No directions available.</p>
            )}
          </ul>
        </div>
      </div>
      <div className="lg:w-2/3 w-full">
        {receiverLocation && (
          <MapContainer
            center={[receiverLocation.latitude, receiverLocation.longitude]}
            zoom={12}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[receiverLocation.latitude, receiverLocation.longitude]}
            >
              <Popup>Receiver Location</Popup>
            </Marker>
            <Routing
              senderLocation={{ lat: 28.6139, lng: 77.209 }} // Example sender location
              receiverLocation={receiverLocation}
            />
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export const Routing = ({ senderLocation, receiverLocation }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !senderLocation || !receiverLocation) return;

    // Clean up existing routing control if it exists
    if (routingControlRef.current) {
      map.removeControl(routingControlRef.current);
    }

    // Create and add a new routing control
    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(senderLocation.lat, senderLocation.lng),
        L.latLng(receiverLocation.latitude, receiverLocation.longitude),
      ],
      routeWhileDragging: true,
      createMarker: () => null, // Optional: Hide the default markers
    }).addTo(map);

    // Cleanup function to remove the control when the component unmounts or updates
    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
    };
  }, [map, senderLocation, receiverLocation]);

  return null;
};

export default NavigationPage;
