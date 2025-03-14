import { Button } from '@/components/ui/button'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CourseTab from './CourseTab'

const EditCourse = () => {
  const navigate = useNavigate()
  const params = useParams()
  const courseId = params.courseId
  return (
    <div className='mt-20 flex-1 mx-[-150px]'>
        <div className='flex items-center justify-between mb-5'>
            <h1 className='font-bold text-xl'>Add detail information regarding course</h1>
            <Link to={`${`lecture`}`}>
            <Button className="hover:text-blue-600"  variant="link">Go to lecture page</Button>
            </Link>
        </div>
        <CourseTab />
    </div>
  )
}

export default EditCourse