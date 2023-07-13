import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
function Bookings({host}) {
    const [bookings, setBookings] = useState([])
    const [hostinfo, sethostinfo] = useState([])
    const [booking, setBooking] = useState({})
    const [hosti, setHosti] = useState({})
    const [pending, setPending] = useState([])
    const [booked, setBooked] = useState([])
    const getBookings=async()=>{
  try {
    const fetch= await axios.post(`${host}/api/booking/fetchallBookingUser`,{},{
      headers:{
        'auth-token':Cookies.get('dorm--7z2__PMRW')
      }
    })
    const data=fetch.data;
    let arr1=data.allhost
    const comp=(a,b)=>{
      if ( new Date(b.bookedon) < new Date( a.bookedon) ){
        return -1;
      }
    if ( new Date(b.bookedon) > new Date( a.bookedon) ){
        return 1;
      }
      return 0
    }
    arr1.sort(comp)
    setBookings(arr1)
    let arr=arr1.map(async(e)=>{
        const fet=await axios.post(`${host}/api/hosting/fetchHosting/${e.hostId}`,{},{
          headers:{
            'auth-token':Cookies.get('dorm--7z2__PMRW')
          }
        })
        return fet.data.host
    })
    let arr2=await Promise.all(arr)
    console.log(arr2)
    sethostinfo(arr2)
  } catch (error) {
    console.log(error)
  }
    }
    useEffect(() => {
   getBookings()
    }, [])
    const [Alltotal, setAlltotal] = useState([])
    const [modal, setModal] = useState(false)
  const bookingmodal=(e,i)=>{
    let arr=hostinfo[i].rooms.map((e)=>{
        return e.nobpd
       })
       let s=new Set(arr)
       setRooms(Array.from(s))
    setHosti(hostinfo[i]);
    setAlltotal(hostinfo[i]?.rooms)
    setBooking(e)
    setModal(true)
  }
  const cancelbooking=async()=>{

    if( (((new Date(booking.bookedon) - new Date()) / (1000 * 60 * 60))<=72) ||booking.bookedon==="")
    {
        try {
          const del=await axios.post(`${host}/api/booking/deleteBooking/${booking.id}`,{},{
            headers:{
              'auth-token':Cookies.get('dorm--7z2__PMRW')
            }
          })
          console.log(del.data)
          console.log(booking.id)
        setModal(false)
        // getBookings()
        let obj1={}
        let arr= Alltotal.map((e)=>{
      
 
         obj1[`${e?.nobpd}`]=(e?.nobpd*e?.nod);
       
            return ""
         })
        let obj=hosti.totalbed;
        console.log(obj)
        rooms.map((e)=>{
            if((booking.totalbedorrooms[e]))
            {
              if(booking.totalbedorrooms[e]['beds'])
              {
                if((obj[e]+booking.totalbedorrooms[e]['beds'])<=obj1[e])
                  obj[e]=obj[e]+booking.totalbedorrooms[e]['beds']
                  else
                  obj[e]=obj1[e]
              }
              else{
                if((obj[e]+booking.totalbedorrooms[e]['rooms']*e)<=obj1[e])
                obj[e]=obj[e]+booking.totalbedorrooms[e]['rooms']*e
                else
                obj[e]=obj1[e]
              }
            }
        })
        console.log(obj)
        const updatehosting=await axios.put(`${host}/api/hosting/updateHosting/${booking.hostId}`,{totalbed:obj},{
          headers:{
              "auth-token":Cookies.get('dorm--7z2__PMRW')
          }
      })
      console.log(updatehosting.data)
        } catch (error) {
          console.log(error)
        }
    }
    else{
      alert('no cancellation after 72 hours')
    }
  }
  const [rooms, setRooms] = useState([])
  return (
    <>
    {modal &&<div  tabindex="-1"  class="backdrop-blur-md flex justify-center items-center  fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0  h-[100vh]">
    <div class="relative w-full max-w-2xl max-h-full">
       
        <div class="relative bg-white rounded-lg shadow ">
        
            <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900">
                   Booking Details
                </h3>
             {   <button onClick={()=>setModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="defaultModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>}
            </div>
        
            <div class="p-6 ">
                <div className='text-[#3f3d56] text-[1.2rem] font-semibold'>{hosti?.title}</div>
                <div className='flex gap-3 items-center mt-3'>
                        <div>
                    <div className='text-[#3f3d56]  font-semibold'>Checkin</div>
                    <div>{booking?.checkin}</div>
                    </div>
                    <div>
                    <div className='text-[#3f3d56]  font-semibold'>Checkout</div>
                    <div>{booking?.checkout}</div>
                    </div>
                </div>
                  
                    <div>
                        <div className='text-[#3f3d56] text-[1.2rem] font-semibold mt-3'>Guest info</div>
                    <div className='grid grid-cols-2'>
    {
        rooms.map((e)=>{
            return (
                <div className='my-1'>
                <div className='text-[#3f3d56] text-md font-semibold mb-2'>{e} seater dorm</div>
                <div className='text-[#3f3d56] text-md font-semibold'>Adults</div>
                <div className='text-[#3f3d56] text-sm font-semibold'>{booking.adults?((booking.adults[e])?booking.adults[e]:0):0}</div>
                <div className='text-[#3f3d56] text-md font-semibold'>Children</div>
                <div className='text-[#3f3d56] text-sm font-semibold'>{booking.children?((booking.children[e])?booking.children[e]:0):0}</div>
                <div className='text-[#3f3d56] text-md font-semibold'>Infants</div>
                <div className='text-[#3f3d56] text-sm font-semibold'>{booking.infants?((booking.infants[e])?booking.infants[e]:0):0}</div>
                </div>
            )
        })
    }
</div>
<div className='text-[#3f3d56] text-[1.2rem] font-semibold '>Bookings</div>
<div className=' w-[max-content]  rounded bg-white '>
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
                        {hosti.price[e]} per night
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
<div className='text-[#3f3d56] text-[1.2rem] font-semibold mb-2'>Payment Status</div>
<div className="flex justify-between items-center">
<div>
    {booking.ispaid===true?<>  <div className=''>
        <div className='text-[#3f3d56]  font-semibold'>
        <div >
           Total Amount to be paid
        </div>
        <div className='text-[#3f3d56]  font-semibold mb-2'> Rs. {booking.price}</div>
          <div className='text-[#3f3d56]  font-semibold'>MinimumDown Payment</div>
          <div>Rs. {booking.minimumDown}</div>
        </div>
        <div className='text-green-600 font-semibold text-lg'>Booking Confirmed</div>
        </div></> : <div className='text-orange-600 font-semibold text-lg'>Pending</div> }
</div>

<div onClick={cancelbooking} className='px-2 py-1 rounded bg-[#3f3d56] text-white'>Cancel booking</div>
</div>

                    </div>
            </div>
          
     
        </div>
    </div>
</div>}
    <div className='mt-[15vh] w-[80vw] m-auto'>
        <div>

        <div className='font-bold text-[2rem] text-[#3f3d56]'>Bookings</div>
        <div className='text-[#3f3d56]'>See all the dorm rooms you have booked</div>
        </div>
        <div>
            <div className='grid md:grid-cols-2 mt-7 gap-5'>
               {
                bookings.map((e,i)=>{
                    return (
                        <div className='p-3 border border-[#3f3d56] rounded-md'>
                            <div className='grid gap-2 sm:grid-cols-[30%_70%] '>
                                <div style={{backgroundImage:`url(${hostinfo[i]?.photos[0]})`,backgroundSize:"cover"}} className='w-full rounded-md sm:h-auto h-[20vh]'>
                                    
                                </div>
                                <div>
                                <div className='text-[1.2rem] font-semibold text-[#3f3d56]'>
                                  {hostinfo[i]?.title}
                                </div>
                                <div className='flex w-full justify-between items-center pr-3'>
                                    <div>
                                    <div className='text-md text-[#3f3d56] '>Staying for</div>
                                    <div className='text-md text-[#3f3d56]  '>
                                        {
                                             (new Date(e.checkout) - new Date(e.checkin)) / (1000 * 60 * 60 * 24)
                                        } nights
                                    </div>
                                    </div>
                                    <div className='space-y-3'>
                                        <div className='text-sm text-end font-semibold text-[#3f3d56]'>
                                        {e.checkin} - {e.checkout}
                                        </div>
                                        <div>
                                        <div className='text-end text-[#3f3d56]'>Booked On</div>
                                        <div className='text-end text-[#3f3d5697]'>{new Date(e.bookedon).toLocaleString()}</div>
                                        </div>
                                       
                                       
                                        <div className='text-end'>
                                <button onClick={()=>{bookingmodal(e,i)}} type="button" className="text-[#3f3d56] bg-white  border border-[#3f3d56]  font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">More</button>
                                </div>
                                    </div>
                                    
                                </div>
                              
                                </div>
                                
                            </div>
                        </div>
                    )
                })
               }
            </div>
        </div>
    </div>
    </>
  )
}

export default Bookings