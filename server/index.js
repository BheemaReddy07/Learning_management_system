import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import courseRouter from './routes/courseRoute.js'
import lecturerRoute from './routes/lecturerRoute.js'
import mediaRouter from './routes/mediaRoute.js'
import enrollCourseRoute from './routes/enrollCourseRoute.js'
//app config
const app = express()
const port  = process.env.PORT || 4000

connectDB()


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors())




//api end points
app.use('/api/media',mediaRouter)
app.use('/api/user',userRouter)
app.use('/api/course',courseRouter)
app.use('/api/lecturer',lecturerRoute)
app.use('/api/enrollment',enrollCourseRoute)
app.get('/',(req,res)=>{
    res.send('API IS WORKING.....')
})



app.listen(port ,()=>console.log('server started',port))