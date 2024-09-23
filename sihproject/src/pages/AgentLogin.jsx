import React, { useState } from "react";
import AgentNavbar from "../components/AgentNavbar";
import { useNavigate } from "react-router-dom"; // For redirecting
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/agent/agentSlice.js";

const AgentLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state before making the request

    try {
      dispatch(signInStart());

      const response = await fetch("/api/office/agentlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json(); // Extract data from the response

      if (!response.ok) {
        setLoading(false);
        dispatch(signInFailure("Login failed"));
        setError(data.message || "Login failed");

        return;
      }

      localStorage.setItem("token", data.token);
      dispatch(signInSuccess(data));
      setLoading(false);
      setMessage("Login successful! Redirecting you to your destination...");
      navigate("/agentdashboard");
    } catch (error) {
      setLoading(false);
      const errorMessage =
        error.message || "An unexpected error occurred. Please try again.";
      setError(errorMessage);
      dispatch(signInFailure(errorMessage));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <AgentNavbar />
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Indiapost Postman Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && !error && (
          <p className="text-green-500 text-center mb-4">{message}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AgentLogin;
