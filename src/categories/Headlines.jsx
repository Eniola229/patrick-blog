import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useMediaQuery, useTheme } from '@mui/material';



function Headlines() {
  const theme = useTheme();
   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box 
     sx={{
      backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://global.ariseplay.com/amg/www.arise.tv/uploads/2023/09/Access-Bank-1.jpeg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '400px'
     }}
    >
    <Box 
    sx={{
      padding:isMobile ? "5px 20px" : "10px 50px",
      margin:"10px",
      width:isMobile ? "90%" : "35%",
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
        2023FY: Access Holdings’ Profit Rises By 335% To N729 Billion, Records N26.7 Trillion Total Assets
      </Typography>
      <Typography 
      sx={{
        color:'white',
        fontSize:'0.9rem'
      }}
      >
        2023FY: Access Holdings’ Profit Rises By 335% To N729 Billion, Records N26.7 Trillion Total Assets
      </Typography>
    </Box>
    </Box>
  
  );
}

export default Headlines;
