import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
function PayoutsandBookings({host}) {
  const [bookings, setBookings] = useState([])
  const [hostinfo, sethostinfo] = useState([])
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
  setBookings(data.allhost)
  let arr=data.allhost.map(async(e)=>{
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
  

  return (
    <div className='w-[80vw] m-auto mt-[15vh]'>
        <div className='text-[#3f3d56] text-[1.5rem] font-semibold'>
            Your Booking
        </div>

        <div className='my-7'>
          <div className='grid sm:grid-cols-2 gap-5'>
         
          {
              bookings.map((e)=>{
                  return (
                    
                    <div className='rounded '>
                      <div>CheckIn</div>
                      <div>{e.checkin}</div>
                      <div>CheckOut</div>
                      <div>{e.checkout}</div>
                     
                    </div>
                  
                  )
              })
            }
          

          </div>
           
        </div>
    </div>
  )
}

export default PayoutsandBookings