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
import Adsone from './Adsone';



function Featured() {
   const theme = useTheme();
   const isPhoneSize = useMediaQuery(theme.breakpoints.down('sm'));
   const [loading, setLoading] = useState(false);
   const [posts, setPosts] = useState([]);

   useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "news"), (snapshot) => {
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
    {!isPhoneSize && (
      <Box 
        sx={{
          backgroundImage: "transparent",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          padding: '0px 10px'
        }}
      >
    <Box >
    <Typography 
    sx={{
      color:"black",
      fontWeight:'bold'
    }}
    >
      Featured News
    </Typography>
    <Box
    sx={{
      background:"linear-gradient(90deg, rgba(50, 0, 0, 1) 0%, rgba(130, 0, 15, 1) 50%, rgba(255, 0, 0, 1) 100%)",
      width:"30%",
      height:'1vh'
    }}
    >
    </Box>
    </Box>


    {/*Start*/}
{loading ? (
  <Box sx={{justifyContent:"center", margin:"auto", alignItems:"center", textAlign:"center", marginTop:"5rem"}}>
    <CircularProgress sx={{justifyContent:"center", color:"red"}} /> 
    <Typography 
      sx={{
        color:'black',
        fontWeight:'bold',
        fontSize:'1rem'
      }}
    >
      Trying to Load  Featured...
    </Typography>
    <Typography 
      sx={{
        color:'black',
        fontWeight:'bold',
        fontSize:'0.5rem'
      }}
    >
      If it taking time kindly check Internet Connection
    </Typography>
  </Box>
) : (
  <>
    {posts
      .filter(news => news.category === "Featured")
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(news => (
        <Box 
          sx={{
            width:"90%",
            height:"50vh",
            marginTop:'3px',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${news.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            key: news.id
          }}
        >
          <Box 
            sx={{
              padding: '20px',
              background: 'linear-gradient(90deg, rgba(50, 0, 0, 0.9) 0%, rgba(183, 0, 21, 0.5) 50%, rgba(255, 0, 0, 0.5) 100%)',
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',
              position: 'relative',
            }}
          >
            <Typography 
              sx={{
                color:"white",
                fontSize:"0.9rem"
              }}
            >
             {new Date(news.timestamp.seconds * 1000).toLocaleDateString()}
            </Typography>
            <Typography 
              sx={{
                color:"white",
                fontSize:"0.9rem"
              }}
            >
              {news.intro}
            </Typography>
          </Box>
        </Box>
      ))
    }
  </>
)}
    </Box>
   )}
    <Adsone/>
  </>
  );
}

export default Featured;
