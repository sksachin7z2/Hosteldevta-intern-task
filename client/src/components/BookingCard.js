import React,{useState} from 'react'

function BookingCard({ rooms, booking, details, price,star }) {
    const [showbill, setShowbill] = useState(false);
    console.log(rooms,booking)
    return (
        <>
            <div className='border border-[#3f3d56] shadow-md p-5 rounded-md'>
                <div className='grid grid-cols-[50%_50%] gap-3'>
                    <div>
                        <div className='text-[#3f3d56] text-[1.5rem] font-semibold'>{details?.title}</div>

                        <div className='text-[#3f3d5680] text-[1.2rem]'>Reviews</div>
                        
                        <div className='flex gap-2 items-center'>

                        <div className='text-[#3f3d56] font-semibold text-[1.2rem]'>{star}</div>
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#fcba03"></path> </g></svg>
                        </div>
                       
                    </div>
                    <div style={{ backgroundImage: `url(${details?.photos[0]})`, backgroundSize: "cover" }} className='w-full h-[8rem] rounded-md'>

                    </div>
                </div>
                
                <div className='text-[#3f3d56] font-semibold text-[1.2rem] my-1'> Your Total</div>
                <div className='text-[1.2rem] text-[#3f3d56]'>
                    {((new Date(booking.checkout) - new Date(booking.checkin)) / (1000 * 60 * 60 * 24)+1)} nights
                </div>
                <div className='flex justify-between items-center mt-2'>
                <div className='text-[#3f3d56] font-semibold text-[1.2rem]'>Minimum Downpayment</div>
                <div>
                <div className='flex justify-end items-center'>
                    <div>
                        <svg width='1.2rem' height='1.2rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 5H12C14.2091 5 16 6.79086 16 9V9C16 11.2091 14.2091 13 12 13H9L15 19" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 5L18 5" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 9L18 9" stroke="#3f3d56" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    </div>
                    <div className='text-[#3f3d56] text-lg font-semibold'>

                        {parseInt(booking.price)/(((new Date(booking.checkout) - new Date(booking.checkin)) / (1000 * 60 * 60 * 24))+1)}
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