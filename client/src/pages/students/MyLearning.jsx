import Course from "@/components/Course";
import { AppContext } from "@/context/AppContext";

import React, { useContext } from "react";

const MyLearning = () => {
  const isLoading = false;
  const {userData} = useContext(AppContext);
  const MyLearningCourse = [];
  return (
    <div className="max-w-4xl mx-auto my-24 px-4 md:px-0">
      <h1 className="font-bold text-2xl">My Learnings</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) :  userData?.enrolledCourses?.length === 0 ? (
          <p>You are not enrolled for any courses</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userData?.enrolledCourses?.map((course) => (
              <Course 
              key={course._id}
              id={course._id} 
              branch={course.branch}
              courseTitle={course.courseTitle}
              courseThumbnail={course.courseThumbnail}
              lecturerName={course.lecturerData.name}
              lecturerPhoto={course.lecturerData.photoUrl} 
              semester={course.semester}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
