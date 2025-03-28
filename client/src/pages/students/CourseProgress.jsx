import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { AppContext } from "@/context/AppContext";
import { Badge, CheckCircle, CheckCircle2, PlayCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CourseProgress = () => {
  const isCompleted = false;
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
  const {token,backendurl} = useContext(AppContext)
  const [courseProgressDetails,setCourseProgressDetails] = useState()

  
  const fetchCourseProgress = async () =>{
    try {
        const {data} = await axios.post(backendurl+"/api/progress/get-progress",{courseId},{headers:{token}})
        console.log(data)
        if(data.success){
            setCourseProgressDetails(data.courseDetails)
             
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(()=>{

    fetchCourseProgress();
     
  },[token,courseId])
  return (
    <div className="max-w-7xl mx-auto mt-20 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseProgressDetails.courseTitle} </h1>
        <Button>Mark as Completed</Button>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>{/* <video /> */}</div>

          <div className="mt-2">
            <h3 className="font-medium text-lg">Lecture-1:Introductin</h3>
          </div>
        </div>
        {/* lecture sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl  mb-4">Course lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {[1, 2, 3, 4].map((lectures, index) => (
              <Card
                key={index}
                className="mb-3 hover:cursor-pointer transition transform"
              >
                <CardContent className="flex items-center p-4 justify-between">
                  <div className="flex items-center">
                    {/*  */}
                    {isCompleted ? (
                      <CheckCircle2
                        size={24}
                        className="text-green-500 mr-2 "
                      />
                    ) : (
                      <PlayCircle className="text-gray-500 mr-2" size={16} />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        Introduction
                      </CardTitle>
                    </div>
                  </div>
                  <p className="text-green-600 font-bold">Completed</p>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
