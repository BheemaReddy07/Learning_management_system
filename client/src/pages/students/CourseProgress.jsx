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
   
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;
  const {token,backendurl} = useContext(AppContext)

  
  const [courseProgressDetails,setCourseProgressDetails] = useState()
  const [completedStatus,setCompletedStatus] = useState(null)
  const [progress,setProgress] = useState([]);


  const [currentLecture,setCurrentLecture] = useState(null)

  //initialize the lecture
  const initialLecture = currentLecture || (courseProgressDetails?.lectures && courseProgressDetails?.lectures[0])
   
  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };
  

  

  const fetchCourseProgress = async () =>{
    try {
        const {data} = await axios.post(backendurl+"/api/progress/get-progress",{courseId},{headers:{token}})
        console.log(data)
        if(data.success){
            setCourseProgressDetails(data.courseDetails)
            setCompletedStatus(data.completed)
            setProgress(data.progress)
             
        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }
  
  const HandleUpdateLectureProgress = async (lectureId) =>{
    try {
      const {data} = await axios.post(backendurl +'/api/progress/update-lectureProgress',{courseId,lectureId},{headers:{token}});
      if(data.success){
        toast.success(data.message)
         
        fetchCourseProgress()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
        toast.error(error.message)
    }
  }
  
  const handleMarkasCompleted = async () =>{
    try {
      const {data} = await axios.post(backendurl+'/api/progress/mark-complete',{courseId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        fetchCourseProgress();
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error)
    }
  }

  const handleMarkasInCompleted = async () =>{
    try {
      
      const {data} = await axios.post(backendurl+"/api/progress/mark-incomplete",{courseId},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        fetchCourseProgress()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const handleSelectLecture = (lecture) =>{
    setCurrentLecture(lecture);
    // HandleUpdateLectureProgress(lecture._id)
  }


  useEffect(() => {
    if(token){
      fetchCourseProgress();
    }
   
}, [token, courseId]);


  return (
    <div className="max-w-7xl mx-auto mt-20 p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseProgressDetails?.courseTitle} </h1>
        {/* <Button
         onClick={completedStatus ? handleMarkasInCompleted : handleMarkasCompleted}
        variant={completedStatus ? "outline":"default"}
        >
        {
          completedStatus ? (
            <div className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2" /> <span>Completed</span>
            </div>
          ):"Mark as InComplete"
        }
        </Button> */}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          <div>
            <video src={currentLecture?.videoUrl || initialLecture?.videoUrl}
             controls
             className="w-full h-auto md:rounded-lg" 
             onEnded={() => {
              const lectureId = currentLecture?._id || initialLecture?._id;
              if (lectureId) HandleUpdateLectureProgress(lectureId);
            }}
            
            
            />
          </div>

          <div className="mt-2">
            <h3 className="font-medium text-lg">
                {`Lecture ${courseProgressDetails?.lectures?.findIndex(
                    (lec)=>lec._id ===(currentLecture?._id || initialLecture._id)
                )+1 }: ${currentLecture?.lectureTitle || initialLecture?.lectureTitle}`}

                 
                </h3>
          </div>  
        </div>
        {/* lecture sidebar */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl  mb-4">Course lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {courseProgressDetails?.lectures?.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${lecture._id === currentLecture?._id ? 'bg-gray-200':""} : 'dark:bg-gray-800`}
                 onClick={()=>{handleSelectLecture(lecture)}}
              >
                <CardContent className="flex items-center p-4 justify-between">
                  <div className="flex items-center">
                    {/*  */}
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2
                        size={24}
                        className="text-green-500 mr-2 "
                      />
                    ) : (
                      <PlayCircle className="text-gray-500 mr-2" size={16} />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {
                    isLectureCompleted(lecture._id) && (
                    <p className="text-green-600 font-bold">Completed</p>
                    )
                  }
                  

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
