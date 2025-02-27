import { useContext, useEffect, useState } from "react";
import React from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";

import Navbar from "./components/Navbar";
import Home from "./pages/students/Home";
import Footer from "./components/Footer";
import MyLearning from "./pages/students/MyLearning";
import Profile from "./pages/students/Profile";
import { AppContext } from "./context/AppContext";
import FullPageLoader from "./components/FullPageLoader";
import Sidebar from "./pages/admin/Sidebar";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import Addlecturer from "./pages/admin/Addlecturer";
const App = () => {
  const navigate = useNavigate();
  const { showLogin, setShowLogin, token } = useContext(AppContext);
  const isAuthenticated = () => {
    return token && token !== ""; // Returns true if token is present
  };

  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <div className="min-h-screen">
      <FullPageLoader />

      <div className="mx-4 sm:mx-[10%]">
        <ToastContainer />
        <Navbar />
        {showLogin && <Login />}
        <Routes>
          <Route path="/" element={<Home />} />

          {isAuthenticated() ? (
            <>
              <Route path="/my-learnings" element={<MyLearning />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : (
            ""
          )}
          {/* 🔹 Admin routes wrapped inside AdminLayout */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="course" element={<CourseTable />} />
            <Route path="add-lecturer" element={<Addlecturer />} />
            <Route path="course/create"  element={<AddCourse />}/>
          </Route>
          
        </Routes>
        {!isAdminRoute && <Footer />}
      </div>
    </div>
  );
};

export default App;
