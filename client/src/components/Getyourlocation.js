import React,{useState} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import Autocomplete from "react-google-autocomplete";
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

const MapContainer=({google,lat,lon,setLon,setLat,getlocation})=> {
  const [own, setOwn] = useState(false)
  const [address, setAddress] = useState({})
// const [place, setplace] = useState(second)
  const { ref, autocompleteRef } = usePlacesWidget({
    apiKey:"AIzaSyBRPX04XfjCp7A7_14Vw-Np9m5EiCawsQE",
    onPlaceSelected: (place) => {
      // console.log(place);
      console.log(place.geometry.location.lat(),place.geometry.location.lng())
      setLat(place.geometry.location.lat())
      setLon(place.geometry.location.lng())
    }
  });

    return (
       <>
       <div className='md:mx-[15vw] mx-5  '>
       <Map
       center={{
        lat: lat,
        lng: lon
      }}
       onClick={(r,e,w)=>{console.log(w.latLng.lat(),w.latLng.lng());setLat(w.latLng.lat());setLon(w.latLng.lng())}}
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
            <div className='relative w-[100%]'>
            <input ref={ref} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            "  placeholder="Enter your address" required/>
           
           <div className='absolute right-[4%] top-[25%]'>

<button onClick={()=>{getlocation();}}><svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<g>
 <path fill="#231F20" d="M32,0C18.745,0,8,10.745,8,24c0,5.678,2.502,10.671,5.271,15l17.097,24.156C30.743,63.686,31.352,64,32,64
   s1.257-0.314,1.632-0.844L50.729,39C53.375,35.438,56,29.678,56,24C56,10.745,45.255,0,32,0z M32,38c-7.732,0-14-6.268-14-14
   s6.268-14,14-14s14,6.268,14,14S39.732,38,32,38z"/>
 <path fill="#231F20" d="M32,12c-6.627,0-12,5.373-12,12s5.373,12,12,12s12-5.373,12-12S38.627,12,32,12z M32,34
   c-5.523,0-10-4.478-10-10s4.477-10,10-10s10,4.478,10,10S37.523,34,32,34z"/>
</g>
</svg></button>

       </div>
            </div>
           
      
        </div>

       </div>
</div>

       

 {/* <input type="text" name="" id="" ref={ref}/> */}


      </>
    );

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBRPX04XfjCp7A7_14Vw-Np9m5EiCawsQE'
})(MapContainer);
// export default MapContainer