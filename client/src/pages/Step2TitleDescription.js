import React,{useState,useEffect} from 'react'
// import DragDropFile from '../components/Dragndrop';
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import Saveexit from '../components/Saveexit'
import Cookies from 'js-cookie'
function TitleandDescription({host}) {
    const [status, setStatus] = useState({'1':false,'2':false,'3':false,'4':false,'5':false,'6':false,'7':false})
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  
  const getroomdata=async()=>{
    try {
        const fetch=await axios.post(`${host}/api/hosting/fetchHosting/${params}`,{},{
            headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
        })
        const data=fetch.data;
        console.log(data)
      setTitle(data?.host?.title)
      setStatus(data?.host?.status)
      setDescription(data?.host?.description)
    
    } catch (error) {
        console.log(error)
    }
  
  }
  useEffect(() => {
   getroomdata();

  }, [])
  let navigate=useNavigate()
  let location=useLocation()
  let params=location.pathname.split('/')[2];
  
  const handlenext=async()=>{
      try {
        let obj=status;
        obj['5']=true;
        console.log(obj)
        if(title!=="" && description!=="")
        {
    
          const update=await axios.put(`${host}/api/hosting/updateHosting/${params}`,{title:title,description:description,status:obj},{
              headers:{
                
                  "auth-token":Cookies.get('dorm--7z2__PMRW')
              }
          })
          console.log(update.data)
          navigate(`/hosting/${params}/step3`)
        }
        else{
            alert("title or description cannot be empty")
        }
      } catch (error) {
          console.log(error)
      }
    
  }
    return (
        <div>
            <div>
           
                <div className='h-[85vh]' >
                    <div className='h-[85vh] bg-[#FFFFFF30] ' >
                        <div className='h-[75vh] flex justify-center mt-[15vh] overflow-y-scroll'>
                            <div className='w-[70vw]'>
                                <div className='text-[2rem] text-[#3F3D56] font-semibold text-center'>Now, let’s give your dormitory a name and a description</div>
                                <div className='text-center text-[1.2rem] text-[#3F3D56] mb-6'>You can always change it later.</div>
                                <div>
                                    <div className='text-[1.2rem] font-semibold my-2'>
                                    Name of your dormitory
                                    </div>
                                    <div>
                                        <textarea value={title} onChange={(e)=>{setTitle(e.target.value)}} className='p-2 w-full h-[3rem] border border-[#3F3D56] rounded' name="title" id="title" />
                                    </div>
                                    <div className='text-[1.2rem] font-semibold my-2'>
                                    Description of the dormitory
                                    </div>
                                    <div>
                                    <textarea  value={description} onChange={(e)=>{setDescription(e.target.value)}} className=' p-2 w-full h-[7rem] border border-[#3F3D56] rounded'  name="description" id="description" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='h-[10vh]'>
                            <div className='h-[10vh] flex justify-between items-center'>
                                <div>
                                    <div className='flex'>
                                        <svg width="48" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.05 35.9999L16 23.9499L28.05 11.8999L30.2 14.0499L20.3 23.9499L30.2 33.8499L28.05 35.9999Z" fill="#3F3D56" />
                                        </svg>

                                        <button onClick={()=>{navigate(`/hosting/${params}/add-photo`)}} type="button" className="text-[#3F3D56] bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Back</button>
                                    </div>

                                </div>
                                <div>
                                    <div className='flex'>
                                        <button onClick={handlenext} type="button" className="text-white bg-[#3F3D56]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Next</button>
                                        <svg width="48" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.75 35.9999L16.6 33.8499L26.5 23.9499L16.6 14.0499L18.75 11.8999L30.8 23.9499L18.75 35.9999Z" fill="#3F3D56" />
                                        </svg>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TitleandDescription