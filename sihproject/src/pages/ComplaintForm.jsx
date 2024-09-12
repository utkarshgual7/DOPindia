import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    trackingNumber: "",
    shippingAddress: "",
    ShipmentDate: "",
    issueDescription: "",
    preferredResolution: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const response = await axios.post("/api/parcel/complaint", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess(response.data.message);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        trackingNumber: "",
        shippingAddress: "",
        ShipmentDate: "",
        issueDescription: "",
        preferredResolution: "",
      });
    } catch (error) {
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto mt-16 p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl mt-6 font-bold mb-6">Parcel Complaint Form</h2>

        {Object.entries(formData).map(([key, value]) => (
          <div className="mb-4" key={key}>
            <label
              htmlFor={key}
              className="block text-sm font-medium text-gray-700"
            >
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              :
            </label>
            {key === "issueDescription" ? (
              <textarea
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <input
                type={key.includes("Date") ? "date" : "text"}
                id={key}
                name={key}
                value={value}
                onChange={handleChange}
                required={
                  key === "trackingNumber" ||
                  key === "shippingAddress" ||
                  key === "ShipmentDate"
                }
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>

        {success && <p className="text-green-500 mt-4">{success}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </>
  );
};

export default ComplaintForm;
