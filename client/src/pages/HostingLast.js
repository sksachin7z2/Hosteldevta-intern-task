import React,{useEffect,useState} from 'react'
import mainbg from '../static/aboutyourdorm.jpeg'
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import fig from '../static/congrats.png'
import Cookies from 'js-cookie'

function AboutYourDorm({host}) {
    const [user, setUser] = useState("")
        let navigate=useNavigate()
        let location=useLocation()
        const handlenext=async()=>{
            let params=location.pathname.split('/')[2];
            navigate(`/hosting`)
        }
        const getdata=async()=>{
            try {
                const fetch =await axios.post(`${host}/api/auth/getuser`,{},{
                    headers:{
                        "auth-token":Cookies.get('dorm--7z2__PMRW')
                    }
                })
                const data=fetch.data.user;
                setUser(data.name)
                
            } catch (error) {
                console.log(error)
            }
           
            
        }
        useEffect(() => {
            if(!Cookies.get('dorm--7z2__PMRW'))
            navigate('/login')
         getdata()
        }, [])
        
    return (
        <div>
           <div className="grid  md:grid-cols-[40%_60%] ">
        <div className="h-[100vh] md:block hidden" style={{backgroundImage:`url(${fig})` ,backgroundSize:"cover"}}>
        <div className="h-full backdrop-blur-[7.5px]">

        </div>
        </div>
            <div className='flex justify-center items-center p-7 mt-[15vh] md:mt-0'>
                <div className='m-auto'>
                <div className='text-[2rem] font-bold text-[#3F3D56] my-3 w-[70%] m-auto'>
                Congratulations {user}!

                </div>
                <div className='text-[#3F3D56] text-[1.2rem] w-[70%] m-auto'>
                Welcome aboard. Thank you for sharing your dormitory and helping to create a wonderful experience for our guests.

                </div>
                <div className='absolute right-[3rem] bottom-[3rem]'>
            <button onClick={()=>{navigate('/hostdashboard')}} type="button" className="text-white bg-[#3F3D56]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Let's get started</button>
            </div>
                </div>
            
            </div>
          
        </div>
        </div>
    )
}

export default AboutYourDorm