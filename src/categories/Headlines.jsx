import React, { useState, useEffect  } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useMediaQuery, useTheme } from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../auth/Firebase';
import { onSnapshot } from 'firebase/firestore'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import { collection } from 'firebase/firestore';

function Headlines() {
   const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
  {loading ? (
    <Box sx={{justifyContent:"center", alignItems:"center", textAlign:"center", marginTop:"5rem"}}>
      <CircularProgress sx={{justifyContent:"center", color:"red"}} /> 
      <Typography 
        sx={{
          color:'black',
          fontWeight:'bold',
          fontSize:'1rem'
        }}
      >
        Headline is Loading...
      </Typography>
    </Box>
  ) : (
    <>
      {posts
        .filter(news => news.category === "Headline")
         .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 1) 
        .map(news => (
          <Box 
            key={news.id}
            sx={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${news.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: '100%',
              height: '400px'
            }}
          >
            <Box 
              sx={{
                padding: isMobile ? "5px 20px" : "10px 50px",
                margin: "10px",
                width: isMobile ? "90%" : "35%",
                position: 'absolute',
                top: isMobile ? "20%" : "25%",
                left: 0,
              }}
            >
              <Button
                sx={{
                  background:'linear-gradient(90deg, rgba(204, 0, 13, 1) 0%, rgba(212, 0, 0, 1) 50%, rgba(29, 4, 9, 1) 100%)',
                  color:"white"
                }}
              >
                Headlines
              </Button>
              <Typography 
                sx={{
                  color:'white',
                  fontWeight:'bold',
                  fontSize:'1.4rem'
                }}
              >
                {news.intro}
              </Typography>
              <Typography 
                sx={{
                  color:'white',
                  fontSize:'0.9rem'
                }}
              >
                {news.body.split('.').shift()}
              </Typography>
            </Box>
          </Box>
        ))
      }
    </>
  )}
</>


  );
}

export default Headlines;