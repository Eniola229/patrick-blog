import Box from '@mui/material/Box';
import Header from './componenets/Header';
import Footer from './componenets/Footer';
import Headlines from './categories/Headlines';
import Featured from './categories/Featured';
import News from './categories/News';
import Videos from './Videos';
import Entertainment from './categories/Entertainment';
import Sport from './categories/Sport';
import Grid from '@mui/material/Grid';

function App() {
  return (
    <>
    <Box>
      <Header/>
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <Box sx={{ width: '100%' }}>
          <Headlines />
          <News />
          <Entertainment/>
          <Videos/>
          <Sport/>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
      
        <Featured />
      </Grid>
    </Grid>
     <Footer/>
    </Box>

    </>
  );
}

export default App;
