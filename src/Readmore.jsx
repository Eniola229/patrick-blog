import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Card, CardContent, CardMedia } from '@mui/material';
import Header from './componenets/Header';
import { useMediaQuery, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import More from './More';
import Footer from './componenets/Footer';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './auth/Firebase';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import { collection } from 'firebase/firestore';


const Readmore = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState({ intro: '', body: '', source: '', img: '' });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const newsDoc = await getDoc(doc(db, 'news', id));
        if (newsDoc.exists()) {
          setNews({ id, ...newsDoc.data() });
        } else {
          console.error('News not found');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
  <>
  <Header />
{loading ? (
  <Box sx={{ justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "5rem" }}>
    <CircularProgress sx={{ justifyContent: "center", color: "chocolate" }} color="success" />
  </Box>
) : (
  <Box
    key={news.id}
    sx={{
      width: isMobile ? "100%" : "90%",
      justifyContent: "center",
      margin: "auto",
    }}
  >
    <Typography
      sx={{
        fontWeight: 'bold',
        fontSize: isMobile ? "1.3rem" : "2rem",
        color: "darkred",
      }}
    >
      {news.intro}
    </Typography>

    <Typography
      sx={{
        fontWeight: 'bold',
        fontSize: '0.7rem',
        textAlign: "left",
        color: "red"
      }}
    >
      Uploaded: {news.timestamp && new Date(news.timestamp.seconds * 1000).toLocaleDateString()}

    </Typography>

    <Button
      sx={{
        color: "white",
        background: "darkred",
        fontWeight: "bold"
      }}
    >
      Source: {news.source}
    </Button>

    <Box
      sx={{
        backgroundImage: `url(${news.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '400px',
        marginTop: "2%"
      }}
    />

    <Typography
      sx={{
        fontSize: '1rem'
      }}
    >
      {news.body}
    </Typography>

    <More />
  </Box>
)}
<Footer />

 </>
  );
};

export default Readmore;
