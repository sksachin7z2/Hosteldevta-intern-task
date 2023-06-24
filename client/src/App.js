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
function App(props) {
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
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/hosting' element={<Hosting/>}/>
        <Route exact path='/getlocationok' element={ <Getyourlocation lat={lat} lon ={lon} setLon={setLon} setLat={setLat} getlocation={getlocation}/> }  />
        <Route exact path='/aboutyourplace' element={ <Aboutyourplace/> }  />
        <Route exact path='/dormitoryinfo' element={ <Dormitoryinfo/> }  />

        <Route exact path='/hoster/:id/about-your-dorm' element={ <AboutYourDorm/> }  />
        <Route exact path='/hoster/:id/locate-your-dorm' element={ <Locateyourdorm lat={lat} lon ={lon} setLon={setLon} setLat={setLat} getlocation={getlocation}/> }  />
        <Route exact path='/hoster/:id/about-rooms' element={ <Roomselector/> }  />

        <Route exact path='/hoster/:id/moreinfo' element={ <Tellusmore/> }  />
        <Route exact path='/hoster/:id/add-ammeneties' element={ <Addammeneties/> }  />
        <Route exact path='/hoster/:id/add-photo' element={ <Addphotodorm/> }  />
        <Route exact path='/hoster/:id/add-title-description' element={ <TitleandDescription/> }  />
        <Route exact path='/hoster/:id/step3' element={ <Step3hosting/> }  />
        <Route exact path='/hoster/:id/set-a-price' element={ <Setprice/> }  />
        <Route exact path='/hoster/:id/review-listing' element={ <ReviewListing/> }  />


        <Route exact path='/getlocation' element={ <Gethostlocation google={props.google}
					center={{lat: lat, lng: lon}}
					height='300px'
					zoom={15}/> }  />
          <Route exact path='/signup' element={<Signup/>}/> 
          <Route exact path='/login' element={<Login/>}/> 
                </Routes>
    </Router>
  );
}

export default App;
