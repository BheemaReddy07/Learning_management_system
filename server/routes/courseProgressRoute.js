import express from 'express'
import authUser from '../middlewares/authUser.js';
import { getCourseProgress, markasCompleted, markasInCompleted, updateLectureProgress } from '../controllers/courseProgressController.js';

const courseProgressRouter = express.Router();

courseProgressRouter.post("/get-progress",authUser,getCourseProgress)
courseProgressRouter.post("/update-lectureProgress",authUser,updateLectureProgress)
courseProgressRouter.post("/mark-complete",authUser,markasCompleted)
courseProgressRouter.post("/mark-incomplete",authUser,markasInCompleted)


export default courseProgressRouter