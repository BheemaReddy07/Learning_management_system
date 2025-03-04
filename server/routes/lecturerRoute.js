import express from 'express'
import authUser from '../middlewares/authUser.js';
import upload from '../utils/multer.js';
import { addLecturer } from '../controllers/lecturerController.js';

const lecturerRoute = express.Router();

lecturerRoute.post("/add-lecturer",authUser,upload.single("lecturerImg"),addLecturer)



export default lecturerRoute