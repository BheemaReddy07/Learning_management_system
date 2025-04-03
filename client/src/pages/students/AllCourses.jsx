import { AppContext } from '@/context/AppContext';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AllCourses = () => {
    const [filterCourses, setFilterCourses] = useState([]);
    const [selectedSemester, setSelectedSemester] = useState(""); 
    const [selectedBranch, setSelectedBranch] = useState(""); 
    const [showFilter, setShowFilter] = useState(false);

    const { PublishedCourses, fetchPublishedCourses } = useContext(AppContext);
    const navigate = useNavigate();

    const ApplyFilter = () => {
        let filtered = PublishedCourses;

        if (selectedBranch) {
            filtered = filtered.filter(course => course.branch === selectedBranch);
        }

        if (selectedSemester) {
            filtered = filtered.filter(course => course.semester === selectedSemester);
        }

        setFilterCourses(filtered);
    };

    useEffect(() => {
        fetchPublishedCourses();
        const interval = setInterval(fetchPublishedCourses,10000);
    return () =>clearInterval(interval)
    }, []);

    useEffect(() => {
        ApplyFilter();
    }, [PublishedCourses, selectedSemester, selectedBranch]);

    
    return (
        <div className='sm:mt-24 mt-20'>
            <p className='text-gray-600 dark:text-white'>Browse courses by branch & semester</p>
            <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
              <div className='gap-3'>
 {/* Toggle Filter Button for Mobile */}
                <button
                    className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? "bg-black text-white" : ""}`}
                    onClick={() => setShowFilter(prev => !prev)}
                >
                    Filters
                </button>

                {/* Branch Filter */}
                <div className={`flex-col gap-4 text-sm text-gray-600 mb-5 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
                    {["CSE", "ECE", "EEE", "MECH", "CIVIL"].map((b) => (
                        <p
                            key={b}
                            onClick={() => setSelectedBranch(prev => prev === b ? "" : b)} // Toggle selection
            
                            className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer dark:text-white ${selectedBranch === b ? 'bg-indigo-100 text-black' : ""}`}
                        >
                            {b}
                        </p>
                    ))}
                </div>

                {/* Semester Filter */}
                <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="border p-2 rounded text-gray-600"
                >
                    <option value="">All Semesters</option>
                     
                    <option value="E1 SEM1">E1 Sem1</option>
                    <option value="E1 SEM2">E1 Sem2</option>
                    <option value="E2 SEM1">E2 Sem1</option>
                    <option value="E2 SEM2">E2 Sem2</option>
                    <option value="E3 SEM1">E3 Sem1</option>
                    <option value="E3 SEM2">E3 Sem2</option>
                    <option value="E4 SEM1">E4 Sem1</option>
                    <option value="E4 SEM2">E4 Sem2</option>
                    
                </select>   
              </div>
               

                {/* Display Filtered Courses */}
                {
                    filterCourses?.length > 0  ? (<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                        {filterCourses.map((item) => (
                            <Link key={item._id} to={`/course-detail/${item._id}`}>
                                 <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                      <div className="relative">
                                        <img
                                          src={item.courseThumbnail}
                                          className="w-full h-36 object-cover rounded-t-lg"
                                        />
                                         <CardContent className="px-5 py-4 space-y-3">
                                        <h1 className="hover:underline font-bold text-lg truncate">
                                        {item.courseTitle}
                                        </h1>
                                        <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                              <AvatarImage src={item.lecturerData.photoUrl} alt="@shadcn" />
                                              <AvatarFallback>{item.lecturerData.name? item.lecturerData.name?.[0].toUpperCase() : "N/A"}</AvatarFallback>
                                            </Avatar>
                                            <h1 className="font-medium text-sm">{item.lecturerData?.name}</h1>
                                          </div>
                                          <Badge className={'bg-blue-600 text-white px-2 py-1 text-xs rounded-full'}>
                                              {item.semester}
                                          </Badge>
                                        </div>
                                        <div >
                                            <span className="text-lg font-semibold">Branch:</span> <span className="text-md font-medium">{item.branch}</span>
                                        </div>
                                      </CardContent>
                                      </div>
                                    </Card>
                            </Link>
                        ))}
                    </div>) :(<CourseNotFound />)
                }
                
            </div>
        </div>
    );
};

export default AllCourses;


const CourseNotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-32 dark:bg-gray-900 p-6">
        <AlertCircle className="text-red-500 h-16 w-16 mb-4" />
        <h1 className="font-bold text-2xl md:text-4xl text-gray-800 dark:text-gray-200 mb-2">
          Course Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Sorry, we couldn't find the course you're looking for.
        </p>
        <Link to="/" className="italic">
          <Button variant="link">Browse All Courses</Button>
        </Link>
      </div>
    );
  };