import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const ModifyOrder = () => {
  const [trackingId, setTrackingId] = useState("");
  const [deliveryTimeFrame, setDeliveryTimeFrame] = useState(null);
  const [prevTime, setPrevTime] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const timeOptions = [
    "10:00-11:00",
    "11:00-12:00",
    "12:00-13:00",
    "13:00-14:00",
    "14:00-15:00",
    "15:00-16:00",
    "16:00-17:00",
    "17:00-18:00",
    "18:00-19:00",
    "19:00-20:00",
  ];

  const handleRetrieveTimeFrame = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/parcel/getparcels/${trackingId}`);
      const { deliveryTimeFrame } = response.data;

      setPrevTime(deliveryTimeFrame);
      setCurrentTime(deliveryTimeFrame);
      setDeliveryTimeFrame(deliveryTimeFrame);
    } catch (error) {
      setError(
        "Failed to retrieve delivery time frame. Please check the tracking ID."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post(`/api/parcel/tfparcel/modify`, { trackingId, newTime });
      setPrevTime(currentTime);
      setCurrentTime(newTime);
      setDeliveryTimeFrame(newTime);
      setSuccess("Time slot successfully updated!");
    } catch (error) {
      setError("Failed to update time slot. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col mt-[100px] items-center p-6 space-y-6 bg-gray-100 rounded-lg shadow-lg">
        <div className="text-xl font-semibold text-gray-700">
          Enter Tracking ID:
        </div>
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleRetrieveTimeFrame}
          disabled={loading}
          className={`px-4 py-2 text-white font-semibold rounded-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
          }`}
        >
          {loading ? "Loading..." : "Retrieve Time Frame"}
        </button>

        {deliveryTimeFrame && (
          <>
            <div className="text-xl font-semibold text-gray-700">
              Previous Time Slot:{" "}
              <span className="text-gray-900">{prevTime}</span>
            </div>
            <div className="text-xl font-semibold text-gray-700">
              Current Time Slot:{" "}
              <span className="text-blue-600">{currentTime}</span>
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="time-select" className="text-gray-600">
                Select New Time:
              </label>
              <select
                id="time-select"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a time</option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleTimeChange}
              disabled={!newTime || loading}
              className={`px-4 py-2 text-white font-semibold rounded-md ${
                !newTime || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
              }`}
            >
              {loading ? "Updating..." : "Change Time Slot"}
            </button>
          </>
        )}

        {success && <p className="text-green-500 mt-4">{success}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </>
  );
};

export default ModifyOrder;
