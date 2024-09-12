import React from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = ({ onSubmit, data }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onSubmit();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Confirmation</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Sender Details</h2>
        <p>Name: {data.senderName}</p>
        <p>Address: {data.senderAddress}</p>
        <p>Pincode: {data.senderPincode}</p>
        <p>Contact Number: {data.senderContactNumber}</p>
        <p>Email: {data.senderEmail}</p>
        <h2 className="text-xl font-semibold mt-6 mb-4">Recipient Details</h2>
        <p>Name: {data.recipientName}</p>
        <p>Address: {data.recipientAddress}</p>
        <p>Pincode: {data.recipientPincode}</p>
        <p>Contact Number: {data.recipientContactNumber}</p>
        <p>Email: {data.recipientEmail}</p>
        <button
          onClick={handleConfirm}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md mt-6"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
