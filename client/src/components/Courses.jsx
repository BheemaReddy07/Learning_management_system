import React, { useContext, useState } from "react";
import { Skeleton } from "./ui/skeleton";

import Course from "../components/Course";
import { AppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const {
    adminCourses,
    setAdminCourses,
    getadminCourses,
    PublishedCourses,
    setPublishedCourses,
    fetchPublishedCourses,
  } = useContext(AppContext);

  const navigate = useNavigate()
  const isLoading = false;
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
        {/* <p className="font-medium text-md text-center mb-10">
          Simply browse through our extensive list of trusted doctors
        </p> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : PublishedCourses?.map((courses, index) => (
                <Course
                  key={index}
                  id={courses._id}
                  branch={courses.branch}
                  courseThumbnail={courses.courseThumbnail}
                  courseTitle={courses.courseTitle}
                  lecturerName={courses.lecturerData.name}
                  lecturerPhoto={courses.lecturerData.photoUrl}
                  semester={courses.semester}
                />
              ))}
        </div>
      </div>
      <button
        onClick={() => {
          navigate("/all-courses");
           window.scrollTo(0, 0); // Corrected scroll function
        }}
        className="bg-blue-300 font-semibold text-lg text-gray-600 px-12 py-3 mt-10 rounded-full hover:scale-105 hover:bg-blue-600 transition-all duration-300 "
      >
        More
      </button>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
