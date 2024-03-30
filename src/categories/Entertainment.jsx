import React, { useState, useEffect  } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import { onSnapshot } from 'firebase/firestore'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import { collection } from 'firebase/firestore';
import { db } from "../auth/Firebase";
import { useNavigate } from 'react-router-dom'; 

function Entertainment() {
   const theme = useTheme();
   const [loading, setLoading] = useState(false);
   const [posts, setPosts] = useState([]);
    const navigate = useNavigate(); 



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
     Entertainment's
    </Typography>
    <Box
    sx={{
      background:"linear-gradient(90deg, rgba(50, 0, 0, 1) 0%, rgba(130, 0, 15, 1) 50%, rgba(255, 0, 0, 1) 100%)",
      width:"20%",
      height:'1vh'
    }}
    >
    </Box>
    </Box>


    <Grid container spacing={1}
     sx={{
      background: "transparent",
      marginTop:"2%",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '95%',
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
        Trying to Load  Entertainment's...
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
        </Box>:(
        <>
         {posts
          .filter(news => news.category === "Entertainment") 
          .map(news => (
    <Grid item xs={12} sm={6} md={4} key={news.id}> 

      <CardMedia
        component="img"
        alt="News Img"
        height="200"
        image={news.img}
      />
      <CardContent>
        <Typography gutterBottom variant="h5"  component="div"
        sx={{
          color:"darkred",
          fontWeight:'bold',
          fontSize:"0.9rem"
        }}
        >
            {news.source}
        </Typography>
        <Typography variant="body2" 
         sx={{
          color:"black",
          fontWeight:'bold'
        }}
        >
           {news.intro}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"
         sx={{
          color:"darkred",
          fontWeight:'bold'
        }}
         onClick={() => navigate(`/readmore/${news.id}`)}
        >Read More</Button>
      </CardActions>
    </Grid>
    ))}
    </>
     )}
    </Grid>
</>  
  );
}

export default Entertainment;
