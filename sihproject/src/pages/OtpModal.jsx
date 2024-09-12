import React from "react";

const OtpModal = ({
  isOpen,
  onClose,
  onSubmit,
  otp,
  setOtp,
  isLoading,
  errorMessage,
  successMessage,
  email,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-2xl font-semibold mb-4 text-white">Enter OTP</h3>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="p-3 border border-gray-600 rounded mb-4 w-full bg-gray-900 text-white placeholder-gray-500"
        />
        {errorMessage && (
          <p className="text-red-400 text-center mb-2">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-400 text-center mb-4">{successMessage}</p>
        )}
        <button
          onClick={onSubmit}
          disabled={isLoading}
          aria-label="submit otp"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Verifying..." : "Submit"}
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 text-blue-400 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OtpModal;
