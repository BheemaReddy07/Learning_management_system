import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import React from 'react'

const categories = [
    { id: "nextjs", label: "Next JS" },
    { id: "data science", label: "Data Science" },
    { id: "frontend development", label: "Frontend Development" },
    { id: "fullstack development", label: "Fullstack Development" },
    { id: "mern stack development", label: "MERN Stack Development" },
    { id: "backend development", label: "Backend Development" },
    { id: "javascript", label: "Javascript" },
    { id: "python", label: "Python" },
    { id: "docker", label: "Docker" },
    { id: "mongodb", label: "MongoDB" },
    { id: "html", label: "HTML" },
  ];
  
const Filter = () => {
  return (
    <div className='w-full md:w-[20%]'>
         
        <Separator className="my-4" />
        <div>
            <h1 className='font-semibold mb-4'>CATEGORY</h1>
           {
            categories.map((category)=>(
                <div className='flex items-center my-2 space-x-2'>
                    <Checkbox id={category.id} />
                    <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {category.label}
                    </Label>
                </div>
            ))
           }
        </div>
    </div>
  )
}

export default Filter