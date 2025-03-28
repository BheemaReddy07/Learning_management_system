import courseModel from "../models/courseModel.js";
import EnrollCourseModel from "../models/enrollCourseModel.js";
import userModel from "../models/userModel.js";
 

const enrollCourse = async (req, res) => {
  try {
    const { courseId, userId } = req.body;
    const course = await courseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }


    const isAlreadyEnrolled = await EnrollCourseModel.findOne({ courseId, userId });
    if (isAlreadyEnrolled) {
      return res.status(400).json({ success: false, message: "Already enrolled in this course" });
    }

    
    const newEnrollment = new EnrollCourseModel({
      courseId,
      userId,
      enrolledAt: Date.now(),
      status: "completed",
    });
    await newEnrollment.save();



    await courseModel.findByIdAndUpdate(
      courseId,
      { $addToSet: { enrolledStudents: userId } },
      { new: true }
    );

    await userModel.findByIdAndUpdate(userId,
    { $addToSet: { enrolledCourses: courseId } },
    { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Course enrolled successfully",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to enroll in the course" });
  }
};

const getCourseDetailsWithEnrollStatus = async (req,res) =>{
  try {
    const {courseId,userId} = req.body;
    const course = await courseModel.findById(courseId).populate({path:"lectures"});
    const enrolled = await EnrollCourseModel.findOne({userId,courseId})
    console.log(enrolled)
    if (!course) {
      return res.status(404).json({ message: "course not found!" });
    }

    return res.status(200).json({
      success:true,
      course,
      enrolled: !!enrolled, // true if enrolled, false otherwise
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch the  enrolled courses" });
 
  }
}


const getAllEnrolledCourses = async (req,res) =>{
    try {
        const {userId} = req.body
        const enrolledCourses = await EnrollCourseModel.find({userId}).populate('courseId')
        if (!enrolledCourses) {
          return res.status(404).json({
            enrolledCourse: [],
          });
        }
        return res.status(200).json({success:true,enrolledCourses})
        
    } catch (error) {
        console.error(error);
        return res
          .status(500)
          .json({ success: false, message: "Failed to get enroll in the course" });
      
    }
}

export { enrollCourse,getCourseDetailsWithEnrollStatus,getAllEnrolledCourses}