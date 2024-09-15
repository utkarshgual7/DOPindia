import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import Header from "../components/Header";

const ArrivedAtStationPage = () => {
  const [parcels, setParcels] = useState([]);
  const [selectedParcels, setSelectedParcels] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState("");

  // Fetch delivery agents
  const fetchAgents = async () => {
    try {
      const response = await fetch("/api/office/agents"); // Assume you have an API to fetch agents
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
    fetchParcels(agentId); // Fetch parcels for selected agent
    setSelectedParcels([]); // Clear selected parcels on agent change
  };

  const handleParcelSelection = (trackingId) => {
    setSelectedParcels((prevSelected) =>
      prevSelected.includes(trackingId)
        ? prevSelected.filter((id) => id !== trackingId)
        : [...prevSelected, trackingId]
    );
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
        }),
      });

      if (!response.ok) {
        throw new Error("Error assigning parcels to agent");
      }
      alert("Parcels assigned to agent successfully!");
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

      {/* Parcels List (Out for Delivery) */}
      {selectedAgent && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Parcels Out for Delivery for{" "}
            {agents.find((agent) => agent.id === selectedAgent)?.name}
          </h2>
          <div className="space-y-4">
            {parcels.length > 0 ? (
              parcels.map((parcel) => (
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
              Assign Selected Parcels to{" "}
              {agents.find((agent) => agent.id === selectedAgent)?.name}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArrivedAtStationPage;
