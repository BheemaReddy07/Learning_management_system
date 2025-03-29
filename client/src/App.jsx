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
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/students/CourseDetail";
import CourseProgress from "./pages/students/CourseProgress";
import SearchPage from "./pages/students/SearchPage";
import AllCourses from "./pages/students/AllCourses";
import AdminRoute from "./components/AdminRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AddLecturer from "./pages/admin/Addlecturer";
const App = () => {
  const navigate = useNavigate();
  const { showLogin, setShowLogin, token,userData } = useContext(AppContext);
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
          <Route path="/course-detail/:courseId" element={<CourseDetail />} />
          {/* <Route path="/course/search" element={<SearchPage />} /> */}
          <Route path="/All-courses" element={<AllCourses />} />

          {/* Protected Student Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/my-learnings" element={<MyLearning />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/course-progress/:courseId" element={<CourseProgress />} />
          </Route>


           <Route element={<AdminRoute />}>
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="course" element={<CourseTable />} />
              <Route path="add-lecturer" element={<AddLecturer />} />
              <Route path="course/create" element={<AddCourse />} />
              <Route path="course/:courseId" element={<EditCourse />} />
              <Route path="course/:courseId/lecture" element={<CreateLecture />} />
              <Route path="course/:courseId/lecture/:lectureId" element={<EditLecture />} />
            </Route>
          </Route>


          {/* Redirect Unknown Routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {!isAdminRoute && <Footer />}
      </div>
    </div>
  );
};

export default App;
