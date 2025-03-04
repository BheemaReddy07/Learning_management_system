import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useContext } from "react";
import { useState } from "react";
import { AppContext } from "@/context/AppContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const CourseTab = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const isPublished = false;
  const [isLoading, setIsLoading] = useState(false);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const { token, backendurl, lecturers ,adminCourses,setAdminCourses,getadminCourses} = useContext(AppContext);
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    branch: "",
    semester: "",
    // lecturer: "",
    courseThumbnail: "",
  });

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectBranch = (value) => {
    setInput({ ...input, branch: value });
  };
  const selectSemestar = (value) => {
    setInput({ ...input, semester: value });
  };
//   const selectLecturer = (value) => {
     
//     setInput({ ...input, lecturer:value });
//   };
  
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    try {
        setIsLoading(true)
      const formData = new FormData();
      formData.append("courseId", courseId);
      formData.append("courseTitle", input.courseTitle);
      formData.append("subTitle", input.subTitle);
      formData.append("branch", input.branch);
      formData.append("semester", input.semester);
    //   formData.append("lecturer", input.lecturer);
      formData.append("courseThumbnail", input.courseThumbnail);

      const {data} = await axios.put(backendurl+"/api/course/edit-course",formData,{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getadminCourses();

      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
    finally{
        setIsLoading(false)
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your courss here.click save when you are done
          </CardDescription>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            {isPublished ? "Unpublished" : "Published"}
          </Button>
          <Button>Remove Course</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-5">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Computer Networks"
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Network Analyst"
            />
          </div>
          <div className="flex place-items-center gap-5">
            <div>
              <Label>Branch</Label>
              <Select onValueChange={selectBranch}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="ECE">ECE</SelectItem>
                    <SelectItem value="EEE">EEE</SelectItem>
                    <SelectItem value="MECH">MECH</SelectItem>
                    <SelectItem value="CIVIL">CIVIL</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {/* <div>
              <Label>Lecturer</Label>
              <Select onValueChange={selectLecturer}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Lecturer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Lecturer</SelectLabel>
                    {lecturers.map((item, index) => (
                      <SelectItem key={index} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div> */}
            <div>
              <Label>Semester</Label>
              <Select onValueChange={selectSemestar}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Semester</SelectLabel>
                    <SelectItem value="E1 SEM1">E1 SEM1</SelectItem>
                    <SelectItem value="E1 SEM2">E1 SEM2</SelectItem>
                    <SelectItem value="E2 SEM1">E2 SEM1</SelectItem>
                    <SelectItem value="E2 SEM2">E2 SEM2</SelectItem>
                    <SelectItem value="E3 SEM1">E3 SEM1</SelectItem>
                    <SelectItem value="E3 SEM2">E3 SEM2</SelectItem>
                    <SelectItem value="E4 SEM1">E4 SEM1</SelectItem>
                    <SelectItem value="E4 SEM2">E4 SEM2</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-fit"
              onChange={selectThumbnail}
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="h-64 my-2"
                alt="Course Thumbnail"
              />
            )}
          </div>
          <div className="flex  gap-4">
            <Button onClick={() => navigate("/admin/course")} variant="outline">
              Cancel
            </Button>
            <Button onClick={updateCourseHandler} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
