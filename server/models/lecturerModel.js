import mongoose from "mongoose"


const lecturerSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    degree:{type:String,required:true},
    photoUrl:{type:String,required:true}
})

const lecturerModel = mongoose.models.lecturer || mongoose.model("lecturer",lecturerSchema)

export default lecturerModel