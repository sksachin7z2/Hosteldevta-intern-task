import React,{useState,useEffect} from 'react'
// import DragDropFile from '../components/Dragndrop';
import {useNavigate,useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import Saveexit from '../components/Saveexit'
function ReviewListing({host}) {
    const [details, setDetails] = useState({})
    const [price, setPrice] = useState(["0o0"])
    let navigate=useNavigate();
    let location=useLocation();
   
    let params=location.pathname.split('/')[2];
  
      const handlenext=async()=>{
         
              navigate(`/hosting/${params}/congratulation`)
      
      
      }
    const getroomdata=async()=>{
      try {
          const fetch=await axios.post(`${host}/api/hosting/fetchHosting/${params}`,{},{
              headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
          })
          const data=fetch.data;
          console.log(data.host.photos[0])
         setDetails(data)
         let arr=[]
         for(var i in data.host.price){
            arr.push(`${i}o${data.host.price[i]}`)
         }
         setPrice(arr)
      } catch (error) {
          console.log(error)
      }
    
    }
    useEffect(() => {
     getroomdata();
  
    }, [])
    return (
        <div>
            <div>
           
                <div className='h-[85vh]' >
                    <div className='h-[85vh] bg-[#FFFFFF30] ' >
                        <div className='h-[75vh] flex justify-center mt-[15vh] overflow-y-scroll'>
                            <div className='w-[70vw]'>
                                <div className='text-[2rem] text-[#3F3D56] font-semibold text-center'>Review your listing</div>
                                <div className='text-center text-[1.2rem] text-[#3F3D56] mb-6'>Here's what guests will see. Make sure everything looks good.</div>
                                <div className='grid md:grid-cols-2 gap-4'>
                                    <div>
                                        <div className='text-[1.5rem] mb-4 text-[#3F3D56] font-semibold'>
                                            What's next?
                                        </div>
                                        <div >
                                            <div>
                                                <div className='flex  items-center gap-2'>
                                                <svg className='hidden md:block' width="1.3rem" height="1.3rem" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.15 31.55L35 17.7L32.85 15.55L21.15 27.25L15.1 21.2L13 23.3L21.15 31.55ZM9 42C8.175 42 7.46875 41.7062 6.88125 41.1188C6.29375 40.5312 6 39.825 6 39V9C6 8.175 6.29375 7.46875 6.88125 6.88125C7.46875 6.29375 8.175 6 9 6H19.25C19.4167 4.83333 19.95 3.875 20.85 3.125C21.75 2.375 22.8 2 24 2C25.2 2 26.25 2.375 27.15 3.125C28.05 3.875 28.5833 4.83333 28.75 6H39C39.825 6 40.5312 6.29375 41.1188 6.88125C41.7062 7.46875 42 8.175 42 9V39C42 39.825 41.7062 40.5312 41.1188 41.1188C40.5312 41.7062 39.825 42 39 42H9ZM9 39H39V9H9V39ZM24 8.15C24.4667 8.15 24.875 7.975 25.225 7.625C25.575 7.275 25.75 6.86667 25.75 6.4C25.75 5.93333 25.575 5.525 25.225 5.175C24.875 4.825 24.4667 4.65 24 4.65C23.5333 4.65 23.125 4.825 22.775 5.175C22.425 5.525 22.25 5.93333 22.25 6.4C22.25 6.86667 22.425 7.275 22.775 7.625C23.125 7.975 23.5333 8.15 24 8.15Z" fill="#3F3D56"/>
</svg> <div className='text-[1.2rem] font-semibold text-[#3F3D56]'>
                                            Confirm few more details and publish
                                            </div>
                                                </div>
                                         

                                            </div>
                                           
                                            <div className='text-[1rem]  text-[#3F3D56]'>
                                            We'll let you know if you need to verify your identity.
                                            </div>
                                        </div>
                                        <div className='my-[2rem]'>
                                            <div>
                                                <div className='flex  items-center gap-2'>
                                                <svg className='hidden md:block' width="1.3rem" height="1.3rem" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 44C8.2 44 7.5 43.7 6.9 43.1C6.3 42.5 6 41.8 6 41V10C6 9.2 6.3 8.5 6.9 7.9C7.5 7.3 8.2 7 9 7H12.25V4H15.5V7H32.5V4H35.75V7H39C39.8 7 40.5 7.3 41.1 7.9C41.7 8.5 42 9.2 42 10V25.05H39V19.5H9V41H24.95V44H9ZM44.45 33.05L40.9 29.5L42.35 28.05C42.627 27.7833 42.9796 27.65 43.4078 27.65C43.8359 27.65 44.1833 27.7833 44.45 28.05L45.9 29.5C46.1667 29.777 46.3 30.1296 46.3 30.5578C46.3 30.9859 46.1667 31.3333 45.9 31.6L44.45 33.05ZM27.95 46V42.45L38.75 31.65L42.3 35.2L31.5 46H27.95ZM9 16.5H39V10H9V16.5Z" fill="#3F3D56"/>


</svg> <div className='text-[1.2rem] font-semibold text-[#3F3D56]'>
Set up your calendar
                                            </div>
                                                </div>
                                         

                                            </div>
                                           
                                            <div className='text-[1rem]  text-[#3F3D56]'>
                                            Choose which dates your listing is available. It will be visible after 24 hours of your publish.
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                <div className='flex  items-center gap-2'>
                                                <svg className='hidden md:block' width="1.3rem" height="1.3rem" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24 42V38.45L34.8 27.65L38.35 31.2L27.55 42H24ZM6 31.5V28.5H21V31.5H6ZM40.5 29.05L36.95 25.5L38.4 24.05C38.6667 23.7833 39.0167 23.65 39.45 23.65C39.8833 23.65 40.2333 23.7833 40.5 24.05L41.95 25.5C42.2167 25.7667 42.35 26.1167 42.35 26.55C42.35 26.9833 42.2167 27.3333 41.95 27.6L40.5 29.05ZM6 23.25V20.25H29.5V23.25H6ZM6 15V12H29.5V15H6Z" fill="#3F3D56"/>
</svg>
 <div className='text-[1.2rem] font-semibold text-[#3F3D56]'>
Adjust your settings
                                            </div>
                                                </div>
                                         

                                            </div>
                                           
                                            <div className='text-[1rem]  text-[#3F3D56]'>
                                            Set dorm rules, select a cancellation policy, choose how guests book or more.
                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <div className='p-5 relative shadow-md'>
                                    
                                        <div>
                                            <div className='w-[full] relative'>
                                                <img src={details?.host?.photos[0]} className='w-full rounded-md' alt="" />
                                                <div onClick={()=>navigate(`/hosting/${params}/about-your-dorm`)} className="absolute top-1 left-1 py-1 px-2 rounded-full bg-white shadow">
                                            view and edit details
                                        </div>
                                            </div>

                                            <div>
                                                <div>

                                                </div>
                                                <div className='text-[#3F3D56] text-lg mt-2 font-bold'>
                                                    {details?.host?.title}
                                                </div>
                                                <div className='text-[#3F3D56] text-[1.5rem] mt-2'>
                                                    Price
                                                </div>
                                                <div className='flex gap-2'>
                                                <div className='flex gap-2 items-center'>
                                                    <div>
                                                    <svg width='1.2rem' height='1.2rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 5H12C14.2091 5 16 6.79086 16 9V9C16 11.2091 14.2091 13 12 13H9L15 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 5L18 5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 9L18 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                    </div>
                                                    <div className='font-bold text-[1.2rem]'>
                                                    {
                                                   price?.at(0)?.split('o')[1]
                                                }
                                                    </div>
                                               
                                                
                                                </div>
                                                <div className='text-[1.2rem] text-[#3F3D56]'>
                                                    per night
                                                </div>
                                                </div>
                                                <div>
                                                    <div className='text-[#3F3D56] font-semibold text-lg'>in {price[0].split('o')[0]} beds dorm</div>
                                                    
                                                </div>
                                               
                                               

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='h-[10vh]'>
                            <div className='h-[10vh] flex justify-between items-center'>
                                <div>
                                    <div className='flex'>
                                        <svg width="48" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M28.05 35.9999L16 23.9499L28.05 11.8999L30.2 14.0499L20.3 23.9499L30.2 33.8499L28.05 35.9999Z" fill="#3F3D56" />
                                        </svg>

                                        <button onClick={()=>{navigate(`/hosting/${params}/set-a-price`)}} type="button" className="text-[#3F3D56] bg-white  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Back</button>
                                    </div>

                                </div>
                                <div>
                                    <div className='flex'>
                                        <button onClick={handlenext} type="button" className="text-white bg-[#3F3D56]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ">Next</button>
                                        <svg width="48" height="30" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.75 35.9999L16.6 33.8499L26.5 23.9499L16.6 14.0499L18.75 11.8999L30.8 23.9499L18.75 35.9999Z" fill="#3F3D56" />
                                        </svg>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewListing