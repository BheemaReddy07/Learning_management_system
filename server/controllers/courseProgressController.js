import courseModel from "../models/courseModel.js";
import courseProgressModel from "../models/courseProgressModel.js";


const getCourseProgress = async (req ,res) =>{
    try {
        const {courseId , userId} = req.body;
        let courseProgress = await courseProgressModel.findOne({courseId,userId}).populate("courseId");

        const courseDetails = await courseModel.findById(courseId).populate("lectures")
        if(!courseDetails){
            return res.status(404).json({success:false,message:"Course details not found"})
        }
        return res.status(200).json({
            success:true,
                courseDetails,
                progress: courseProgress ? courseProgress.lectureProgress : [],
                completed: courseProgress ? courseProgress.completed : false 
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:error})
    }
}


const updateLectureProgress = async (req,res) =>{
    try {
        const {courseId,userId,lectureId} = req.body
        
        let courseProgress = await courseProgressModel.findOne({courseId,userId});

        if(!courseProgress){
            courseProgress = new courseProgressModel({
                userId,
                courseId,
                completed:false,
                lectureProgress :[],
            })
        }

       const lectureIndex = courseProgress.lectureProgress.findIndex(
        (lecture)=>lecture.lectureId === lectureId
       )

       if(lectureIndex !== -1){
        courseProgress.lectureProgress[lectureIndex].viewed = true;
       }
       else{
        courseProgress.lectureProgress.push({
            lectureId,
            viewed:true,
        })
       }

       const lectureProgressLength = courseProgress.lectureProgress.filter(
        (lectureProg)=>lectureProg.viewed
       ).length;

       const course = await courseModel.findById(courseId)

       if(course.lectures.length === lectureProgressLength){
        courseProgress.completed = true;
       }
       await courseProgress.save();

       return res.status(200).json({
        success:true,message:"lecture Progress updated successfully"
       })
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"unable to update course progress"})
    }
}

const markasCompleted = async (req,res) =>{
    try {
        const {courseId,userId}= req.body;

        const courseProgress = await courseProgressModel.findOne({courseId,userId})

        if(!courseProgress){
            return res.status(404).json({success:false,message:"course progress not found"})
        }
        
        courseProgress.lectureProgress.map(
            (lectureProgress)=>(lectureProgress.viewed = true)
        )
        courseProgress.completed = true;

        await courseProgress.save();

        return res.status(200).json({ success: true, message: "Course marked as completed" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"unable to mark as completed"})
    }
}

const markasInCompleted = async (req,res) =>{
    try {
        const {courseId ,userId} = req.body;

        const courseProgress = await courseProgressModel.findOne({courseId,userId})

        if(!courseProgress){
            return res.status(404).json({success:false,message:"course progress not found"})
        }
        courseProgress.lectureProgress.map(
            (lectureProgress)=>(lectureProgress.viewed = false)
        )
        courseProgress.completed  = false;

        await courseProgress.save();

        return res.status(200).json({success:true,message:"Course marked as Incompleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"course unable to mark as Incomplete"})
    }
}

export {getCourseProgress ,updateLectureProgress,markasCompleted,markasInCompleted}