import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {auth} from '../firebase-config'
import {
 
  signOut,
  
} from "firebase/auth";
function Navbar() {
  let navigate=useNavigate()
  const handlelogout=async()=>{
try {
  await signOut(auth)
} catch (error) {
  alert(error)
}

navigate('/')
  }
  const [toggle, setToggle] = useState(false)
  return (
    <div>

<nav className="bg-[#ffffff40] lg:px-28 backdrop-blur-md  fixed w-full z-20 top-0 left-0 shadow-md ">
  <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">
    <div>
    <Link to="/" className="flex items-center">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo"/>
      
  </Link>
    </div>
 
  <div className="flex md:order-2">
      {/* <button type="button" className="text-white bg-[#3F3D56] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ">Get started</button> */}
      <button onClick={()=>{setToggle(!toggle)}} data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-sticky" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      </button>
  </div>
  <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" >
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-[4rem] md:mt-0 md:border-0 ">
      <li>
        <Link to="/" className="text-[#3f3d56] block py-2 pl-3 pr-4 rounded  md:p-0 " aria-current="page">Home</Link>
      </li>
      <li>
        <Link to="/about-us" className="text-[#3f3d56] block py-2 pl-3 pr-4 rounded  md:p-0 ">About</Link>
      </li>
      <li>
        <Link to="/contact-us" className="text-[#3f3d56] block py-2 pl-3 pr-4 rounded  md:p-0">Contact</Link>
      </li>
      <li>
        <Link to="/help" className="text-[#3f3d56] block py-2 pl-3 pr-4 rounded  md:p-0 ">Help</Link>
      </li>
      <li>
     <Link to='/login'> <button type="button" className="text-white bg-[#3f3d56] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Login</button></Link>
      </li>
      <li>
     <Link to='/signup'> <button type="button" className="text-white bg-[#3f3d56] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Signup</button></Link>
      </li>
      <li>
     <button onClick={handlelogout} type="button" className="text-white bg-[#3f3d56] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Signup</button>
      </li>
    </ul>
  </div>
  </div>
 {toggle&& <div className='md:hidden '>
  <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0 ">
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
        <Link to="/help" className="block py-2 pl-3 pr-4 text-gray-900 rounded md:p-0 ">Help</Link>
      </li>
      <li className='md:mb-0 mb-3'>
     <Link to='/login'> <button type="button" className="text-white  bg-[#3F3D56] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Login</button></Link>
      </li>
      <li>
     <Link to='/signup'> <button type="button" className="text-white bg-[#3F3D56] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Signup</button></Link>
      </li>
    </ul>
  </div>}
</nav>
    </div>
  )
}

export default Navbar