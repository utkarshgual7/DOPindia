import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"; // Importing icons from React Icons
import Section from "./Section";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <Section crosses>
      <div className="text-white py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="md:mb-0 flex-1">
            <Link to="/">
              <h1 className="text-2xl font-bold">MachineVice.com</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-5 mb-5 md:mb-0 flex-1 justify-center">
            <Link to="/aboutus" className="hover:underline">
              {t("footer.aboutUs", "About Us")}
            </Link>
            <Link to="/t&c" className="hover:underline">
              {t("footer.termsAndConditions", "T&C | Policies")}
            </Link>
            <Link to="/faq" className="hover:underline">
              {t("footer.faqContactUs", "Contact Us")}
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0 flex-1 justify-center md:justify-end">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="machinevice twitter"
              className="text-xl hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/machinevice"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="machinevice instagram page"
              className="text-xl hover:text-pink-500"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/machinevice"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="machinevice linkedin page"
              className="text-xl hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
        {/* Copyright */}
        <div className="text-center mt-4">
          <p>&copy; {currentYear} MachineVice. All rights reserved.</p>
          <p className="text-sm mt-2">
            Made in भारत | INDIA{" "}
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/color/48/india.png"
              alt="Indian Flag"
              loading="lazy"
              className="inline-block ml-2"
            />
          </p>
        </div>
        {/* Affiliation Notice */}
        <div className="text-center mt-4 px-10">
          <p className="text-sm">
            Disclaimer : The logos and trademarks of companies featured on this
            site or the elements of design are property of their respective
            owners. This site is not affiliated with or endorsed by these
            companies. For any problem, please write to Website Administration.
            <a href="https://icons8.com/icon/"></a> Icons by{" "}
            <a href="https://icons8.com">Icons8</a>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Footer;
