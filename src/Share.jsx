import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';

const Share = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`http://localhost:3000/news/${id}`); // Adjust the URL to your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    return () => {
      
    };
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!news) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant="h6">News not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "90%", justifyContent: "center", alignItems: "center", textAlign: "center", marginTop: "5rem" }}>
      <Card>
        <CardMedia
          component="img"
          alt="News Image"
          height="300"
          image={news.img}
        />
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {news.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {news.intro}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Source: {news.source}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Share;
