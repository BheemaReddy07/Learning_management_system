import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";
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
const AddCourse = () => {
    const navigate = useNavigate()
    const isLoading = false;

    const createCourseHandler = async () =>{
        alert("working...")
    }
  return (
    <div className="flex-1 mx-10 mt-24">
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
          />
        </div>
        <div>
          <Label>Category</Label>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Next JS">Next JS</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Frontend Development">
                  Frontend Development
                </SelectItem>
                <SelectItem value="Fullstack Development">
                  Fullstack Development
                </SelectItem>
                <SelectItem value="MERN Stack Development">
                  MERN Stack Development
                </SelectItem>
                <SelectItem value="Javascript">Javascript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Docker">Docker</SelectItem>
                <SelectItem value="MongoDB">MongoDB</SelectItem>
                <SelectItem value="HTML">HTML</SelectItem>
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
