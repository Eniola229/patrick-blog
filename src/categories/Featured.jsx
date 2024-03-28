import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';



function Featured() {
   const theme = useTheme();
   const isPhoneSize = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Box 
    sx={{
      width:"90%",
      height:"50vh",
      marginTop:'3px',
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://global.ariseplay.com/amg/www.arise.tv/uploads/2024/03/5cc76f27-b2b0-4cfe-a9f9-dca8a997fdb6.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
      Date: 22-04-2024
    </Typography>
    <Typography 
    sx={{
      color:"white",
      fontSize:"0.9rem"
    }}
    >
      Former Liberian Rebel Leader Receives 30-Year Prison Term From French Court
    </Typography>
    </Box>
    </Box>

    <Box 
    sx={{
      width:"90%",
      height:"50vh",
      marginTop:'3px',
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://global.ariseplay.com/amg/www.arise.tv/uploads/2024/03/5cc76f27-b2b0-4cfe-a9f9-dca8a997fdb6.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
      Date: 22-04-2024
    </Typography>
    <Typography 
    sx={{
      color:"white",
      fontSize:"0.9rem"
    }}
    >
      Former Liberian Rebel Leader Receives 30-Year Prison Term From French Court
    </Typography>
    </Box>
    </Box>

    <Box 
    sx={{
      width:"90%",
      height:"50vh",
      marginTop:'3px',
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://global.ariseplay.com/amg/www.arise.tv/uploads/2024/03/5cc76f27-b2b0-4cfe-a9f9-dca8a997fdb6.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
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
      Date: 22-04-2024
    </Typography>
    <Typography 
    sx={{
      color:"white",
      fontSize:"0.9rem"
    }}
    >
      Former Liberian Rebel Leader Receives 30-Year Prison Term From French Court
    </Typography>
    </Box>
    </Box>


    
    {/*for other card*/}
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

    </Box>
   )}
  </>
  );
}

export default Featured;
