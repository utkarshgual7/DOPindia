import React, { useState } from "react";
import Header from "../components/Header";
import axios from "axios"; // Assuming you use axios for API calls

const AgentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    servicePincode: "",
    password: "", // Add password to the form data state
  });
  const [registeredAgent, setRegisteredAgent] = useState(null); // To store registered agent details
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/office/agentregister", formData);
      setRegisteredAgent(response.data.agent); // Save agent details to state
      setError(""); // Clear any previous errors
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Header />
      {!registeredAgent ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mt-20 text-gray-800 mb-6">
            Delivery Agent Registration
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Full Name"
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label className="block text-gray-700">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Email"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Password"
              />
            </div>
            <div>
              <label className="block text-gray-700">Agent Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Full Address"
              />
            </div>
            <div>
              <label className="block text-gray-700">Service Pincode</label>
              <input
                type="text"
                name="servicePincode"
                value={formData.servicePincode}
                onChange={handleChange}
                required
                maxLength={6}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Service Pincode"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Agent Registration Successful
          </h2>
          <p className="text-lg text-gray-700 mb-4">Here are your details:</p>
          <div className="border p-4 rounded-lg">
            <p>
              <strong>Agent ID:</strong> {registeredAgent.agentId}
            </p>
            <p>
              <strong>Name:</strong> {registeredAgent.name}
            </p>
            <p>
              <strong>Phone:</strong> {registeredAgent.phone}
            </p>
            <p>
              <strong>Address:</strong> {registeredAgent.address}
            </p>
            <p>
              <strong>Service Pincode:</strong> {registeredAgent.servicePincode}
            </p>
          </div>
          <button
            onClick={() => window.print()} // Print the details
            className="mt-4 py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Print ID Card
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentRegister;
