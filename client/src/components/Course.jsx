import React from "react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src="https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"
          className="w-full h-36 object-cover rounded-t-lg"
        />
         <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
        Nextjs complete tutorial in English language
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={"https://github.com/shadcn.png"} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Saaho</h1>
          </div>
          <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'}>
             Advanced
          </Badge>
        </div>
        <div >
            <span className="text-lg font-semibold">Branch:</span> <span className="text-md font-medium">CSE</span>
        </div>
      </CardContent>
      </div>
    </Card>
  );
};

export default Course;
