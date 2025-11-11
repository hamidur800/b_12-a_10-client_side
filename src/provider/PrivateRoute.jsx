import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <span className="loading loading-infinity text-primary custom-loader"></span>

        <style>
          {`
      .custom-loader {
        width: 100px !important;
        height: 100px !important;
      }
    `}
        </style>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login" state={location?.pathname} />;
};

export default PrivateRoute;
