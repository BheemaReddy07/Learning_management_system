import mongoose from 'mongoose';
const EnrollCourseSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },  
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    enrolledAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        enum:['pending','completed',"failed"],
        default:'pending'
    },
    completedAt:{
        type:Date
    },

},{timestamps:true});

const EnrollCourse = mongoose.models.EnrollCourse || mongoose.model('EnrollCourse',EnrollCourseSchema);
export default EnrollCourse;