import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { AppContext } from '@/context/AppContext'

const CreateLecture = () => {
    const [lectureTitle ,setLectureTitle] = useState("")
    const {backendurl,token} = useContext(AppContext)
    const navigate = useNavigate()
    const isLoading = false;
    const params = useParams()
    const courseId = params.courseId

const onSubmitHandler = async () =>{
    try {
         const {data} = await axios.post(backendurl+'/api/course/create-lecture',{lectureTitle,courseId},{headers:{token}})
         if(data.success){
            toast.success(data.message)
            setLectureTitle("")
            console.log(data.lecture)

         }
         else{
            toast.error(data.message)
         }
        
    } catch (error) {
        toast.error(error)
        console.log(error.message)
    }
}



  return (
    <div className="flex-1  mt-24 mx-[-150px]">
    <div className="mb-4">
      <h1 className="font-bold text-xl">
        Lets add some basic course details for your new course
      </h1>
      <p className="text-sm">lorem10fgbdnf bjdfg kfjg bdfgnb djg</p>
    </div>
    <div className="space-y-4">
      <div>
        <Label>Title</Label>
        <Input
          type="text"
          name="courseTitle"
          placeholder="Lecture Name"
          value={lectureTitle}
          onChange={(e)=>setLectureTitle(e.target.value)}
        />
      </div>
    
      <div className="flex items-center gap-2">
          <Button variant="outline" onClick={()=>navigate(`/admin/course/${courseId}`)}>Back to course</Button>
          <Button disabled={isLoading} onClick={onSubmitHandler} >
              {
                  isLoading ?
                  (
                      <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please Wait
                      </>
                  ):
                  "Create Lecture"
              }
          </Button>
      </div>
    </div>
  </div>
  )
}

export default CreateLecture