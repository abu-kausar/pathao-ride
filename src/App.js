import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home/Home';
import NavBar from './components/NavBar/NavBar';
import Login from './components/Login/Login';
import Destination from './components/Destination/Destination';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { createContext, useState } from 'react';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/*" element={<PrivateRoute />}>
              <Route exact path="destination" element={<Destination/>}/>
            </Route>
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
