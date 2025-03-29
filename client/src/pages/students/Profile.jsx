import Course from "@/components/Course";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/context/AppContext";
import { Loader2 } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const Profile = () => {
  const { userData, setUserData, backendurl, token, loadUserProfileData } =
    useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  

  const [image, setImage] = useState(false);
  const [open, setOpen] = useState(false);
  const updateUserProfileData = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("branch", userData.branch);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendurl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        setUserData((prev) => ({
          ...prev,
          name: data.user.name,
          photoUrl: data.user.photoUrl,
          phone: data.user.phone,
          branch: data.user.branch,
        }));
        setOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadUserProfileData();
      
    }
  }, [token]);
useEffect(()=>{
  console.log(userData)
},[])
   
  return (
    <div className="max-w-4xl mx-auto px-4 my-24">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage
              src={userData?.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>
              {userData?.name?.[0].toUpperCase() || "N/A"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {userData?.name || "N/A"}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {userData?.email || "N/A"}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {userData?.role ? userData.role.toUpperCase() : "N/A"}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Phone:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {userData?.phone ? userData.phone : "N/A"}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Branch:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {userData?.branch ? userData.branch.toUpperCase() : "N/A"}
              </span>
            </h1>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-900 shadow-xl rounded-lg">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make Changes to your Profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="col-span-3"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Phone</Label>
                  <Input
                    type="text"
                    placeholder="Name"
                    className="col-span-3"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Branch</Label>

                  <Select
                    value={userData.branch || ""}
                    onValueChange={(value) =>
                      setUserData((prev) => ({ ...prev, branch: value }))
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Branch">
                        {userData.branch ? userData.branch : "Select Branch"}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CSE">CSE</SelectItem>
                      <SelectItem value="ECE">ECE</SelectItem>
                      <SelectItem value="EEE">EEE</SelectItem>
                      <SelectItem value="CIVIL">CIVIL</SelectItem>
                      <SelectItem value="MECH">MECH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="col-span-3"
                    accept="image/*"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => updateUserProfileData()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin " /> Please
                      wait
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {(userData?.enrolledCourses?.length ?? 0) === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            userData?.enrolledCourses?.map((course) => (
              <Course 
                key={course._id}
                id={course._id} 
                branch={course.branch}
                courseTitle={course.courseTitle}
                courseThumbnail={course.courseThumbnail}
                lecturerName={course.lecturerData.name}
                lecturerPhoto={course.lecturerData.photoUrl} 
                semester={course.semester}
                />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
