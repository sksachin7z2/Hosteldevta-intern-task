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
       <div className='md:mx-[15vw] mx-5 my-[5rem]'>
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
<div>
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 ">Enter location</label>
            <input ref={ref} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            "  placeholder="Enter location" required/>
        </div>
  <button onClick={()=>getlocation()}>get your location</button>

       </div>
       

 {/* <input type="text" name="" id="" ref={ref}/> */}


      </>
    );

}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBRPX04XfjCp7A7_14Vw-Np9m5EiCawsQE'
})(MapContainer);
// export default MapContainer