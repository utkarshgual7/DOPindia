import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getImageUrl } from "../utils";
import { useTranslation } from "react-i18next";
import OtpModal from "./OtpModal";
import axios from "axios";
import qs from "qs";
import { Helmet } from "react-helmet-async";

// Component for loading spinner
const Spinner = () => (
  <div className="w-5 h-5 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
);

const Register = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isOtpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState(""); // State for OTP input
  const { t } = useTranslation();

  useEffect(() => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute("6LcLzCQqAAAAAJ410JR1xue5ypZliln40a161OBg");
      });
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });

    if (id === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (value) => {
    const minLength = 6;
    const hasSpecialChar = /[@#$&]/.test(value);
    const hasNumber = /\d/.test(value);

    if (value.length < minLength) {
      setPasswordError(
        t(
          "register.passwordLengthError",
          "Password must be at least 6 characters long."
        )
      );
    } else if (!hasSpecialChar) {
      setPasswordError(
        t(
          "register.passwordSpecialCharError",
          "Password must contain at least one special character (@, #, $, &)."
        )
      );
    } else if (!hasNumber) {
      setPasswordError(
        t(
          "register.passwordNumberError",
          "Password must contain at least one number."
        )
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) return;

    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const token = await window.grecaptcha.execute(
        "6LcLzCQqAAAAAJ410JR1xue5ypZliln40a161OBg",
        { action: "register" }
      );

      const submissionData = { ...formData, token };

      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });
      const data = await res.json();

      if (data.success === false) {
        handleRegistrationError(data.message);
        return;
      }

      setSuccessMessage(
        t(
          "register.registrationSuccessful",
          "Registration successful! Please verify the OTP sent to your email."
        )
      );
      setOtpModalOpen(true); // Open OTP modal after successful registration
    } catch (error) {
      setErrorMessage(
        t(
          "register.unexpectedError",
          "An unexpected error occurred. Please try again."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegistrationError = (message) => {
    if (message.includes("E11000 duplicate key error")) {
      setErrorMessage(
        t(
          "register.registrationFailed",
          "This email is already registered with us."
        )
      );
    } else {
      setErrorMessage(message);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      setSuccessMessage(null);

      const res = await fetch("api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      });
      const data = await res.json();

      if (data.success === false) {
        setErrorMessage(data.message);
        return;
      }

      setSuccessMessage(
        t(
          "register.otpVerificationSuccessful",
          "OTP verified successfully. You can now log in."
        )
      );
      setFormData({});
      setOtp("");
      setOtpModalOpen(false);
    } catch (error) {
      setErrorMessage(
        t(
          "register.unexpectedError",
          "An unexpected error occurred. Please try again."
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Helmet>
        <title>Register | MachineVice</title>
        <meta
          name="description"
          content="This is the register member page of machinevice website."
        />
      </Helmet>
      <Link to="/">
        <img
          src={getImageUrl("Navbar/mvlogo.svg")}
          alt="Logo"
          className="w-[200px] mt-1 max-xl:w-[120px]"
        />
      </Link>
      <div className="grid gap-7">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-[26px] m-4">
          <div className="border-[20px] lg:border-[4px] border-transparent rounded-[20px] bg-gray-900 shadow-lg xl:p-7 2xl:p-8 lg:p-8 md:p-8 sm:p-2 m-2">
            <h2 className="text-3xl font-bold text-center mb-6 text-white animate-pulse">
              {t("register.register", "Register")}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder={t("register.fullNamePlaceholder", "Full Name")}
                id="name"
                value={formData.name || ""}
                onChange={handleChange}
                required
                className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-red-300 max-xl:p-2"
              />
              <input
                type="email"
                placeholder={t("register.emailPlaceholder", "Email")}
                id="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
                className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-red-300 max-xl:p-2"
              />
              <input
                type="password"
                placeholder={t("register.passwordPlaceholder", "Password")}
                id="password"
                value={formData.password || ""}
                onChange={handleChange}
                required
                className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-red-300 max-xl:p-2"
              />
              {passwordError && (
                <p className="text-red-500 text-center">{passwordError}</p>
              )}
              <button
                type="submit"
                aria-label="submit"
                disabled={loading || passwordError}
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition disabled:opacity-50 max-xl:p-2"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Spinner />
                    <span>{t("register.sending", "Sending...")}</span>
                  </div>
                ) : (
                  t("register.registerButton", "Register")
                )}
              </button>
              <div className="mt-4">
                <p className="text-gray-400 text-center">
                  {t("register.alreadyHaveAccount", "Already have an account?")}
                  <Link to="/login" className="text-green-400 hover:underline">
                    {t("register.loginHere", "Login here")}
                  </Link>
                </p>
                {/* <OAuth /> */}
              </div>
            </form>
            {errorMessage && (
              <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
            )}
            {successMessage && (
              <p className="mt-4 text-green-500 text-center">
                {successMessage}
              </p>
            )}
            <Link to="/" className="text-white hover:underline">
              {t("register.backToHome", "Back to Home")}
            </Link>
          </div>
        </div>
      </div>
      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setOtpModalOpen(false)}
        onSubmit={handleOtpSubmit}
        otp={otp}
        setOtp={setOtp}
        isLoading={loading}
        errorMessage={errorMessage}
        successMessage={successMessage}
        email={formData.email}
      />
    </div>
  );
};

export default Register;
