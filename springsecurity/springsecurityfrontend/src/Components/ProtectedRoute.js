import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext"; // Assuming UserContext is in the same directory

const ProtectedRoute = ({ allowedRoles }) => {
  const { userRole } = useUser();

  if (!userRole || !allowedRoles.includes(userRole[0])) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
