import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
 
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const LectureTab = () => {

  const params = useParams();
  const navigate = useNavigate();
  const courseId  = params.courseId;
  const lectureId = params.lectureId;
  const { backendurl, token } = useContext(AppContext);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lectureTitle,setLectureTitle] = useState("")
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const [isVideoUploadedAlready,setIsVideoUploadedAlready] = useState(false);

  


  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const { data } = await axios.post(
          backendurl + "/api/media/upload-video",
          formData,
          {
            headers: { token },
            onUploadProgress: ({ loaded, total }) => {
              setUploadProgress(Math.round((loaded * 100) / total));
            },
          }
        );

        if (data.success) {
          console.log(data)
          setUploadVideoInfo({
            videoUrl: data.result.url,
            publicId: data.result.public_id,
          });
          setBtnDisable(false);
          toast.success(data.message);
        }
      } catch (error) {
        console.log(error.response ? error.response.data : error.message);
        toast.error(error.response?.data?.message || "Upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const removeLecture = async () =>{
    try {
      setRemoveLoading(true);
      const {data} = await axios.delete(backendurl+'/api/course/delete-lecture',{headers:{token},data:{lectureId}});
      if(data.success){
        toast.success(data.message);
        navigate( `/admin/course/${courseId}/lecture`)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
    finally{
      setRemoveLoading(false)
    }
  }

  const getLectureDetailsByID = async () =>{
    try {
      const {data} = await axios.get(backendurl+`/api/course/get-lectureById/${lectureId}`,{headers:{token} })
        if(data.success){
         setLectureTitle(data.lecture.lectureTitle)
         setIsVideoUploadedAlready(data.lecture?.publicId)
         
        }
        else{
          toast.error(data.message)
        }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  
  const updateLectureDetails = async () =>{
    try {
      const {data} = await axios.post(backendurl+'/api/course/edit-lecture',{uploadVideoInfo,lectureTitle,courseId,lectureId},{headers:{token}})
      if(data.success){
      toast.success(data.message)
       navigate( `/admin/course/${courseId}/lecture`)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }
  useEffect(()=>{
    getLectureDetailsByID()
  },[lectureId])


  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button disabled={removeLoading} variant="destructive" onClick={removeLecture}>
            {removeLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className=" flex  flex-col gap-4">
      <div>
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div>
          <Label>
            {" "}
            Video <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center gap-5"><Input
            type="file"
            accept="video/*"
            placeholder="Ex.Introduction to JS"
            onChange={fileChangeHandler}
            className="w-fit"
          />
         {
          isVideoUploadedAlready &&  <span className="text-green-500 text-lg font-bold">Already Uploaded</span>
         }</div>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
          <Button disabled={isLoading ||btnDisable} onClick={updateLectureDetails}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
