import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const AgentProtectedRoute = () => {
  const { currentAgent } = useSelector((state) => state.agent);
  const location = useLocation();

  // If there is no current user, redirect to login page and pass the current location
  if (!currentAgent) {
    return <Navigate to="/agentlogin" state={{ from: location }} />;
  }

  return <Outlet />;
};

export default AgentProtectedRoute;
