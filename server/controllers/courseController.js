import courseModel from "../models/courseModel.js";
import {deleteMediaFromCloudinary, uploadMedia} from "../utils/cloudinary.js"
const createCourse = async (req, res) => {
  try {
    const { courseTitle, branch, semester, lecturer } = req.body;
    if (!courseTitle || !semester || !branch || !lecturer) {
      return res.json({ success: false, message: "all fields required" });
    }

    const lecturerData =
      typeof lecturer === "string" ? JSON.parse(lecturer) : lecturer;

    const course = await courseModel.create({
      courseTitle,
      branch,
      semester,
      lecturerData,
      creator: req.id,
    });
    return res.json({ success: true, message: "course Created", course });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Failed to create Courese" });
  }
};



const getCreatorCourses = async (req, res) => {
    try {
        const courses = await courseModel.find({ creator: req.id });
        if (!courses.length) {
            return res.json({ success: true, courses: [], message: "No courses found" });
        }
        return res.json({ success: true, courses });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to fetch courses" });
    }
};


const editCourse =async (req,res) =>{
    try {
        const {courseId,courseTitle,subTitle,branch,semester} = req.body;
        const thumbnail = req.file

        let course = await courseModel.findById(courseId)
        if(!course){
            return res.json({success:false,message:"Course Not found"})
        }

        let courseThumbnail = course.courseThumbnail;
        if(thumbnail){
            if(course.courseThumbnail){
                const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
                await deleteMediaFromCloudinary(publicId)
            }
            const uploadedImage = await uploadMedia(thumbnail.path);
            courseThumbnail = uploadedImage.secure_url;
        }
        const updateData = {courseTitle,subTitle,branch,semester,courseThumbnail}
        course   = await courseModel.findByIdAndUpdate(courseId,updateData,{new:true});
        return res.json({success:true,course,message:"Course edited"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Failed to fetch courses" });
   
    }
}
export { createCourse  ,getCreatorCourses ,editCourse};
