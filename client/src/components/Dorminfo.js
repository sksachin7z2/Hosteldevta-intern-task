import React from 'react'

function Dorminfo({booking,rooms}) {
    console.log(rooms,booking)
  return (
    <div className='my-5'>
          <div className='text-[#3f3d56] text-[1.2rem] font-semibold my-2'>
    Stay
</div>
<div className='text-[#3f3d56] text-[1.2rem] font-semibold'>
    Dates
</div>
<div className='text-[#3f3d56] text-md font-semibold'>
    {booking?.checkin} to {booking?.checkout}
</div>
<div className='text-[#3f3d56] text-[1.2rem] font-semibold my-2'>
    Guests
</div>
<div className='grid grid-cols-2'>
    {
        rooms.map((e)=>{
            return (
                <div className='my-2'>
                <div className='text-[#3f3d56] text-[1.2rem] font-semibold mb-3'>{e} seater dorm</div>
                <div className='text-[#3f3d56] text-md font-semibold'>Adults</div>
                <div className='text-[#3f3d56] text-sm font-semibold'>{booking.adults?((booking.adults[e])?booking.adults[e]:0):0}</div>
                <div className='text-[#3f3d56] text-md font-semibold'>Children</div>
                <div className='text-[#3f3d56] text-sm font-semibold'>{booking.children?((booking.children[e])?booking.children[e]:0):0}</div>
                <div className='text-[#3f3d56] text-md font-semibold'>Infants</div>
                <div className='text-[#3f3d56] text-sm font-semibold'>{booking.infants?((booking.infants[e])?booking.infants[e]:0):0}</div>
                </div>
            )
        })
    }
</div>
    </div>
  )
}

export default Dorminfo