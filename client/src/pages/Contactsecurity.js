
import React,{useState,useEffect} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie';
function Contactsecurity({host}) {
    const [status, setStatus] = useState({'1':false,'2':false,'3':false,'4':false,'5':false,'6':false,'7':false})
    let navigate=useNavigate();
    let location=useLocation();
    // const [contacts, setcontacts] = useState([{contact:""}])
    let params=location.pathname.split('/')[2];
    const [security, setSecurity] = useState({camera:false,animals:false,watchman:false,fireextinguiser:false})
    const [contact, setContact] = useState([{contact:""}])

    const getroomdata=async()=>{
        try {
            const fetch=await axios.post(`${host}/api/hosting/fetchHosting/${params}`,{},{
                headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
            })
            const data=fetch.data;
            console.log(data)
            setSecurity(data.host.security)
            setContact(data.host.contact)
            setStatus(data?.host?.status)
        } catch (error) {
            console.log(error)
        }
      
      }
      useEffect(() => {
       getroomdata();
    
      }, [])
const [helper, setHelper] = useState(false)
    const handleadd=()=>{
        const n=contact;
        let obj={
            contact:""
        }
        n.push(obj);
        setContact(n);
        setHelper(!helper)
    }
    const handlechangecontact=(e,i)=>{
            let arr=contact;
            arr[i].contact=e.target.value;
            setContact(arr);
            setHelper(!helper)
    }
    const handlenext=async()=>{

        try {
            let obj=status;
        obj['3']=true;
        console.log(obj)
        if(contact[0].contact!==""){
            const updaterooms=await axios.put(`${host}/api/hosting/updateHosting/${params}`,{security:security,contact:contact,status:obj},{
                headers:{
                    "auth-token":Cookies.get('dorm--7z2__PMRW')
                }
            })
            console.log(updaterooms.data)
            
            navigate(`/hosting/${params}/review-listing`)
        }
        else
        alert("Enter contact number")
        } catch (error) {
            console.log(error)
        }
    
    }
    const handlechange=(e)=>{
            setSecurity({...security,[e.target.name]:e.target.checked})
    }
const handledeletefield=(i)=>{
    let arr=contact;
    delete arr[i]
let ans=arr.filter((e)=>e!=undefined)
    setContact(ans)
    setHelper(!helper)

}
  return (
    <div>
  <div>
      <div className='h-[85vh]' >
          <div className='h-[85vh] bg-[#FFFFFF30] ' >
              <div className='h-[75vh] flex justify-center mt-[15vh] overflow-y-scroll'>
                  <div className='w-[70vw]'>
                      <div onClick={()=>console.log(security,contact)} className='text-[2rem] text-[#3F3D56] font-semibold text-center'>Security</div>
                      <div className='text-center text-[1.2rem] text-[#3F3D56] mb-6'>Chack the appropriate ammeneties</div>
                    <div className='flex justify-center'>
                        <div>

                       
                    <div class="flex items-center mb-4">
    <input id="camera" type="checkbox" checked={security.camera} onChange={handlechange} name='camera' class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "/>
    <label htmlFor="camera" class="ml-2 text-[1.2rem] font-medium text-gray-900 ">Surveillance cameras</label>
</div>
<div class="flex items-center mb-4">
    <input id="animals" type="checkbox" name='animals' checked={security.animals}  onChange={handlechange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
    <label htmlFor="animals" class="ml-2 text-[1.2rem] font-medium text-gray-900 ">Animals</label>
</div>
<div class="flex items-center mb-4">
    <input id="watchman" name='watchman' type="checkbox" checked={security.watchman}  onChange={handlechange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
    <label for="watchman" class="ml-2 text-[1.2rem] font-medium text-gray-900 ">Watchman</label>
</div>
<div class="flex items-center mb-4">
    <input id="fireextinguiser" name='fireextinguiser' type="checkbox"  checked={security.fireextinguiser}  onChange={handlechange}  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "/>
    <label for="fireextinguiser" class="ml-2 text-[1.2rem] font-medium text-gray-900 ">Fire-extinguiser</label>
</div>
</div>
                    </div>
                    <div className='text-[2rem] text-[#3F3D56] text-center font-semibold mb-5'>
                        Contacts
                    </div>
                    <div className='space-y-3'>
                            {
                                contact.map((e,i)=>{
                                return (
                                    <div className='flex gap-3 items-center justify-center'>
                                        <div className='text-center'>
                                        <input className='border border-[#3F3D56] rounded py-1 px-2' type="number" value={e.contact} name={`contact${i}`} id={i} onChange={(e)=>handlechangecontact(e,i)}/>
                                        </div>
                                        <div onClick={()=>handledeletefield(i)}>
                                        <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="Menu / Close_MD">
<path id="Vector" d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g></svg>
                                        </div>
                                       
                                    </div>
                                )
                                })
                            }
                    </div>
                    <div>
                    <div className='mt-5 flex gap-3 cursor-pointer justify-center' onClick={handleadd}><svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

<title/>

<g id="Complete">

<g id="add-square">

<g>

<rect data-name="--Rectangle" fill="none" height="20" id="_--Rectangle" rx="2" ry="2" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"  width="20" x="2" y="2"/>

<line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"  x1="15.5" x2="8.5" y1="12" y2="12"/>

<line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"  x1="12" x2="12" y1="15.5" y2="8.5"/>

</g>

</g>

</g>

</svg><div> Add More</div></div>
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

export default Contactsecurity