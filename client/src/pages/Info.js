import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
function Info() {
  return (
    <div className='mt-[15vh] w-[80vw] m-auto'>
        <div>
            <div className='flex gap-5 items-center'>
                <div>
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
            <div className="text-[#3f3d56] text-[1.5rem] font-semibold my-2">Personal Information</div>
           
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
<input type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="name@flowbite.com"/>
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
<input type="email" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="name@flowbite.com"/>
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Phone Number</label>
<input type="number" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="name@flowbite.com"/>
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
<input type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="name@flowbite.com"/>
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Date of Birth</label>
<input type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="name@flowbite.com"/>
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Nationality</label>
<input type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="name@flowbite.com"/>
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Pan Card</label>
<input type="text" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="name@flowbite.com"/>
<label for="helper-text" class="block mb-2 text-sm font-medium text-gray-900 ">Gender</label>
<input type="email" id="helper-text" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="name@flowbite.com"/>



        </div>


    </div>
  )
}

export default Info