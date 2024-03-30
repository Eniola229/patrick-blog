import React, { useState, useEffect  } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { onSnapshot } from 'firebase/firestore'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import { collection } from 'firebase/firestore';
import { db } from "../auth/Firebase";



function Adstwo() {
   const theme = useTheme();
   const isPhoneSize = useMediaQuery(theme.breakpoints.down('sm'));
   const [loading, setLoading] = useState(false);
   const [posts, setPosts] = useState([]);

   useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "ads"), (snapshot) => {
      let list = [];
      snapshot.docs.forEach((doc) => {
          list.push({id: doc.id, ...doc.data()})
      });
      setPosts(list);
      setLoading(false);
    }, 
    (error) => {
       console.log(error);
       Swal.fire({
          title: 'Oops...',
          text: (error.code),
          icon: 'error',
          confirmButtonText: 'OK'
        })
          {/*Swal stops here*/}
    } 
    );
    return () => {
      unsub();
    }
  }, [])

 


  return (
    <> 
    {/*for other card*/}
    {posts
  .filter(ads => ads.category === "adstwo") 
  .map(ads => (
    <a href={ads.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <Card sx={{ display: 'flex', justifyContent:"center", height:"20vh", margin:'auto', width:"70%", marginTop:'3%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column',  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${ads.media})`,   width: '100%',  backgroundSize: 'cover', backgroundPosition: 'center',}}>
          <CardContent>
            <Typography variant="body2" sx={{ color: '#ffffff' }}>
              {ads.description}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </a>
))}

  </>
  );
}

export default Adstwo;
