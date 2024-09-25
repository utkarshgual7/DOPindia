import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import AgentNavbar from "../components/AgentNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

const StartDelivering = () => {
  const [assignedParcels, setAssignedParcels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [parcelDetails, setParcelDetails] = useState(null);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(null);

  const currentAgentId = useSelector(
    (state) => state.agent.currentAgent.agentId
  );

  useEffect(() => {
    const fetchAssignedParcels = async () => {
      try {
        const response = await axios.get(
          `/api/parcel/assigned/${currentAgentId}`
        );
        setAssignedParcels(response.data);
      } catch (err) {
        setError("Failed to fetch parcels.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedParcels();
  }, [currentAgentId]);

  const fetchParcelDetails = async (trackingId) => {
    try {
      const response = await axios.get(`/api/parcel/${trackingId}`);
      setParcelDetails(response.data);
    } catch (err) {
      setError("Failed to fetch parcel details.");
    }
  };

  const handleDeliveryStatus = async () => {
    // Send OTP to recipient's contact number
    try {
      const response = await axios.post(`/api/parcel/otp/send`, {
        trackingId: parcelDetails.trackingId,
      });
      setSentOtp(response.data.otp); // Store the sent OTP for verification
      setIsOtpModalOpen(true); // Open OTP modal
    } catch (err) {
      setError("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post(`/api/parcel/otp/verify`, {
        trackingId: parcelDetails.trackingId,
        otp: otp,
      });
      alert("Parcel marked as delivered.");
      setParcelDetails(null); // Clear parcel details after delivery
      setIsOtpModalOpen(false); // Close the OTP modal
    } catch (err) {
      setError("Failed to update parcel status.");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen flex flex-col justify-start items-center p-6">
      <AgentNavbar />
      <h1 className="text-4xl font-bold mt-[100px] text-black mb-8 text-center">
        Start Delivering
      </h1>
      <p className="text-lg text-black mb-6 text-center">
        Here are your assigned parcels:
      </p>

      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-white text-lg">Loading...</p>
        </div>
      ) : error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 space-y-4">
          {assignedParcels.length > 0 ? (
            assignedParcels.map((parcel) => (
              <div
                key={parcel._id}
                className="border-b pb-4 cursor-pointer flex items-center"
                onClick={() => fetchParcelDetails(parcel.TrackingId)}
              >
                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="w-8 h-8 mr-3 text-gray-800"
                />
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {parcel.TrackingId}
                  </h2>
                  <p className="text-lg font-medium text-gray-700">
                    Status: {parcel.status}
                  </p>
                  <p className="text-gray-500">
                    Updated At: {new Date(parcel.updatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No parcels assigned.</p>
          )}
        </div>
      )}

      {/* Parcel Details List */}
      {parcelDetails && (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-4">
          <h2 className="text-2xl font-bold">Parcel Details</h2>
          <p className="text-lg">Tracking ID: {parcelDetails.trackingId}</p>
          <p className="text-lg">Current Status: {parcelDetails.status}</p>
          <p className="text-lg">Name: {parcelDetails.recipientName}</p>
          <p className="text-lg">
            Delivery Address: {parcelDetails.recipientAddress}
          </p>
          <p className="text-lg">
            Contact: {parcelDetails.recipientContactNumber}
          </p>
          <p className="text-lg">
            Delivery TimeFrame: {parcelDetails.deliveryTimeFrame}
          </p>
          <div className="mt-4 flex justify-between">
            <button
              onClick={handleDeliveryStatus}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Mark as Delivered
            </button>
            <button
              onClick={() => handleDeliveryStatus("Not Delivered")}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Mark as Not Delivered
            </button>
          </div>
        </div>
      )}

      {/* OTP Verification Modal */}
      {isOtpModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
            <h2 className="text-2xl font-bold">Enter OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
              className="border p-2 rounded mt-4 w-full"
            />
            <div className="mt-4 flex justify-between">
              <button
                onClick={verifyOtp}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Verify OTP
              </button>
              <button
                onClick={() => setIsOtpModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartDelivering;
