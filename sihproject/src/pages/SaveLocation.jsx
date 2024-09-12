import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const SaveLocation = () => {
  const [trackingId, setTrackingId] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to get the current location
  const getCurrentLocation = () => {
    setLoading(true);
    setLocationStatus("Getting your current location...");

    // Check if browser supports Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Send tracking ID and location to the backend
            await axios.post("/api/location/save-location", {
              trackingId,
              latitude,
              longitude,
            });

            setLocationStatus("Location saved successfully!");
          } catch (error) {
            setLocationStatus("Error saving location.");
            console.error("Error:", error);
          }

          setLoading(false);
        },
        (error) => {
          setLoading(false);
          setLocationStatus("Unable to retrieve your location.");
        }
      );
    } else {
      setLoading(false);
      setLocationStatus("Geolocation is not supported by this browser.");
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (trackingId.trim() === "") {
      setLocationStatus("Please enter a tracking ID.");
      return;
    }

    // Get current location and save to backend
    getCurrentLocation();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Navbar />
      <h2 className="text-2xl mt-[100px] font-bold mb-6 text-center">
        Save Receiver's Current Location
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="trackingId"
          >
            Tracking ID:
          </label>
          <input
            type="text"
            id="trackingId"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="Enter Tracking ID"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Saving..." : "Save Location"}
        </button>
      </form>

      {locationStatus && (
        <p
          className={`mt-4 text-center text-sm ${
            locationStatus.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {locationStatus}
        </p>
      )}
    </div>
  );
};

export default SaveLocation;
