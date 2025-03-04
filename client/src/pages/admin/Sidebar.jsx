import { ChartBar, Library } from "lucide-react";
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen sticky">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-50 bg-gray-100 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 fixed left-0 top-0 h-full p-5">
        <div className="mt-20 space-y-4">
          <SidebarLink to="/admin/dashboard" icon={<ChartBar size={22} />} text="Dashboard" active={location.pathname === "/admin/dashboard"} />
          <SidebarLink to="/admin/course" icon={<Library size={22} />} text="Course" active={location.pathname === "/admin/course"} />
          <SidebarLink to="/admin/add-lecturer" icon={<Library size={22} />} text="Add lecturer" active={location.pathname === "/admin/add-lecturer"} />
        </div>
      </aside>

      
    </div>
  );
};

// Reusable Sidebar Link Component
const SidebarLink = ({ to, icon, text, active }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      active ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white"
    }`}
  >
    {icon}
    <span className="text-lg">{text}</span>
  </Link>
);

export default Sidebar;
