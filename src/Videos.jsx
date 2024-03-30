import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { onSnapshot, collection } from 'firebase/firestore';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import { db } from "./auth/Firebase";
import { useNavigate } from 'react-router-dom';

function Videos() {
   const theme = useTheme();
   const [loading, setLoading] = useState(false);
   const [posts, setPosts] = useState([]);
   const navigate = useNavigate(); 

   useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(collection(db, "video"), (snapshot) => {
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
      <Box 
        sx={{marginTop:'2%'}}
      >
        <Typography 
          sx={{
            color:"black",
            fontWeight:'bold',
            fontSize:'1.5rem'
          }}
        >
          Videos
        </Typography>
        <Box
          sx={{
            background:"linear-gradient(90deg, rgba(50, 0, 0, 1) 0%, rgba(130, 0, 15, 1) 50%, rgba(255, 0, 0, 1) 100%)",
            width:"20%",
            height:'1vh'
          }}
        />
      </Box>

      <Box 
        sx={{
          overflowX: 'auto',
          marginTop: '2%',
          width: '100%', 
        }}
      >
      {loading ?
        <Box sx={{justifyContent:"center", margin:"auto", alignItems:"center", textAlign:"center", marginTop:"5rem"}}>
          <CircularProgress sx={{justifyContent:"center", color:"red"}} /> 
          <Typography 
            sx={{
              color:'black',
              fontWeight:'bold',
              fontSize:'1rem'
            }}
          >
            Trying to Load  Video's...
          </Typography>
        </Box>
      : posts.length === 0 ?
        <Typography 
          sx={{
            color:'black',
            fontWeight:'bold',
            fontSize:'1rem'
          }}
        >
          No videos found.
        </Typography>
      :
        <Grid container spacing={1}>
          {posts.map((video) => ( 
            <Grid key={video.id} item xs={12} sm={6} md={4}> 
              <Card>
                <video controls width="100%" height="200">
                  <source src={video.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <CardContent>
                  <Typography variant="body2" 
                    sx={{
                      color:"black",
                      fontWeight:'bold',
                      fontSize:"0.8rem"
                    }}
                  >
                    {video.intro}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      }
      </Box>
    </>
  );
}

export default Videos;
