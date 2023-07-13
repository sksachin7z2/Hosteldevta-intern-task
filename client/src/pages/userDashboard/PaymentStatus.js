import React,{useEffect,useState} from 'react'
import {useNavigate,useLocation} from 'react-router-dom' 
import axios from 'axios'
// import { useUserAuth } from "../../context/auth";
import Cookies from 'js-cookie'
function Booking({host}) {
    // const {booking}=useUserAuth()
    let navigate=useNavigate();
    let location=useLocation();
    let params=location.pathname.split('/')[2];
    const [booking, setBooking] = useState({})
    let bookId=location.pathname.split('/')[3];
    const getroomdata=async()=>{
        try {
            const fetch1=await axios.post(`${host}/api/booking/fetchBooking/${bookId}`,{},{
                headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
            })
            const data=fetch1.data;
            let booking=data.host
        setBooking(booking)
        //     let obj=hosting.totalbed
        //    for(var i in booking.totalbedorrooms){
        //         obj[i]=booking.totalbedorrooms[i]['beds']?(obj[i]-booking.totalbedorrooms[i]['beds']):(obj[i]-(booking.totalbedorrooms[i]['rooms']*i))
        //    }
        //    console.log(obj)
        //    const updatehosting=await axios.put(`${host}/api/hosting/updateHosting/${params}`,{totalbed:obj},{
        //     headers:{
        //         "auth-token":Cookies.get('dorm--7z2__PMRW')
        //     }
        // })
        // console.log(updatehosting.data)




        } catch (error) {
            console.log(error)
        }
      
      }
     
    useEffect(() => {
     getroomdata()
    }, [])
    
  return (
    <div className='w-[80vw] m-auto mt-[15vh]'>

        <div className='flex justify-center items-center h-[100vh]'>
        <div>
            <div className='p-5 border border-[#3f3d56] rounded-md'>
                <div className='text-[#3f3d56] text-[1.2rem] font-semibold'>Booking Status</div>
                <div>
                {
                    (booking?.ispaid)===true? <div > <div className='text-green-600 font-semibold text-[1.5rem] text-center my-2'> Transaction Succesfull</div>
                    <div className='space-y-2'>
                    <div className='text-[#3f3d56] text-lg font-semibold'>OrderId</div>
                    <div>{booking?.orderId}</div>
                    <div className='text-[#3f3d56] text-lg font-semibold'>Transaction Token</div>
                    <div>{booking?.txnToken}</div>
                    <div className='text-[#3f3d56] text-lg font-semibold'>Amount</div>
                    <div>Rs. {booking?.minimumDown}</div>
                    <div className='text-[#3f3d56] text-lg font-semibold'> Received from </div>
                    <div>{booking?.paymentUpi}</div>

                    </div>
                   
                    
                    
                    
                    
                    
                    </div>: <div >
                       <div className='text-orange-600 font-semibold text-[1.5rem] text-center my-2'> Transaction Failed</div>
                      <div className='text-center'>
                      <button onClick={()=>navigate(`/payment/${params}/${bookId}`)} type="button" className="text-white bg-[#3f3d56]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 ">Try Again</button>

                      </div>
                    
                    </div>

                }
                
              
            
            </div>
           
            <div className='my-4 text-center'>
    <button onClick={()=>navigate('/dashboard')} type="button" className="text-white bg-[#3f3d56]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 ">Back to dashboard</button>
    </div>
            
        </div>

        </div>

    </div>
    </div>
  )
}

export default Booking