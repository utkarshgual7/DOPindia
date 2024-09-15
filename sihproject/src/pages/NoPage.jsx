import React from "react";
import { getImageUrl } from "../utils.js";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/solid"; // Import HomeIcon

import BackToTop from "../components/BackToTop.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { Helmet } from "react-helmet-async";
import Navbar from "../components/Navbar.jsx";

const NoPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
        <h2 className="text-2xl font-bold text-red-400 mb-2">
          Error 404: Page Not Found!
        </h2>
        <p className="text-gray-300 text-lg mb-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <h1 className="text-gray-800 text-2xl mb-4">Under Maintenance!</h1>
      </div>
    </>
  );
};

export default NoPage;
