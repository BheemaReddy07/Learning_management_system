import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [courseLectures, setCourseLectures] = useState([]);
  const { backendurl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(false)
  const params = useParams();
  const courseId = params.courseId;
  const getCourseLectures = async () => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/course/get-lectures",
        { courseId },
        { headers: { token } }
      );
      if (data.success) {
        setCourseLectures(data.lectures);
        console.log(data.lectures);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error.message);
    }
  };

  const onSubmitHandler = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        backendurl + "/api/course/create-lecture",
        { lectureTitle, courseId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        setLectureTitle("");
        getCourseLectures();
        console.log(data.lecture);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error.message);
    }
    finally{
      setIsLoading(false)
    }
  };

  
  useEffect(() => {
    getCourseLectures();
    const interval = setInterval(getCourseLectures,10000);
    return () =>clearInterval(interval)
  }, [courseId]);

  return (
    <div className="flex-1  mt-24 lg:mx-[-150px]">
      <div className="mb-4">
        <div className="flex items-center gap-2">
        <Button
            size="icon"
            variant="outline"
            className="rounded-full"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            <ArrowLeft size={16} />
          </Button>
          <h1 className="hidden md:block font-bold text-xl">
          Lets add some basic course details for your new course
        </h1>
        </div>
        
        <p className="hidden md:block text-sm">some information to your new course</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            placeholder="Lecture Name"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={onSubmitHandler}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {courseLectures.length === 0 ? (
            <p>No lectures available</p>
          ) : (
            courseLectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
