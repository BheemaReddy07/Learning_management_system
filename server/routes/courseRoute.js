import express from 'express'
import authUser from '../middlewares/authUser.js'
import { createCourse } from '../controllers/courseController.js'
const courseRouter = express.Router()

courseRouter.post('/',authUser,createCourse)

export default courseRouter