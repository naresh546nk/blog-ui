import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../store/auth-context";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  console.log("isLoggedIn :", isLoggedIn);

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
