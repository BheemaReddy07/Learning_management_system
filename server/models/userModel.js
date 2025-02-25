import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:String,default:'+910000000000'},
    branch:{type:String,default:"Branch"},
    role:{type:String, enum:["instructor", "student"], default:'student' },
    enrolledCourses:[ { type:mongoose.Schema.Types.ObjectId, ref:'Course' } ],
    photoUrl:{type:String,default:"" },
    otp: { type: String },
    otpExpiration: { type: Date },
    verified:{type:Boolean,default:false},


},
{timestamps:true});

const userModel = mongoose.models.user || mongoose.model('user',userSchema)

export default userModel