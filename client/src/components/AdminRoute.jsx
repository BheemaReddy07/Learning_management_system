import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "@/context/AppContext";

const AdminRoute = () => {
  const { token, userData } = useContext(AppContext);

  return token && userData?.role === "instructor" ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
