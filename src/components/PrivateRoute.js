import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    localStorage.clear(); 
    logout(); 
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
