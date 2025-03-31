import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
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
import { AppContext } from "@/context/AppContext";

const CourseTab = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { token, backendurl, lecturers, getadminCourses,PublishedCourses, setPublishedCourses, } =
    useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [courseById, setCourseById] = useState(null);
  const [lectureCount,setLectureCount] = useState(0);
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    branch: "",
    semester: "",
    courseThumbnail: "",
  });

  // Fetch course details
  const getCourseDetailsByCourseId = async () => {
    try {
      const { data } = await axios.post(
        backendurl + "/api/course/courseDetailsByID",
        { courseId },
        { headers: { token } }
      );
      if (data.success) {
        const lectureLength = data.courseDetails?.lectures?.length || 0;
        setCourseById(data.courseDetails);
        setLectureCount(lectureLength)
        
        setInput((prev) => ({
          ...prev,
          courseTitle: data.courseDetails.courseTitle || "",
          subTitle: data.courseDetails.subTitle || "",
          branch: data.courseDetails.branch || "",
          semester: data.courseDetails.semester || "",
          courseThumbnail: data.courseDetails.courseThumbnail || "",
        }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (courseId) getCourseDetailsByCourseId();
     
  }, [courseId,token,backendurl]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const selectBranch = (value) =>
    setInput((prev) => ({ ...prev, branch: value }));
  const selectSemester = (value) =>
    setInput((prev) => ({ ...prev, semester: value }));

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput((prev) => ({ ...prev, courseThumbnail: file }));
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("courseId", courseId);
      formData.append("courseTitle", input.courseTitle);
      formData.append("subTitle", input.subTitle);
      formData.append("branch", input.branch);
      formData.append("semester", input.semester);
      formData.append("courseThumbnail", input.courseThumbnail);

      const { data } = await axios.put(
        `${backendurl}/api/course/edit-course`,
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getadminCourses();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update course");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePubishStatus = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        backendurl + "/api/course/toggle-publish",
        { courseId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        setCourseById((prev) => ({ ...prev, isPublished: !prev.isPublished }));
        if (data.noPublishedCourses) {
          
          setPublishedCourses([]);  
        } else {
          setPublishedCourses(data.publishedCourses);
        }
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle>Basic Course Information</CardTitle>
          <CardDescription>
            Make changes to your course here. Click save when you are done.
          </CardDescription>
        </div>
        <div className="space-x-2">
           {console.log(lectureCount)}
          <Button
            onClick={togglePubishStatus}
            variant="outline"
            disabled={isLoading || lectureCount===0}
            className={`text-white ${
              courseById?.isPublished ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-600 hover:bg-green-300"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Please wait
              </>
            ) : courseById?.isPublished ? (
              "Unpublish"
            ) : (
              "Publish"
            )}
          </Button>

          {/* <Button>Remove Course</Button> */}
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
              <Select onValueChange={selectBranch} value={input.branch}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Branches</SelectLabel>
                    <SelectItem value="CSE">CSE</SelectItem>
                    <SelectItem value="ECE">ECE</SelectItem>
                    <SelectItem value="EEE">EEE</SelectItem>
                    <SelectItem value="MECH">MECH</SelectItem>
                    <SelectItem value="CIVIL">CIVIL</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Semester</Label>
              <Select onValueChange={selectSemester} value={input.semester}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Semesters</SelectLabel>
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
          <div className="flex gap-4">
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
