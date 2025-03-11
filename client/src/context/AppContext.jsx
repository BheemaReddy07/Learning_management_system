import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const [showLogin, setShowLogin] = useState(false);
  const [userData, setUserData] = useState(false);
  const [lecturers,setLecturers] = useState([])
  const [adminCourses, setAdminCourses] = useState([]);


  const loadUserProfileData = async () => {
    try {
       const {data} = await axios.get(backendurl + '/api/user/get-profile',{headers:{token}})
       if(data.success){
            setUserData(data.userData)
             
        }
        else{
            toast.error(data.message)
        }
        
    } catch (error) {
        console.log(error)
        toast.error(error.message) 
    }
  };



  const getLecturers = async () =>{
    try {
      const {data} = await axios.get(backendurl+"/api/lecturer/get-lecturer",{headers:{token}})
      if(data.success){
        setLecturers(data.lecturerData);
       
      }
      else{
        toast.error(data.message)
    }
    } catch (error) {
      console.log(error)
      toast.error(error.message) 
    }
  }


   const getadminCourses = async () => {
      try {
        const { data } = await axios.get(
          backendurl + "/api/course/getadmincourses",
          { headers: { token } }
        );
        if (data.success) {
          setAdminCourses(data.courses);
           
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      }
    };


  const value = {
    userData,
    setUserData,
    token,
    setToken,
    backendurl,
    showLogin,
    setShowLogin,
    loadUserProfileData,
    lecturers,setLecturers,getLecturers,
    adminCourses,setAdminCourses,getadminCourses
  };

  useEffect(()=>{
    if(token){
      loadUserProfileData()
    }
    else{
      setUserData(false)
    }
     },[token])
  
  useEffect(()=>{
    getLecturers()
  },[])



  useEffect(() => {
    getadminCourses();
  }, []);
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
