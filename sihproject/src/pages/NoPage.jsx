import React from "react";
import { getImageUrl } from "../utils.js";
import { useNavigate } from "react-router-dom";
import { HomeIcon } from "@heroicons/react/solid"; // Import HomeIcon

import BackToTop from "../components/BackToTop.jsx";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import { Helmet } from "react-helmet-async";

const NoPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <Helmet>
        <title>Page Not Found 404</title>
        <meta
          name="description"
          content="This is the About US page of machinevice website."
        />
      </Helmet>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-white">
        <img
          src={getImageUrl("NoPage/pagenotfound.png")}
          alt="Error"
          className="w-64 h-auto mb-4"
        />
        <h2 className="text-2xl font-bold text-red-400 mb-2">
          Error 404: Page Not Found!
        </h2>
        <p className="text-gray-300 text-lg mb-4">
          Sorry, the page you are looking for does not exist.
        </p>
        <button
          onClick={handleGoHome}
          aria-label="Back to home"
          className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400 transition duration-300"
        >
          <HomeIcon className="w-5 h-5 mr-2" /> {/* Icon with margin */}
          Back to Home
        </button>
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default NoPage;
