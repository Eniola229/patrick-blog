import Home from "./Home";
import Box from '@mui/material/Box';
import Readmore from './Readmore';
import Login from './admin/Login';   
import AdminHome from './admin/AdminHome';  
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
