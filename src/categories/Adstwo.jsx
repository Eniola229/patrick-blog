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
  .filter(ads => ads.category === "adstwo") // Filter ads by category
  .map(ads => (
    <a key={ads.id} href={ads.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
      <Card sx={{ display: 'flex', justifyContent:"center", height:"20vh", margin:'auto', width:"70%", marginTop:'3%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column',  width: '100%'}}>
          {ads.media.endsWith('.mp4') ? ( // Check if media is a video
            <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src={ads.media} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : ( // If media is not a video, assume it's an image
            <Box style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${ads.media})`, backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }}>          
            <CardContent>
              <Typography variant="body2" sx={{ color: '#ffffff' }}>
                {ads.description} 
              </Typography>
          </CardContent>
            </Box>
          )}
          
        </Box>

      </Card>
    </a>
  ))
  .sort(() => Math.random() - 0.5)
  .slice(0, 1) 
}


  </>
  );
}

export default Adstwo;
