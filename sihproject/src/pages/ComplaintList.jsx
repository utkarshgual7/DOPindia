import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("/api/parcel/complaints");
        setComplaints(response.data);
      } catch (error) {
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const toggleDetails = (id) => {
    setSelectedComplaint(selectedComplaint === id ? null : id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen">
      <Header />
      <h1 className="text-4xl font-bold text-center mb-8 mt-[100px]">
        Complaints List
      </h1>
      {complaints.length === 0 ? (
        <p className="text-center text-gray-500">No complaints available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {complaint.fullName}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong>Tracking Number:</strong> {complaint.trackingNumber}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Date of Shipment:</strong>{" "}
                {new Date(complaint.ShipmentDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Issue:</strong> {complaint.issueDescription}
              </p>
              <button
                onClick={() => toggleDetails(complaint._id)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 transition"
              >
                {selectedComplaint === complaint._id
                  ? "Hide Details"
                  : "View Details"}
              </button>

              {selectedComplaint === complaint._id && (
                <div className="mt-4 text-gray-700">
                  <p>
                    <strong>Complaint Dated:</strong>{" "}
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Full Name:</strong> {complaint.fullName}
                  </p>
                  <p>
                    <strong>Tracking Number:</strong> {complaint.trackingNumber}
                  </p>
                  <p>
                    <strong>Date of Shipment:</strong>{" "}
                    {new Date(complaint.ShipmentDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Issue Description:</strong>{" "}
                    {complaint.issueDescription}
                  </p>
                  <p>
                    <strong>Resolution preferred:</strong>{" "}
                    {complaint.preferredResolution}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplaintList;
