import express from 'express'
import { enrollCourse, getEnrolledCourses } from '../controllers/enrollCourseController.js'
import authUser from '../middlewares/authUser.js'
const enrollCourserouter = express.Router()


enrollCourserouter.post('/enroll-course',authUser, enrollCourse)
enrollCourserouter.post('/enrolled-courses',authUser, getEnrolledCourses)

export default enrollCourserouter