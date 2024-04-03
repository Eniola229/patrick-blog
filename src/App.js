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
import Entertainment  from './Entertainment';
import Leatest from './Leatest';
import Sport from './Sport';
import Share from './Share'
import Bussiness from './Bussiness';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Box>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/readmore/:id" element={<Readmore />} />
          <Route path="/loginauthblogadmin" element={<Login />} />
          <Route path="/AdminAuthBlogHome" element={<AdminHome />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/getads" element={<Getads />} />
          <Route path="/getvideo" element={<Getvideo />} />
          <Route path="/editadsadmin/:id" element={<Editadsadmin />} />
          <Route path="/editpost/:id" element={<Editpost />} />
          <Route path="/entertainment" element={<Entertainment/>}/>
          <Route path="/leatest" element={<Leatest/>}/>
          <Route path="/sport" element={<Sport/>}/>
          <Route path="/share" element={<Share/>}/>
          <Route path="/bussiness" element={<Bussiness/>}/>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
