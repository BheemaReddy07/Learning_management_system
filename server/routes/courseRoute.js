import express from 'express'
import authUser from '../middlewares/authUser.js'
import upload from "../utils/multer.js"
import { createCourse, createLecture, editCourse, editLecture, getCourseDetailsById, getCourseLectures, getCreatorCourses, getLectureById, getPublishedCourses, removeLecture, togglePublishStatus } from '../controllers/courseController.js'
const courseRouter = express.Router()

courseRouter.post('/create',authUser,createCourse)
courseRouter.get('/getadmincourses', authUser, getCreatorCourses);

courseRouter.put("/edit-course",upload.single("courseThumbnail"),authUser,editCourse)
courseRouter.post('/courseDetailsByID',authUser,getCourseDetailsById)


courseRouter.post('/create-lecture',authUser,createLecture)
courseRouter.post('/get-lectures',authUser,getCourseLectures)


courseRouter.post('/edit-lecture',authUser,editLecture)
courseRouter.delete('/delete-lecture',authUser,removeLecture)
courseRouter.get('/get-lectureById/:lectureId',authUser,getLectureById)

courseRouter.post('/toggle-publish',authUser,togglePublishStatus)


courseRouter.get('/published-courses',getPublishedCourses)
export default courseRouter