import express from 'express'
import { requestForgetPasswordOTP,requestOTP,verifyOTPandRegister,loginUser,resetPassword} from '../controllers/userController.js'





const userRouter = express.Router()

userRouter.post('/register/request-otp',requestOTP)
userRouter.post('/register/verifyotp-register',verifyOTPandRegister)
userRouter.post('/login',loginUser)
userRouter.post('/forgot/request-otp',requestForgetPasswordOTP)
userRouter.post('/forgot/reset',resetPassword)
 




export default userRouter