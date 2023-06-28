import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
function Hosting({host}) {
    let navigate=useNavigate()
   
    const [user, setUser] = useState("")
    const [Allhosting, setAllhosting] = useState([])
    const [pending, setPending] = useState([])
    const getroomdata=async()=>{
        try {
            const fetch=await axios.post(`${host}/api/hosting/fetchallHosting`,{},{
                headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
            })
            const data=fetch.data.allhost;
            console.log(data)
           let arr= data.map((e,i)=>{
                for(var ind in e?.status){
                    if(e?.status[ind]===false){
                        return e;
                    }
                }
                return null
            })
            let arr1=await Promise.all(arr)
                arr1=arr1.filter(e=>e!=null)
            
            setPending(arr1)
        } catch (error) {
            console.log(error)
        }
      
      }
    const getdata=async()=>{
        try {
            const fetch=await axios.post(`${host}/api/auth/getuser`,{},{
                headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
            })
            const data=fetch.data.user;
                setUser(data.name)
        } catch (error) {
            console.log(error)
        }
      
      }
      useEffect(() => {
       getdata();
    getroomdata()
      }, [])
   
    const handlehosting=async()=>{
        try {

            const createhosting =await axios.post(`${host}/api/hosting/addHosting`,{title:"",description:"",price:{},discount:[],rooms:[{
                nobpd: 0,
                nod: 0
            }],lat:null,lon:null,ammeneties:[],photos:[],contact:[{contact:""}],security:{camera:false,animals:false,watchman:false,fireextinguiser:false},bathrooms:0,toilets:0,address:{country:"",administrative_area_level_1:"",locality:"",administrative_area_level_2:"",administrative_area_level_3:"",postal_code:"",addressl1:"",addressl2:"",neighborhood:""},status:{'1':false,'2':false,'3':false,'4':false,'5':false,'6':false,'7':false}},{
                headers:{
                    "auth-token":Cookies.get('dorm--7z2__PMRW')
                }
            })
            const data=createhosting.data;
            console.log(data);
            navigate(`/hosting/${data.host}/about-your-dorm`)

        } catch (error) {
            console.log(error);
        }
           

    }
  return (
    <div className='mt-[15vh] '>
            <div className='w-[70vw] m-auto'>
                <div className='text-[2rem] text-[#3F3D56] font-semibold'>Welcome {user}!</div>
                <div className='my-5'>
                    <div onClick={getroomdata}></div>

                    <div className=' grid gap-5 md:grid-cols-3 '>
                        {(pending.length>0)?pending.map((e)=>{
                                return (
                                    <div onClick={()=>navigate(`/hosting/${e.id}/about-your-dorm`)}>
                                        <div className='cursor-pointer rounded p-5 shadow'>
                         <div className='text-[#3F3D56]'>Pending Listing</div>
                         <div className='text-red-600'>Complete details to host</div>
                            <div className='my-3'>
                                {e.title?e.title:"No title"}
                            </div>
                            <div>
                          
                                           
                                                <div>

                         
                                                </div>
                            </div>
                        </div>
                                    </div>
                                )
                            }):
                            <div>
                                No pending listing
                            </div>
                        }
                    </div>
                    <div className='my-2'>

                    <button className='rounded-md text-white cursor pointer py-1 px-2 bg-[#3F3D56]' onClick={handlehosting}>Start new Listing</button>
                    </div>
                   
                </div>
                <div className='text-[1.5rem] text-[#3F3D56] font-semibold mb-3'>Your Reservation</div>
                <div className='flex gap-3 items-center'>
                    <div>
                    <button className='rounded-full py-1 px-2 border  border-[#3F3D56] focus:bg-[#3F3D56] focus:text-white'>
                            Checking out
                        </button>
                    </div>
                    <div>
                    <button className='rounded-full py-1 px-2 border border-[#3F3D56] focus:bg-[#3F3D56] focus:text-white'>
                            Checking in
                        </button>
                    </div>
                    <div>
                    <button className='rounded-full py-1 px-2 border border-[#3F3D56] focus:bg-[#3F3D56] focus:text-white'>
                            Upcoming
                        </button>
                    </div>
                        
                       
                </div>
                <div className='p-5 mt-6 bg-[#3F3D560F] h-[50vh]'>
                <div className='grid grid-cols-5 '>

                    <div>
                        Serial Number
                    </div>
                    <div>
                       Name of the guest
                    </div>
                    <div>
                        Room Number
                    </div>
                    <div>
                        Checked-in on
                    </div>
                    <div>
                       Stayed for
                    </div>
                    
                </div>
                <hr className='h-[2px] my-3 border-[#3F3D56]'/>
                </div>


            </div>
</div>
  )
}

export default Hosting