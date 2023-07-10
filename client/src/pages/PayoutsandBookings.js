import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
function PayoutsandBookings({host}) {
  const [bookings, setBookings] = useState()

  const getBookings=async()=>{
try {
  const fetch= await axios.post(`${host}/api/booking/fetchallBookingUser`,{},{
    headers:{
      'auth-token':Cookies.get('dorm--7z2__PMRW')
    }
  })
  const data=fetch.data;
  setBookings(data.allhost)
  
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
          <div className='grid sm:grid-cols-2'>
          <div>
          {/* {
              bookings.map((e)=>{
                  return (
                    <>
                    <div>
                      <div>CheckIn</div>
                      <div>{e.checkin}</div>
                      <div>CheckOut</div>
                      <div>{e.checkout}</div>
                      <div></div>
                      <div>{e.checkin}</div>
                      <div>Checkin</div>
                      <div>{e.checkin}</div>
                      <div>Checkin</div>
                      <div>{e.checkin}</div>
                    </div>
                    </>
                  )
              })
            } */}
          </div>

          </div>
           
        </div>
    </div>
  )
}

export default PayoutsandBookings