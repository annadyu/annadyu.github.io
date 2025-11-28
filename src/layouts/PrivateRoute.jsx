import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
  return savedUser ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
