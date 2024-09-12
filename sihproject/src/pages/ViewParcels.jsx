import React, { useState, useEffect } from "react";
import Header from "../components/Header";

const ViewParcels = () => {
  const [parcels, setParcels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchParcels = async () => {
      try {
        const response = await fetch("/api/parcel/getparcels");
        if (!response.ok) {
          throw new Error("Failed to fetch parcels");
        }
        const data = await response.json();
        setParcels(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchParcels();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6 mt-[100px]">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
          All Parcels
        </h1>

        {error ? (
          <div className="bg-red-100 text-red-600 text-center p-4 rounded-lg">
            Error: {error}
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
            <ul className="divide-y divide-gray-300">
              {parcels.length > 0 ? (
                parcels.map((parcel) => (
                  <li key={parcel.trackingId} className="py-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">
                        {parcel.trackingId || "No Tracking ID"}
                      </span>
                      <span className="text-gray-600">
                        {parcel.status || "Unknown Status"}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      {parcel.recipientName || "No Recipient"}
                    </div>
                    <div className="text-gray-400">
                      {parcel.recipientAddress || "No Address"}
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-2 text-center text-gray-500">
                  No parcels found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewParcels;
