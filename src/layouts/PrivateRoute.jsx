import { Outlet, Navigate } from "react-router-dom";
import { LoginUser } from "../assets/pages/Zustand";

const PrivateRoute = () => {
  const { user } = LoginUser();
  return user ?  <Navigate to="/" replace /> : <Outlet /> ;
};

export default PrivateRoute;
