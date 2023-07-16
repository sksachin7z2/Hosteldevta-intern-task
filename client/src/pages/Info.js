import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import $ from "jquery";
function Info({host}) {
    const [credentials, setCredentials] = useState({name:"",email:"",contact:"",address:"",dob:"",nationality:"",pan:"",gender:""})
    const getuserinfo=async()=>{
        try {
            const fetc=await axios.post(`${host}/api/auth/getuser`,{},{
                headers:{
                    'auth-token':Cookies.get('dorm--7z2__PMRW')
                }
            })
            setCredentials(fetc.data.user)
            
        } catch (error) {
            console.log(error)
        }
       
    }
    const [showup, setShowup] = useState(false)
    let navigate=useNavigate()
    
    const handleChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const handleupdate=()=>{
        $(':input').prop('readonly', false)
        setShowup(true)
    }
    useEffect(() => {
        if(!Cookies.get('dorm--7z2__PMRW'))
        navigate('/login')
     getuserinfo()
    }, [])
    const handleupdatebtn=async()=>{

        setShowup(false)
        try {
            const update=await axios.put(`${host}/api/auth/updateuser`,{
                ...credentials
            },{
                headers:{
                    'auth-token':Cookies.get('dorm--7z2__PMRW')
                }
            })
            console.log(update.data)
            $(':input').prop('readonly', true)
        } catch (error) {
            console.log(error)
        }
    }
   
  return (
    <div className='mt-[15vh] w-[80vw] m-auto'>
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
                <div>
                    Personal Information
                </div>
            </div>
            <div className='w-full flex justify-between items-center'>
            <div className="text-[#3f3d56] text-[1.5rem] font-semibold my-2">Personal Information</div>
            <div className='flex items-center gap-3'>

            <svg onClick={handleupdate} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="25" height="25" fill="#FDFDFD"/>
<path d="M4.6875 20.3122H5.83333L17.3698 8.77576L16.224 7.62993L4.6875 19.1664V20.3122ZM20.6771 7.65597L17.3438 4.32263L18.4329 3.23349C18.7311 2.93528 19.1016 2.79052 19.5443 2.7992C19.987 2.80788 20.3559 2.95979 20.651 3.25493L21.7708 4.37472C22.066 4.66986 22.2135 5.03444 22.2135 5.46847C22.2135 5.90249 22.0663 6.26676 21.7718 6.56125L20.6771 7.65597ZM3.91477 21.8747C3.691 21.8747 3.50343 21.7991 3.35206 21.6478C3.20069 21.4965 3.125 21.309 3.125 21.0854V18.8555C3.125 18.7503 3.14236 18.6542 3.17708 18.5674C3.21181 18.4806 3.27257 18.3938 3.35938 18.307L16.25 5.41638L19.5833 8.74972L6.69271 21.6403C6.6059 21.7271 6.51721 21.7879 6.42664 21.8226C6.33605 21.8574 6.24245 21.8747 6.14583 21.8747H3.91477ZM16.7969 8.20284L16.224 7.62993L17.3698 8.77576L16.7969 8.20284Z" fill="#3F3D56"/>
</svg>
{showup && <button onClick={handleupdatebtn} className='text-white bg-[#3f3d56] px-2 py-1 font-semibold rounded'>
    Update
</button>}
            </div>

            </div>
          
           
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
<input name='name'  value={credentials.name} onChange={handleChange} type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "readOnly={true} />
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
<input  name='email' readonly value={credentials.email} onChange={handleChange} type="email"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "readOnly={true} />
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
<input  name='contact' readonly type="number" onChange={handleChange} value={credentials.contact}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "readOnly={true} />
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
<input  name='address' readonly type="text" onChange={handleChange} value={credentials.address}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " readOnly={true}/>
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Date of Birth</label>
<input  name='dob' readonly value={credentials.dob} onChange={handleChange} type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " readOnly={true}/>
<label  for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Nationality</label>
<input  name='nationality' value={credentials.nationality} onChange={handleChange} readonly type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " readOnly={true}/>
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Pan Card</label>
<input  name='pan' value={credentials.pan} onChange={handleChange} readonly type="text"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " readOnly={true} />
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Gender</label>
<input  name='gender' value={credentials.gender} onChange={handleChange} readonly type="email"  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " readOnly={true}/>



        </div>


    </div>
  )
}

export default Info