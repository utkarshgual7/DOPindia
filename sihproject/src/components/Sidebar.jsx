import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const { t } = useTranslation();
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 max-sm:px-8 max-sm:text-[12px]  lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Navbar Links */}
          <motion.div
            className="flex md:space-x-3 max-sm:space-x-0 w-full"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              to="/profile"
              className="block py-2 px-2 hover:text-blue-500 transition-colors duration-300"
            >
              {t("sidebar.profile", "Profile")}
            </Link>
            <Link
              to="/postsbyuser"
              className="block py-2 px-2 hover:text-blue-500 transition-colors duration-300"
            >
              {t("sidebar.yourPosts", "Your Posts")}
            </Link>

            {!currentUser.isAdmin && (
              <Link
                to="/servicehistory"
                className="block py-2 px-2 hover:text-blue-500 transition-colors duration-300"
              >
                {t("sidebar.serviceHistory", "Service History")}
              </Link>
            )}
            {!currentUser.isAdmin && (
              <Link
                to="/cancelledorder"
                className="block py-2 px-2 hover:text-blue-500 transition-colors duration-300"
              >
                {t("sidebar.cancelledOrder", "Cancelled order")}
              </Link>
            )}
            {currentUser.isAdmin && (
              <>
                <Link
                  to="/servicepanel"
                  className="block py-2 px-4 hover:text-blue-500 transition-colors duration-300"
                >
                  {t("sidebar.servicePanel", "Service Panel")}
                </Link>
                <Link
                  to="/forumcontrols"
                  className="block py-2 px-4 hover:text-blue-500 transition-colors duration-300"
                >
                  {t("sidebar.forumControls", "Forum Controls")}
                </Link>
                <Link
                  to="/servicelogs"
                  className="block py-2 px-4 hover:text-blue-500 transition-colors duration-300"
                >
                  {t("sidebar.serviceLogs", "Service Logs")}
                </Link>
                <Link
                  to="/techiesonsite"
                  className="block py-2 px-2 hover:text-blue-500 transition-colors duration-300"
                >
                  {t("sidebar.usersInfo", "Users Info")}
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
