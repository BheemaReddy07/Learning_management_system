import express from 'express'
import upload from '../utils/multer.js'
import { uploadMedia } from '../utils/cloudinary.js'
import authUser from '../middlewares/authUser.js'

const mediaRouter = express.Router();



mediaRouter.post("/upload-video",authUser,upload.single("file"),async (req,res)=>{
    try {
        const result = await uploadMedia(req.file.path);
        return res.status(200).json({success:true,message:"File Uploaded Successfully",result})

    } catch (error) {
        console.log(error)
        return res.status(500).json({succss:false,message:error.message})
    }
})


export default mediaRouter