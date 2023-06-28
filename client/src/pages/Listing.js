import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import bg from '../static/placeholder.png'
function Listing({host}) {
  let navigate=useNavigate()
    const [listings, setListings] = useState([])
    const [pending, setPending] = useState([])
    const [price, setPrice] = useState(["0o0"])
    const getlistings=async()=>{
        try {
            const fetch=await axios.post(`${host}/api/hosting/fetchallHosting`,{},{
                headers:{
                    'auth-token':Cookies.get('dorm--7z2__PMRW')
                }
            });
            const data=fetch.data
            let arr= data?.allhost?.map((e,i)=>{
                for(var ind in e?.status){
                    if(e?.status[ind]===false){
                        return e;
                    }
                }
                return null
            })
            let arr2=await Promise.all(arr)
                arr2=arr2.filter(e=>e!=null)
            let arr3= data?.allhost?.map((e,i)=>{
                for(var ind in e?.status){
                    if(e?.status[ind]===false){
                        return null;
                    }
                }
                return e
            })
            let arr4=await Promise.all(arr3)
                arr4=arr4.filter(e=>e!=null)
            
            setPending(arr2)
            setListings(arr4)
            let arr1=[]
            console.log(data)
            data.allhost.map((e,i)=>{
                let arr=[]
                let obj=(e?.price)
                for(var i in obj){
                   arr.push(`${i}o${e?.price[i]}`)
                }
                arr1.push(arr)
            })
           console.log(arr1)
            setPrice(arr1)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
    
        getlistings()

    }, [])
    
  return (
    <div className='mt-[15vh]'>
            <div className='w-[70vw] m-auto'>
                <div className='text-[#3F3D56] text-[2rem] font-semibold'>
                    All Dorm Listings
                </div>
                <div className='text-[#3F3D56] text-[1.2rem] my-5 font-semibold'>Pending Listing</div>
                <div className='grid md:grid-cols-3 gap-2'>
                    {
                       pending.map((e,i)=>{
return (
                        <div onClick={()=>navigate(`/hosting/${e.id}/about-your-dorm`)} className='cursor-pointer rounded p-5 shadow'>
                          
                         <div className='text-[#3F3D56]'>Pending Listing</div>
                         <div className='text-red-600'>Complete details to host</div>
                            <div className='my-3'>
                                {e.title?e.title:"No title"}
                            </div>
                            <div>
                          
                                           
                                                <div>

                         
                                                </div>
                            </div>
                        
                        </div>
)
                        })
                    }
                </div>

                <div className='text-[#3F3D56] text-[1.2rem] my-5 font-semibold'>Hosted Listing</div>
                <div className='grid md:grid-cols-3 gap-2'>
                    {
                        listings.map((e,i)=>{
return (
                        <div onClick={()=>navigate(`/hosting/${e.id}/about-your-dorm`)} className='cursor-pointer rounded p-5 shadow'>
                            <div>
                                <img  src={e.photos[0]} alt="" />
                            </div>
                            <div className='text-[1.2rem] font-semibold my-3'>
                                {e.title?e.title:"No title"}
                            </div>
                            <div>
                            <div className='text-[#3F3D56] text-[1.5rem] mt-2'>
                                                    Price
                                                </div>
                                                <div className='flex gap-2'>
                                                <div className='flex gap-2 items-center'>
                                                    <div>
                                                    <svg width='1.2rem' height='1.2rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 5H12C14.2091 5 16 6.79086 16 9V9C16 11.2091 14.2091 13 12 13H9L15 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 5L18 5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 9L18 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                    </div>
                                                    <div className='font-bold text-[1.1rem]'>
                                                    { price?.at(i).at(0)?.split('o')[1]}
                                                    </div>
                                               
                                                
                                                </div>
                                                <div className='text-[1rem] text-[#3F3D56]'>
                                                    per night
                                                </div>
                                                </div>
                                                <div>
                                                    <div className='text-[#3F3D56] font-semibold text-lg'>in   { price?.at(i).at(0)?.split('o')[0]} beds dorm</div>
                                                    
                                                </div>
                                                <div>

                         
                                                </div>
                            </div>
                        </div>
)
                        })
                    }
                </div>
            </div>
    </div>
  )
}

export default Listing