import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from route parameters
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Function to validate password
  const validatePassword = (password) => {
    const minLength = 6;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /\d/;

    if (password.length < minLength) {
      return t(
        "resetPassword.passwordTooShort",
        "Password must be at least 6 characters long."
      );
    }

    if (!specialCharRegex.test(password)) {
      return t(
        "resetPassword.passwordNoSpecialChar",
        "Password must contain at least one special character."
      );
    }

    if (!numberRegex.test(password)) {
      return t(
        "resetPassword.passwordNoNumber",
        "Password must contain at least one number."
      );
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validate password
    const validationError = validatePassword(password);
    if (validationError) {
      setLoading(false);
      return setErrorMessage(validationError);
    }

    if (password !== confirmPassword) {
      setLoading(false);
      return setErrorMessage(
        t("resetPassword.passwordMismatch", "Passwords do not match.")
      );
    }

    try {
      const submissionData = { token, password };
      const response = await axios.post(
        "/api/auth/reset-password",
        submissionData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setSuccessMessage(
          t(
            "resetPassword.successMessage",
            "Password reset successfully. You can now log in."
          )
        );
        setTimeout(() => navigate("/login"), 5000); // Redirect after 5 seconds
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          t(
            "resetPassword.errorMessage",
            "An error occurred. Please try again."
          )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {t("resetPassword.title", "Reset Password")}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-green-500">
              {t("resetPassword.newPasswordLabel", "New Password")}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder={t(
                "resetPassword.newPasswordPlaceholder",
                "Enter your new password"
              )}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-green-500">
              {t("resetPassword.confirmPasswordLabel", "Confirm Password")}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              placeholder={t(
                "resetPassword.confirmPasswordPlaceholder",
                "Confirm your new password"
              )}
            />
          </div>
          <button
            type="submit"
            aria-label="submitPassword"
            disabled={loading}
            className={`w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading
              ? t("resetPassword.loadingText", "Resetting...")
              : t("resetPassword.submitButton", "Reset Password")}
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

export default ResetPassword;
