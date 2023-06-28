import React from 'react'
import {useNavigate} from 'react-router-dom'
function Saveexit() {
    let navigate=useNavigate();
  return (
    <div><button onClick={()=>navigate('/hostdashboard')} className='p-3 shadow-md font-semibold text-[#3F3D56]  rounded-full py-1 px-2 bg-white'>Save & Exit</button></div>
  )
}

export default Saveexit