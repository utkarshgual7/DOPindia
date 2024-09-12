import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header.jsx";
import { Helmet } from "react-helmet-async";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post("/api/auth/forgot-password", {
        email,
      });

      if (response.status === 200) {
        setSuccessMessage(
          t(
            "forgotPassword.successMessage",
            "If an account with that email exists, a password reset link has been sent to your email address."
          )
        );
        setTimeout(() => navigate("/"), 5000); // Redirect after 5 seconds
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          t(
            "forgotPassword.errorMessage",
            "An error occurred. Please try again."
          )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <Helmet>
        <title>Forgot Password</title>
        <meta
          name="description"
          content="This is the forgot password page of machinevice website."
        />
      </Helmet>
      <Header />
      <div className="max-w-md w-full bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {t("forgotPassword.title", "Forgot Password")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-blue-500">
              {t("forgotPassword.emailLabel", "Email Address")}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder={t(
                "forgotPassword.emailPlaceholder",
                "Enter your email address"
              )}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="forgot password submit"
          >
            {loading
              ? t("forgotPassword.loadingText", "Sending...")
              : t("forgotPassword.submitButton", "Send Reset Link")}
          </button>
          {errorMessage && (
            <p className="text-red-500 text-center mt-2">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-center mt-2">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
