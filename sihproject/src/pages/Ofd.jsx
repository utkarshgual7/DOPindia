import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code"; // Correct import statement
import Header from "../components/Header";

const ArrivedAtStationPage = () => {
  const [parcels, setParcels] = useState([]);
  const [selectedParcels, setSelectedParcels] = useState([]);
  const [agentId, setAgentId] = useState("");

  // Fetch parcels with status 'Arrived at Delivery Station'
  const fetchParcels = async () => {
    try {
      const response = await fetch("/api/parcel/getparcels");
      const data = await response.json();
      setParcels(
        data.filter((parcel) => parcel.status === "Arrived at Delivery Station")
      );
    } catch (error) {
      console.error("Error fetching parcels", error);
    }
  };

  useEffect(() => {
    fetchParcels();
  }, []);

  const handleParcelSelection = (trackingId) => {
    setSelectedParcels((prevSelected) =>
      prevSelected.includes(trackingId)
        ? prevSelected.filter((id) => id !== trackingId)
        : [...prevSelected, trackingId]
    );
  };

  const handleMarkOutForDelivery = async () => {
    try {
      const response = await fetch("/api/parcel/mark-out-for-delivery", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackingIds: selectedParcels,
          agentId,
        }),
      });

      if (!response.ok) {
        throw new Error("Error marking parcels out for delivery");
      }
      alert("Parcels marked as 'Out for Delivery' successfully!");
      // Refresh parcels list
      fetchParcels();
      setSelectedParcels([]);
    } catch (error) {
      console.error("Error marking parcels out for delivery", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <h1 className="text-3xl font-bold text-center mt-24 mb-6 text-gray-700">
        Arrived at Delivery Station
      </h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Select Parcels to Mark Out for Delivery
        </h2>
        <div className="space-y-4">
          {parcels.map((parcel) => (
            <div
              key={parcel.trackingId}
              className="flex items-center border-b py-2"
            >
              <input
                type="checkbox"
                checked={selectedParcels.includes(parcel.trackingId)}
                onChange={() => handleParcelSelection(parcel.trackingId)}
                className="mr-4"
              />
              <div className="flex-1">
                <p>
                  <strong>Tracking ID:</strong> {parcel.trackingId}
                </p>
                <p>
                  <strong>Recipient Name:</strong> {parcel.recipientName}
                </p>
                <p>
                  <strong>Pincode:</strong> {parcel.recipientPincode}
                </p>
              </div>
              {selectedParcels.includes(parcel.trackingId) && (
                <div className="ml-4">
                  <QRCode
                    value={`Recipient Name: ${parcel.recipientName}, Pincode: ${parcel.recipientPincode}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Agent ID"
            value={agentId}
            onChange={(e) => setAgentId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleMarkOutForDelivery}
            className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md"
          >
            Mark Selected Parcels as Out for Delivery
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArrivedAtStationPage;
