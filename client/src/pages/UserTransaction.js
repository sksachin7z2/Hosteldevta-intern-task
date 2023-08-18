import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
function UserTransaction({host}) {
    let navigate=useNavigate()
const [transactions, setTransactions] = useState([])
const getTransactions=async()=>{
    try {
        const fe=await axios.post(`${host}/api/transaction/fetchalltransactionuser`,{},{
            headers:{
                "auth-token":Cookies.get('dorm--7z2__PMRW')
            }
        })
        let arr1=fe.data.alltransaction
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
        setTransactions(arr1)

    } catch (error) {
        console.log(error)
    }
}
useEffect(() => {
    if(!Cookies.get('dorm--7z2__PMRW'))
    navigate('/login')
  getTransactions()

 
}, [])

  return (
    <div className='mt-[15vh]'>
    <div className='w-[80vw] m-auto '>
        <div className='text-[#3f3d56] font-semibold my-3 text-[2rem]'>
            Your transaction
        </div>
        <div className='grid sm:grid-cols-3 grid-rows-1 gap-5'>
            {
                transactions.map((e)=>{
                    return (
                        
        <div>
            <div className='p-5 border border-[#3f3d56] rounded-md'>
                {/* <div className='text-[#3f3d56] text-[1.2rem] font-semibold'>Booking Status</div> */}
                <div>
                {
                    (e?.ispaid)===true? <div >
                        <div >
                         <div className='text-green-600 font-semibold text-[1.5rem] text-center my-2'> Transaction Succesfull</div>
                    <div className='space-y-2'>
                    <div className='text-[#3f3d56] text-lg font-semibold'>OrderId</div>
                    <div>{e?.orderId}</div>
                    <div className='text-[#3f3d56] text-lg font-semibold'>Dormitory</div>
                    <div>{e?.dormtitle}</div>
                    <div className='text-[#3f3d56] text-lg font-semibold'>Booked on</div>
                    <div>{new Date(e?.bookedon).toLocaleString()}</div>
                   
                    {/* <div className='text-[#3f3d56] text-lg font-semibold'>Transaction Token</div> */}
                   
                    {/* <div className=''>{e?.txnToken}</div> */}
                   
                    <div className='text-[#3f3d56] text-lg font-semibold'>Amount</div>
                    <div>Rs. {e?.amount}</div>
                    <div className='text-[#3f3d56] text-lg font-semibold'> Customer UPI </div>
                    <div>{e?.paymentUpi}</div>

                    </div>
                   
                    </div>
                    
                    
                    
                    
                    </div>: <div className=''>
                       <div className='text-orange-600 font-semibold text-[1.5rem] text-center my-2'> Transaction Failed</div>
                       <div className='space-y-2'>
                    <div className='text-[#3f3d56] text-lg font-semibold'>OrderId</div>
                    <div>{e?.orderId}</div>
                    <div className='text-[#3f3d56] text-lg font-semibold'>Dormitory</div>
                    <div>{e?.dormtitle}</div>
                    <div className='text-[#3f3d56] text-lg font-semibold'>Booked on</div>
                    <div>{new Date(e?.bookedon).toLocaleString()}</div>
                    {/* <div className='text-[#3f3d56] text-lg font-semibold'>Transaction Token</div> */}
{/*                   
                    <div className=''>{e?.txnToken.split(e?.txnToken[(e?.txnToken.length)/2])[0]}</div>
                    <div className=''>{e?.txnToken[e?.txnToken/2].toString().concat(e?.txnToken.split(e?.txnToken[e?.txnToken.length/2])[1])}</div> */}
                    
                    
                    <div className='text-[#3f3d56] text-lg font-semibold'>Amount</div>
                    <div>Rs. {e?.amount}</div>
                    <div className='text-[#3f3d56] text-lg font-semibold'> Customer UPI </div>
                    <div>{e?.paymentUpi}</div>

                    </div>
                    
                    </div>

                }
                
              
            
            </div>
           
            
        </div>

        </div>

                    )
                })
            }
        </div>
        
    </div>
    </div>
  )
}

export default UserTransaction