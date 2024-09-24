import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Header from "../components/Header";

const ArrivedAtStationPage = () => {
  const [parcels, setParcels] = useState([]);
  const [selectedParcels, setSelectedParcels] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deliveryTimeFrame, setDeliveryTimeFrame] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);
  const [message, setMessage] = useState(""); // State to store success or error messages

  // Fetch delivery agents
  const fetchAgents = async () => {
    try {
      const response = await fetch("/api/office/agents");
      const data = await response.json();
      setAgents(data);
    } catch (error) {
      console.error("Error fetching agents", error);
    }
  };

  // Fetch parcels with status 'Out for Delivery'
  const fetchParcels = async (agentId) => {
    try {
      // Fetch parcels from the backend API
      const response = await fetch(`/api/parcel/getparcels`);
      const data = await response.json();

      // Filter parcels with status "Out for Delivery" and optionally by delivery time frame
      const parcelsWithStatus = await Promise.all(
        data
          .filter((parcel) => parcel.status === "Out for Delivery")
          .filter((parcel) =>
            deliveryTimeFrame
              ? parcel.deliveryTimeFrame === deliveryTimeFrame
              : true
          )
          .map(async (parcel) => {
            try {
              // Fetch assignment status for each parcel
              const parcelAssignmentStatus = await fetchParcelAssignmentStatus(
                parcel.trackingId
              );
              return { ...parcel, parcelAssignmentStatus };
            } catch (error) {
              console.error(
                "Error fetching parcel assignment status for",
                parcel.trackingId,
                error
              );
              return { ...parcel, parcelAssignmentStatus: "Unknown" }; // Default to 'Unknown' if error occurs
            }
          })
      );

      // Set the fetched parcels with assignment status
      setParcels(parcelsWithStatus);
    } catch (error) {
      console.error("Error fetching parcels", error);
      // Handle error state, you can set an empty array or display a message
      setParcels([]); // Set an empty array or handle it based on your needs
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    if (selectedAgent) {
      fetchParcels(selectedAgent);
    }
  }, [deliveryTimeFrame, selectedAgent]);

  const deliveryTimeFrames = [
    "11:00-12:00",
    "12:00-14:00",
    "12:00-13:00",
    "14:00-16:00",
    "14:00-15:00",
    "13:00-14:00",
    "15:00-16:00",
    "16:00-17:00",
    "18:00-19:00",
    "17:00-18:00",
    "19:00-20:00",
  ];

  const handleDeliveryTimeFrameChange = (e) => {
    setDeliveryTimeFrame(e.target.value);
  };

  const handleAgentSelection = (agentId) => {
    setSelectedAgent(agentId);
    setSelectedParcels([]);
  };

  const handleParcelSelection = (trackingId) => {
    setSelectedParcels((prevSelected) =>
      prevSelected.includes(trackingId)
        ? prevSelected.filter((id) => id !== trackingId)
        : [...prevSelected, trackingId]
    );
  };

  const handleSelectAll = () => {
    if (selectedParcels.length === parcels.length) {
      setSelectedParcels([]);
    } else {
      setSelectedParcels(parcels.map((parcel) => parcel.trackingId));
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredParcels = parcels.filter((parcel) =>
    parcel.recipientAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fetching the parcel assignment status
  const fetchParcelAssignmentStatus = async (trackingId) => {
    try {
      const response = await fetch(`/api/parcel/assignstatus/${trackingId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch assignment status");
      }
      const data = await response.json();
      console.log(selectedAgent);
      return data.status;
    } catch (error) {
      console.error("Error fetching assignment status:", error);
      return "Error fetching status";
    }
  };

  const handleAssignParcels = async () => {
    try {
      const response = await fetch("/api/parcel/assign-parcels", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trackingIds: selectedParcels,
          agentId: selectedAgent,
          status: "Assigned", // Explicitly passing the status
        }),
      });

      const result = await response.json(); // Parse the response JSON

      if (!response.ok) {
        throw new Error(result.error || "Error assigning parcels to agent");
      }

      // Display the success message returned from the backend
      setMessage(result.message || "Parcels assigned successfully");

      const assignedParcelDetails = filteredParcels.filter((parcel) =>
        selectedParcels.includes(parcel.trackingId)
      );

      // Update the status of assigned parcels to "Assigned"
      const updatedParcels = parcels.map((parcel) =>
        selectedParcels.includes(parcel.trackingId)
          ? { ...parcel, parcelAssignmentStatus: "Assigned" }
          : parcel
      );
      setParcels(updatedParcels);

      // Generate QR Code data with assigned parcels details in JSON format
      const generateQrCodeData = () => {
        const data = {
          agentName:
            agents.find((agent) => agent.id === selectedAgent)?.name ||
            "Unknown Agent",
          parcels: assignedParcelDetails.map((parcel) => ({
            trackingId: parcel.trackingId || "N/A",
            recipientName: parcel.recipientName || "N/A",
            recipientAddress: parcel.recipientAddress || "N/A",
            recipientContactNumber: parcel.recipientContactNumber || "N/A",
            recipientPincode: parcel.recipientPincode || "N/A",
            deliveryTimeFrame: parcel.deliveryTimeFrame || "N/A",
          })),
        };

        return JSON.stringify(data);
      };

      const qrData = generateQrCodeData();
      setQrCodeData(qrData);
      alert("Parcels assigned to agent successfully!");

      // Refresh parcels list
      fetchParcels(selectedAgent);
      setSelectedParcels([]);
      console.log(selectedAgent);
    } catch (error) {
      console.error("Error assigning parcels to agent", error);
      setMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <h1 className="text-3xl font-bold text-center mt-24 mb-6 text-gray-700">
        Assign Parcels to Delivery Agent
      </h1>

      {/* Agents List */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select a Delivery Agent</h2>
        <select
          value={selectedAgent}
          onChange={(e) => handleAgentSelection(e.target.value)} // This will now set agentId
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Select Agent --</option>
          {agents.map((agent) => (
            <option key={agent.agentId} value={agent.agentId}>
              {agent.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        placeholder="Search by recipient address"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md"
      />

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Filter by Delivery Time Frame
        </h2>
        <select
          value={deliveryTimeFrame}
          onChange={handleDeliveryTimeFrameChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Select Time Frame --</option>
          {deliveryTimeFrames.map((timeFrame, index) => (
            <option key={index} value={timeFrame}>
              {timeFrame}
            </option>
          ))}
        </select>
      </div>

      {/* Parcels List */}
      {selectedAgent && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Parcels Out for Delivery with agent{" "}
            {agents.find((agent) => agent.id === selectedAgent)?.name}
          </h2>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg">Select All Parcels</p>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedParcels.length === parcels.length}
            />
          </div>

          <div className="space-y-4">
            {filteredParcels.length > 0 ? (
              filteredParcels.map((parcel) => (
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
                      <strong>Address:</strong> {parcel.recipientAddress}
                    </p>
                    <p>
                      <strong>Contact:</strong> {parcel.recipientContactNumber}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {parcel.recipientPincode}
                    </p>
                    <p>
                      <strong>Delivery Timeframe:</strong>{" "}
                      {parcel.deliveryTimeFrame}
                    </p>
                    <p className="text-blue-600">
                      <strong>Status:</strong> {parcel.parcelAssignmentStatus}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No parcels found for the selected agent and filters.</p>
            )}
          </div>

          {selectedParcels.length > 0 && (
            <button
              onClick={handleAssignParcels}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              Assign Selected Parcels
            </button>
          )}
          {message && <p>{message}</p>}
        </div>
      )}

      {qrCodeData && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Assigned Parcels QR Code
          </h2>
          <QRCode value={qrCodeData} />
        </div>
      )}
    </div>
  );
};

export default ArrivedAtStationPage;
