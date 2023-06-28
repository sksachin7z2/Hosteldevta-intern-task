import React from 'react'
import mainbg from '../static/aboutyourdorm.jpeg'
import {useNavigate,useLocation} from 'react-router-dom'
import Saveexit from '../components/Saveexit'
function Step3hosting() {
    let navigate=useNavigate()
    let location=useLocation()
    let params=location.pathname.split('/')[2];
    
    const handlenext=async()=>{
       navigate(`/hosting/${params}/set-a-price`)
    
    }
    return (
        <div>
          
            <div className='h-[100vh]' style={{ backgroundImage: `url(${mainbg})`, backgroundSize: "cover" }}>
                <div className='h-[100vh] bg-[#FFFFFF30] backdrop-blur-md' >
                    <div className='h-[90vh] flex justify-center items-center'>
                        <div className='w-[50vw] space-y-3'>
                            <div className=' text-[#3F3D56]'>
                                Step 3
                            </div>
                            <div className='text-[2rem] font-semibold text-[#3F3D56]'>
                            Finalize and put it on display

                            </div>
                            <div className='text-[1.2rem] text-[#3F3D56]'>
                            In this step, you'll set a price. Answer a few quick questions and 
display when you're ready.
                            </div>
                        </div>
                    </div>
                    <div className='h-[10vh]'>
                        <div className=' h-[10vh] flex justify-between items-center'>
                            <div>
                                <div className='flex'>
                                <svg width="48" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M28.05 35.9999L16 23.9499L28.05 11.8999L30.2 14.0499L20.3 23.9499L30.2 33.8499L28.05 35.9999Z" fill="#3F3D56"/>
</svg>

                            <button onClick={()=>{navigate(`/hosting/${params}/add-title-description`)}} type="button" className="text-[#3F3D56] bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Back</button>
                                </div>
                           
                            </div>
                            <div>
                                <div onClick={handlenext} className='flex'>
                                <button type="button" className="text-white bg-[#3F3D56]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Next</button>
                            <svg width="48" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.75 35.9999L16.6 33.8499L26.5 23.9499L16.6 14.0499L18.75 11.8999L30.8 23.9499L18.75 35.9999Z" fill="#3F3D56"/>
</svg>
                                </div>
                           


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step3hosting