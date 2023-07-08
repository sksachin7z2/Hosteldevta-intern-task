import React,{useState} from 'react'

function BookingCard({ rooms, booking, details, price }) {
    const [showbill, setShowbill] = useState(false);
    console.log(rooms,booking)
    return (
        <>
            <div className='border border-[#3f3d56] shadow-md p-5 rounded-md'>
                <div className='grid grid-cols-[50%_50%] gap-3'>
                    <div>
                        <div className='text-[#3f3d56] text-[1.5rem] font-semibold'>{details?.title}</div>

                        <div className='text-[#3f3d5680] text-[1.2rem]'>Reviews</div>
                    </div>
                    <div style={{ backgroundImage: `url(${details?.photos[0]})`, backgroundSize: "cover" }} className='w-full h-[8rem] rounded-md'>

                    </div>
                </div>
                
                <div className='text-[#3f3d56] font-semibold text-[1.2rem] my-1'> Your Total</div>
                <div className='text-[1.2rem] text-[#3f3d56]'>
                    {(new Date(booking.checkout) - new Date(booking.checkin)) / (1000 * 60 * 60 * 24)} nights
                </div>
                <div className='flex justify-between items-center mt-2'>
                <div className='text-[#3f3d56] font-semibold text-[1.2rem]'>Minimum Downpayment</div>
                <div>
                <div className='flex justify-end items-center'>
                    <div>
                        <svg width='1.2rem' height='1.2rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 5H12C14.2091 5 16 6.79086 16 9V9C16 11.2091 14.2091 13 12 13H9L15 19" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 5L18 5" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 9L18 9" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <div className='text-[#3f3d56] text-lg font-semibold'>

                        {parseInt(booking.price)/((new Date(booking.checkout) - new Date(booking.checkin)) / (1000 * 60 * 60 * 24))}
                    </div>
                </div>
               
                
                
                </div>
                </div>
                <div className='flex justify-between items-center mt-2'>
                <div className='text-[#3f3d56] font-semibold text-[1.2rem]'>Total price</div>
                <div>
                <div className='flex justify-end items-center'>
                    <div>
                        <svg width='1.2rem' height='1.2rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 5H12C14.2091 5 16 6.79086 16 9V9C16 11.2091 14.2091 13 12 13H9L15 19" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 5L18 5" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 9L18 9" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <div className='text-[#3f3d56] text-lg font-semibold'>

                        {booking.price}
                    </div>
                </div>
                
                
                
                </div>
                </div>
                <div className='relative'>
                <div onClick={()=>setShowbill(!showbill)}>
                    <div className="flex justify-end items-center gap-2">
                  <div>Price summary</div>  
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#3f3d56"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 10L12 15L17 10" stroke="#3f3d56" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    </div>
                
                    
                { showbill&& <div className='absolute w-[max-content] right-2 p-5 rounded bg-white shadow-md'>
                    {
                        rooms.map((e) => {
                            return (
                                <>
                                    <div className='flex justify-between my-3'>
                                        <div className='text-[#3f3d56] text-[1.2rem] font-semibold'>
                                            {booking?.totalbedorrooms[e]&&<div>
                                            {e} seater dorm 
                                            </div>}
                                            
                                             </div>
                                             {booking?.totalbedorrooms[e]&&  <div className='flex items-center'>
                                       <div>
                        <svg width='1.2rem' height='1.2rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 5H12C14.2091 5 16 6.79086 16 9V9C16 11.2091 14.2091 13 12 13H9L15 19" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 5L18 5" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 9L18 9" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <div className='text-[#3f3d56] text-[1.2rem] font-semibold'>
                        {details.price[e]} per night
                    </div>
                                       </div>}
                                    </div>

                                    <div>
                                    {(booking?.totalbedorrooms[e])?booking?.totalbedorrooms[e]['beds'] &&<div className='text-[#3f3d56] text-sm font-semibold'>No. of beds</div>: <div></div> }
                                        <div className='text-[#3f3d56] text-sm font-semibold'>
                                            {(booking?.totalbedorrooms[e]) ? booking?.totalbedorrooms[e]['beds'] : <div></div>}
                                        </div>
                                    </div>

                                    <div>
                                        {(booking?.totalbedorrooms[e])?booking?.totalbedorrooms[e]['rooms'] &&<div className='text-[#3f3d56] text-sm font-semibold'>No. of Rooms</div>: <div></div> }
                                        <div className='text-[#3f3d56] text-sm font-semibold'>
                                            {(booking?.totalbedorrooms[e]) ? booking?.totalbedorrooms[e]['rooms'] : <div></div>}
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>}
                </div>

              

            </div>

        </>
    )
}

export default BookingCard