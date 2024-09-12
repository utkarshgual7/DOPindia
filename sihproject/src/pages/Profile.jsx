import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [newProfilePicture, setNewProfilePicture] = useState(
    currentUser.profilePicture
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    const maxSizeInBytes = 50 * 1024; // 50 KB

    if (file && file.size > maxSizeInBytes) {
      setErrorMessage("Image size should be less than 50 KB");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setNewProfilePicture(reader.result);
      setErrorMessage("");
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handlePictureClick = () => {
    fileInputRef.current.click();
  };

  const handleSaveProfilePicture = async () => {
    try {
      const response = await fetch("/api/user/updateProfilePicture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser._id,
          profilePicture: newProfilePicture,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "Failed to update profile picture"
        );
      }

      const data = await response.json();
      console.log("Profile picture updated successfully:", data);

      setIsModalOpen(true);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      setErrorMessage(error.message);
    }
  };

  const handleLoginRedirect = () => {
    window.location.href = "/login";
  };

  return (
    <>
      <Helmet>
        <title>Your Profile | MachineVice</title>
        <meta
          name="description"
          content="This is the user's profile page of machinevice website."
        />
      </Helmet>
      <Header />
      <div className=" flex flex-col justify-center items-center mt-[120px] max-lg:mt-[200px] ">
        <Sidebar />
      </div>
      <div className="flex-1 flex items-center justify-center p-4 h-auto">
        <div className="bg-gray-700 shadow-md rounded-lg overflow-hidden max-w-3xl w-full">
          {currentUser && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={newProfilePicture}
                    alt="Profile"
                    className="rounded-full w-36 h-36 mb-2 cursor-pointer border-4 border-gray-300 hover:border-blue-500 transition"
                    onClick={handlePictureClick}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePictureChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                </div>
                <span className="text-sm text-gray-500 mb-4">
                  Click image to change profile picture
                </span>
                <span className="text-sm text-gray-500 mb-4">
                  (Max size: 50 KB)
                </span>
                {errorMessage && (
                  <div className="text-red-500 text-sm mb-2">
                    {errorMessage}
                  </div>
                )}
                <button
                  onClick={handleSaveProfilePicture}
                  aria-label="save picture"
                  className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition"
                >
                  Save Profile Picture
                </button>
              </div>
              <div className="flex flex-col justify-center p-4 bg-gray-600 rounded-lg">
                <div className="mb-4 text-lg font-semibold text-white text-center md:text-left">
                  <span className="font-bold">Name: </span>
                  {currentUser.name}
                </div>
                <div className="mb-2 text-lg font-medium text-center md:text-left">
                  <span className="font-bold">Email: </span>
                  {currentUser.email}
                </div>
                <div className="mb-2 text-[10px] text-gray-300 leading-relaxed text-center md:text-left">
                  For email updation, write us at admin@machinevice.com
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className=" bg-gray-700 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-lg mb-4">
              To see updated changes, please log in again.
            </p>
            <button
              onClick={handleLoginRedirect}
              aria-label="login-redirect"
              className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
