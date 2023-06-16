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
        <Route exact path='/getlocation' element={ <Gethostlocation google={props.google}
					center={{lat: lat, lng: lon}}
					height='300px'
					zoom={15}/> }  />
      </Routes>
    </Router>
  );
}

export default App;
