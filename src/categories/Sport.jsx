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
import CommentIcon from '@mui/icons-material/Comment';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


function Sport() {
   const theme = useTheme();
   const [loading, setLoading] = useState(false);
   const [posts, setPosts] = useState([]);
   const navigate = useNavigate(); 
   const [open, setOpen] = useState(false);
   const [comment, setComment] = useState('');


     const handleChange = (e) => {
    setComment(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setOpen(true); // Open the modal box after form submission
    };
     const handleClose = () => {
    setOpen(false);
    };

    const handleSubscribeClick = () => {
      setOpen(true); // Open the modal box when Subscribe button is clicked
    };



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
     Sport's
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
        Trying to Load Sport...
      </Typography>
      <Typography 
      sx={{
        color:'black',
        fontWeight:'bold',
        fontSize:'0.5rem'
      }}
      >
       If it taking time kindly check Net Work Connection
      </Typography>
        </Box>:(
        <>
         {posts
          .filter(news => news.category === "Sport")
          .sort((a, b) => new Date(b.date) - new Date(a.date))
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
         <CommentIcon
         onClick={handleSubscribeClick}
        />
      </CardActions>
    </Grid>
    ))}
    </>
     )}
     <Container maxWidth="sm">
      <Dialog
       open={open} onClose={handleClose}>
      <DialogContent>
         No Comment Yet
        </DialogContent>
          <form
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}    
      onSubmit={handleSubmit}
    >
      <Box display="flex" alignItems="center">
        <TextField
          fullWidth
          label="Comment"
          type="text"
          value={comment} 
          onChange={handleChange}
          margin="normal"
          sx={{ width: "80%" }}
        />
        <SendIcon sx={{ width: "20%", marginLeft: "5px", color:"darkred" }} />
      </Box>
    </form>

      </Dialog>
    </Container>
    </Grid>
</>  
  );
}

export default Sport;
