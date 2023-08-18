import React,{useState,useEffect} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import bg from '../static/placeholder.png'
function Listing({host}) {
  let navigate=useNavigate()
    const [listings, setListings] = useState([])
    const [pending, setPending] = useState([])
   const setActive=(e,i)=>{
        let a=document.getElementById(e.id+i)
        if(a.classList.contains('hidden')){
        a.classList.add('block')
        a.classList.remove('hidden')
        }
        else{
            a.classList.add('hidden')
            a.classList.remove('block')
        }
   }
    const [price, setPrice] = useState(["0o0"])
    const handledelete=async(e,i)=>{
        console.log(e.id,Cookies.get('dorm--7z2__PMRW'))
            const d=await axios.post(`${host}/api/hosting/deleteHosting/${e.id}`,{},{
                headers:{
                    'auth-token':Cookies.get('dorm--7z2__PMRW')
                }
            });
            const data=d.data
            console.log(data)
            getlistings()
    }
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
            data.allhost.map((e)=>{
                let arr=[]
                let obj=(e?.price)
                for(var i in obj){
                   arr.push(`${i}o${e?.price[i]}`)
                }
                arr1.push(arr)
                return ""
            })
            arr1=arr1.filter(e=>e.length!==0)
           console.log(arr1)
            setPrice(arr1)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if(!Cookies.get('dorm--7z2__PMRW'))
        navigate('/login')
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
                        <div  className='cursor-pointer rounded p-5 shadow'>
                          
                         <div className='text-[#3F3D56]'>Pending Listing</div>
                         <div className='text-red-600'>Complete details to host</div>
                            <div className='my-3 flex w-full justify-between'>
                                <div>
                                {e.title?e.title:"No title"}

                                </div>
                                <div onClick={()=>{setActive(e,i)}} className='relative'>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                                              
<div className="hidden  absolute right-2" id={e.id+i}>

<div className='rounded-md p-5 space-y-3 bg-[#79769A] text-white'>
  <div onClick={()=>navigate(`/hosting/${e.id}/about-your-dorm`)} className='flex gap-2 items-center'>
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99999 7.9834C7.26666 7.9834 6.66666 7.75007 6.19999 7.2834C5.73332 6.81673 5.49999 6.21673 5.49999 5.4834C5.49999 4.75007 5.73332 4.15007 6.19999 3.6834C6.66666 3.21673 7.26666 2.9834 7.99999 2.9834C8.73332 2.9834 9.33332 3.21673 9.79999 3.6834C10.2667 4.15007 10.5 4.75007 10.5 5.4834C10.5 6.21673 10.2667 6.81673 9.79999 7.2834C9.33332 7.75007 8.73332 7.9834 7.99999 7.9834ZM2.66666 13.3334V11.7667C2.66666 11.3445 2.77221 10.9834 2.98332 10.6834C3.19443 10.3834 3.46666 10.1556 3.79999 10.0001C4.54443 9.66673 5.25832 9.41673 5.94166 9.25007C6.62499 9.0834 7.3111 9.00007 7.99999 9.00007C8.68888 9.00007 9.37221 9.08618 10.05 9.2584C10.7278 9.43062 11.4384 9.67892 12.182 10.0033C12.5298 10.1603 12.8086 10.3878 13.0185 10.6861C13.2284 10.9843 13.3333 11.3445 13.3333 11.7667V13.3334H2.66666ZM3.66666 12.3334H12.3333V11.7667C12.3333 11.589 12.2805 11.4195 12.175 11.2584C12.0694 11.0973 11.9389 10.9778 11.7833 10.9001C11.0722 10.5556 10.4222 10.3195 9.83332 10.1917C9.24443 10.064 8.63332 10.0001 7.99999 10.0001C7.36666 10.0001 6.74999 10.064 6.14999 10.1917C5.54999 10.3195 4.89999 10.5556 4.19999 10.9001C4.04443 10.9778 3.91666 11.0973 3.81666 11.2584C3.71666 11.4195 3.66666 11.589 3.66666 11.7667V12.3334ZM7.99999 6.9834C8.43332 6.9834 8.79166 6.84173 9.07499 6.5584C9.35832 6.27507 9.49999 5.91673 9.49999 5.4834C9.49999 5.05007 9.35832 4.69173 9.07499 4.4084C8.79166 4.12507 8.43332 3.9834 7.99999 3.9834C7.56666 3.9834 7.20832 4.12507 6.92499 4.4084C6.64166 4.69173 6.49999 5.05007 6.49999 5.4834C6.49999 5.91673 6.64166 6.27507 6.92499 6.5584C7.20832 6.84173 7.56666 6.9834 7.99999 6.9834Z" fill="#FDFDFD"/>
</svg>
<div>
<div>Preview & Edit</div>

</div>
  
  </div>
  <div onClick={()=>{handledelete(e,i)}} className='flex items-center gap-2'>
  <svg fill="white" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M22,17 L22,19 L8,19 L8,17 L22,17 Z M22,11 L22,13 L8,13 L8,11 L22,11 Z M22,5 L22,7 L8,7 L8,5 L22,5 Z M4,20 C2.8954305,20 2,19.1045695 2,18 C2,16.8954305 2.8954305,16 4,16 C5.1045695,16 6,16.8954305 6,18 C6,19.1045695 5.1045695,20 4,20 Z M4,14 C2.8954305,14 2,13.1045695 2,12 C2,10.8954305 2.8954305,10 4,10 C5.1045695,10 6,10.8954305 6,12 C6,13.1045695 5.1045695,14 4,14 Z M4,8 C2.8954305,8 2,7.1045695 2,6 C2,4.8954305 2.8954305,4 4,4 C5.1045695,4 6,4.8954305 6,6 C6,7.1045695 5.1045695,8 4,8 Z"></path> </g></svg>
    <div>
<div>
Delete
</div>
  
    </div>
  </div>



</div>
</div>
                                </div>
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
                <div className='grid md:grid-cols-3 gap-2 mb-7'>
                    {
                        listings.map((e,i)=>{
return (
                        <div  className='h-[50vh] cursor-pointer rounded p-5 shadow'>
                            <div className='h-[60%] rounded-md' style={{ backgroundImage: `url(${e?.photos[0]})`, backgroundSize: "cover" }}>
                                
                            </div>
                            <div className='my-3 flex w-full justify-between'>
                                <div>
                                {e.title?e.title:"No title"}

                                </div>
                                <button onClick={()=>setActive(e,i)}  className='relative'>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                              
<div className="hidden  absolute right-2" id={e.id+i}>

        <div className='rounded-md p-5 space-y-3 bg-[#79769A] text-white'>
          <div onClick={()=>navigate(`/hosting/${e.id}/about-your-dorm`)} className='flex gap-2 items-center'>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99999 7.9834C7.26666 7.9834 6.66666 7.75007 6.19999 7.2834C5.73332 6.81673 5.49999 6.21673 5.49999 5.4834C5.49999 4.75007 5.73332 4.15007 6.19999 3.6834C6.66666 3.21673 7.26666 2.9834 7.99999 2.9834C8.73332 2.9834 9.33332 3.21673 9.79999 3.6834C10.2667 4.15007 10.5 4.75007 10.5 5.4834C10.5 6.21673 10.2667 6.81673 9.79999 7.2834C9.33332 7.75007 8.73332 7.9834 7.99999 7.9834ZM2.66666 13.3334V11.7667C2.66666 11.3445 2.77221 10.9834 2.98332 10.6834C3.19443 10.3834 3.46666 10.1556 3.79999 10.0001C4.54443 9.66673 5.25832 9.41673 5.94166 9.25007C6.62499 9.0834 7.3111 9.00007 7.99999 9.00007C8.68888 9.00007 9.37221 9.08618 10.05 9.2584C10.7278 9.43062 11.4384 9.67892 12.182 10.0033C12.5298 10.1603 12.8086 10.3878 13.0185 10.6861C13.2284 10.9843 13.3333 11.3445 13.3333 11.7667V13.3334H2.66666ZM3.66666 12.3334H12.3333V11.7667C12.3333 11.589 12.2805 11.4195 12.175 11.2584C12.0694 11.0973 11.9389 10.9778 11.7833 10.9001C11.0722 10.5556 10.4222 10.3195 9.83332 10.1917C9.24443 10.064 8.63332 10.0001 7.99999 10.0001C7.36666 10.0001 6.74999 10.064 6.14999 10.1917C5.54999 10.3195 4.89999 10.5556 4.19999 10.9001C4.04443 10.9778 3.91666 11.0973 3.81666 11.2584C3.71666 11.4195 3.66666 11.589 3.66666 11.7667V12.3334ZM7.99999 6.9834C8.43332 6.9834 8.79166 6.84173 9.07499 6.5584C9.35832 6.27507 9.49999 5.91673 9.49999 5.4834C9.49999 5.05007 9.35832 4.69173 9.07499 4.4084C8.79166 4.12507 8.43332 3.9834 7.99999 3.9834C7.56666 3.9834 7.20832 4.12507 6.92499 4.4084C6.64166 4.69173 6.49999 5.05007 6.49999 5.4834C6.49999 5.91673 6.64166 6.27507 6.92499 6.5584C7.20832 6.84173 7.56666 6.9834 7.99999 6.9834Z" fill="#FDFDFD"/>
</svg>
<div>
  <div to='/profile'>Preview & Edit</div>

</div>
          
          </div>
          <div onClick={()=>{handledelete(e,i)}} className='flex items-center gap-2'>
          <svg fill="white" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="white" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" d="M22,17 L22,19 L8,19 L8,17 L22,17 Z M22,11 L22,13 L8,13 L8,11 L22,11 Z M22,5 L22,7 L8,7 L8,5 L22,5 Z M4,20 C2.8954305,20 2,19.1045695 2,18 C2,16.8954305 2.8954305,16 4,16 C5.1045695,16 6,16.8954305 6,18 C6,19.1045695 5.1045695,20 4,20 Z M4,14 C2.8954305,14 2,13.1045695 2,12 C2,10.8954305 2.8954305,10 4,10 C5.1045695,10 6,10.8954305 6,12 C6,13.1045695 5.1045695,14 4,14 Z M4,8 C2.8954305,8 2,7.1045695 2,6 C2,4.8954305 2.8954305,4 4,4 C5.1045695,4 6,4.8954305 6,6 C6,7.1045695 5.1045695,8 4,8 Z"></path> </g></svg>
            <div>
<div to='/listings'>
Delete
</div>
          
            </div>
          </div>
   
       

        </div>
      </div>
                            
                                </button>
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