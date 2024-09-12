import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const SafeRoute = () => {
  const { currentClient } = useSelector((state) => state.client);
  const location = useLocation();

  // If there is no current user, redirect to login page and pass the current location
  if (!currentClient) {
    return <Navigate to="/signin" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default SafeRoute;
