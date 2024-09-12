import React, { useState } from "react";
import Header from "../components/Header";

const OfficerRegistration = () => {
  const [officer, setOfficer] = useState({
    officerId: "",
    password: "",
    officeName: "",
    officerName: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOfficer((prevOfficer) => ({ ...prevOfficer, [name]: value }));
  };

  const handleRegistrationError = (message) => {
    setErrorMessage(message);
    setSuccessMessage(""); // Clear success message on error
  };

  const handleRegistrationSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage(""); // Clear error message on success
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/office/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(officer),
      });
      const data = await res.json();

      if (data.success === false) {
        handleRegistrationError(data.message);
        return;
      }

      handleRegistrationSuccess("Officer Registered Successfully!");

      console.log("Officer Registered:", officer);

      // Reset form after successful registration
      setOfficer({
        officerId: "",
        password: "",
        officeName: "",
        officerName: "",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      handleRegistrationError("Failed to register officer. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
            Officer Registration
          </h2>

          {/* Display success message if any */}
          {successMessage && (
            <div className="mb-4 text-green-500 text-center">
              {successMessage}
            </div>
          )}

          {/* Display error message if any */}
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-600">Officer ID</label>
              <input
                type="text"
                name="officerId"
                value={officer.officerId}
                onChange={handleChange}
                placeholder="Enter Officer ID"
                maxLength={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                value={officer.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Office Name</label>
              <input
                type="text"
                name="officeName"
                value={officer.officeName}
                onChange={handleChange}
                placeholder="Enter Office Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600">Officer Name</label>
              <input
                type="text"
                name="officerName"
                value={officer.officerName}
                onChange={handleChange}
                placeholder="Enter Officer Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OfficerRegistration;
