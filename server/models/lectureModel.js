import mongoose from "mongoose";

const lectureSchema = mongoose.Schema({
    lectureTitle:{type:String,required:true},
    videoUrl:{type:String},
    publicId:{type:String},
    
},{timestamps:true})


const lectureModel = mongoose.models.lecture || mongoose.model("lecture",lectureSchema)

export default lectureModel