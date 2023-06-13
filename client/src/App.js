import {
  Routes,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
import Landing from './pages/Landing';
import Hosting from './pages/Hosting';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/hosting' element={<Hosting/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
