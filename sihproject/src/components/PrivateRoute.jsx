import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { currentOfficer } = useSelector((state) => state.officer);
  const location = useLocation();

  // If there is no current user, redirect to login page and pass the current location
  if (!currentOfficer) {
    return <Navigate to="/officelogin" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
