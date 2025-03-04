import express from 'express'
import authUser from '../middlewares/authUser.js'
import { createCourse, getCreatorCourses } from '../controllers/courseController.js'
const courseRouter = express.Router()

courseRouter.post('/create',authUser,createCourse)
courseRouter.get('/getadmincourses', authUser, getCreatorCourses);


export default courseRouter