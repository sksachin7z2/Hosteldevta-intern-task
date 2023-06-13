import React from 'react'
 
function BottomPagination() {
  return (
    <div>
        <div className='flex px-[40px] h-[70px]  bottom-0 justify-between items-center'>
        <div className='font-bold'>
        Back
        </div>
        <div className='rounded px-5 py-2 text-sm text-white bg-pink-700 cursor-pointer'>
            Next
        </div>
</div>
    </div>
  )
}

export default BottomPagination