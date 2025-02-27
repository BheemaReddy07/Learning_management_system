import mongoose from "mongoose"


const courseSchema = new mongoose.Schema({
    courseTitle:{type:String,required:true},
    subTitle:{type:String },
    description:{type:String },
    category:{type:String,required:true},
    courseLevel:{type:String,enum:["Beginner","Medium","Advanced"]},
    courseThumbnail:{type:String},
    enrolledStudents:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'userModel'
        }
    ],
    lectures:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'lectureModel'
        }
    ],
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel'
    },
    isPublished:{
        type:Boolean,default:false
    }

},{timestamps:true}
);


const courseModel = mongoose.models.course || mongoose.model('course',courseSchema);

export default courseModel