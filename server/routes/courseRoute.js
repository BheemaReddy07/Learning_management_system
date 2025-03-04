import express from 'express'
import authUser from '../middlewares/authUser.js'
import upload from "../utils/multer.js"
import { createCourse, editCourse, getCreatorCourses } from '../controllers/courseController.js'
const courseRouter = express.Router()

courseRouter.post('/create',authUser,createCourse)
courseRouter.get('/getadmincourses', authUser, getCreatorCourses);
courseRouter.put("/edit-course",upload.single("courseThumbnail"),authUser,editCourse)

export default courseRouter