import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Header from "../components/Header";

const ArrivedAtStationPage = () => {
  const [parcels, setParcels] = useState([]);
  const [selectedParcels, setSelectedParcels] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [qrCodeData, setQrCodeData] = useState(null);

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
      const response = await fetch(`/api/parcel/getparcels`);
      const data = await response.json();
      setParcels(data.filter((parcel) => parcel.status === "Out for Delivery"));
    } catch (error) {
      console.error("Error fetching parcels", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleAgentSelection = (agentId) => {
    setSelectedAgent(agentId);
    fetchParcels(agentId);
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
        }),
      });

      if (!response.ok) {
        throw new Error("Error assigning parcels to agent");
      }

      const assignedParcelDetails = filteredParcels.filter((parcel) =>
        selectedParcels.includes(parcel.trackingId)
      );

      // Generate QR Code data with assigned parcels details
      const qrData = assignedParcelDetails
        .map(
          (parcel) =>
            `Tracking ID: ${parcel.trackingId}, Recipient Name: ${parcel.recipientName}, Address: ${parcel.recipientAddress},Contact: ${parcel.recipientContactNumber}, Pincode: ${parcel.recipientPincode}`
        )
        .join("\n");

      setQrCodeData(qrData);
      alert("Parcels assigned to agent successfully!");

      // Store assignment in the database (server-side)
      // Refresh parcels list
      fetchParcels(selectedAgent);
      setSelectedParcels([]);
    } catch (error) {
      console.error("Error assigning parcels to agent", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <h1 className="text-3xl font-bold text-center mt-24 mb-6 text-gray-700">
        Assign Parcels to Delivery Agent
      </h1>

      {/* Search Bar */}

      {/* Agents List */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Select a Delivery Agent</h2>
        <select
          value={selectedAgent}
          onChange={(e) => handleAgentSelection(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Select Agent --</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
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

      {/* Parcels List (Out for Delivery) */}
      {selectedAgent && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Parcels Out for Delivery for{" "}
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
                  </div>
                </div>
              ))
            ) : (
              <p>No parcels available for this agent.</p>
            )}
          </div>

          <div className="mt-4">
            <button
              onClick={handleAssignParcels}
              disabled={selectedParcels.length === 0}
              className={`mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md ${
                selectedParcels.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Assign Selected Parcels
              {agents.find((agent) => agent.agentId === selectedAgent)?.name}
            </button>
          </div>
        </div>
      )}

      {/* Display QR Code if available */}
      {qrCodeData && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 text-center">
          <h2 className="text-xl font-semibold mb-4">
            QR Code for Assigned Parcels
          </h2>
          <QRCode value={qrCodeData} />
        </div>
      )}
    </div>
  );
};

export default ArrivedAtStationPage;
