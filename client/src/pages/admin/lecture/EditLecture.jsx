import React from "react";
import LectureTab from "./LectureTab";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  return (
    <div className="mt-20 mx-[-150px]">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Button size='icon' variant='outline' className="rounded-full" onClick={() => navigate(`/admin/course/${courseId}/lecture`)}>
            <ArrowLeft size={16} />
          </Button>
          <h1 className="font-bold text-sm">Update Your Lecture</h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;
