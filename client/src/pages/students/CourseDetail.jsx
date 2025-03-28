import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { toast } from 'react-toastify'
import { BadgeInfo, Loader2, PlayCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '@/context/AppContext'
import ReactPlayer from 'react-player'
const CourseDetail = () => {
    const navigate = useNavigate();
    const [courseDetails,setCourseDetails] = useState();
    const [enrollStatus,setEnrollStatus] = useState(false);
    const {token,backendurl} = useContext(AppContext)
    const [isLoading,setIsLoading] = useState(false)
    const params = useParams()
    const courseId = params.courseId
    const enrolledCourse = false
    const enrollCourseHandler = async () =>{
        try {
            setIsLoading(true);
            const {data} = await axios.post(backendurl+'/api/enrollment/enroll-course',{courseId},{headers:{token}})
            if(data.success){
                toast.success(data.message)
            }else{
                toast.error(data.message)
                console.log(data.message)
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }finally{
            setIsLoading(false)
        }
    }
    const getCourseDetailsWithEnrolledStatus = async  () =>{
        try {
            const {data} = await axios.post(backendurl+'/api/enrollment/enroll-details-withstatus',{courseId},{headers:{token}})
            
            if(data.success){
                setCourseDetails(data.course);
                console.log(data.course)
                setEnrollStatus(data.enrolled)
            }
            else{
                console.log(data.message)
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error);
            toast.error(error)
        }
    }

    const handleContinueCourse = async () =>{
            if(enrollStatus){
                navigate(`/course-progress/${courseId}`);
            }
    }
    useEffect(() => {
        if (token) {
            getCourseDetailsWithEnrolledStatus();
        }
    }, [token, courseId]);
  return (
    <div className='mt-20 space-y-5'>
        <div className='bg-[#2D2F31] text-white'>
            <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl '>{courseDetails?.courseTitle}</h1>
                <p className='text-base md:text-lg'>{courseDetails?.subTitle}</p>
                <p>Lecturer {" "} <span className='text-[#C0C4FC] underline italic'>{courseDetails?.lecturerData?.name}</span></p>
                <div className='flex items-center gap-2 text-sm'>
                 <BadgeInfo size={16} />
                 <p>Last Updated {courseDetails?.updatedAt.split("T")[0]}</p>
                </div>
                <p>Semester:{courseDetails?.semester}</p>
                <p>Branch:{courseDetails?.branch}</p>
                <p>Students enrolled :{courseDetails?.enrolledStudents.length}</p>
            </div>

        </div>
        <div className='max-w-7xl mx-auto my-5    px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10 '>
            <div className='w-full lg:w-1/2 space-y-5'>
             <Card>
                <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription> {courseDetails?.lectures?.length} Lectures</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                {
                    courseDetails?.lectures?.map((lecture,index)=>(
                        <div key={index} className='flex items-center gap-3 text-sm'>
                            <span>
                                <PlayCircle size={14}   />
                            </span>
                           <p>{lecture.lectureTitle}</p>
                        </div>
                    ))
                }

                </CardContent>
             </Card>
            </div>
            <div className='w-full lg:w-1/3'>
                <Card>
                    <CardContent className="p-4 flex flex-col ">
                        <div className='w-full aspect-video mb-4'>
                             <ReactPlayer width="100%"  height={"100%"} url={courseDetails?.lectures[0].videoUrl} controls={true}/>

                        </div>
                        <h1>{courseDetails?.lectures[0]?.lectureTitle}</h1>
                         <Separator className='my-2' />
                    </CardContent>
                    <CardFooter className="flex justify-center gap-4">
                        {
                            enrollStatus ? (<Button onClick={handleContinueCourse} className="w-full">Continue Course</Button>):( <Button className="w-full" disabled={isLoading} onClick={enrollCourseHandler}>
                                {
                                    isLoading ?
                                    (
                                     <>
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin " /> Please wait
                                     </>
                                    ):(
                                       'Enroll Now'
                                 )
                                }
                             </Button>)
                        }
                       
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default CourseDetail

