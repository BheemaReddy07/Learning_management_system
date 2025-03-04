import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "@/context/AppContext";
import { Loader2, Upload } from "lucide-react";
import axios from "axios";

const AddLecturer = () => {
  const [lecturerImg, setLecturerImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [isLoading,setIsLoading] = useState(false)
  const { backendurl ,token } = useContext(AppContext);
 
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true); 
      if (!lecturerImg) {
        return toast.error("Please upload an image");
      }

      const formData = new FormData();
      formData.append("lecturerImg", lecturerImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("degree", degree);
      
      const {data} = await axios.post(backendurl+"/api/lecturer/add-lecturer",formData,{headers:{token}})
      if(data.success){
        toast.success(data.message)
        setDegree("")
        setEmail("")
        setName("")
        setLecturerImg(null)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Failed to add lecturer");
      console.error(error);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-full max-w-4xl mx-auto mt-20 bg-white shadow-md rounded-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Lecturer</h2>

      {/* Image Upload */}
      <div className="flex items-center space-x-6 mb-6">
        <label htmlFor="lecturer-img" className="cursor-pointer">
          <div className="w-20 h-20 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center overflow-hidden">
            {lecturerImg ? (
              <img src={URL.createObjectURL(lecturerImg)} alt="Lecturer" className="w-full h-full object-cover" />
            ) : (
              <Upload className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </label>
        <input
          type="file"
          id="lecturer-img"
          hidden
          accept="image/*"
          onChange={(e) => setLecturerImg(e.target.files[0])}
        />
        <p className="text-gray-600">Upload Lecturer Picture</p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Lecturer Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 w-[500px] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 w-[500px] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-medium">Education</label>
          <input
            type="text"
            placeholder="Enter education qualification"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            className="border border-gray-300 w-[500px] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-start mt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition  text-base flex items-center justify-center gap-2 disabled:opacity-50"
          disabled={isLoading}
        >
        {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin " /> Please wait
                    </>
                  ) : (
                    "Add Lecturer"
                  )}
        </button>
      </div>
    </form>
  );
};

export default AddLecturer;
