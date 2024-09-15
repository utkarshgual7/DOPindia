import React, { useState, Suspense, memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useSelector, useDispatch } from "react-redux";
import { getImageUrl } from "../utils.js";
import MenuSvg from "../assets/svg/MenuSvg";
import Button from "./Button";
import { HamburgerMenu } from "./design/Header"; // Ensure this component is defined or imported correctly
import { logout } from "../redux/agent/agentSlice.js";

const LanguageSwitcher = React.lazy(() => import("./LanguageSwitcher"));
const MemoizedButton = memo(
  ({ className, px, onClick, children, ariaLabel }) => (
    <button
      className={className}
      style={{ padding: px }}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
);

const AgentNavbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openNavigation, setOpenNavigation] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const currentAgent = useSelector((state) => state.agent.currentAgent);

  const dispatch = useDispatch();

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setOpenNavigation(false);
    alert(t("navbar.logoutalert", "You have been logged out successfully."));
    navigate("/");
  };

  const handleClick = () => {
    if (!openNavigation) return;
    enablePageScroll();
    setOpenNavigation(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguageDropdownOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-5 lg:px-7.5 xl:px-10 max-lg:py-0">
        <Link className="block w-[18rem] xl:mr-8" to="/agenthome">
          <img
            src={getImageUrl("Logo/logom.png")}
            className="w-[100px] max-md:w-[100px]"
            alt="Indiapost Logo"
            loading="eager" // Preload critical logo image
          />
        </Link>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-0 left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="flex flex-col items-center justify-center w-full h-full lg:flex-row lg:items-center lg:justify-center lg:w-auto lg:h-auto">
            <ul className="flex flex-col items-center space-y-6 font-code text-2xl uppercase text-n-1 transition-colors px-6 py-6 md:py-8 lg:flex-row lg:space-y-0 lg:space-x-8 lg:px-0 lg:py-0 lg:text-base lg:font-semibold lg:text-n-1/50">
              {currentAgent ? (
                <li className="lg:hover:text-n-1">
                  <a href="/agentdashboard" onClick={handleClick}>
                    {t("navbar.home", "HOME")}
                  </a>
                </li>
              ) : (
                <li className="lg:hover:text-n-1">
                  <a href="/" onClick={handleClick}>
                    {t("navbar.home", "HOME")}
                  </a>
                </li>
              )}

              <li className="lg:hover:text-n-1">
                <a href="/services" onClick={handleClick}>
                  {t("navbar.forum", "Services")}
                </a>
              </li>

              <li className="lg:hover:text-n-1">
                <Link to="/trackparcel" onClick={handleClick}>
                  {t("navbar.serviceMyDevice", "Track Parcel")}
                </Link>
              </li>

              {!currentAgent ? (
                <>
                  <li className="lg:hover:text-n-1">
                    <a href="/signin" onClick={handleClick}>
                      {t("navbar.login", "LOGIN")}
                    </a>
                  </li>
                  <li className="lg:hidden">
                    <a
                      href="/register"
                      onClick={handleClick}
                      aria-label="register"
                    >
                      {t("navbar.register", "REGISTER / SIGN UP")}
                    </a>
                  </li>
                </>
              ) : (
                <li className="lg:hover:text-n-1"></li>
              )}
            </ul>
          </div>
          <HamburgerMenu />
        </nav>

        {!currentAgent ? (
          <Link to="/register">
            <MemoizedButton
              className="hidden lg:flex text-sm rounded-lg outline px-3 py-3"
              aria-label="register"
            >
              {t("navbar.registerSignUp", "Register / Sign up")}
            </MemoizedButton>
          </Link>
        ) : (
          <div className="relative flex items-center ml-2 lg:ml-0">
            <img
              src={currentAgent.profilePicture}
              alt="User Profile"
              className="w-12 h-12 rounded-full border-2 border-red-400 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              loading="lazy" // Lazy load non-critical images
            />
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 border-red-300 rounded shadow-lg">
                <div className="px-4 py-2 border-b text-black border-black bg-gray-200 font-extrabold">
                  Employee:
                  {currentAgent.name}
                </div>
                <div className="px-4 py-2 border-b text-black border-black bg-gray-200 font-extrabold">
                  Service Pincode: {currentAgent.servicePincode}
                </div>

                <button
                  className="block w-full text-black font-extrabold bg-gray-200 text-left px-4 py-2 hover:text-red-400"
                  onClick={handleLogout}
                  aria-label="logout"
                >
                  {t("navbar.logout", "Logout")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Button
        className="ml-auto lg:hidden"
        px="px-3"
        onClick={toggleNavigation}
        aria-label="Menu or Sidebar Menu"
      >
        <MenuSvg openNavigation={openNavigation} />
      </Button>
    </div>
  );
};

export default AgentNavbar;
