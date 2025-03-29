 
import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = () => {
  return (
    <div className='flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4'>
        <Link className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <img 
         src='/Os.jpeg' 
          alt="course-thumbnial"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className='flex flex-col gap-2'>
            <h1 className="font-bold text-lg md:text-xl">CourseTitle</h1>
            <p className="text-sm text-gray-600">Subtitle</p>
            <p className="text-sm text-gray-700">Lecturer:<span className="font-bold">Name</span></p>
            <Badge>Semester</Badge>
        </div>
        </Link>
    </div>
  )
}

export default SearchResult