import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
function PayoutsandBookings({host}) {
  let navigate=useNavigate()
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
    if(!Cookies.get('dorm--7z2__PMRW'))
    navigate('/login')
 getBookings()
  }, [])
  

  return (
    <div className='w-[80vw] m-auto mt-[15vh]'>
      <div className='flex gap-5 items-center'>
                <div onClick={()=>navigate('/profile')}>
                    My account
                </div>
                <div>
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="30" height="30" transform="matrix(-1 0 0 -1 30 30)" fill="#FDFDFD"/>
<path d="M12.4688 7.5L20 15.0312L12.4688 22.5625L11.125 21.2188L17.3125 15.0312L11.125 8.84375L12.4688 7.5Z" fill="#3F3D56"/>
</svg>

                </div>
                <div>
                    payments and Payouts
                </div>
            
            </div>
<div>
  <div className='flex justify-between items-center mt-5'>
    <div>
      <div className='text-lg text-[#3f3d56] font-semibold'>Your Payments</div>
      <div>Keep track of all your payments and funds</div>
    </div>
    <div>
        <button onClick={()=>{navigate('/profile/payments/managepayments')}} className="py-1 px-3 text-white bg-[#3f3d56] border rounded-md hover:scale-110 duration-300">Manage payments</button>
      
    </div>
  </div>
  <hr className='my-1'/>
  <div className='flex justify-between items-center mt-5'>
    <div>
      <div className='text-lg text-[#3f3d56] font-semibold'>Payout</div>
      <div>Add at least one payout method so we know where to send your money</div>
    </div>
    <div>
        <button onClick={()=>{navigate('/profile/payments/payout')}} className="py-1 px-3 text-white bg-[#3f3d56] border rounded-md hover:scale-110 duration-300">Set up Payouts</button>
      
    </div>
  </div>
  <hr className='my-1'/>
  <div className='flex justify-between items-center mt-5'>
    <div>
      <div className='text-lg text-[#3f3d56] font-semibold'>Coupons</div>
      <div>Add a coupon and save on your next stay</div>
    </div>
    <div>
        <button onClick={()=>{navigate('/profile/payments/payout')}} className="py-1 px-5 text-white bg-[#3f3d56] border rounded-md hover:scale-110 duration-300">Add coupons</button>
      
    </div>
  </div>
  <hr className='my-1'/>
  <div className='flex justify-between items-center mt-5'>
    <div>
      <div className='text-lg text-[#3f3d56] font-semibold'>Gift credit</div>
      <div>Redeem a gift card</div>
    </div>
    <div>
        <button onClick={()=>{navigate('/profile/payments/payout')}} className="py-1 px-3 text-white bg-[#3f3d56] border rounded-md hover:scale-110 duration-300">Add gift cards</button>
      
    </div>
  </div>
</div>
    </div>
  )
}

export default PayoutsandBookings