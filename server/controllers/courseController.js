import courseModel from "../models/courseModel.js";
import lectureModel from "../models/lectureModel.js";
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
        return res.status(500).json({ success: false, message: "Failed to edit courses" });
   
    }
}

const getCourseDetailsById = async (req,res) =>{
  try {
    const {courseId} = req.body
    const courseDetails = await courseModel.findById(courseId)
    if(!courseDetails){
      return res.status(404).json({success:false,message:"Course not found"})
    }
    res.status(200).json({success:true,courseDetails})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch courses by id" });
  }
}


const createLecture = async (req,res) =>{
  try {
    const {lectureTitle,courseId} = req.body
    
    if(!courseId || !lectureTitle){
      return res.status(404).json({success:false,message:"Missing details"})
    }

    const lecture  = new lectureModel({
      lectureTitle
    })
    await lecture.save();

    const course = await courseModel.findById(courseId)
    if(!course){
      return res.status(404).json({success:false,message:"Course Not Found"})
    }
    else{
      course.lectures.push(lecture._id)
      await course.save();
    }
    return res.status(201).json({success:true,lecture,message:"lecture created"})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to create lecture" });
  }
}


const getCourseLectures = async (req,res) =>{
  try {
    const {courseId} = req.body
    const course = await courseModel.findById(courseId).populate('lectures')
    if(!course){
      return res.status(404).json({success:false,message:"Course Not Found"})
    }
    return res.status(200).json({success:true,lectures:course.lectures})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to fetch lecture" });
  }
}


export { createCourse  ,getCreatorCourses ,editCourse ,getCourseDetailsById ,createLecture ,getCourseLectures};
