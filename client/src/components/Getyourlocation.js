import React,{useState,useEffect} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios'
import Autocomplete from "react-google-autocomplete";
import Cookies from 'js-cookie';
import { useNavigate,useLocation } from 'react-router-dom';
import { usePlacesWidget } from "react-google-autocomplete";
const mapStyles = {
  width: '100%',
  height: '100%',
  
};
const containerStyle={
  position:"relative",
  height:"50vh",
  width:"100%",
  
}

const MapContainer=({google,lat,lon,setLon,setLat,getlocation,host,address,setAddress,setStatus})=> {
  const [own, setOwn] = useState(false)
  // const [address, setAddress] = useState([])
let navigate=useNavigate()
let location=useLocation();
let params=location.pathname.split('/')[2];
const locateonmap=async()=>{
  try {
    const fetch=await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?components=route:${address.route}|neighborhood:${address.neighborhood}|administrative_area_1:${address.administrative_area_1}|administrative_area_2:${address.administrative_area_2}|administrative_area_3:${address.administrative_area_3}|locality:${address.locality}|country:${address.country}|postal_code:${address.postal_code}&key=${process.env.REACT_APP_MAPKEY}`)
const data=fetch.data
console.log(data)
setLat(data?.results[0]?.geometry?.location?.lat)
setLon(data?.results[0]?.geometry?.location?.lng)
    
  } catch (error) {
    console.log(error)
  }

}
  const getroomdata=async()=>{
    try {
        const fetch=await axios.post(`${host}/api/hosting/fetchHosting/${params}`,{},{
            headers:{"auth-token":Cookies.get('dorm--7z2__PMRW')}
        })
        const data=fetch.data;
        console.log(data)
        setAddress(data.host.address)
        setStatus(data?.host?.status)
    } catch (error) {
        console.log(error)
    }
  
  }
  useEffect(() => {
   getroomdata();

  }, [])

  // const [address, setAddress] = useState({country:"",administrative_area_level_1:"",locality:"",administrative_area_level_2:"",administrative_area_level_3:"",postal_code:"",addressl1:"",addressl2:"",neighborhood:""})
// const [place, setplace] = useState(second)
const handlechange=(e)=>{
setAddress({...address,[e.target.name]:e.target.value})
}
const handlemapclick=async(r,e,w)=>{
  console.log(r,e,w);
  setLat(w.latLng.lat());
  setLon(w.latLng.lng());
  try {
    const fetch= await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${w.latLng.lat()},${w.latLng.lng()}&key=${process.env.REACT_APP_MAPKEY}`)
    const data=fetch.data;
    console.log(data)
    let obj={country:"",administrative_area_level_1:"",locality:"",administrative_area_level_2:"",administrative_area_level_3:"",postal_code:""}
    data.results[0].address_components.map((e,i)=>{
       obj=({...obj,[e.types[0]]:e.long_name})
        console.log(e.types[0],e.long_name)
    })
    setAddress(obj)
  } catch (error) {
    console.log(error)
  }
}
  // const { ref, autocompleteRef } = usePlacesWidget({
  //   apiKey:process.env.REACT_APP_MAPKEY,
  //   onPlaceSelected: (place) => {
  //     // console.log(place);
  //     console.log(place)
  //     // console.log(place.geometry.location.lat(),place.geometry.location.lng())
  //     try {
  //       setLat(place.geometry.location.lat())
  //       setLon(place.geometry.location.lng())
  //     } catch (error) {
  //       console.log(error)
  //     }
   
  //   }
  // });

    return (
       <>
       <div className='md:mx-[15vw] mx-5  '>
       <Map
       center={{
        lat: lat,
        lng: lon
      }}
       onClick={(r,e,w)=>{handlemapclick(r,e,w)}}
       containerStyle={containerStyle}
        google={google}
        zoom={14}
        style={mapStyles}
        
        initialCenter={{
          lat: lat,
          lng: lon
        }}
       
      >
        
        <Marker onClick={(r,t,e)=>{console.log(r);setLat(r.mapCenter.lat);setLon(r.mapCenter.lng)}}
                name={'Current location'}
                // draggable={true}
               
                position={{lat: lat, lng: lon}}
                 />
             
      </Map>
      {/* <Autocomplete
  apiKey="AIzaSyBRPX04XfjCp7A7_14Vw-Np9m5EiCawsQE"
  onPlaceSelected={(place) => {
    console.log(place);
  }}
/> */}
    <div onClick={()=>{setOwn(true)}} onMouseOut={()=>{setOwn(false)}} className=' my-5'>
<div  className='flex justify-start items-center w-[100%]'>
            <div className='flex gap-3 items-center w-[100%]'>
            <input  type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            "  placeholder="Enter your address" required/>
           
           <div className='right-[4%] top-[25%]'>

<button onClick={()=>{getlocation();}}><svg width='30' height='30' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12Z" stroke="#323232" stroke-width="2"></path> <path d="M19 12H21" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3 12H5" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 19L12 21" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 3L12 5" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#323232" stroke-width="2"></path> </g></svg></button>

       </div>
       <div>
        <div>
        </div>
       </div>
            </div>
           
      
        </div>
        <div>
          
       <div className='my-4'>
       <div className='text-[1.5rem] text-[#3F3D56] font-semibold '>Enter your address
        
        </div>
        <div>Click on map to get the address</div>
       </div>
        
        <div class="relative space-y-3">
          
          <div className='relative border rounded-md border-[#3F3D56]'>
          <input name='country' onChange={handlechange} value={address.country} type="text" id="floating_outlined1" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined1" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Country</label>
          </div>
   

<div className='relative border  rounded-md border-[#3F3D56]'>
<input value={address.neighborhood} onChange={handlechange} name='neighborhood' type="text" id="floating_outlined2" class=" block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined2" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Street or Building</label>

</div>
    <div className="relative border   rounded-md border-[#3F3D56]">
    <input value={address.addressl1} onChange={handlechange} name='addressl1' type="text" id="floating_outlined3" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined3" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 1</label>
    </div>
   
<div className="relative border rounded-md border-[#3F3D56]">
<input value={address.addressl2} onChange={handlechange} name='addressl2' type="text" id="floating_outlined4" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined4" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Address Line 2</label>

</div>
   <div className="relative border rounded-md border-[#3F3D56]">
   <input value={address.locality} onChange={handlechange} name='locality' type="text" id="floating_outlined5" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined5" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Locality</label>
   </div>
   
<div className="relative border rounded-md border-[#3F3D56]">
<input value={address.administrative_area_level_3} onChange={handlechange} name='administrative_area_level_3' type="text" id="floating_outlined6" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined6" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">District</label>

</div>
  <div className="relative border rounded-md border-[#3F3D56]">
  <input value={address.administrative_area_level_2} name='administrative_area_level_2' onChange={handlechange} type="text" id="floating_outlined7" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined7" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Division</label>

  </div>
 <div className="relative border rounded-md border-[#3F3D56]">
 <input value={address.administrative_area_level_1} name='administrative_area_level_1' onChange={handlechange} type="text" id="floating_outlined8" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined8" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">State</label>

 </div>
  
  <div className="relative border rounded-md border-[#3F3D56]">
  <input value={address.postal_code} onChange={handlechange} name='postal_code' type="text" id="floating_outlined9" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
    <label for="floating_outlined9" class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">PIN Code</label>
  </div>
<button className='text-white bg-[#3F3D56]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center mr-3 md:mr-0 ' onClick={locateonmap}>Locate on map</button>
  
</div>
      
        </div>
         
       </div>
</div>

       

 {/* <input type="text" name="" id="" ref={ref}/> */}


      </>
    );

}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPKEY
})(MapContainer);
// export default MapContainer