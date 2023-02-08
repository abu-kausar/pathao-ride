import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Destination from './components/Destination/Destination';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';

function App(){
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/destination" element={<Destination/>}/>
          <Route exact path="/blog" element={<Blog/>}/>
          <Route exact path="/contact" element={<Contact/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
