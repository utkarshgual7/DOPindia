import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const TrackParcel = () => {
  const [trackingId, setTrackingId] = useState("");
  const [parcelStatus, setParcelStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTrackParcel = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `/api/parcel/getparcelstatus/${trackingId}`
      );
      setParcelStatus(response.data);
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );
      setParcelStatus(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mt-[130px] mx-auto p-4 bg-red-200 rounded-md shadow-md">
        <h1 className="text-2xl  font-semibold mb-4">Track Your Parcel</h1>

        <form onSubmit={handleTrackParcel} className="mb-6">
          <div className="flex items-center">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID"
              className="p-2 border border-gray-300 rounded-l-md w-3/4"
              required
            />
            <button
              type="submit"
              className="p-2 bg-gray-800 text-white rounded-r-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Tracking..." : "Track Parcel"}
            </button>
          </div>
        </form>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {parcelStatus && (
          <div className="bg-white p-4 rounded-md shadow-md">
            <p className="font-semibold mb-2">
              <strong>Tracking ID:</strong> {parcelStatus.trackingId}
            </p>
            <p className="mb-4">
              <strong>Current Status:</strong> {parcelStatus.currentStatus}
            </p>
            <h2 className="text-xl font-semibold mb-2">Status History</h2>
            <ul className="space-y-4">
              {parcelStatus.statusHistory.map((status, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
                  <p>
                    <strong>Status:</strong> {status.status}
                  </p>
                  <p>
                    <strong>Office Name:</strong> {status.officeName}
                  </p>
                  <p>
                    <strong>Remark:</strong> {status.remark}
                  </p>
                  <p>
                    <strong>Updated At:</strong>{" "}
                    {new Date(status.updatedAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {!parcelStatus && !loading && !error && (
          <p className="mt-4">
            Enter a tracking ID and click "Track Parcel" to see the status.
          </p>
        )}
      </div>
    </>
  );
};

export default TrackParcel;
