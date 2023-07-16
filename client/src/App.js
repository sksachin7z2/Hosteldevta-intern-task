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
import {UserAuthContextProvider  as Context} from './context/auth'
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
import Profile from './pages/Profile'
import Listings from './pages/Listing'
import Details from './pages/userDashboard/Details'
import SecurityContact from './pages/Contactsecurity'
import Payment from './pages/userDashboard/Payment';
import PaymentStatus from './pages/userDashboard/PaymentStatus'
import Info from './pages/Info';
import Security from './pages/Security';
import PayoutsandBookings from './pages/PayoutsandBookings';
import Bookings from './pages/Bookings';
import Payouts from './pages/Payouts';
import UserTransaction from './pages/UserTransaction';
import ResetPassword from './pages/ResetPassword';
import LoadingBar from 'react-top-loading-bar'
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
const [progress,setProgress]=useState(0)
  return (
    <Context>
    <Router>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route exact path='/' element={<Landing host={host}/>}/>
        <Route exact path='/hostdashboard' element={<Hosting host={host}/>}/>

        <Route exact path='/dashboard' element= {<UserDashboard host={host}/>}/>
        <Route exact path='/detail/:id' element= {<Details host={host}/>}/>
        <Route exact path='/payment/:id/:bid' element= {<Payment host={host}  setProgress={setProgress}/>}/>
        <Route exact path='/paymentstatus/:id/:bid' element= {<PaymentStatus host={host}/>}/>


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

        <Route exact path='/profile' element={ <Profile host={host}/> }  />
        <Route exact path='/info' element={ <Info host={host}/> }  />
        <Route exact path='/profile/security' element={ <Security host={host}/> }  />
        <Route exact path='/profile/payments' element={ <PayoutsandBookings host={host}/> }  />
        <Route exact path='/listings' element={ <Listings host={host}/> }  />
        <Route exact path='/bookings' element={ <Bookings host={host}/> }  />
        <Route exact path='/profile/payments/payout' element={ <Payouts host={host}/> }  />
        <Route exact path='/profile/payments/managepayments' element={ <UserTransaction host={host}/> }  />
        <Route exact path='/profile/security/resetpassword' element={ <ResetPassword host={host}/> }  />


        <Route exact path='/getlocation' element={ <Gethostlocation host={host} google={props.google}
					center={{lat: lat, lng: lon}}
					height='300px'
					zoom={15}/> }  />
          <Route exact path='/signup' element={<Signup host={host}/>}/> 
          <Route exact path='/login' element={<Login host={host}/>}/> 
                </Routes>
    </Router>
    </Context>
  );
}

export default App;
