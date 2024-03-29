import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';

function Videos() {
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
        <Grid container spacing={1}>
          {[1, 2, 3].map((item) => ( 
            <Grid key={item} item xs={12} sm={6} md={4}> 
            
              <Card>
                <video controls height="200">
                  <source src={`video${item}.mp4`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <CardContent>
                  <Typography variant="body2" 
                    sx={{
                      color:"black",
                      fontWeight:'bold',
                      fontSize:"0.6rem"
                    }}
                  >
                    Blessing Ibunge
                    Oil Theft: NSCDC Uncovers 10 Illegal Refineries, Arrests 5 Suspects In Rivers Community
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default Videos
