import React from "react";

function RecipientDetails({ formData, onInputChange, states, districts }) {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-xl font-bold mb-2">Recipient Details</h2>

      {/* Recipient Name */}
      <label htmlFor="recipientName" className="block mb-2 font-medium">
        Recipient Name
      </label>
      <input
        type="text"
        id="recipientName"
        name="recipientName"
        value={formData.recipientName}
        onChange={onInputChange}
        placeholder="Enter Recipient Name"
        className="w-full px-3 py-2 mb-4 bg-red-100 border border-gray-300 rounded-lg focus:outline-none"
      />

      {/* Recipient Contact Number */}
      <label htmlFor="recipientPhone" className="block mb-2 font-medium">
        Recipient Contact Number
      </label>
      <input
        type="tel"
        id="recipientPhone"
        name="recipientPhone"
        value={formData.recipientPhone}
        onChange={onInputChange}
        placeholder="+91 - 8858XXXXX"
        className="w-full px-3 py-2 mb-4 bg-red-100 border border-gray-300 rounded-lg focus:outline-none"
      />

      {/* Recipient Email ID */}
      <label htmlFor="recipientEmail" className="block mb-2 font-medium">
        Recipient Email ID
      </label>
      <input
        type="email"
        id="recipientEmail"
        name="recipientEmail"
        value={formData.recipientEmail}
        onChange={onInputChange}
        placeholder="Enter Email Address"
        className="w-full px-3 py-2 mb-4 bg-red-100 border border-gray-300 rounded-lg focus:outline-none"
      />

      {/* Address */}
      <label htmlFor="address" className="block mb-2 font-medium">
        Full Address
      </label>
      <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={onInputChange}
        placeholder="Full Address"
        className="w-full px-3 py-2 mb-4 bg-red-100 border border-gray-300 rounded-lg focus:outline-none"
      />

      {/* State Dropdown */}
      <label htmlFor="recipientState" className="block mb-2 font-medium">
        State
      </label>
      <select
        id="recipientState"
        name="recipientState"
        value={formData.recipientState}
        onChange={onInputChange}
        className="w-full px-3 py-2 mb-4 bg-red-100 border border-gray-300 rounded-lg focus:outline-none"
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      {/* District Dropdown */}
      <label htmlFor="recipientDistrict" className="block mb-2 font-medium">
        District
      </label>
      <select
        id="recipientDistrict"
        name="recipientDistrict"
        value={formData.recipientDistrict}
        onChange={onInputChange}
        className="w-full px-3 py-2 mb-4 bg-red-100 border border-gray-300 rounded-lg focus:outline-none"
      >
        <option value="">Select District</option>
        {(districts[formData.recipientState] || []).map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>

      {/* Pincode */}
      <label htmlFor="pincode" className="block mb-2 font-medium">
        Pincode
      </label>
      <input
        type="text"
        id="pincode"
        name="pincode"
        value={formData.pincode}
        onChange={onInputChange}
        placeholder="Pincode"
        className="w-full px-3 py-2 mb-4 bg-red-100 border border-gray-300 rounded-lg focus:outline-none"
      />

      {/* Landmark */}
      <label htmlFor="landmark" className="block mb-2 font-medium">
        Landmark (optional)
      </label>
      <input
        type="text"
        id="landmark"
        name="landmark"
        value={formData.landmark}
        onChange={onInputChange}
        placeholder="Landmark (optional)"
        className="w-full px-3 py-2 mb-4 bg-red-100 border border-gray-300 rounded-lg focus:outline-none"
      />
    </div>
  );
}

export default RecipientDetails;
