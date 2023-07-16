import React,{useState,useEffect} from 'react'
// import DragDropFile from '../components/Dragndrop';
import {useNavigate,useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import Saveexit from '../components/Saveexit'
import axios from 'axios'
function Setprice({host}) {
    const [status, setStatus] = useState({'1':false,'2':false,'3':false,'4':false,'5':false,'6':false,'7':false})
  let navigate=useNavigate();
  let location=useLocation();
  const [rooms, setRooms] = useState([])
  let params=location.pathname.split('/')[2];

    const handlenext=async()=>{
        try {
            let obj=status;
        obj['6']=true;
        console.log(Object.keys(price).length,price)
       if(Object.keys(price).length>0){
            const update=await axios.put(`${host}/api/hosting/updateHosting/${params}`,{price:price,status:obj},{
                headers:{
                    "auth-token":Cookies.get('dorm--7z2__PMRW')
                }
            })
            const data=update.data;
            console.log(data)
            // console.log(updateammeneties.data())
            navigate(`/hosting/${params}/securitycontact`)
        }
        else{
            alert("set the price")
        }
        } catch (error) {
            console.log(error)
        }
    
    }
  const getroomdata=async()=>{
    try {
        const fetch=await axios.post(`${host}/api/hosting/fetchHosting/${params}`,{},{
            headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
        })
        const data=fetch.data;
        console.log(data)
       let arr=data.host.rooms.map((e)=>{
        return e.nobpd
       })
       let s=new Set(arr)
       console.log(Array.from(s),data.host.price)
        setRooms(Array.from(s))
       setStatus(data?.host?.status)
        setPrice(data?.host?.price)
    } catch (error) {
        console.log(error)
    }
  
  }
  useEffect(() => {
    if(!Cookies.get('dorm--7z2__PMRW'))
    navigate('/login')
   getroomdata();

  }, [])
  const [price, setPrice] = useState({})
  const [helper, setHelper] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const handleChange=(ev,e,i)=>{
    var result = price 
    console.log(i,price,rooms)
    result[`${e}`]=ev.target.value;

    setPrice(result)
setHelper(!helper)
    console.log(result)
  }
  
    return (
        <div>

            <div>
                <div className='h-[85vh]' >
                    <div className='h-[85vh] bg-[#FFFFFF30] ' >
                        <div className='h-[75vh] flex justify-center mt-[15vh] overflow-y-scroll'>
                            <div className='w-[70vw]'>
            
                                {/* <DragDropFile/> */}
                                <div className='text-[#3F3D56] text-[2rem] text-center font-semibold'>
                                Now, set a price
                                </div>
                                <div  className='text-[#3F3D56] text-center text-[1.2rem] mb-6 '>
                                You can change it anytime.
                                </div>
                                <div className='grid md:grid-cols-3 gap-4 '>
                                {
                                    rooms.map((e,i)=>{
                                        return(
                                            <div className='my-5 rounded shadow-md p-3'>
                                                <div className='text-center font-semibold text-[#3F3D56] text-[1.5rem]' >Set Pricing For :</div>
                                                <div className='text-center text-[#3F3D56]'>Number of bed per dorm</div>
                                                <div className='text-center text-[#3F3D56] text-[1.5rem] font-bold'>{e}</div>
                                                <div className=' my-2 text-center'>
                                                    <div className='flex items-center justify-center gap-2'>
                                                        <div>
                                                        <svg width='1.2rem' height='1.2rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 5H12C14.2091 5 16 6.79086 16 9V9C16 11.2091 14.2091 13 12 13H9L15 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 5L18 5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 9L18 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                        </div>
                                                        <div>
                                                        <input className='w-full p-2 text-center border rounded' type="number" value={price[e]} onChange={(ev)=>handleChange(ev,e,i)} />
                                                        </div>
                                                    </div>
                                                        <div className='text-[#3F3D56]'>
                                                            per night
                                                        </div>
                                                   
                                                </div>
                                                
                                            </div>
                                        )
                                    })
                                }
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

                                        <button onClick={()=>{navigate(`/hosting/${params}/step3`)}} type="button" className="text-[#3F3D56] bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Back</button>
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

export default Setprice