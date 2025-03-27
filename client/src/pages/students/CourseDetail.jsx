import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
 
import { BadgeInfo, PlayCircle } from 'lucide-react'
import React from 'react'

const CourseDetail = () => {
    const enrolledCourse = false
  return (
    <div className='mt-20 space-y-5'>
        <div className='bg-[#2D2F31] text-white'>
            <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
                <h1 className='font-bold text-2xl md:text-3xl '>Course Title</h1>
                <p className='text-base md:text-lg'>Course sub-title</p>
                <p>Lecturer {" "} <span className='text-[#C0C4FC] underline italic'>lecturer name</span></p>
                <div className='flex items-center gap-2 text-sm'>
                 <BadgeInfo size={16} />
                 <p>Last Updated 27/03/2025</p>
                </div>
                <p>Students enrolled :10</p>
            </div>

        </div>
        <div className='max-w-7xl mx-auto my-5    px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10 '>
            <div className='w-full lg:w-1/2 space-y-5'>
             <Card>
                <CardHeader>
                    <CardTitle>Course Content</CardTitle>
                    <CardDescription> 4 Lectures</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                {
                    [1,2,3].map((lecture,index)=>(
                        <div key={index} className='flex items-center gap-3 text-sm'>
                            <span>
                                <PlayCircle size={14}   />
                            </span>
                           <p>Lecture title</p>
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
                            video

                        </div>
                        <h1> Lecture title</h1>
                         <Separator className='my-2' />
                    </CardContent>
                    <CardFooter className="flex justify-center gap-4">
                        <Button className="w-full">
                            {
                                enrolledCourse ? 'Continue Learning' : 'Enroll Now'
                            }
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default CourseDetail