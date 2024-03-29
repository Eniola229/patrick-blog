import Home from "./Home";
import Box from '@mui/material/Box';
import Readmore from './Readmore';
import Login from './admin/Login';   
import AdminHome from './admin/AdminHome';  
import Posts from './admin/Posts'; 
import Editpost from './admin/Editpost';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/readmore" element={<Readmore />} />
          <Route path="/loginadmin" element={<Login />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/editpost/:id" element={<Editpost />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
