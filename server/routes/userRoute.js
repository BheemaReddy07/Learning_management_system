import express from 'express'
import { requestForgetPasswordOTP,requestOTP,verifyOTPandRegister,loginUser,resetPassword, getUserProfile, updateUserProfile} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../utils/multer.js'
const userRouter = express.Router()

userRouter.post('/register/request-otp',requestOTP)
userRouter.post('/register/verifyotp-register',verifyOTPandRegister)
userRouter.post('/login',loginUser)
userRouter.post('/forgot/request-otp',requestForgetPasswordOTP)
userRouter.post('/forgot/reset',resetPassword)
userRouter.get('/get-profile',authUser,getUserProfile); 
userRouter.post('/update-profile',upload.single('image'),authUser,updateUserProfile)


export default userRouter