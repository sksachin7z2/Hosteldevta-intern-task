import {
  Routes,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
import {useState,useEffect} from 'react'
import Landing from './pages/Landing';
import Hosting from './pages/Hosting';
import Navbar from './components/Navbar';
import Gethostlocation from './components/GethostLocation' 
import Getyourlocation from './components/Getyourlocation' 
import Aboutyourplace from './components/Aboutyourplace'
import Dormitoryinfo from './components/Dormitoryinfo'
import AboutYourDorm from './pages/AboutYourDorm';
import Locateyourdorm from './pages/Locateyourdorm';
import Roomselector from './pages/Roomselector';
import Tellusmore from './pages/Tellusmore';
import Signup from './pages/Signup';
import Addphotodorm from './pages/Addphotodorm';
import Login from './pages/Login';
import TitleandDescription from './pages/Step2TitleDescription';
import Addammeneties from './pages/Addammeneties';
import Step3hosting from './pages/Step3hosting';
import Setprice from './pages/Step3setprice';
import ReviewListing from './pages/ReviewListing';
import UserDashboard from './pages/userDashboard/UserDashboard';
import HostingLast from './pages/HostingLast'
import Listings from './pages/Listing'
import SecurityContact from './pages/Contactsecurity'
function App(props) {
  const host="http://localhost:5000"
  const [lat, setLat] = useState(0)
const [lon, setLon] = useState(0)
const getlocation=()=>{
  navigator.geolocation.getCurrentPosition((e)=>{
    setLat(e.coords.latitude);
    setLon(e.coords.longitude);
  })
}
useEffect(() => {
  getlocation()
}, [])

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Landing host={host}/>}/>
        <Route exact path='/hostdashboard' element={<Hosting host={host}/>}/>
        <Route exact path='/dashboard' element= {<UserDashboard host={host}/>}/>
        <Route exact path='/getlocationok' element={ <Getyourlocation host={host} lat={lat} lon ={lon} setLon={setLon} setLat={setLat} getlocation={getlocation}/> }  />
        <Route exact path='/aboutyourplace' element={ <Aboutyourplace host={host}/> }  />
        <Route exact path='/dormitoryinfo' element={ <Dormitoryinfo host={host}/> }  />

        <Route exact path='/hosting/:id/about-your-dorm' element={ <AboutYourDorm host={host}/> }  />
        <Route exact path='/hosting/:id/locate-your-dorm' element={ <Locateyourdorm host={host} lat={lat} lon ={lon} setLon={setLon} setLat={setLat} getlocation={getlocation}/> }  />
        <Route exact path='/hosting/:id/about-rooms' element={ <Roomselector host={host}/> }  />

        <Route exact path='/hosting/:id/moreinfo' element={ <Tellusmore host={host}/> }  />
        <Route exact path='/hosting/:id/add-ammeneties' element={ <Addammeneties host={host}/> }  />
        <Route exact path='/hosting/:id/add-photo' element={ <Addphotodorm host={host}/> }  />
        <Route exact path='/hosting/:id/add-title-description' element={ <TitleandDescription host={host}/> }  />
        <Route exact path='/hosting/:id/step3' element={ <Step3hosting host={host}/> }  />
        <Route exact path='/hosting/:id/set-a-price' element={ <Setprice host={host}/> }  />
        <Route exact path='/hosting/:id/securitycontact' element={ <SecurityContact host={host}/> }  />
        <Route exact path='/hosting/:id/review-listing' element={ <ReviewListing host={host}/> }  />
        <Route exact path='/hosting/:id/congratulation' element={ <HostingLast host={host}/> }  />

        <Route exact path='/profile' element={ <HostingLast host={host}/> }  />
        <Route exact path='/listings' element={ <Listings host={host}/> }  />


        <Route exact path='/getlocation' element={ <Gethostlocation host={host} google={props.google}
					center={{lat: lat, lng: lon}}
					height='300px'
					zoom={15}/> }  />
          <Route exact path='/signup' element={<Signup host={host}/>}/> 
          <Route exact path='/login' element={<Login host={host}/>}/> 
                </Routes>
    </Router>
  );
}

export default App;
