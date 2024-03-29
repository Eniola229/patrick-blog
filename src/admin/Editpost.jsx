import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../auth/Firebase';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();
const Editpost = () => {
  const { id } = useParams();
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

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, 'news', id), { ...news });
      alert('Posts updated successfully!');
    } catch (error) {
      console.error('Error updating Posts:', error);
    }
  };

  return (
  <ThemeProvider theme={defaultTheme}>
    <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
    }}>
    <form style={{display:"column", justifyContent:"space-around", width:"80%", gap:"10px"}}>
      <h2>Update Posts</h2>
      {/*input fields for updating product details */}
      <TextField
      sx={{
        width:"100%",
        display:"flex",
        justifyContent:'center',
        margin:"auto",
        marginButtom:"5px"
      }}
        type="text"
        name="intro"
        sx={{
        width:"100%",
        display:"flex",
        justifyContent:'center',
        margin:"auto"
      }}
        value={news.intro}
        onChange={(e) => setNews({ ...news, intro: e.target.value })}
      /><br/>
      <TextField
      sx={{
        width:"100%",
        display:"flex",
        justifyContent:'center',
        margin:"auto"
      }}
        name="body"
        multiline
        rows={4}
        value={news.body}
        onChange={(e) => setNews({ ...news, body: parseFloat(e.target.value) })}
      /><br/>
      <TextField
      sx={{
        width:"100%",
        display:"flex",
        justifyContent:'center',
        margin:"auto",
        gap:"3px"
      }}
        name="source"
        type="text"
        value={news.source}
        onChange={(e) => setNews({ ...news, source: parseFloat(e.target.value) })}
      /><br/>
      <button 
       onClick={handleUpdate}
       style={{
        width:"100%",
        color:"white",
        height:'7vh',
        border:"none",
        backgroundColor:"darkred",
        cursor:"pointer"
       }}
       >Update Posts</button>
      </form>
    </Box>
    </ThemeProvider>
  );
};

export default Editpost;
