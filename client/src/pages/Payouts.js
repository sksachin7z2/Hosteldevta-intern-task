import axios from 'axios'
import React,{useEffect,useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
function Payouts({host}) {
    const [upi, setUpi] = useState("")
const handleupdate=async()=>{
    try {
        const f=await axios.put(`${host}/api/auth/updateuser`,{payment:upi},{
            headers:{
                'auth-token':Cookies.get('dorm--7z2__PMRW')
            }
        })
        console.log(f.data)
    } catch (error) {
        console.log(error)
    }

}


const getuserinfo=async()=>{
    try {
        const fetc=await axios.post(`${host}/api/auth/getuser`,{},{
            headers:{
                'auth-token':Cookies.get('dorm--7z2__PMRW')
            }
        })
       setUpi(fetc.data.user.payment)
        
    } catch (error) {
        console.log(error)
    }
   
}
useEffect(()=>{
    if(!Cookies.get('dorm--7z2__PMRW'))
    navigate('/login')
getuserinfo()
},[])
    let navigate=useNavigate()
  return (
    <div className='mt-[15vh] w-[80vw] m-auto'>

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
                <div onClick={()=>navigate('/profile/payments')}>
                    payments and Payouts
                </div>
                <div>
                <svg width="24" height="24" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="30" height="30" transform="matrix(-1 0 0 -1 30 30)" fill="#FDFDFD"/>
<path d="M12.4688 7.5L20 15.0312L12.4688 22.5625L11.125 21.2188L17.3125 15.0312L11.125 8.84375L12.4688 7.5Z" fill="#3F3D56"/>
</svg>

                </div>
                <div>
                  Payout
                </div>
            </div>


            <div className='font-bold text-[2rem] text-[#3f3d56] mt-2'>
                Payouts
            </div>

            <div className='my-5 text-[1.2rem] font-semibold text-[#3f3d56]'>
                To get paid, add your virtual payment address
            </div>

            <div>
                <div className='text-[#3f3d56]  my1'>
                    Payout information
                </div>
                <div className='p-2 border w-[50%] border-[#3f3d56] rounded mt-6'>

                <div className='flex gap-2 items-center'>
                <svg width="42" height="27" viewBox="0 0 42 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M32.8927 18.8752L37.6667 13.4315L35.4054 7.7998L32.8927 18.8752Z" fill="#097939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M31.2847 18.8752L36.0587 13.4315L33.7973 7.7998L31.2847 18.8752Z" fill="#ED752E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.47003 7.86298L6.46003 16.8109L13.5957 16.8734L15.5557 7.86298H17.3647L15.0147 18.338C14.9247 18.738 14.582 19.063 14.2497 19.063H5.10337C4.5487 19.063 4.22003 18.5213 4.37003 17.8546L6.61137 7.86298H8.47003ZM30.5307 7.80048H32.3397L29.827 19.063H27.967L30.5307 7.80048ZM17.566 12.493L26.6114 12.4305L27.2147 10.0526H18.018L18.5707 7.86256L28.3707 7.75006C28.9807 7.74298 29.344 8.3334 29.1834 9.06965L28.26 13.288C28.099 14.0238 27.4734 14.6201 26.8634 14.6201H18.772L17.818 19.2505H16.058L17.566 12.493Z" fill="#747474"/>
<rect x="1" y="1" width="40" height="25" stroke="#3F3D56" stroke-width="0.3"/>
</svg>

<div className='text-[#3f3d56] font-semibold'>UPI</div>
                </div>
                <hr  className='my-3'/>
                <div>
                    <input value={upi} onChange={(e)=>setUpi(e.target.value)} className='mb-3 py-1 px-2 w-full' type="text" name="upi" id="upi" placeholder='Enter your virtual payment address'/>
                </div>
                </div>
                <div >
                    <button onClick={handleupdate} className='rounded my-3 text-white bg-[#3f3d56] px-2 py-1'>update</button>
                </div>
            </div>
    </div>
  )
}

export default Payouts