import React,{useState,useEffect,useRef} from 'react'
import { useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import { getAdditionalUserInfo } from 'firebase/auth'
function Hosting({host}) {
    let navigate=useNavigate()
   const [guestModal, setGuestModal] = useState(false)
   const guestref=useRef()
    const [user, setUser] = useState("")
    const [Allhosting, setAllhosting] = useState([])
    const [pending, setPending] = useState([])
    const [listing, setListing] = useState([])
    const [hostIds, setHostIds] = useState([])
    const [bookings, setBookings] = useState([])
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
                let arr3= data?.map((e,i)=>{
                    for(var ind in e?.status){
                        if(e?.status[ind]===false){
                            return null;
                        }
                    }
                    return e.id
                })
                let arr4=await Promise.all(arr3)
                arr4=arr4.filter(e=>e!=null)

                let a= data?.map((e,i)=>{
                    for(var ind in e?.status){
                        if(e?.status[ind]===false){
                            return null;
                        }
                    }
                    return e
                })
                let ab=await Promise.all(a)
                    ab=ab.filter(e=>e!=null)
                setListing(ab)
                setHostIds(arr4)
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
                setUser(data)
        } catch (error) {
            console.log(error)
        }
      
      }
      const getallbookings=async()=>{
        try {
            const fetch=await axios.post(`${host}/api/hosting/fetchallHosting`,{},{
                headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
            })
            const data=fetch.data.allhost;
            console.log(data)
          
                let arr3= data?.map((e,i)=>{
                    for(var ind in e?.status){
                        if(e?.status[ind]===false){
                            return null;
                        }
                    }
                    return {id:e.id,title:e.title}
                })
                let arr4=await Promise.all(arr3)
                arr4=arr4.filter(e=>e!=null)
                
              let book= arr4.map(async(e)=>{
                
                try {
                    const fetch=await axios.post(`${host}/api/booking/fetchallBookingHost/${e.id}`,{},{
                        headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
                    })
                    const data=fetch.data;
                  
                    let arr2=data.allhost.map((fe)=>{
                            return {...fe,['dormtitle']:e.title}
                    })
                    let ans=await Promise.all(arr2)
                  return ans;
                    
                } catch (error) {
                    console.log(error)
                }
               })
               let getbook=await Promise.all(book)
               let arr=[];
for (let row of getbook) for (let e of row) arr.push(e);
               console.log(arr)
               setBookings(arr)
           
        } catch (error) {
            console.log(error)
        }
       
      
      }
      useEffect(() => {
       getdata();
    getroomdata()
    getallbookings()
      }, [])
   
    const handlehosting=async()=>{
        try {

            const createhosting =await axios.post(`${host}/api/hosting/addHosting`,{title:"",description:"",price:{},discount:[],rooms:[{
                nobpd: 0,
                nod: 0
            }],lat:null,lon:null,ammeneties:[],photos:[],contact:[{contact:""}],security:{camera:false,animals:false,watchman:false,fireextinguiser:false},bathrooms:0,toilets:0,address:{country:"",administrative_area_level_1:"",locality:"",administrative_area_level_2:"",administrative_area_level_3:"",postal_code:"",addressl1:"",addressl2:"",neighborhood:""},status:{'1':false,'2':false,'3':false,'4':false,'5':false,'6':false,'7':false},totalbed:{}},{
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
    const [modal, setModal] = useState(false)
    const [rooms, setRooms] = useState([])
const [booking, setbooking] = useState({})
const [details, setDetails] = useState({})
const [userinfo, setUserinfo] = useState({name:"",contact:"",upi:"",pan:""})
const setguestall=async(e)=>{
    let obj={
        name:e.name,
        contact:e.contact,
        upi:e.paymentUpi,
        pan:e.pan,
    }
  setUserinfo(obj)
  setGuestModal(true)
}
const setall=(e)=>{
    let arr=bookings;
    let a=arr.find(f=>{return f.id===e.id})
    console.log(a);
    setbooking(a)
    let ab=listing
    let b=ab.find(f=>{return f.id===e.hostId})
    console.log(b)
    setDetails(b)
    let ar=b.rooms.map((e)=>{
        return e.nobpd
       })
       let s=new Set(ar)
       setRooms(Array.from(s))
       setModal(!modal)

}
    const ref=useRef()
  return (
    <>
     <button onClick={()=>setModal(true)} ref={ref}  class="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
  Toggle modal
</button>

{modal&&<div  tabindex="-1"  class="backdrop-blur-md flex justify-center items-center  fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
       
        <div class="relative bg-white rounded-lg shadow ">
        
            <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900">
                   Room Info
                </h3>
                <button onClick={()=>setModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="defaultModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
        
            <div class="p-6 space-y-6">
            <div >
            <div className=' w-full right-2 p-5 rounded bg-white '>
                    {
                        rooms.map((e) => {
                            return (
                                <>
                                    <div className='flex justify-between my-3'>
                                        <div className='text-[#3f3d56] text-[1.2rem] font-semibold'>
                                            {booking?.totalbedorrooms[e]&&<div>
                                            {e} seater dorm 
                                            </div>}
                                            
                                             </div>
                                             {booking?.totalbedorrooms[e]&&  <div className='flex items-center'>
                                       <div>
                        <svg width='1.2rem' height='1.2rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 5H12C14.2091 5 16 6.79086 16 9V9C16 11.2091 14.2091 13 12 13H9L15 19" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 5L18 5" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 9L18 9" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <div className='text-[#3f3d56] text-[1.2rem] font-semibold'>
                        {details.price[e]} per night
                    </div>
                                       </div>}
                                    </div>

                                    <div>
                                    {(booking?.totalbedorrooms[e])?booking?.totalbedorrooms[e]['beds'] &&<div className='text-[#3f3d56] text-sm font-semibold'>No. of beds</div>: <div></div> }
                                        <div className='text-[#3f3d56] text-sm font-semibold'>
                                            {(booking?.totalbedorrooms[e]) ? booking?.totalbedorrooms[e]['beds'] : <div></div>}
                                        </div>
                                    </div>

                                    <div>
                                        {(booking?.totalbedorrooms[e])?booking?.totalbedorrooms[e]['rooms'] &&<div className='text-[#3f3d56] text-sm font-semibold'>No. of Rooms</div>: <div></div> }
                                        <div className='text-[#3f3d56] text-sm font-semibold'>
                                            {(booking?.totalbedorrooms[e]) ? booking?.totalbedorrooms[e]['rooms'] : <div></div>}
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>    
            </div>
          
     </div>
        </div>
    </div>
</div>



}
     <button onClick={()=>setGuestModal(true)} ref={guestref}  class="hidden text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " type="button">
  Toggle modal
</button>

{guestModal&&<div  tabindex="-1"  class="backdrop-blur-md flex justify-center items-center  fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
       
        <div class="relative bg-white rounded-lg shadow ">
        
            <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900">
                   Guest Info
                </h3>
                <button onClick={()=>setGuestModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="defaultModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
        
            <div class="p-6 space-y-6">
            <div >
            <div className=' w-full right-2 p-5 rounded bg-white '>
                   <div className='text-[#3f3d56] text-[1.2rem] font-semibold my-1'>Name</div>
                   <div>{userinfo.name}</div>
                   <div className='text-[#3f3d56] text-[1.2rem] font-semibold my-1'>Pan card</div>
                   <div>{userinfo.pan}</div>
                   <div className='text-[#3f3d56] text-[1.2rem] font-semibold my-1'>Contact</div>
                   <div>{(userinfo.contact)?(userinfo.contact):"Not Available"}</div>
                   <div className='text-[#3f3d56] text-[1.2rem] font-semibold my-1'>UPI Id</div>
                   <div>{userinfo.upi}</div>
                </div>    
            </div>
          
     </div>
        </div>
    </div>
</div>



}
    <div className='mt-[15vh] '>
            <div className='w-[90vw] m-auto'>
                <div className='text-[2rem] text-[#3F3D56] font-semibold'>Welcome {user?.name}!</div>
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
                <div className='px-5 py-3 mt-6  bg-[#3F3D560F] '>
                    <div className="grid grid-cols-9 text-center text-[#3f3d56] text-md     font-semibold">
                    <div className='overflow-x-scroll'>Hosting_Id</div>
                     <div className='overflow-x-scroll'>Dormitory_title</div>
                     <div className='overflow-x-scroll'>Guest Name</div>
                     <div className='overflow-x-scroll'>Room info</div>
                     <div  className='overflow-x-scroll'>
                        Checked_in_on
                        </div>
                     <div  className='overflow-x-scroll'>
                        Checked_out_on
                        </div>
                     <div  className='overflow-x-scroll'>
                        Booked_On
                        </div>
                        <div className='overflow-x-scroll'>Stay</div>
                        <div className='overflow-x-scroll'>payment_status</div>
                       
                        
                        </div>
                        </div>
                <div className='px-5 mb-8  bg-[#3F3D560F] h-[50vh] overflow-y-scroll'>
                       
                        
                   
                    
                <div className='grid grid-cols-9 text-center gap-3 '>
                    <div>
                        
                        <div>
                            {
                                bookings.map((e)=>{
                                    return (
                                        <div className='overflow-x-scroll'>
                                            {e.hostId}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        
                       
                        <div>
                            {
                                bookings.map((e)=>{
                                    return (
                                        <div className='overflow-x-scroll'>
                                            {e.dormtitle.split(" ").join("_")}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        
                        <div>
                            {
                                bookings.map((e)=>{
                                    return (
                                        <div onClick={()=>setguestall(e)} className='overflow-x-scroll'>
                                            {e.name.split(' ').join("_").split('-').join('_')}
                                        </div>
                                    )
                                })
                            }
                        </div>
                       
                    </div>
                    <div>
                        
                        <div>
                            {
                                bookings.map((e)=>{
                                    return (
                                        <div>
                                            <div onClick={()=>setall(e)} className='cursor-pointer'>Click_to_view</div>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        
                        <div>
                            {
                                bookings.map((e)=>{
                                    return (
                                        <div className='overflow-x-scroll'>
                                            {e.checkin}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                    <div>
                      
                        <div>
                            {
                                bookings.map((e)=>{
                                    return (
                                        <div className='overflow-x-scroll'>
                                            {e.checkout}
                                        </div>
                                    )
                                })
                            }
                        </div>
                       
                    </div>
                    <div>
                       
                        <div>
                            {
                                bookings.map((e)=>{
                                    return (
                                        <div className='overflow-x-scroll'>
                                            {new Date(e.bookedon).toLocaleString().split(" ").join("_")}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        </div>
                    <div>
                     
                      <div>
                      <div>
                            {
                                bookings.map((e)=>{
                                    return (
                                        <div className='overflow-x-scroll'>
                                            {(new Date(e.checkout) - new Date(e.checkin)) / (1000 * 60 * 60 * 24)}
                                        </div>
                                    )
                                })
                            }
                        </div>
                      </div>
                    </div>
                    <div>
                     
                      <div>
                      <div>
                            {
                                bookings.map((e)=>{
                                    return (
                                        <div className='overflow-x-scroll'>
                                           {e.ispaid?"Done":"Pending"}
                                        </div>
                                    )
                                })
                            }
                        </div>
                      </div>
                    </div>
                    
                </div>
                </div>
               


            </div>
</div>
</>
  )
}

export default Hosting