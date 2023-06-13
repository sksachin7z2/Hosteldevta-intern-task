import React from 'react'

import BottomPagination from '../components/BottomPagination'
function Hosting() {
  return (
    <div>
        <div className='grid grid-rows-2 md:h-[66vh]  md:grid-rows-none md:grid-cols-2'>
            <div className='flex h-full justify-center items-center'>
                    <div className='text-4xl text-center w-[70%]'>
                        Its easy to get started on Hosteldevta
                    </div>
            </div>
            <div className='p-[30px]'>
                <ul className='list-decimal flex flex-col gap-[4.8rem]'>
                    <li > <div>
                        <div className='text-l font-bold'>
                                Tell us about your place
                        </div>
                        <div className='text-gray-700'>
                                Share some basic Info, such as where it is and how many guest can stay </div>
                        </div> 
                        </li>
                    <li >
                    <div>
                        <div className='text-l font-bold'>
                                Make it stand out
                        </div>
                        <div className='text-gray-700'>
                                Share some basic Info, such as where it is and how many guest can stay </div>
                        </div>
                    </li>
                    <li >
                    <div>
                        <div className='text-l font-bold'>
                                Tell us about your place
                        </div>
                        <div className='text-gray-700'>
                                Share some basic Info, such as where it is and how many guest can stay </div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>
        <div>
        <div className='mt-[3rem]'>
 <div  className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
  <div className="bg-black h-1 rounded-full w-[45%]" ></div>
</div>
        </div>

 
    </div>       
<BottomPagination/>

    </div>
  )
}

export default Hosting