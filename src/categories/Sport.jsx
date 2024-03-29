import * as React from 'react';
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


function Sport() {
   const theme = useTheme();

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
     Sports
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
    
    <Grid item xs={12} sm={6} md={4}> 
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image="https://global.ariseplay.com/amg/www.arise.tv/uploads/2024/03/Oil-Theft-Bunkery.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5"  component="div"
        sx={{
          color:"darkred",
          fontWeight:'bold'
        }}
        >
          Africa
        </Typography>
        <Typography variant="body2" 
         sx={{
          color:"black",
          fontWeight:'bold'
        }}
        >
          Blessing Ibunge
          Oil Theft: NSCDC Uncovers 10 Illegal Refineries, Arrests 5 Suspects In Rivers Community
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"
         sx={{
          color:"darkred",
          fontWeight:'bold'
        }}
        >Read More</Button>
      </CardActions>
    </Grid>
   
     <Grid item xs={12} sm={6} md={4}> 
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image="https://global.ariseplay.com/amg/www.arise.tv/uploads/2024/03/Oil-Theft-Bunkery.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5"  component="div"
        sx={{
          color:"darkred",
          fontWeight:'bold'
        }}
        >
          Africa
        </Typography>
        <Typography variant="body2" 
         sx={{
          color:"black",
          fontWeight:'bold'
        }}
        >
          Blessing Ibunge
          Oil Theft: NSCDC Uncovers 10 Illegal Refineries, Arrests 5 Suspects In Rivers Community
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"
         sx={{
          color:"darkred",
          fontWeight:'bold'
        }}
        >Read More</Button>
      </CardActions>
    </Grid>
   
     <Grid item xs={12} sm={6} md={4}> 
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        image="https://global.ariseplay.com/amg/www.arise.tv/uploads/2024/03/Oil-Theft-Bunkery.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5"  component="div"
        sx={{
          color:"darkred",
          fontWeight:'bold'
        }}
        >
          Africa
        </Typography>
        <Typography variant="body2" 
         sx={{
          color:"black",
          fontWeight:'bold'
        }}
        >
          Blessing Ibunge
          Oil Theft: NSCDC Uncovers 10 Illegal Refineries, Arrests 5 Suspects In Rivers Community
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"
         sx={{
          color:"darkred",
          fontWeight:'bold'
        }}
        >Read More</Button>
      </CardActions>
    </Grid>
   

    
     
    </Grid>
</>  
  );
}

export default Sport;
