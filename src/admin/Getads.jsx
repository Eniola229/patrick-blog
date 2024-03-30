// Products.jsx
import React, { useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom'; 
import {
  Container,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  styled,
  Box,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { collection } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { db } from "../auth/Firebase";
import { onSnapshot } from 'firebase/firestore'
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import { deleteDoc, doc } from 'firebase/firestore';


const StyledCard = styled(Card)({
  maxWidth: 240,
  margin: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  transition: 'transform 0.3s',
  marginTop:"3rem",
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StyledCardMedia = styled(CardMedia)({
  height: 180,
  width:230,
  objectFit: 'cover',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
});

const StyledCardContent = styled(CardContent)({
  padding: '16px',
});

const StyledRating = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: '8px',
  color: 'orange',
});

const StyledAmount = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#333',
  marginTop: '8px',
});

const StyledButton = styled(Button)({
  backgroundColor: 'chocolate',
  color: '#fff',
  width:"50%",
  textAlign:"center",
  '&:hover': {
    backgroundColor: 'darkorange',
  },
});

const Posts = () => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  //logic for displaying news

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

 

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };



  const handleDelete = async (adsId) => {
    try {
      // Delete the document with the specified product ID
      await deleteDoc(doc(db, 'ads', adsId));
      console.log('Posts deleted successfully!');

      // Refresh the news after deletion
      const updatedPosts = posts.filter((ads) => ads.id !== adsId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting posts:', error);
    }
  }

  return (
    <Container sx={{ py: 6, }} maxWidth="md">
         {loading ?

         <Box sx={{justifyContent:"center", alignItems:"center", textAlign:"center", marginTop:"5rem"}}>
          <CircularProgress sx={{justifyContent:"center", color:"red"}} color="success" /> 
          </Box>:(
      <Grid container spacing={4}>
     {posts.map((ads) => (

           <StyledCard key={ads.id}>
          <CardActionArea>
            <StyledCardMedia
              component="img"
              image={ads.media}
              alt="Product Image"
            />
            <StyledCardContent>
              <Typography gutterBottom variant="h6" sx={{fontWeight:"bolder", color:"chocolate"}} component="div">
               {ads.description}
              </Typography>
              <Typography variant="body2" sx={{color:"green"}}>
                 {ads.category}
                </Typography>
              <Typography variant="body2" sx={{color:"green"}}>
                 {ads.timestamp && new Date(ads.timestamp.seconds * 1000).toLocaleDateString()}
                </Typography>


            </StyledCardContent>
          </CardActionArea>
          <CardActions>
            <Button onClick={() => navigate(`/editadsadmin/${ads.id}`)} sx={{background:"green", color:'white'}} size="small">
              Edit
            </Button>

            <StyledButton onClick={() => handleDelete(ads.id)} sx={{background:"red"}} size="small">
              Delete
            </StyledButton>
          </CardActions>
        </StyledCard>


      ))}
      
       
      </Grid>

        )}
     
    </Container>
  );
};

export default Posts;
