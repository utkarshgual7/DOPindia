import React, { useState } from "react";

import Navbar from "../components/Navbar";

const CreateAccount = () => {
  // State to track form inputs
  const [isChecked, setIsChecked] = useState(false);
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [isAvailable, setIsAvailable] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [title, setTitle] = useState("");

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // Handle userId change
  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
    setIsAvailable(null); // Reset availability status when user ID changes
  };

  // Handle user ID availability check
  const checkUserIdAvailability = async () => {
    if (userId.trim() === "") {
      setAvailabilityMessage("User ID is required");
      setIsAvailable(false);
      return;
    }

    try {
      const response = await fetch(
        `/api/auth/check-availability?userId=${userId}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data); // Log the data to verify the response

      if (data.available) {
        setIsAvailable(true);
        setAvailabilityMessage(data.message);
      } else {
        setIsAvailable(false);
        setAvailabilityMessage(data.message);
      }
    } catch (error) {
      console.error("Error checking user ID availability:", error);
      setAvailabilityMessage(
        "An error occurred while checking availability. Please try again."
      );
      setIsAvailable(false);
    }
  };
  // Handle form submission to create a user
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    // Check if all required fields are filled
    if (!isChecked || !userId || !firstName || !lastName || !email || !mobile) {
      alert("Please fill in all required fields.");
      return;
    }

    // Check if user ID is available before submitting the form
    if (isAvailable === false || isAvailable === null) {
      alert("Please check the availability of the User ID.");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          firstName,
          lastName,
          email,
          mobile,
          title,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("User created successfully!");
        // Clear form fields after successful submission
        setUserId("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setMobile("");
        setTitle("");
        setIsChecked(false);
      } else {
        alert(`Error: ${data.message}`);
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 p-4 lg:p-8">
          <h1 className="text-2xl lg:text-4xl font-bold text-center text-gray-800 mb-6">
            Create a new account
          </h1>
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <p className="text-sm text-gray-600 mb-4">
              *indicates a required field
            </p>
            <h4 className="text-xl font-semibold mb-4">Personal Details</h4>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <label
                  className="text-lg w-full lg:w-1/3 text-gray-700"
                  htmlFor="User"
                >
                  User ID:
                </label>
                <div className="flex items-center w-full lg:w-2/3">
                  <input
                    className="border rounded-l-sm border-gray-300 h-10 w-full px-3"
                    type="text"
                    id="User"
                    name="User"
                    value={userId}
                    onChange={handleUserIdChange}
                    required
                  />
                  <button
                    type="button"
                    className="bg-red-600 text-white p-2 rounded-r-sm ml-2"
                    onClick={checkUserIdAvailability}
                  >
                    Check Availability
                  </button>
                </div>
                {isAvailable !== null && (
                  <p
                    className={`text-sm ${
                      isAvailable ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {availabilityMessage}
                  </p>
                )}
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-4">
                <label
                  className="text-lg w-full lg:w-1/3 text-gray-700"
                  htmlFor="fname"
                >
                  First Name:
                </label>
                <div className="flex w-full lg:w-2/3 gap-4">
                  <select
                    className="border rounded w-1/3 h-10 px-3 text-gray-700"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  >
                    <option value="" disabled hidden>
                      Select Title
                    </option>
                    <option value="Mr">Mr.</option>
                    <option value="Mrs">Mrs.</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    className="border rounded w-2/3 h-10 px-3 border-gray-300"
                    type="text"
                    id="fname"
                    name="fname"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-4">
                <label
                  className="text-lg w-full lg:w-1/3 text-gray-700"
                  htmlFor="lname"
                >
                  Last Name:
                </label>
                <input
                  className="border rounded w-full lg:w-2/3 h-10 px-3 border-gray-300"
                  type="text"
                  id="lname"
                  name="lname"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-4">
                <label
                  className="text-lg w-full lg:w-1/3 text-gray-700"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  className="border rounded w-full lg:w-2/3 h-10 px-3 border-gray-300"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-4">
                <label
                  className="text-lg w-full lg:w-1/3 text-gray-700"
                  htmlFor="number"
                >
                  Mobile:
                </label>
                <div className="flex items-center w-full lg:w-2/3">
                  <span className="border rounded-l-sm py-2 px-3 bg-gray-200 text-gray-700">
                    +91
                  </span>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    required
                    className="border rounded-r-sm w-full py-2 px-3 text-gray-700 border-gray-300"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 text-red-600 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I accept{" "}
                  <a href="#" className="text-red-600">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <div className="text-sm text-gray-600">
                Already have an account?
                <a className="text-blue-800 font-semibold" href="/signin">
                  {" "}
                  Login
                </a>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-red-600 text-white p-2 rounded-md"
                >
                  Register
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 p-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
