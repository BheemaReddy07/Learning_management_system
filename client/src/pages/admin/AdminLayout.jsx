import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1  p-10 lg:ml-60">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
