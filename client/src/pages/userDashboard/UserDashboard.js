import React from 'react'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'

function UserDashboard({host}) {
    let navigate=useNavigate()

   
  return (
    <div className='mt-[7rem]' onClick={()=>{navigate('/hostdashboard')}}>
        start hosting
    </div>
  )
}

export default UserDashboard