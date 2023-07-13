import React,{useState} from 'react'
import {useNavigate,Link,useLocation} from 'react-router-dom'
import {auth} from '../firebase-config'
import Avatar from 'react-avatar'
import Saveexit from './Saveexit'
import {
 
  signOut,
  
} from "firebase/auth";
import Cookies from 'js-cookie';
function Navbar() {
const [account, setAccount] = useState(false)
  let location=useLocation()
  let navigate=useNavigate()
  const handlelogout=async()=>{
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
  }
  console.log(location.pathname)
  const [toggle, setToggle] = useState(false)
  return (
    <div>

<nav className="bg-[#ffffff40] lg:px-28 backdrop-blur-md  fixed w-full z-20 top-0 left-0 shadow-md ">
  <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">
    <div>
    <Link to="/" className="flex items-center">
      <img src="/DormLogo.png" className="h-8 mr-3" alt="Flowbite Logo"/>
      
  </Link>
    </div>
 
  <div className="flex md:order-2">
      {/* <button type="button" className="text-white bg-[#3F3D56] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ">Get started</button> */}
      <div className='md:block hidden'>
    {!( Cookies.get('dorm--7z2__PMRW'))? <div className='flex gap-4' > <div>
    <Link to='/login'> <button type="button" className="text-white bg-[#3f3d56] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Login</button></Link>
      </div>
      <div>
     <Link to='/signup'> <button type="button" className="text-white bg-[#3f3d56] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Signup</button></Link>
      </div></div>:<div  className='flex gap-5 items-center'> {(location.pathname==='/listings' ||location.pathname==='/dashboard')&&<div onClick={()=>navigate('/hostdashboard')} className='font-semibold px-2 py-1 cursor-pointer  text-[#3F3D56] rounded-full'>Hosting</div>} <div className='relative cursor-pointer' onClick={()=>{setAccount(!account)}}>{(location?.pathname?.split('/')?.at(1)==="hosting")?<Saveexit/>:(Cookies.get('dp'))? <Avatar size='30' src={Cookies.get('dp')}  round={true} />:<Avatar name={Cookies.get('name')} size='30'  round={true} />}
      
    { account&& <div className="absolute right-2">

        <div className='rounded-md p-5 space-y-3 bg-[#79769A] text-white'>
          <div className='flex gap-2 items-center'>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99999 7.9834C7.26666 7.9834 6.66666 7.75007 6.19999 7.2834C5.73332 6.81673 5.49999 6.21673 5.49999 5.4834C5.49999 4.75007 5.73332 4.15007 6.19999 3.6834C6.66666 3.21673 7.26666 2.9834 7.99999 2.9834C8.73332 2.9834 9.33332 3.21673 9.79999 3.6834C10.2667 4.15007 10.5 4.75007 10.5 5.4834C10.5 6.21673 10.2667 6.81673 9.79999 7.2834C9.33332 7.75007 8.73332 7.9834 7.99999 7.9834ZM2.66666 13.3334V11.7667C2.66666 11.3445 2.77221 10.9834 2.98332 10.6834C3.19443 10.3834 3.46666 10.1556 3.79999 10.0001C4.54443 9.66673 5.25832 9.41673 5.94166 9.25007C6.62499 9.0834 7.3111 9.00007 7.99999 9.00007C8.68888 9.00007 9.37221 9.08618 10.05 9.2584C10.7278 9.43062 11.4384 9.67892 12.182 10.0033C12.5298 10.1603 12.8086 10.3878 13.0185 10.6861C13.2284 10.9843 13.3333 11.3445 13.3333 11.7667V13.3334H2.66666ZM3.66666 12.3334H12.3333V11.7667C12.3333 11.589 12.2805 11.4195 12.175 11.2584C12.0694 11.0973 11.9389 10.9778 11.7833 10.9001C11.0722 10.5556 10.4222 10.3195 9.83332 10.1917C9.24443 10.064 8.63332 10.0001 7.99999 10.0001C7.36666 10.0001 6.74999 10.064 6.14999 10.1917C5.54999 10.3195 4.89999 10.5556 4.19999 10.9001C4.04443 10.9778 3.91666 11.0973 3.81666 11.2584C3.71666 11.4195 3.66666 11.589 3.66666 11.7667V12.3334ZM7.99999 6.9834C8.43332 6.9834 8.79166 6.84173 9.07499 6.5584C9.35832 6.27507 9.49999 5.91673 9.49999 5.4834C9.49999 5.05007 9.35832 4.69173 9.07499 4.4084C8.79166 4.12507 8.43332 3.9834 7.99999 3.9834C7.56666 3.9834 7.20832 4.12507 6.92499 4.4084C6.64166 4.69173 6.49999 5.05007 6.49999 5.4834C6.49999 5.91673 6.64166 6.27507 6.92499 6.5584C7.20832 6.84173 7.56666 6.9834 7.99999 6.9834Z" fill="#FDFDFD"/>
</svg>
<div>
  <Link to='/profile'>My&nbsp;Account</Link>

</div>
          
          </div>
          <div className='flex items-center gap-2'>
          <svg fill="white" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M22,17 L22,19 L8,19 L8,17 L22,17 Z M22,11 L22,13 L8,13 L8,11 L22,11 Z M22,5 L22,7 L8,7 L8,5 L22,5 Z M4,20 C2.8954305,20 2,19.1045695 2,18 C2,16.8954305 2.8954305,16 4,16 C5.1045695,16 6,16.8954305 6,18 C6,19.1045695 5.1045695,20 4,20 Z M4,14 C2.8954305,14 2,13.1045695 2,12 C2,10.8954305 2.8954305,10 4,10 C5.1045695,10 6,10.8954305 6,12 C6,13.1045695 5.1045695,14 4,14 Z M4,8 C2.8954305,8 2,7.1045695 2,6 C2,4.8954305 2.8954305,4 4,4 C5.1045695,4 6,4.8954305 6,6 C6,7.1045695 5.1045695,8 4,8 Z"></path> </g></svg>
            <div>
<Link to='/listings'>
Listings
</Link>
          
            </div>
          </div>
          <div className='flex items-center gap-2'>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.33337 13.9997C4.05837 13.9997 3.82296 13.9018 3.62712 13.7059C3.43129 13.5101 3.33337 13.2747 3.33337 12.9997V5.16634C3.33337 4.84551 3.44761 4.57085 3.67607 4.34237C3.90455 4.11391 4.17921 3.99967 4.50004 3.99967H6.00004V1.83301C6.00004 1.67745 6.06856 1.55523 6.20559 1.46634C6.34264 1.37745 6.49634 1.33301 6.66671 1.33301H9.33337C9.50374 1.33301 9.65745 1.37745 9.79449 1.46634C9.93152 1.55523 10 1.67745 10 1.83301V3.99967H11.6667C11.9417 3.99967 12.1771 4.09759 12.373 4.29342C12.5688 4.48926 12.6667 4.72467 12.6667 4.99967V12.9997C12.6667 13.2747 12.5688 13.5101 12.373 13.7059C12.1771 13.9018 11.9417 13.9997 11.6667 13.9997C11.6667 14.1886 11.6028 14.3469 11.475 14.4747C11.3473 14.6025 11.1889 14.6663 11 14.6663C10.8112 14.6663 10.6528 14.6025 10.525 14.4747C10.3973 14.3469 10.3334 14.1886 10.3334 13.9997H5.66671C5.66671 14.1886 5.60282 14.3469 5.47504 14.4747C5.34726 14.6025 5.18893 14.6663 5.00004 14.6663C4.81115 14.6663 4.65282 14.6025 4.52504 14.4747C4.39726 14.3469 4.33337 14.1886 4.33337 13.9997ZM6.66671 3.99967H9.33337V1.99967H6.66671V3.99967ZM4.33337 12.9997H11.6667V4.99967H4.33337V12.9997ZM5.50004 11.9997H6.16671V5.99967H5.50004V11.9997ZM7.66671 11.9997H8.33337V5.99967H7.66671V11.9997ZM9.83337 11.9997H10.5V5.99967H9.83337V11.9997Z" fill="#FDFDFD"/>
</svg>

            <div>
<Link to='/bookings'>
Bookings
</Link>
          
            </div>
          </div>
          <div className='flex items-center gap-2'>
          <svg width='16' height='16' viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#FFFFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Dashboard</title> <g id="Dashboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect id="Container" x="0" y="0" width="24" height="24"> </rect> <rect id="shape-1" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" x="4" y="4" width="16" height="16" rx="2"> </rect> <line x1="4" y1="9" x2="20" y2="9" id="shape-2" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"> </line> <line x1="9" y1="10" x2="9" y2="20" id="shape-3" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"> </line> </g> </g></svg>
            <div>
<Link to='/dashboard'>
Dashboard
</Link>
          
            </div>
          </div>
          <div className='flex gap-2 items-center' onClick={handlelogout}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 14C2.73333 14 2.5 13.9 2.3 13.7C2.1 13.5 2 13.2667 2 13V3C2 2.73333 2.1 2.5 2.3 2.3C2.5 2.1 2.73333 2 3 2H7.85V3H3V13H7.85V14H3ZM11.1 10.9167L10.3833 10.2L12.0833 8.5H6.25V7.5H12.05L10.35 5.8L11.0667 5.08333L14 8.01667L11.1 10.9167Z" fill="#FDFDFD"/>
</svg>
<div>
<button type="button" className="text-white ">Logout</button>
</div>
      
        </div>

        </div>
      </div>}

      </div> </div> }
    </div>
      <button onClick={()=>{setToggle(!toggle)}} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" >
 { (location.pathname==='/')? <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-[4rem] md:mt-0 md:border-0 ">
      <li>
        <Link to="/" className="text-[#3f3d56] block py-2 pl-3 pr-4 rounded  md:p-0 " aria-current="page">Home</Link>
      </li>
      <li>
        <Link to="/about-us" className="text-[#3f3d56] block py-2 pl-3 pr-4 rounded  md:p-0 ">About</Link>
      </li>
      <li>
        <Link to="/contact-us" className="text-[#3f3d56] block py-2 pl-3 pr-4 rounded  md:p-0">Contact</Link>
      </li>
     
   
    </ul>:(location.pathname==='/hostdashboard')?<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-[4rem] md:mt-0 md:border-0 ">
      <li>
        <Link to="/" className="text-[#3f3d56] block py-2 pl-3 pr-4 rounded  md:p-0 " aria-current="page">Today</Link>
      </li>
      <li>
        <Link to="/about-us" className="text-[#3f3d56] block py-2 pl-3 pr-4 rounded  md:p-0 ">Inbox</Link>
      </li>
      <li>
        <Link to="/contact-us" className="text-[#3f3d56] block py-2 pl-3 pr-4 rounded  md:p-0">Calender</Link>
      </li>
      
     
   
    </ul>: <div></div> }
  
  </div>
  </div>
 {toggle&& <div className='md:hidden '>
  {(location.pathname==='/')?<ul className="flex flex-col p-4 md:p-0  font-medium   rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
      <li>
        <Link to="/" className="block py-2 pl-3 pr-4   rounded  md:p-0 " aria-current="page">Home</Link>
      </li>
      <li>
        <Link to="/about-us" className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 ">About</Link>
      </li>
      <li>
        <Link to="/contact-us" className="block py-2 pl-3 pr-4  md:p-0 ">Contact</Link>
      </li>
      <li>
        {/* <Link to="/help" className="block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 ">Help</Link>
         */}
        
      </li>
      </ul>:(location.pathname==='/hostdashboard' || location.pathname==='/listings'|| location.pathname==='/profile')?<ul className="flex flex-col p-4 md:p-0  font-medium   rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
      <li>
        <Link to="/" className="block py-2 pl-3 pr-4   rounded  md:p-0 " aria-current="page">Today</Link>
      </li>
      <li>
        <Link to="/inbox" className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 ">Inbox</Link>
      </li>
      <li>
        <Link to="/calendar" className="block py-2 pl-3 pr-4  md:p-0 ">Calender</Link>
      </li>
    
      <li>
        {/* <Link to="/help" className="block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 ">Help</Link>
         */}
        
      </li>
      </ul>:(location.pathname==='/dashboard')?<ul className="flex flex-col p-4 md:p-0  font-medium   rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
      <li>
        <Link to="/" className="block py-2 pl-3 pr-4   rounded  md:p-0 " aria-current="page">Home</Link>
      </li>
      <li>
        <Link to="/about-us" className="block py-2 pl-3 pr-4 text-gray-900 rounded  md:p-0 ">About</Link>
      </li>
      <li>
        <Link to="/contact-us" className="block py-2 pl-3 pr-4  md:p-0 ">Contact</Link>
      </li>
      <li>
        {/* <Link to="/help" className="block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 ">Help</Link>
         */}
        
      </li>
      </ul>:(location?.pathname?.split('/')?.at(1)==="hosting")? <div className='px-5'>  <Saveexit/></div> : <div></div> }
      {!( Cookies.get('dorm--7z2__PMRW'))? <div className='px-5 space-y-2 mb-5'> <div>
    <Link to='/login'> <button type="button" className="text-white bg-[#3f3d56] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Login</button></Link>
      </div>
      <div>
     <Link to='/signup'> <button type="button" className="text-white bg-[#3f3d56] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Signup</button></Link>
      </div></div>:<div className='p-4 space-y-3'>

        <Link to='/dashboard'><div className='pl-3 pr-4 font-semibold text-gray-900 rounded  md:p-0 '>Dashboard</div></Link>
        <div className='pl-3 pr-4 font-semibold text-gray-900 rounded  md:p-0 '><Link to='/hostdashboard'>Hosting</Link></div>

        <div className='pl-3 pr-4 text-gray-900 rounded font-semibold  md:p-0 '>Account</div>
        
        <div className='pl-3 pr-4 text-gray-900 rounded font-semibold  md:p-0 '><Link to={`/profile`}>Profile</Link></div>
        <div className='pl-3 pr-4 text-gray-900 rounded font-semibold  md:p-0 '><Link to={`/bookings`}>Bookings</Link></div>
       <div className='pl-3 pr-4 text-gray-900 rounded font-semibold  md:p-0 '> <Link to={`/listings`}>Listings</Link></div>
        <div onClick={handlelogout}>
        <button type="button" className="text-white bg-[#3f3d56] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Logout</button>
        </div>


      </div> }
    
  </div>}
</nav>
    </div>
  )
}

export default Navbar