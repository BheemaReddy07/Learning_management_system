import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"

import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
 
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
 
import { toast } from "react-toastify";
import { AppContext } from "@/context/AppContext";
import { useEffect } from "react";
import axios from "axios";
import { Edit } from "lucide-react";
 
const CourseTable = () => {
  const navigate = useNavigate();
  const { backendurl, token,adminCourses,setAdminCourses,getadminCourses } = useContext(AppContext);
  

 

  useEffect(() => {
    getadminCourses();  
  }, [adminCourses]);
  

  return (
    <div className="mt-20 mx-[-150px] dark:bg-black">
      <Button  className="mb-4 bg-blue-600 text-white hover:bg-blue-700" onClick={() => navigate(`create`)}>Create a new Course</Button>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg dark:bg-black">
      <Table className="w-full border border-gray-200 dark:bg-black rounded-lg ">
        <TableCaption className="text-gray-500 dark:bg-black">A list of your recent courses.</TableCaption>
        <TableHeader  className="bg-gray-100 border-b border-gray-300 dark:bg-black">
          <TableRow className="text-gray-700 uppercase">
            <TableHead className="py-3 px-4 text-left" >Course Title</TableHead>
            <TableHead className="py-3 px-4 text-left" >Branch</TableHead>
            <TableHead className="py-3 px-4 text-left" >Semester</TableHead>
            <TableHead className="py-3 px-4 text-left" >Lecturer Name</TableHead>
            <TableHead className="py-3 px-4 text-left" >Status</TableHead>
            <TableHead className="py-3 px-4 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminCourses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="py-3 px-4 font-medium">
                {course.courseTitle}
              </TableCell>
              <TableCell className="py-3 px-4">{course.branch}</TableCell>
              <TableCell className="py-3 px-4">{course.semester}</TableCell>
              <TableCell className="py-3 px-4">{course.lecturerData?.name}</TableCell>
              <TableCell className="py-3 px-4"><span
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  course.isPublished ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {course.isPublished ? "Published" : "Draft"}
              </span></TableCell>
              <TableCell className="py-3 px-4 text-right">
                 <Button size='sm' variant='ghost' onClick={() => navigate(`${course._id}`)}><Edit className="w-4 h-4"/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
      </div>
    </div>
  );
};

export default CourseTable;
