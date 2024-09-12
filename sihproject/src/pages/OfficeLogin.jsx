import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/officer/officerSlice"; // Adjust the import path as needed

const OfficeLogin = () => {
  const [officerId, setOfficerId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      dispatch(signInStart());

      const res = await fetch("/api/office/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ officerId, password }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        setLoading(false);
        dispatch(signInFailure(data.message || "Login failed"));
        setMessage(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      dispatch(signInSuccess(data));
      setLoading(false);
      setMessage("Login successful! Redirecting you to your destination...");

      // Redirect immediately after success
      navigate("/officedashboard");
    } catch (error) {
      setLoading(false);
      setMessage(
        error.message || "An unexpected error occurred. Please try again."
      );
      dispatch(signInFailure(error.message || "An unexpected error occurred."));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
            Office Login
          </h2>

          <input
            type="text"
            placeholder="Officer ID"
            value={officerId}
            onChange={(e) => setOfficerId(e.target.value)}
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("successful") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default OfficeLogin;
