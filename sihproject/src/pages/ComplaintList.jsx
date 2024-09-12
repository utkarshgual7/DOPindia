import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <Header />
      <h1 className="text-3xl mt-[100px] font-bold mb-6">Complaints List</h1>
      {complaints.length === 0 ? (
        <p>No complaints available.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Tracking Number</th>
              <th className="border px-4 py-2">Date of Shipment</th>
              <th className="border px-4 py-2">Issue</th>
              <th className="border px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id}>
                <td className="border px-4 py-2">{complaint.fullName}</td>
                <td className="border px-4 py-2">{complaint.trackingNumber}</td>
                <td className="border px-4 py-2">
                  {new Date(complaint.dateOfShipment).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {complaint.issueDescription}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => alert(JSON.stringify(complaint, null, 2))}
                    className="text-indigo-600 hover:underline"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComplaintList;
