import React, { useState } from 'react'
import Getyourlocation from '../components/Getyourlocation'
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Saveexit from '../components/Saveexit'
function Locateyourdorm({lat,lon,setLon,setLat,getlocation,host}) {
    const [status, setStatus] = useState({'1':false,'2':false,'3':false,'4':false,'5':false,'6':false,'7':false})
    let navigate=useNavigate()
    let location=useLocation()
    const [address, setAddress] = useState({})
    let params=location.pathname.split('/')[2];
    const handlenext=async()=>{
        let obj=status;
        obj['7']=true;
        console.log(obj)
        if(lat!==null && lon!==null){
        try {
            const updatelatlng=await axios.put(`${host}/api/hosting/updateHosting/${params}`,{lat:lat,lon:lon,address:address,status:obj},{
                headers:{
                    "auth-token":Cookies.get('dorm--7z2__PMRW')
                }
            })
            console.log(updatelatlng.data)
            navigate(`/hosting/${params}/about-rooms`)
        } catch (error) {
            console.log(error)
        }
        }
        else
        {
            alert('give a address')
        }
    }
  return (
    <div>
        
            <div className='h-[85vh]' >
                <div className='h-[85vh] bg-[#FFFFFF30] ' >
                    <div className='h-[75vh] flex justify-center mt-[15vh] overflow-y-scroll'>
                        <div className='w-[70vw] space-y-3'>
                       
                    <div>
                    <div className='text-[2rem] text-[#3F3D56] font-semibold text-center'>
                    Where's your dormitory located?
                    </div>
                    <div className='text-[1.2rem] text-[#3F3D56] text-center'>
                    Your address will only shared with the guests when they book a dorm room.
                    </div>
                    </div>
                   
                 <div >
<Getyourlocation lat={lat} setStatus={setStatus} address={address} setAddress={setAddress} host={host} lon ={lon} setLon={setLon} setLat={setLat} getlocation={getlocation}/>
                 </div>

               
                 </div>
                    </div>
                    <div className='h-[10vh]'>
                        <div className=' h-[10vh] flex justify-between items-center'>
                            <div>
                                <div className='flex'>
                                <svg width="48" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.05 35.9999L16 23.9499L28.05 11.8999L30.2 14.0499L20.3 23.9499L30.2 33.8499L28.05 35.9999Z" fill="#3F3D56"/>
</svg>

                            <button onClick={()=>{navigate(`/hosting/${params}/about-your-dorm`)}} type="button" className="text-[#3F3D56] bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Back</button>
                                </div>
                           
                            </div>
                            <div>
                                <div className='flex'>
                                <button onClick={handlenext} type="button" className="text-white bg-[#3F3D56]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Next</button>
                            <svg width="48" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.75 35.9999L16.6 33.8499L26.5 23.9499L16.6 14.0499L18.75 11.8999L30.8 23.9499L18.75 35.9999Z" fill="#3F3D56"/>
</svg>
                                </div>
                           


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Locateyourdorm