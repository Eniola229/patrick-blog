import Home from "./Home";
import Box from '@mui/material/Box';
import Readmore from './Readmore';
import Login from './admin/Login';   
import AdminHome from './admin/AdminHome';  
import Posts from './admin/Posts'; 
import Editpost from './admin/Editpost';
import Getvideo from './admin/Getvideo';
import Getads from './admin/Getads';  
import Editadsadmin from './admin/Editadsadmin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/readmore/:id" element={<Readmore />} />
          <Route path="/loginadmin" element={<Login />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/getads" element={<Getads />} />
          <Route path="/getvideo" element={<Getvideo />} />
          <Route path="/editadsadmin/:id" element={<Editadsadmin />} />
          <Route path="/editpost/:id" element={<Editpost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
