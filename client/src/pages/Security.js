import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import {auth} from '../firebase-config'

import {
 
  signOut,
  
} from "firebase/auth";
function Security({host}) {

  let navigate=useNavigate()
  const [modal, setModal] = useState(false)
  const deactivate=async()=>{
      try {
        const f=await axios.post(`${host}/api/auth/deleteuser`,{},{
          headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
      })
      console.log(f.data)
     
        const g=await axios.post(`${host}/api/booking/deleteallbookings`,{},{
          headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
      })
      console.log(g.data)
        const h=await axios.post(`${host}/api/hosting/deleteallhostings`,{},{
          headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
      })
      console.log(h.data)
      try {
        await signOut(auth)
        Cookies.remove('dorm--7z2__PMRW')
        Cookies.remove('name')
        Cookies.remove('dp')
        Cookies.remove('email')
      } catch (error) {
        alert(error)
      }
      
      navigate('/')
      setModal(false)
        
      } catch (error) {
        console.log(error)
      }
  }
  return (
    <>
    {modal &&<div  tabindex="-1"  class="backdrop-blur-md flex justify-center items-center  fixed top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
       
        <div class="relative bg-white rounded-lg shadow ">
        
            <div class="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 class="text-xl font-semibold text-gray-900">
                  Confirmation
                </h3>
                <button onClick={()=>setModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center " data-modal-hide="defaultModal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
        
            <div class="p-6 space-y-6">
            <div className='rounded p-5 '>
              <div className='text-[#3f3d56] text-lg font-semibold my-2'> Are you sure to permanently deactivate the account ?</div>
                <div>
                  <button onClick={deactivate} className='bg-red-700 text-white py-1 px-2 rounded'>Deactivate</button>
                </div>
                                        </div>
            </div>
          
     
        </div>
    </div>
</div>}
    <div className='mt-[15vh]'>
      <div className='w-[80vw] m-auto'>
      <div>
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
                <div onClick={()=>navigate('/profile/security')}>
                    Security
                </div>
            
            </div>
      </div>


      <div>
      <div className='flex justify-between items-center mt-5'>
    <div>
      <div className='text-lg text-[#3f3d56] font-semibold'>Password</div>
      <div>Reset your password regularly and keep your account safe</div>
    </div>
    
    <div>
        <button onClick={()=>{navigate('/profile/security/resetpassword')}}><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="30" height="30" fill="#FDFDFD"/>
<path d="M14.0938 26.1875C11.5312 25.9792 9.375 24.9271 7.625 23.0312C5.875 21.1354 5 18.8854 5 16.2812C5 14.6771 5.36979 13.1667 6.10938 11.75C6.84896 10.3333 7.88542 9.17708 9.21875 8.28125L10.5625 9.625C9.39583 10.3125 8.48958 11.2552 7.84375 12.4531C7.19792 13.651 6.875 14.9271 6.875 16.2812C6.875 18.3646 7.5625 20.1667 8.9375 21.6875C10.3125 23.2083 12.0312 24.0833 14.0938 24.3125V26.1875ZM15.9688 26.1875V24.3125C18.0521 24.0625 19.7708 23.1823 21.125 21.6719C22.4792 20.1615 23.1562 18.3646 23.1562 16.2812C23.1562 14.0104 22.3698 12.0885 20.7969 10.5156C19.224 8.94271 17.3021 8.15625 15.0312 8.15625H14.4062L16.2812 10.0312L14.9375 11.375L10.7812 7.21875L14.9375 3.0625L16.2812 4.40625L14.4062 6.28125H15.0312C17.8229 6.28125 20.1875 7.25521 22.125 9.20312C24.0625 11.151 25.0312 13.5104 25.0312 16.2812C25.0312 18.8854 24.1615 21.1354 22.4219 23.0312C20.6823 24.9271 18.5312 25.9792 15.9688 26.1875Z" fill="#3F3D56"/>
</svg>
</button>
      
    </div>
  </div>
  <hr className='mt-5'/>
      <div className='flex justify-between items-center mt-5'>
    <div>
      <div className='text-lg text-[#3f3d56] font-semibold'>Deactivate account</div>
      <div>Permanently deactivate your dorminn account</div>
    </div>
    <div>
        <button onClick={()=>{setModal(true)}}><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="30" height="30" fill="#FDFDFD"/>
<path d="M11.2812 20.6562L15 16.875L18.75 20.6562L20.2188 19.1562L16.5 15.375L20.2188 11.5938L18.75 10.0938L15 13.875L11.2812 10.0938L9.78125 11.5938L13.5312 15.375L9.78125 19.1562L11.2812 20.6562ZM8.15625 26.25C7.65625 26.25 7.21875 26.0625 6.84375 25.6875C6.46875 25.3125 6.28125 24.875 6.28125 24.375V6.5625H5V4.6875H10.875V3.75H19.125V4.6875H25V6.5625H23.7188V24.375C23.7188 24.875 23.5312 25.3125 23.1562 25.6875C22.7812 26.0625 22.3438 26.25 21.8438 26.25H8.15625ZM21.8438 6.5625H8.15625V24.375H21.8438V6.5625Z" fill="#3F3D56"/>
</svg>
</button>
      
    </div>
  </div>
      </div>
      </div>
      
    </div>
    </>
  )
}

export default Security