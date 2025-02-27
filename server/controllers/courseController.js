import courseModel from "../models/courseModel.js";

const createCourse = async (req,res) =>{
    try {
       const {courseTitle,category}  = req.body 
       if(!courseTitle || !category){
        return res.json({success:false,message:"all fields required"})
       }

    const course = await courseModel.create({
        courseTitle,
        category,
        creator:req.id
    })


    return res.json({success:true,message:"course Created",course})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Failed to create Courese"})
    }
}

export {
    createCourse
}