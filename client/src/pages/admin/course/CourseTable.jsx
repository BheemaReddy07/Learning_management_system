import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { useScroll } from "framer-motion";
import { toast } from "react-toastify";
import { AppContext } from "@/context/AppContext";
import { useEffect } from "react";
import axios from "axios";
const CourseTable = () => {
  const navigate = useNavigate();
  const { backendurl, token } = useContext(AppContext);
  const [adminCourses, setAdminCourses] = useState([]);

  const getadminCourses = async () => {
    try {
      const { data } = await axios.get(
        backendurl + "/api/course/getadmincourses",
        { headers: { token } }
      );
      if (data.success) {
        setAdminCourses(data.courses);
        console.log(data.courses);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  useEffect(() => {
    getadminCourses();
  }, []);

  return (
    <div className="mt-20">
      <Button onClick={() => navigate(`create`)}>Create a new Course</Button>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">CourseTitle</TableHead>
            <TableHead>Branch</TableHead>
            <TableHead>Semester</TableHead>
            <TableHead className="text-right">Lecturer Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {adminCourses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course.courseTitle}
              </TableCell>
              <TableCell>{course.branch}</TableCell>
              <TableCell>{course.semester}</TableCell>
              <TableCell className="text-right">
                {course.lecturerData?.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default CourseTable;
