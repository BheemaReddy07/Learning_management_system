import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "@/context/AppContext";

const ProtectedRoute = () => {
  const { token } = useContext(AppContext);

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
