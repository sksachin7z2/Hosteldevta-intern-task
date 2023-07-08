import React,{useState} from 'react'
import bg from '../static/homebg.jpeg'
import dd1 from '../static/dweller1.jpeg'
import dd2 from '../static/dweller2.jpeg'
import cc from '../static/connect1.jpeg'
import {Link} from 'react-router-dom'
function Landing() {
  
  return (
    <div className=''>
        
        <div className="h-[100vh] " style={{backgroundImage:`url(${bg})` ,backgroundSize:"cover"}} >
       
        
<div className='flex items-center h-[100vh] bg-[rgba(255, 255, 255, 0.24)] backdrop-blur-[8px] bg-[#ffffff50] md:bg-[#ffffff35] px-7 md:px-0 '>
<div className="grid grid-cols-1 md:grid-cols-2 pt-[20vh]">
      <div className='md:pl-[100px]  pb-[2rem]'>
        <div className='text-[2rem] text-[#3f3d56] font-bold'>Elevate Living Experience with 
the ease of DormInn!</div>
<div className='text-[#3f3d56] text-[1.2rem] md:pb-[3rem]'>
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi doloremque earum molestias exercitationem error ducimus obcaecati voluptas, cum explicabo, quae eum. Architecto nostrum ex alias 
</div>
<div className='my-5 md:my-0'>
      <button type="button" className="text-white bg-[#3f3d56]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 "> <Link to='/dashboard'> Get started now</Link></button>
      </div>
      </div>
 
        </div>
</div>

      

        </div>
        <section className='my-[2rem] container mx-auto'>
          <div className='text-center text-[2rem] text-[#3f3d56] font-semibold my-4'>Property Listers</div>
          <div className=' grid grid-cols-1 md:grid-cols-2 my-9'>
<div className='text-xl px-[3rem]'>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
enim ad minim veniam, quis nostrud exercitation ullamco laboris 
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
reprehenderit in voluptate velit esse cillum dolore eu fugiat 
nulla pariatur. 
</div>
<div className='text-center p-[30px] text-[2rem]'>
Your property is 
in good hands
</div>
          </div>
          <div className='px-[3rem] my-10 text-[2rem] text-[#3f3d56] font-semibold'>
          Simple steps to
get started
          </div>
          <div className='grid md:grid-cols-4 gap-5 px-[3rem]'>
        <div className='space-y-5'>

          <span className='px-3 py-1 rounded-full border border-[#3f3d56]'>
            1
          </span>
          <div>
          Tell us about your home
          </div>
          <div>
          Give us some details about your
place, and let us know when you’d
like to start hosting.
          </div>

        </div>
          <div className='space-y-5'>
          <span className='px-3 py-1 rounded-full border border-[#3f3d56]'>
            2
          </span>
          <div>
          We'll get in touch
          </div>
          <div>
          The team will be in touch to confirm
that the service is available for your
property, and talk you through the
next steps.
          </div>
          </div>
          <div className='space-y-5'>
          <span className='px-3 py-1 rounded-full border border-[#3f3d56]'>
            3
          </span>
          <div>
          You’ll meet the local team
          </div>
          <div>
          Your advisor will introduce you to
partners in your area and, once
you’re ready, organize a photoshoot.
          </div>
          </div>
          <div className='space-y-5'>
          <span className='px-3 py-1 rounded-full border border-[#3f3d56]'>
            4
          </span>
          <div>
          Start hosting
          </div>
          <div>
          Open your calendar for bookings,
drop your keys and that's it—you're
all set up for your first guest.
          </div>
        </div>
          </div>
          <div className='text-center md:my-3 my-[2rem]'>
      <button type="button" className="text-white bg-[#3f3d56] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 "> <Link to='/hostdashboard'> Get started now</Link></button>
      </div>
        </section>
        <section>
          <div className='px-[3rem]'>
          <div className='text-center text-[#3F3D56] text-[2rem] my-[4rem] font-semibold'>Dorm Dwellers</div>
          <div className='grid md:grid-cols-2  my-5'>
            <div className='flex justify-center items-center p-[2rem] md:p-[5rem] order-2 md:order-first'>
            <div>
              <div className='text-[#3F3D56] text-[2rem] font-semibold'>
                    Search by location
              </div>
              <div className='text-[1.2rem] text-[#3F3D56] '>
              Find your perfect dorm room in 
your desired location with DormInn.
              </div>
            </div>
            </div>
            <div>
              <div className='md:w-[35vw] w-[75vw] m-auto rounded-md'>
                <img className='w-full rounded-md' src={dd1} alt="fig"  />
              </div>
            </div>
          </div>
          <div className='grid md:grid-cols-2'>
            <div className='rounded-md w-[75vw] md:w-[35vw] m-auto'>
                <img className='w-full rounded-md' src={dd2} alt="fig2" />
            </div>
            
            <div className='flex justify-center items-center p-[2rem]'>
            <div>
              <div className='text-[2rem] text-[#3F3D56] font-semibold'>
              Find your perfect dorm room
              </div>
              <div className='text-[1.2rem] text-[#3F3D56] '>
              Whether you’re looking for a dorm room
in a big city or a small town, DormInn
has options for you. 
              </div>
            </div>
            </div>
            
          </div>
          </div>
          <div className='text-center mt-[5rem] text-[#3F3D56] text-[2rem] font-semibold'>
          Book your dorm room with ease
          </div>
          <div className='text-center my-3'>
      <button type="button" className="text-white bg-[#3f3d56] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 ">Book now</button>
      </div>
        </section>
        <section className='mt-[8rem]'>
          <div >
              <div className="h-[90vh] " style={{backgroundImage:`url(${cc})` ,backgroundSize:"cover"}}>
                <div className='h-full bg-[#ffffff45]  backdrop-blur-[7.5px] flex justify-center items-center'>
                  <div className='space-y-3' >
                        <div className='text-[2rem] text-center text-[#3F3D56] font-semibold'>
                        Find and book your dorm room with ease
                        </div>
                        <div className='text-[1.2rem] text-[#3F3D56] text-center'>
                        Sign up and start booking your dorm room today.
                        </div>
                        <div className='text-center mt-6'>
                        <button type="button" className="text-[#3F3D56] bg-[#FDFDFD]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 "> <Link to='/signup'> Sign Up</Link></button>
                        </div>
                  </div>
                </div>
              </div>
              <div className='bg-[#3F3D56] pb-[5rem] p-[5rem]'>
                <div className='text-white text-[2rem]'>
                Connect with DormInn
                </div>
                <div className='text-white text-[1.2rem]'>
                Discover how DormInn can help you find and book your dorm room.
                </div>
                <div className='my-9'>
                <button type="button" className="text-[#3F3D56] bg-[#FDFDFD]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-3 md:mr-0 ">Connect now</button>
                </div>
              </div>
          </div>
        </section>
    </div>
  )
}

export default Landing