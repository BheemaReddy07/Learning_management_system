import express from 'express'
import { enrollCourse, getAllEnrolledCourses, getCourseDetailsWithEnrollStatus } from '../controllers/enrollCourseController.js'
import authUser from '../middlewares/authUser.js'
const enrollCourserouter = express.Router()


enrollCourserouter.post('/enroll-course',authUser, enrollCourse)
enrollCourserouter.post('/enroll-details-withstatus',authUser,getCourseDetailsWithEnrollStatus)
enrollCourserouter.post('/enrolled-courses',authUser, getAllEnrolledCourses)

export default enrollCourserouter