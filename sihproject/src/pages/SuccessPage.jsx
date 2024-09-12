import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    trackingId,
    senderName,
    recipientName,
    recipientPincode,
    category,
    weight,
    deliveryTimeFrame,
  } = location.state || {};

  // Function to print the tracking details
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto relative z-10">
        <h2 className="text-center">SMART डाकिया - Department of POSTS</h2>
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Parcel Booked Successfully!
        </h1>

        <div className="space-y-2">
          <p className="text-lg font-semibold">Tracking ID: {trackingId}</p>
          <p>Sender: {senderName}</p>
          <p>Recipient: {recipientName}</p>
          <p>Delivery Pincode: {recipientPincode}</p>
          <p>Category: {category}</p>
          <p>Weight: {weight} kg</p>
          <p>Delivery Time Frame: {deliveryTimeFrame} (in 24Hrs)</p>
          <p>
            Note: Delivery time can be modified up until the day before
            delivery.
          </p>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Book Another Parcel
            </button>
            <button
              onClick={handlePrint}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Print Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
