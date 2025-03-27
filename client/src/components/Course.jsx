import React, { useContext } from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { AppContext } from "@/context/AppContext";
import { Link } from "react-router-dom";

const Course = ({id,branch,courseTitle,courseThumbnail,lecturerName,lecturerPhoto,semester}) => {
   const {adminCourses,setAdminCourses,getadminCourses} = useContext(AppContext)
  return (
    <Link to={`/course-detail/${id }`}>
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src={courseThumbnail}
          className="w-full h-36 object-cover rounded-t-lg"
        />
         <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
        {courseTitle}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={lecturerPhoto} alt="@shadcn" />
              <AvatarFallback>{lecturerName? lecturerName?.[0].toUpperCase() : "N/A"}</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">{lecturerName}</h1>
          </div>
          <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'}>
              {semester}
          </Badge>
        </div>
        <div >
            <span className="text-lg font-semibold">Branch:</span> <span className="text-md font-medium">{branch}</span>
        </div>
      </CardContent>
      </div>
    </Card>
    </Link>
    
  );
};

export default Course;
