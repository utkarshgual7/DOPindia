import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLang(lng);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Language Switcher button"
        className="inline-flex items-center text-xs px-2 ml-2 py-2 text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        {selectedLang === "en" ? "English" : "हिंदी"}
        <svg
          className="w-2 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div
            onClick={() => handleLanguageChange("en")}
            className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            English
          </div>
          <div
            onClick={() => handleLanguageChange("hi")}
            className="cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            हिंदी
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
