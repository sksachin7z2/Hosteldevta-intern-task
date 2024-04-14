import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { usePlacesWidget } from "react-google-autocomplete";
import Cookies from 'js-cookie'
import bg from '../../static/userdash.png'
import 'react-calendar/dist/Calendar.css';

import Calendar from 'react-calendar';
function UserDashboard({ host }) {
  const [Search, setSearch] = useState("")
  const [adults, setAdults] = useState(0)
  const [room, setRoom] = useState(0)
  const [children, setChildren] = useState(0)
  const [traveller, setTraveller] = useState(false)
  const [helper, setHelper] = useState(false)
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_MAPKEY,
    onPlaceSelected: (place) => {
      // console.log(place);
      console.log(place)
      // console.log(place.geometry.location.lat(),place.geometry.location.lng())
      // try {
      //   setLat(place.geometry.location.lat())
      //   setLon(place.geometry.location.lng())
      // } catch (error) {
      //   console.log(error)
      // }
      let obj=address
      place?.address_components.map((e,i)=>{
         obj=({...obj,[e.types[0]]:e.long_name})
          console.log(e.types[0],e.long_name)
          return ""
      })
      console.log(obj)
      setAddress(obj)
      setHelper(!helper)
    }
  });
  const [user, setUser] = useState("")
  const [price, setPrice] = useState(["0o0"])
  const [listings, setListings] = useState([])
  let navigate = useNavigate()

  const getroomdata = async () => {
    try {
      const fetch = await axios.post(`${host}/api/hosting/fetchglobalHosting`, {}, {
        headers: { "auth-token": Cookies.get('dorm--7z2__PMRW') }
      })

      const data = fetch.data

      let arr3 = data?.allhost?.map((e, i) => {
        for (var ind in e?.status) {
          if (e?.status[ind] === false) {
            return null;
          }
        }
        return e
      })
      let arr4 = await Promise.all(arr3)
      arr4 = arr4.filter(e => e != null)

console.log(arr4)
      setListings(arr4)
      setFilter(arr4)
      let arr1 = []
      console.log(data)
      data.allhost.map((e) => {
        let arr = []
        let obj = (e?.price)
        for (var i in obj) {
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
  const getdata = async () => {
    try {
      const fetch = await axios.post(`${host}/api/auth/getuser`, {}, {
        headers: { "auth-token": Cookies.get('dorm--7z2__PMRW') }
      })
      const data = fetch.data.user;
      setUser(data.name)
    } catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    // if(!Cookies.get('dorm--7z2__PMRW'))
    //   navigate('/login')
    getdata();
    getroomdata()
  }, [])
  function sideScroll(element, direction, speed, distance, step) {
    let scrollAmount = 0;
    var slideTimer = setInterval(function () {
      if (direction === 'left') {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  const handleslideleft = () => {
    let a = document.getElementById('slider')
    sideScroll(a, 'left', 25, 100, 10);
  }
  const handleslideright = () => {
    let a = document.getElementById('slider')
    sideScroll(a, 'right', 25, 100, 10);
  }
  const [value, onChange] = useState(new Date());
  const [value1, onChange1] = useState("");
  const [calendar, setCalendar] = useState(false)
  const [address, setAddress] = useState({country:"",administrative_area_level_1:"",locality:"",administrative_area_level_2:"",administrative_area_level_3:"",postal_code:"",addressl1:"",addressl2:"",neighborhood:""})

  const tileDisabled = ({ activeStartDate, date, view }) => {
    console.log(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), new Date().getHours() + 5, new Date().getMinutes() + 30, 0, 0));
    return date <= new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1, new Date().getHours(), new Date().getMinutes(), 0, 0)
  }
  const tileDisabled1 = ({ activeStartDate, date, view }) => {
    return date < new Date(value)
  }
  const [filter, setFilter] = useState([])
  const handlesearch=async()=>{
   
    let a=listings.map((e)=>{
        return e.rooms;
    })
    let arr1=await Promise.all(a)
    console.log(arr1)
   let arr2= arr1.map((e)=>{
    if(e.length===1)
    return e[0].nod
      let arr3=e.reduce((i,j)=>{
        return i.nod+j.nod
      })
      return arr3
    })
    let ans=await Promise.all(arr2)
console.log(ans)
if(document.getElementById('stay').value===""){
setFilter(listings)
return
}
const regex = new RegExp(Search, "i");
const matchingaddress = listings.filter( (e) => {
  const addressString=e.address.country+e.address.administrative_area_level_1+e.address.locality;
    return regex.test(addressString)
});



    setFilter(matchingaddress)
  }
  return (
    <div className='h-[90vh] mt-[10vh]'>
      <div className='h-[60vh] ' style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
        <div className='h-[60vh] backdrop-blur-[7.5px]  flex  items-center '>
          <div className='w-[80vw] m-auto '>
            <div className='text-[white] font-semibold text-[2rem]'>

              Welcome {user}!
            </div>
            <div className='text-white text-center my-2'>
              Fell the joy of staying at home away from home
            </div>
            <div>
              <div>
                <div class="relative">
                  <input  value={Search} onChange={(e)=>{setSearch(e.target.value)}}  type="text" id="stay" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 " placeholder=" " />
                  <label for="stay" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4 ">Where are you Staying ?</label>
                </div>
              </div>
              <div className='grid md:grid-cols-2 md:gap-5 gap-2 my-2'>
                <div>
                  <div class="relative">
                    <input onClick={() => setCalendar(true)} type="text" id="date" value={`${(typeof value === 'object') ? value.toDateString() + "-" : ""} ${(typeof value1 === 'object') ? "-" + value1.toDateString() : ""}`} class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label for="date" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4  ">Dates</label>
                    {calendar && <div style={{ zIndex: 20 }} className='absolute right-[-11%]'>
                      <div className='grid md:grid-cols-2  '>
                        <div className='bg-white py-2 rounded-md'>
                          <div className='text-center font-semibold rounded-md'>Arrival date</div>
                          <Calendar tileDisabled={tileDisabled} className="rounded-b-md  b-none" onChange={(e) => { onChange(e) }} value={value} />
                        </div>
                        <div className='bg-white py-2 rounded-md'>
                          <div className='text-center font-semibold rounded-md'>Departure date</div>
                          <Calendar tileDisabled={tileDisabled1} className="rounded-b-md b-none" onChange={(e) => { onChange1(e); setCalendar(false) }} value={value1} />
                        </div>

                      </div>
                    </div>}
                  </div>
                </div>
                <div>
                  <div class="relative">
                    <input onClick={() => {setTraveller(!traveller) ; setCalendar(false)}} type="text" id="traveller" class="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50  border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " value={`Adults-${adults} Children-${children} Room-${room}`} />
                    <label for="traveller" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-4  origin-[0] left-2.5 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Travellers</label>
                   { traveller&&<div className="absolute p-3 bg-white rounded-md w-[100%] md:w-[70%]">
                      <div>
                        <div className='flex justify-between items-center'>
                          <div className='text-[#3F3D56] font-semibold'>Adults</div>
                          <div className='my-2 flex gap-3'>

                            <div onClick={() => { if ((adults - 1) >= 0) setAdults(p => p - 1) }}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="25" fill="#FDFDFD" />
                              <circle cx="25" cy="25" r="24.5" stroke="#3F3D56" stroke-opacity="0.5" />
                              <path d="M21.3984 25.7383H29.6016V27.4961H21.3984V25.7383Z" fill="#3F3D56" fill-opacity="0.5" />
                            </svg>
                            </div>
                            <input className='w-[2.5rem] text-center' type="number" readOnly value={adults} min={0} />
                            <div onClick={() => { setAdults(e => e + 1) }}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56" />
                              <path d="M21.2852 24.5078H25.6211V20.1719H27.3789V24.5078H31.7148V26.2656H27.3789V30.6602H25.6211V26.2656H21.2852V24.5078Z" fill="#3F3D56" />
                            </svg></div>
                          </div>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='text-[#3F3D56] font-semibold'>Children-age 13+</div>
                          <div className='my-2 flex gap-3'>

                            <div onClick={() => { if ((children - 1) >= 0) setChildren(p => p - 1) }}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="25" fill="#FDFDFD" />
                              <circle cx="25" cy="25" r="24.5" stroke="#3F3D56" stroke-opacity="0.5" />
                              <path d="M21.3984 25.7383H29.6016V27.4961H21.3984V25.7383Z" fill="#3F3D56" fill-opacity="0.5" />
                            </svg>
                            </div>
                            <input className='w-[2.5rem] text-center' type="number" readOnly value={children} min={0} />
                            <div onClick={() => { setChildren(e => e + 1) }}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56" />
                              <path d="M21.2852 24.5078H25.6211V20.1719H27.3789V24.5078H31.7148V26.2656H27.3789V30.6602H25.6211V26.2656H21.2852V24.5078Z" fill="#3F3D56" />
                            </svg></div>
                          </div>
                        </div>
                        <div className='flex justify-between items-center'>
                          <div className='text-[#3F3D56] font-semibold'>Rooms</div>
                          <div className='my-2 flex gap-3'>

                            <div onClick={() => { if ((room - 1) >= 0) setRoom(p => p - 1) }}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="25" fill="#FDFDFD" />
                              <circle cx="25" cy="25" r="24.5" stroke="#3F3D56" stroke-opacity="0.5" />
                              <path d="M21.3984 25.7383H29.6016V27.4961H21.3984V25.7383Z" fill="#3F3D56" fill-opacity="0.5" />
                            </svg>
                            </div>
                            <input className='w-[2.5rem] text-center' type="number" readOnly value={room} min={0} />
                            <div onClick={() => { setRoom(e => e + 1) }}><svg width="24" height="24" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56" />
                              <path d="M21.2852 24.5078H25.6211V20.1719H27.3789V24.5078H31.7148V26.2656H27.3789V30.6602H25.6211V26.2656H21.2852V24.5078Z" fill="#3F3D56" />
                            </svg></div>
                          </div>
                        </div>
                      </div>

                    </div>}
                  </div>
                </div>
              </div>
              <div>
                <button onClick={handlesearch} className='rounded-full w-full bg-[#3F3D56] px-2 py-1 text-white'>Search</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className='w-[90vw] m-auto'>
        <div className='flex justify-between'>
          <div className='text-[1.5rem] text-[#3F3D56] font-semibold my-6'>
            Book Dorms at Popular Locations
          </div>
          <div className='flex items-center gap-3'>
            <svg onClick={handleslideleft} width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56" />
              <path d="M29.05 36.0004L17 23.9504L29.05 11.9004L31.2 14.0504L21.3 23.9504L31.2 33.8504L29.05 36.0004Z" fill="#3F3D56" />
            </svg>
            <svg onClick={handleslideright} width="30" height="30" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="24.5" fill="#FDFDFD" stroke="#3F3D56" />
              <path d="M20.75 37.0004L18.6 34.8504L28.5 24.9504L18.6 15.0504L20.75 12.9004L32.8 24.9504L20.75 37.0004Z" fill="#3F3D56" />
            </svg>


          </div>
        </div>

        <div style={{ display: "-webkit-box" }} className='overflow-x-scroll  m-auto gap-5 items-center' id='slider'>
          <div className='p-1 h-[35vh] sm:w-[200px] w-[285px] md:w-[150px]  rounded-md '>
            <div className='h-[80%] rounded-md' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=927&q=80")`, backgroundSize: "cover" }}>

            </div>
            <div className='my-1 text-[#3F3D56] text-center'>
              Bangalore
            </div>
          </div>
          <div className='p-1 h-[35vh] sm:w-[200px] w-[285px] md:w-[150px]  rounded-md '>
            <div className='h-[80%] rounded-md' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80")`, backgroundSize: "cover" }}>

            </div>
            <div className='my-1 text-[#3F3D56] text-center'>
              Chennai
            </div>
          </div>
          <div className='p-1 h-[35vh] sm:w-[200px] w-[285px] md:w-[150px]  rounded-md'>
            <div className='h-[80%] rounded-md' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80")`, backgroundSize: "cover" }}>

            </div>
            <div className='my-1 text-[#3F3D56] text-center'>
              Delhi
            </div>
          </div>
          <div className='p-1 h-[35vh] sm:w-[200px] w-[285px] md:w-[150px]  rounded-md'>
            <div className='h-[80%] rounded-md' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1536421469767-80559bb6f5e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a29sa2F0YXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60")`, backgroundSize: "cover" }}>

            </div>
            <div className='my-1 text-[#3F3D56] text-center'>
              Kolkata
            </div>
          </div>
          <div className='p-1 h-[35vh] sm:w-[200px] w-[285px] md:w-[150px]  rounded-md'>
            <div className='h-[80%] rounded-md' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1567157577867-05ccb1388e66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVtYmFpfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60")`, backgroundSize: "cover" }}>

            </div>
            <div className='my-1 text-[#3F3D56] text-center'>
              Mumbai
            </div>
          </div>
          <div className='p-1 h-[35vh] sm:w-[200px] w-[285px] md:w-[150px]  rounded-md'>
            <div className='h-[80%] rounded-md' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1594803205835-d121cb46e518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8R3V3YWhhdGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60")`, backgroundSize: "cover" }}>

            </div>
            <div className='my-1 text-[#3F3D56] text-center'>
              Guwahati
            </div>
          </div>
          <div className='p-1 h-[35vh] sm:w-[200px] w-[285px] md:w-[150px]  rounded-md'>
            <div className='h-[80%] rounded-md' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1597074866923-dc0589150358?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")`, backgroundSize: "cover" }}>

            </div>
            <div className='my-1 text-[#3F3D56] text-center'>
              Shimla
            </div>
          </div>
          <div className='p-1 h-[35vh] sm:w-[200px] w-[285px] md:w-[150px]  rounded-md'>
            <div className='h-[80%] rounded-md' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1562315921-ca0e98571219?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")`, backgroundSize: "cover" }}>

            </div>
            <div className='my-1 text-[#3F3D56] text-center'>
              Jorhat
            </div>
          </div>
          <div className='p-1 h-[35vh] sm:w-[200px] w-[285px] md:w-[150px]  rounded-md'>
            <div className='h-[80%] rounded-md' style={{ backgroundImage: `url("https://images.unsplash.com/photo-1561359313-0639aad49ca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFyYW5hc2l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60")`, backgroundSize: "cover" }}>

            </div>
            <div className='my-1 text-[#3F3D56] text-center'>
              Varanasi
            </div>
          </div>
        </div>
      </section>
      <section className='mt-7 pb-7'>
        <div className='w-[90vw] m-auto'>
          <div className='text-[#3F3D56] text-[1.5rem] mb-4 font-semibold'>
            All Listed Dormitory
          </div>

          <div className='grid md:grid-cols-4 grid-cols-1 gap-3'>
            {
              filter.map((e, i) => {
                return (
                  <div onClick={() => navigate(`/detail/${e.id}`)} className=' h-[50vh] cursor-pointer rounded w-[]'>
                    <div className='h-[60%] rounded-md' style={{ backgroundImage: `url(${e?.photos[0]})`, backgroundSize: "cover" }}>

                    </div>
                    <div className='text-md font-semibold my-1'>
                      {e.title ? e.title : "No title"}
                    </div>
                    <div>
                      {e?.address?.locality},{e?.address?.administrative_area_level_1},{e?.address?.country}
                    </div>
                    <div>
                      <div className='text-[#3F3D56] text-sm mt-2'>
                        Price
                      </div>
                      <div className='flex gap-2'>
                        <div className='flex gap-2 items-center'>
                          <div>
                            <svg width='1rem' height='1rem' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M7 5H12C14.2091 5 16 6.79086 16 9V9C16 11.2091 14.2091 13 12 13H9L15 19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M6 5L18 5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M8 9L18 9" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                          </div>
                          <div className='font-bold text-md'>
                            {price?.at(i).at(0)?.split('o')[1]}
                          </div>


                        </div>
                        <div className='text-[1rem] text-[#3F3D56]'>
                          per night
                        </div>
                      </div>
                      <div>
                        <div className='text-[#3F3D56] font-semibold text-md'>in   {price?.at(i).at(0)?.split('o')[0]} beds dorm</div>

                      </div>

                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>

      </section>

    </div>
  )
}

export default UserDashboard