import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const AddCourse = () => {
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState(false);
    const {backendurl,token,lecturers,getLecturers} = useContext(AppContext)

    const [courseTitle,setCourseTitle] = useState("")
    const [branch,setBranch] = useState("")
    const [lecturer,setLecturer] = useState("")
    const [semester,setSemester] = useState("")

    const getSelectedBranch = (value) =>{
      setBranch(value)
   }
   const getSelectedLecturer = (value) =>{
    setLecturer(JSON.parse(value))
   }
   const getSelectedSemester = (value) =>{
    setSemester(value)
   }
    const createCourseHandler = async () =>{
     try {
      setIsLoading(true)
      const {data} = await axios.post(backendurl+"/api/course/create",{courseTitle,branch,lecturer,semester},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        setCourseTitle("")
        navigate("/admin/course")
    
      }
      else{
        toast.error(data.message)
      }
      
     } catch (error) {
      toast.error(error)
      console.log(error)
     }
     finally{
      setIsLoading(false)
     }
          
    }


   
  return (
    <div className="flex-1  mt-24 mx-[-150px]">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Lets add some basic course details for your new course
        </h1>
        <p className="text-sm">lorem10fgbdnf bjdfg kfjg bdfgnb djg</p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            name="courseTitle"
            placeholder="Your Course Name"
            value={courseTitle}
            onChange={(e)=>setCourseTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>Branch</Label>
          <Select onValueChange={getSelectedBranch}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
                <SelectItem value="EEE">
                  EEE
                </SelectItem>
                <SelectItem value="MECH">
                  MECH
                </SelectItem>
                <SelectItem value="CIVIL">
                  CIVIL
                </SelectItem>
                
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Lecturer</Label>
          <Select onValueChange={getSelectedLecturer}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Lecturer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Lecturer</SelectLabel>
                {
                  lecturers.map((item,index)=>(
                    <SelectItem key={index} value={JSON.stringify(item)}>{item.name}</SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Semester</Label>
          <Select onValueChange={getSelectedSemester}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Semester</SelectLabel>
                <SelectItem value="E1 SEM1">E1 SEM1</SelectItem>
                <SelectItem value="E1 SEM2">E1 SEM2</SelectItem>
                <SelectItem value="E2 SEM1">
                  E2 SEM1
                </SelectItem>
                <SelectItem value="E2 SEM2">
                  E2 SEM2
                </SelectItem>
                <SelectItem value="E3 SEM1">
                  E3 SEM1
                </SelectItem>
                <SelectItem value="E3 SEM2">E3 SEM2</SelectItem>
                <SelectItem value="E4 SEM1">E4 SEM1</SelectItem>
                <SelectItem value="E4 SEM2">E4 SEM2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline" onClick={()=>navigate("/admin/course")}>Back</Button>
            <Button disabled={isLoading} onClick={createCourseHandler} >
                {
                    isLoading ?
                    (
                        <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                        </>
                    ):
                    "Create"
                }
            </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
