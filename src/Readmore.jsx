import React from 'react';
import { Box, Typography, Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Header from './componenets/Header';
import { useMediaQuery, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import More from './More';
import Footer from './componenets/Footer';


const Readmore = () => {
  const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
  <>
  <Header/>
   <Box
   sx={{
    width:isMobile ? "100%" : "90%",
    justifyContent:"center",
    margin:"auto",
   }}
   >
    <Typography 
    sx={{
        fontWeight:'bold',
        fontSize:isMobile ? "1.3rem" : "2rem",
        color:"darkred",

      }}
      >
        2023FY: Access Holdings’ Profit Rises By 335% To N729 Billion, Records N26.7 Trillion Total Assets
      </Typography>

       <Typography 
      sx={{
        fontWeight:'bold',
        fontSize:'0.7rem',
        textAlign:"left",
        color:"red"
      }}
      >
      Uploaded: 22-02-2023
      </Typography>

      <Button 
      sx={{
        color:"white",
        background:"darkred",
        fontWeight:"bold"
      }}
      >
        Source: 
      </Button>

   <Box 
     sx={{
      backgroundImage: "url('https://global.ariseplay.com/amg/www.arise.tv/uploads/2023/09/Access-Bank-1.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '400px',
       marginTop:"2%"
     }}
    >
    </Box>
      <Typography 
      sx={{
        fontWeight:'bold',
        fontSize:'1rem'
      }}
      >
        2023FY: Access Holdings’ Profit Rises By 335% To N729 Billion, Records N26.7 Trillion Total Assets
        2023FY: Access Holdings’ Profit Rises By 335% To N729 Billion, Records N26.7 Trillion Total Assets
        2023FY: Access Holdings’ Profit Rises By 335% To N729 Billion, Records N26.7 Trillion Total Assets
        2023FY: Access Holdings’ Profit Rises By 335% To N729 Billion, Records N26.7 Trillion Total Assets
        2023FY: Access Holdings’ Profit Rises By 335% To N729 Billion, Records N26.7 Trillion Total Assets
      </Typography>
       <More/>
    </Box>
   
    <Footer/>

   </>
  );
};

export default Readmore;
