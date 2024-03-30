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



function Adsone() {
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
      .filter(ads => ads.category === "ads") 
      .map(ads => (
     <Card sx={{ display: 'flex', width:"90%" }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="p" 
          sx={{
            fontFamily:"monospace",
            fontWeight:'bold'
          }}>
           NNPC Denies Downward Review Of Petrol, Diesel Prices, Urges Nigerians To Disregard Rumours
          </Typography>
          <Typography  color="darkred" variant="p" >
           22-02-2024
          </Typography>
        </CardContent>
      </Box>
      <CardMedia
        component="img"
        sx={{
         width: 140,
         }}
        image="https://global.ariseplay.com/amg/www.arise.tv/uploads/2024/01/NNPC-new-logo.jpeg"
        alt="null"

      />
    </Card>
    ))
    }
  </>
  );
}

export default Adsone;
